import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root=process.cwd()
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8')

test('Vite exposes the public Supabase variables created by the integration',()=>{
  const vite=read('vite.config.ts')
  const supabase=read('src/lib/supabase.ts')
  assert.match(vite,/envPrefix\s*:\s*\[[^\]]*'VITE_'[^\]]*'NEXT_PUBLIC_'/s)
  assert.match(supabase,/NEXT_PUBLIC_SUPABASE_URL/)
  assert.match(supabase,/NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/)
  assert.doesNotMatch(supabase,/SUPABASE_SERVICE_ROLE_KEY|SUPABASE_SECRET_KEY/)
})

test('public navigation hides the admin entry for signed-out visitors',()=>{
  const shell=read('src/components/app-shell/PublicShell.tsx')
  assert.match(shell,/useAdminSession/)
  assert.match(shell,/session\s*&&/)
  assert.doesNotMatch(shell,/>دخول الإدارة<\/Link>/)
  assert.match(shell,/>لوحة الإدارة<\/Link>/)
})

test('login page uses neutral service errors and client-safe explanatory copy',()=>{
  const login=read('src/pages/auth/LoginPage.tsx')
  assert.doesNotMatch(login,/بيئة Supabase لم تُضبط بعد/)
  assert.doesNotMatch(login,/لم يتم ربط Supabase بعد/)
  assert.match(login,/إدارة المشروع بثقة/)
  assert.match(login,/مساحة مخصصة لفريق الإدارة/)
  assert.match(login,/تعذر تهيئة خدمة تسجيل الدخول/)
})
