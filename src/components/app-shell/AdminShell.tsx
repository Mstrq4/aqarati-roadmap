import { NavLink,Outlet,Link,useNavigate } from 'react-router-dom'
import { LayoutDashboard,ListChecks,CalendarRange,CreditCard,FileCheck2,History,Settings,LogOut,ExternalLink,Menu } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/cn'
const nav=[['/admin','لوحة الإدارة',LayoutDashboard],['/admin/tasks','المهام',ListChecks],['/admin/timeline','الخطة الزمنية',CalendarRange],['/admin/payments','الدفعات',CreditCard],['/admin/deliverables','التسليمات',FileCheck2],['/admin/updates','التحديثات',History],['/admin/settings','الإعدادات',Settings]] as const

export function AdminShell(){
 const navigate=useNavigate();const signout=async()=>{await supabase?.auth.signOut();navigate('/login')}
 return <div className="h-screen overflow-hidden bg-muted/30 lg:grid lg:grid-cols-[250px_minmax(0,1fr)]">
  <aside className="hidden h-screen border-l border-border bg-card lg:flex lg:flex-col lg:p-4">
   <Link to="/admin" className="mb-5 flex min-h-12 items-center gap-3 rounded-xl px-2"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground font-black">ع</span><span><b className="block">إدارة عقاراتي</b><small className="text-muted-foreground">مركز التحكم</small></span></Link>
   <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto">{nav.map(([to,label,Icon])=><NavLink key={to} to={to} end={to==='/admin'} className={({isActive})=>cn('flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors',isActive?'bg-primary text-primary-foreground':'text-muted-foreground hover:bg-secondary hover:text-foreground')}><Icon className="h-4 w-4"/>{label}</NavLink>)}</nav>
   <div className="mt-4 space-y-1 border-t pt-3"><Link to="/" className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-muted-foreground hover:bg-secondary"><ExternalLink className="h-4 w-4"/>معاينة العميل</Link><button onClick={signout} className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm text-destructive hover:bg-destructive/10"><LogOut className="h-4 w-4"/>تسجيل الخروج</button></div>
  </aside>
  <div className="flex min-h-0 min-w-0 flex-col">
   <header className="z-30 shrink-0 border-b border-border bg-background/95 backdrop-blur"><div className="flex min-h-[68px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"><div><b>لوحة إدارة المشروع</b><span className="mr-2 hidden text-xs text-muted-foreground sm:inline">الحفظ فوري ويُراجع من Supabase</span></div><div className="flex items-center gap-2"><ThemeToggle/><Link to="/" className="inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 text-sm lg:hidden"><ExternalLink className="h-4 w-4"/>العرض</Link></div></div><details className="border-t lg:hidden"><summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 px-4 text-sm font-bold"><Menu className="h-5 w-5"/>تنقل الإدارة</summary><nav aria-label="تنقل الإدارة على الجوال" className="grid grid-cols-2 gap-2 px-4 pb-4 sm:grid-cols-3">{nav.map(([to,label,Icon])=><NavLink key={to} to={to} end={to==='/admin'} className={({isActive})=>cn('inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 text-sm font-medium',isActive?'border-primary bg-primary text-primary-foreground':'bg-card text-muted-foreground')}><Icon className="h-4 w-4"/>{label}</NavLink>)}</nav></details></header>
   <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8"><Outlet/></main>
  </div>
 </div>
}
