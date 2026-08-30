import type { Phase,Milestone } from '@/features/roadmap/roadmap.types'
import { pct } from '@/lib/format'

const weeks=Array.from({length:12},(_,i)=>i+1)

export function GanttGrid({phases,milestones}:{phases:Phase[];milestones:Milestone[]}){return <>
  <div className="space-y-4 md:hidden">
    {phases.map(p=><article key={p.id} className="surface rounded-2xl p-4"><div className="flex items-start justify-between gap-4"><div><span className="text-xs leading-6 text-muted-foreground">الأسبوع {p.start_week}–{p.end_week}</span><h3 className="mt-1 font-black leading-7">{p.name}</h3></div><b className="shrink-0 text-sm">{pct(p.progress)}</b></div><div className="mt-4 grid grid-cols-6 gap-2">{weeks.map(w=>{const active=w>=p.start_week&&w<=p.end_week;return <div key={w} className={`grid min-h-11 place-items-center rounded-xl border text-xs font-bold ${active?'border-primary bg-primary text-primary-foreground':w>10?'border-warning/20 bg-warning/10 text-warning':'border-border bg-secondary/45 text-muted-foreground'}`} title={`${p.name} — الأسبوع ${w}`}><span>{w}</span></div>})}</div></article>)}
    <div className="surface rounded-2xl p-4"><h3 className="font-black">بوابات الإنجاز</h3><div className="mt-3 flex flex-wrap gap-2">{milestones.map(m=><span key={m.id} className="rounded-full border bg-background px-3 py-2 text-xs leading-5"><b>{m.title}</b> · أسبوع {m.week}</span>)}</div></div>
  </div>

  <div className="hidden md:block rounded-2xl border border-border bg-card p-4">
    <div className="grid grid-cols-[minmax(150px,1.6fr)_repeat(12,minmax(28px,1fr))] gap-1 pb-3 text-center text-xs text-muted-foreground"><div className="text-right font-bold text-foreground">المسار</div>{weeks.map(w=><div key={w} className={`rounded-lg py-2 ${w>10?'bg-warning/10 text-warning':'bg-secondary'}`}>{w}</div>)}</div>
    {phases.map(p=><div key={p.id} className="grid grid-cols-[minmax(150px,1.6fr)_repeat(12,minmax(28px,1fr))] gap-1 border-t border-border/60 py-2"><div className="pl-3"><div className="flex items-center justify-between gap-2"><span className="truncate text-sm font-bold">{p.name}</span><span className="text-xs text-muted-foreground">{pct(p.progress)}</span></div></div>{weeks.map(w=>{const active=w>=p.start_week&&w<=p.end_week;return <div key={w} title={`${p.name} — الأسبوع ${w}`} className={`h-9 ${active?'bg-primary/90':w>10?'bg-warning/5':'bg-secondary/35'} ${w===p.start_week?'rounded-r-lg':''} ${w===p.end_week?'rounded-l-lg':''}`}/>})}</div>)}
    <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">{milestones.map(m=><span key={m.id} className="rounded-full border bg-background px-3 py-1.5 text-xs"><b>{m.title}</b> · أسبوع {m.week}</span>)}</div>
  </div>
</>}
