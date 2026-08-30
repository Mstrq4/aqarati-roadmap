import { NavLink,Outlet,Link } from 'react-router-dom'
import { BarChart3,CalendarRange,ClipboardCheck,CreditCard,FileCheck2,History,ShieldCheck } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/cn'

const items=[['/','الملخص',BarChart3],['/timeline','الخطة الزمنية',CalendarRange],['/tasks','المهام',ClipboardCheck],['/payments','الدفعات',CreditCard],['/deliverables','التسليمات',FileCheck2],['/updates','التحديثات',History]] as const
export function PublicShell(){return <div className="min-h-screen bg-background">
  <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
    <div className="page-shell flex h-[74px] items-center justify-between gap-3">
      <Link to="/" className="flex min-h-11 items-center gap-3 rounded-xl focus-visible:outline-none">
        <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-primary text-primary-foreground shadow-sm"><ShieldCheck className="h-5 w-5"/></span>
        <span><b className="block text-lg leading-none">عقاراتي</b><span className="mt-1 block text-xs text-muted-foreground">خارطة التنفيذ المباشرة</span></span>
      </Link>
      <nav className="hidden items-center gap-1 lg:flex" aria-label="التنقل الرئيسي">
        {items.map(([to,label,Icon])=><NavLink key={to} to={to} end={to==='/'} className={({isActive})=>cn('inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium transition-colors',isActive?'bg-primary text-primary-foreground':'text-muted-foreground hover:bg-secondary hover:text-foreground')}><Icon className="h-4 w-4"/>{label}</NavLink>)}
      </nav>
      <div className="flex items-center gap-2"><ThemeToggle/><Link to="/login" className="hidden min-h-11 items-center rounded-xl border border-border px-4 text-sm font-bold hover:bg-secondary sm:inline-flex">دخول الإدارة</Link></div>
    </div>
  </header>
  <main><Outlet/></main>
  <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-6 gap-1 rounded-2xl border border-border bg-card/95 p-1.5 shadow-xl backdrop-blur lg:hidden" aria-label="التنقل على الجوال">
    {items.map(([to,label,Icon])=><NavLink key={to} to={to} end={to==='/'} className={({isActive})=>cn('flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[10px]',isActive?'bg-primary text-primary-foreground':'text-muted-foreground')}><Icon className="h-4 w-4"/><span className="truncate">{label}</span></NavLink>)}
  </nav>
  <footer className="mt-16 border-t border-border py-8 pb-24 lg:pb-8"><div className="page-shell flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>عقاراتي — متابعة تنفيذ المشروع</span><span>عرض مباشر للعميل • آخر البيانات تظهر تلقائيًا</span></div></footer>
</div>}
