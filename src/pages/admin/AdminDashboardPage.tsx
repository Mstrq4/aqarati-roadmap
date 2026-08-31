import { Activity,AlertTriangle,CreditCard,Eye,FileCheck2,ListChecks,Milestone,WalletCards,Wifi } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRoadmap } from '@/features/roadmap/roadmap.queries'
import { deriveRoadmapMetrics } from '@/features/roadmap/roadmap.metrics'
import { KpiCard } from '@/components/dashboard/KpiCard'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { formatSar,pct } from '@/lib/format'
import { supabaseConfigured } from '@/lib/supabase'

export default function AdminDashboardPage(){
 const {data}=useRoadmap();if(!data)return null
 const metrics=deriveRoadmapMetrics(data)
 const duePayments=data.payments.filter(item=>item.status==='due')
 const delayedMilestones=data.milestones.filter(item=>item.status==='delayed')
 const remainingDeliverables=data.deliverables.length-metrics.completedDeliverables
 const paidPercent=data.project.total_amount?Math.round(metrics.paidAmount/Number(data.project.total_amount)*100):0
 return <>
  <AdminPageHeader title="لوحة الإدارة" description="ملخص تشغيلي مباشر للمشروع وما يحتاج تدخلك الآن." action={<Link to="/" className="inline-flex min-h-11 items-center gap-2 rounded-xl border bg-card px-4 text-sm font-bold"><Eye className="h-4 w-4"/>معاينة العميل</Link>}/>
  <div className={`mb-5 flex items-center gap-3 rounded-2xl border p-3.5 text-sm ${supabaseConfigured?'border-success/20 bg-success/10':'border-warning/20 bg-warning/10'}`}><Wifi className="h-5 w-5 shrink-0"/><span>{supabaseConfigured?'Supabase متصل — الحفظ والتحديث اللحظي يعملان من نفس مصدر البيانات.':'وضع معاينة محلي — بيانات هذه الجلسة فقط.'}</span></div>
  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><KpiCard label="التقدم العام" value={pct(metrics.overallProgress)} detail={metrics.currentWeek?`الأسبوع ${metrics.currentWeek}`:'لم يبدأ بعد'} icon={Activity}/><KpiCard label="المهام" value={`${metrics.doneTasks}/${metrics.totalTasks}`} detail={`${metrics.activeTasks} قيد العمل · ${metrics.blockedTasks} متوقفة`} icon={ListChecks}/><KpiCard label="الدفعات" value={formatSar(metrics.paidAmount)} detail={`${paidPercent}% مدفوع · ${formatSar(metrics.remainingAmount)} متبقٍ`} icon={CreditCard}/><KpiCard label="التسليمات" value={`${metrics.completedDeliverables}/${metrics.totalDeliverables}`} detail={`${remainingDeliverables} متبقية`} icon={FileCheck2}/></div>
  <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><StatusCard icon={AlertTriangle} label="مهام متوقفة" value={metrics.blockedTasks} tone={metrics.blockedTasks?'warning':'neutral'}/><StatusCard icon={WalletCards} label="دفعات مستحقة" value={duePayments.length} tone={duePayments.length?'warning':'neutral'}/><StatusCard icon={Milestone} label="محطات متأخرة" value={delayedMilestones.length} tone={delayedMilestones.length?'warning':'neutral'}/><StatusCard icon={Eye} label="العرض العام" value="مباشر" tone="neutral"/></div>
  <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4"><Quick to="/admin/tasks" title="إدارة المهام" text="الحالة والتقدم والإضافة والتعديل والحذف."/><Quick to="/admin/timeline" title="الخطة الزمنية" text="المراحل والمخطط ومعجم المصطلحات."/><Quick to="/admin/payments" title="الدفعات" text="المبالغ والنسب والاستحقاق وحالة السداد."/><Quick to="/admin/deliverables" title="التسليمات والمحطات" text="بوابات الإنجاز والتسليمات في تبويبات واضحة."/></div>
 </>
}
function StatusCard({icon:Icon,label,value,tone}:{icon:any;label:string;value:string|number;tone:'warning'|'neutral'}){return <article className={`rounded-2xl border p-4 ${tone==='warning'?'border-warning/20 bg-warning/10':'bg-card'}`}><div className="flex items-center justify-between gap-3"><span className="text-sm font-bold text-muted-foreground">{label}</span><Icon className={`h-5 w-5 ${tone==='warning'?'text-warning':'text-primary'}`}/></div><b className="mt-3 block text-2xl font-black">{value}</b></article>}
function Quick({to,title,text}:{to:string;title:string;text:string}){return <Link to={to} className="surface rounded-2xl p-4 transition-colors duration-200 hover:bg-secondary/50"><h2 className="font-black">{title}</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p></Link>}
