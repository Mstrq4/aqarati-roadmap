import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { LockKeyhole,ArrowLeft,ShieldCheck } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { ThemeToggle } from '@/components/app-shell/ThemeToggle'

export default function LoginPage(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const [busy,setBusy]=useState(false)
  const nav=useNavigate()

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault()
    if(!supabase){
      setError('تعذر تهيئة خدمة تسجيل الدخول حاليًا. يرجى إعادة المحاولة بعد قليل.')
      return
    }
    setBusy(true)
    setError('')
    const {error}=await supabase.auth.signInWithPassword({email,password})
    setBusy(false)
    if(error){
      setError('تعذر تسجيل الدخول. تحقق من البريد وكلمة المرور أو أعد المحاولة.')
      return
    }
    nav('/admin')
  }

  return <div className="min-h-screen bg-background p-4">
    <div className="mx-auto flex max-w-6xl justify-between py-4">
      <Link to="/" className="inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-bold"><ArrowLeft className="h-4 w-4"/>العودة للعرض</Link>
      <ThemeToggle/>
    </div>
    <div className="mx-auto grid min-h-[78vh] max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
      <section className="hidden rounded-[32px] bg-primary p-10 text-primary-foreground lg:block">
        <ShieldCheck className="h-10 w-10"/>
        <h1 className="mt-10 text-5xl font-black leading-tight">إدارة المشروع بثقة<br/><span className="font-light opacity-75">مساحة مخصصة لفريق الإدارة.</span></h1>
        <p className="mt-6 max-w-lg text-base leading-8 opacity-80">من هنا تُحدَّث حالات التنفيذ ونِسب الإنجاز والدفعات والتحديثات المعتمدة. أما العميل فيتابع أحدث بيانات المشروع من صفحات العرض العامة دون أي صلاحية للتعديل.</p>
        <div className="mt-8 rounded-2xl border border-current/15 bg-background/10 p-4 text-sm leading-7 opacity-80">صفحة الدخول مخصصة للمخولين بإدارة المشروع. إذا وصلت إلى هنا بصفتك عميلًا، استخدم زر «العودة للعرض» لمتابعة الخطة والتقدم الحالي.</div>
      </section>
      <form onSubmit={submit} className="surface rounded-3xl p-6 sm:p-8">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary"><LockKeyhole className="h-6 w-6"/></span>
        <h2 className="mt-5 text-3xl font-black">دخول الإدارة</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">تسجيل دخول مخصص لصاحب المشروع والمخولين بإدارة بيانات التنفيذ.</p>
        <label className="mt-6 block text-sm font-bold">البريد الإلكتروني<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border bg-background px-4 outline-none focus:border-primary" autoComplete="email"/></label>
        <label className="mt-4 block text-sm font-bold">كلمة المرور<input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border bg-background px-4 outline-none focus:border-primary" autoComplete="current-password"/></label>
        {error&&<p className="mt-4 rounded-xl bg-destructive/10 p-3 text-sm leading-7 text-destructive" role="alert">{error}</p>}
        <button disabled={busy} className="mt-6 min-h-12 w-full rounded-xl bg-primary px-4 font-black text-primary-foreground disabled:opacity-60">{busy?'جارٍ تسجيل الدخول…':'تسجيل الدخول'}</button>
      </form>
    </div>
  </div>
}
