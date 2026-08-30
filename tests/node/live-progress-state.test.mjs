import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root=process.cwd()
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8')
const exists=(p)=>fs.existsSync(path.join(root,p))

test('preview seed starts at a true zero state',()=>{
  const seed=read('src/features/roadmap/seed.ts')
  assert.match(seed,/overall_progress:0,current_week:0/)
  assert.doesNotMatch(seed,/,\s*(?:[1-9]\d?|100)\s*,\s*'(?:active|done|review)'/)
  assert.doesNotMatch(seed,/status:'paid'/)
  assert.doesNotMatch(seed,/status:'approved'/)
  assert.match(seed,/updates:\[\]/)
})

test('database seed also starts with no fabricated progress',()=>{
  const schema=read('supabase/migrations/0001_schema.sql')
  const seed=read('supabase/migrations/0003_seed.sql')
  assert.match(schema,/current_week smallint not null default 0 check \(current_week between 0 and 12\)/)
  assert.match(seed,/,7800,'SAR',0,0\)/)
  assert.doesNotMatch(seed,/,'(?:done|active|review)'/)
  assert.doesNotMatch(seed,/,'paid'/)
  assert.doesNotMatch(seed,/,'approved'/)
  assert.doesNotMatch(seed,/insert into public\.updates/)
})

test('dashboard derives statistics instead of trusting stored overall progress',()=>{
  assert.ok(exists('src/features/roadmap/roadmap.metrics.ts'),'missing derived metrics module')
  const dashboard=read('src/pages/public/DashboardPage.tsx')
  assert.match(dashboard,/deriveRoadmapMetrics/)
  assert.doesNotMatch(dashboard,/data\.project\.overall_progress/)
  assert.match(dashboard,/لم يبدأ/)
})

test('public copy reflects automatic progress updates without scope-warning banner',()=>{
  const footer=read('src/components/app-shell/PublicShell.tsx')
  const timeline=read('src/pages/public/TimelinePage.tsx')
  assert.doesNotMatch(footer,/عرض مباشر للعميل • آخر البيانات تظهر تلقائيًا/)
  assert.match(footer,/تتحدث البيانات تلقائيًا حسب التقدم المسجل/)
  assert.doesNotMatch(timeline,/هامش القبول ليس تمديدًا للنطاق/)
})

test('mobile gantt does not require horizontal scrolling',()=>{
  const gantt=read('src/components/timeline/GanttGrid.tsx')
  assert.doesNotMatch(gantt,/overflow-x-auto/)
  assert.match(gantt,/md:hidden/)
  assert.match(gantt,/grid-cols-6/)
  assert.match(gantt,/hidden md:block/)
})
