import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root=process.cwd()
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8')
const exists=(p)=>fs.existsSync(path.join(root,p))

test('entrypoint stays thin and delegates to the app module',()=>{
  const main=read('src/main.tsx')
  assert.ok(main.split('\n').length <= 20, 'src/main.tsx must be a thin entrypoint')
  assert.match(main,/AppProviders/)
  assert.match(main,/\<App\s*\/\>/)
  assert.doesNotMatch(main,/function\s+(Dashboard|Timeline|Tasks|Payments|Deliverables|Updates|Admin)/)
})

test('public and admin routes are split into page modules',()=>{
  const required=[
    'src/pages/public/DashboardPage.tsx','src/pages/public/TimelinePage.tsx','src/pages/public/TasksPage.tsx',
    'src/pages/public/PaymentsPage.tsx','src/pages/public/DeliverablesPage.tsx','src/pages/public/UpdatesPage.tsx',
    'src/pages/auth/LoginPage.tsx','src/pages/admin/AdminDashboardPage.tsx','src/pages/admin/AdminTasksPage.tsx',
    'src/pages/admin/AdminTimelinePage.tsx','src/pages/admin/AdminPaymentsPage.tsx','src/pages/admin/AdminUpdatesPage.tsx',
    'src/pages/admin/AdminSettingsPage.tsx','src/app/router.tsx'
  ]
  for(const file of required) assert.ok(exists(file),`missing ${file}`)
})

test('shared UI and roadmap data access live outside page files',()=>{
  const required=[
    'src/components/app-shell/PublicShell.tsx','src/components/app-shell/AdminShell.tsx',
    'src/components/dashboard/KpiCard.tsx','src/components/timeline/GanttGrid.tsx',
    'src/features/roadmap/roadmap.api.ts','src/features/roadmap/roadmap.queries.ts',
    'src/features/roadmap/roadmap.mutations.ts','src/features/roadmap/roadmap.types.ts',
    'src/features/realtime/useRoadmapRealtime.ts','src/features/auth/ProtectedRoute.tsx'
  ]
  for(const file of required) assert.ok(exists(file),`missing ${file}`)
})

test('Thmanyah font family is packaged under public fonts',()=>{
  for(const weight of ['Regular','Medium','Bold','Black']){
    assert.ok(exists(`public/fonts/thmanyahserifdisplay-${weight}.woff2`),`missing ${weight} font`)
  }
  assert.match(read('src/styles/globals.css'),/Thmanyah Serif Display/)
})

test('global stylesheet enables Tailwind utilities and brand tokens',()=>{
  const css=read('src/styles/globals.css')
  assert.match(css,/@tailwind base;/)
  assert.match(css,/@tailwind components;/)
  assert.match(css,/@tailwind utilities;/)
  assert.match(css,/--primary:\s*288 50% 19%/)
  assert.match(css,/\.page-shell/)
  assert.match(css,/\.surface/)
})
