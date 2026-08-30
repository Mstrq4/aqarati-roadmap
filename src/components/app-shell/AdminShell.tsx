import { NavLink,Outlet,Link,useNavigate } from 'react-router-dom'
import { LayoutDashboard,ListChecks,CalendarRange,CreditCard,History,Settings,LogOut,ExternalLink } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/cn'
const nav=[['/admin','لوحة الإدارة',LayoutDashboard],['/admin/tasks','المهام',ListChecks],['/admin/timeline','الخطة الزمنية',CalendarRange],['/admin/payments','الدفعات',CreditCard],['/admin/updates','التحديثات',History],['/admin/settings','الإعدادات',Settings]] as const
export function AdminShell(){const navigate=useNavigate(); const signout=async()=>{await supabase?.auth.signOut();navigate('/login')}; return <div className="min-h-screen bg-muted/30 lg:grid lg:grid-cols-[260px_1fr]">
<aside className="hidden border-l border-border bg-card lg:flex lg:min-h-screen lg:flex-col lg:p-4">
 <Link to="/admin" className="mb-7 flex min-h-12 items-center gap-3 rounded-xl px-2"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground font-black">ع</span><span><b className="block">إدارة عقاراتي</b><small className="text-muted-foreground">لوحة المالك</small></span></Link>
 <nav className="space-y-1">{nav.map(([to,label,Icon])=><NavLink key={to} to={to} end={to==='/admin'} className={({isActive})=>cn('flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium',isActive?'bg-primary text-primary-foreground':'text-muted-foreground hover:bg-secondary hover:text-foreground')}><Icon className="h-4 w-4"/>{label}</NavLink>)}</nav>
 <div className="mt-auto space-y-1"><Link to="/" className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-muted-foreground hover:bg-secondary"><ExternalLink className="h-4 w-4"/>عرض العميل</Link><button onClick={signout} className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm text-destructive hover:bg-destructive/10"><LogOut className="h-4 w-4"/>تسجيل الخروج</button></div>
</aside>
<div><header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur"><div className="flex h-[70px] items-center justify-between px-4 sm:px-6 lg:px-8"><div><b>لوحة إدارة المشروع</b><span className="mr-2 text-xs text-muted-foreground">التغييرات تنعكس على عرض العميل</span></div><div className="flex gap-2"><ThemeToggle/><Link to="/" className="inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 text-sm lg:hidden"><ExternalLink className="h-4 w-4"/>العرض</Link></div></div></header><main className="p-4 sm:p-6 lg:p-8"><Outlet/></main></div>
</div>}
