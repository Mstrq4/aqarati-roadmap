import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
const root=process.cwd()
const read=p=>fs.readFileSync(path.join(root,p),'utf8')
const exists=p=>fs.existsSync(path.join(root,p))

test('roadmap describes a real React Native mobile app and never PWA',()=>{
  const seed=read('src/features/roadmap/seed.ts')
  assert.doesNotMatch(seed,/SaaS\/PWA|\bPWA\b/)
  for(const term of ['React Native','Deep Linking','Push Notifications','Android','iOS']) assert.match(seed,new RegExp(term))
  assert.match(seed,/owner_label:[^\n]*Mobile|['"]Mobile['"]/)
})

test('task progress rules are centralized and status-driven',()=>{
  assert.ok(exists('src/features/roadmap/roadmap.progress.ts'))
  const progress=read('src/features/roadmap/roadmap.progress.ts')
  assert.match(progress,/normalizeTaskPatch/)
  assert.match(progress,/planned[^\n]*0|status\s*===\s*['"]planned['"]/)
  assert.match(progress,/review[^\n]*80|status\s*===\s*['"]review['"]/)
  assert.match(progress,/done[^\n]*100|status\s*===\s*['"]done['"]/)
  assert.match(progress,/79/)
})

test('mutations use optimistic cache updates with rollback and final reconciliation',()=>{
  const mutations=read('src/features/roadmap/roadmap.mutations.ts')
  for(const token of ['onMutate','setQueryData','cancelQueries','onError','onSettled']) assert.match(mutations,new RegExp(token))
  assert.ok(exists('src/components/feedback/ToastProvider.tsx'))
})

test('admin APIs expose create update and delete operations',()=>{
  const api=read('src/features/roadmap/roadmap.api.ts')
  for(const entity of ['Task','Phase','Payment','Milestone','Deliverable','Update']){
    assert.match(api,new RegExp(`create${entity}`))
    assert.match(api,new RegExp(`delete${entity}`))
  }
})

test('database migration enforces progress invariants',()=>{
  const file='supabase/migrations/20260831021000_admin_v2_progress_and_crud.sql'
  assert.ok(exists(file))
  const sql=read(file)
  assert.match(sql,/before insert or update/i)
  assert.match(sql,/planned/i)
  assert.match(sql,/review/i)
  assert.match(sql,/80/)
  assert.match(sql,/100/)
  assert.match(sql,/79/)
})

test('technical terminology is self explaining and touch accessible',()=>{
  for(const file of ['src/features/glossary/glossary.ts','src/components/glossary/TermInfo.tsx','src/components/glossary/GlossaryText.tsx','src/components/glossary/GlossaryPanel.tsx']) assert.ok(exists(file),`missing ${file}`)
  const glossary=read('src/features/glossary/glossary.ts')
  for(const term of ['React Native','RLS','Realtime','CRUD','Deep Linking','Push Notifications','AI Matching','Release Candidate','E2E']) assert.match(glossary,new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')))
  const info=read('src/components/glossary/TermInfo.tsx')
  assert.match(info,/aria-label/)
  assert.match(info,/role=['"]dialog['"]/)
  assert.match(info,/Escape/)
})

test('admin shell confines scrolling to content and dashboard remains dense',()=>{
  const shell=read('src/components/app-shell/AdminShell.tsx')
  assert.match(shell,/h-screen/)
  assert.match(shell,/overflow-y-auto/)
  const dashboard=read('src/pages/admin/AdminDashboardPage.tsx')
  assert.match(dashboard,/xl:grid-cols-4/)
})

test('admin tasks timeline payments and deliverables expose management affordances',()=>{
  const tasks=read('src/pages/admin/AdminTasksPage.tsx')
  assert.match(tasks,/إضافة مهمة/)
  assert.match(tasks,/بطاقات|Cards/)
  assert.match(tasks,/جدول|قائمة/)
  const timeline=read('src/pages/admin/AdminTimelinePage.tsx')
  assert.match(timeline,/إضافة مرحلة/)
  assert.match(timeline,/GlossaryPanel/)
  const payments=read('src/pages/admin/AdminPaymentsPage.tsx')
  assert.match(payments,/إضافة دفعة/)
  for(const token of ['amount','percentage','trigger_title','due_date','notes']) assert.match(payments,new RegExp(token))
  const deliverables=read('src/pages/admin/AdminDeliverablesPage.tsx')
  assert.match(deliverables,/التسليمات/)
  assert.match(deliverables,/المحطات/)
  assert.match(deliverables,/إضافة/)
})

test('site has a dedicated SVG favicon',()=>{
  assert.ok(exists('public/aqarati-mark.svg'))
  assert.match(read('index.html'),/aqarati-mark\.svg/)
})
