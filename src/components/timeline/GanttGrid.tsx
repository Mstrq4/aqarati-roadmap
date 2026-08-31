import type { Phase,Milestone } from '@/features/roadmap/roadmap.types'
import { pct } from '@/lib/format'
import { GlossaryText } from '@/components/glossary/GlossaryText'

const weeks=Array.from({length:12},(_,i)=>i+1)

export function GanttGrid({phases,milestones}:{phases:Phase[];milestones:Milestone[]}){return <>
  <div className="space-y-3 md:hidden">
    {phases.map(p=><article key={p.id} className="surface rounded-2xl p-4"><div className="flex items-start justify-between gap-4"><div className="min-w-0"><span className="text-xs leading-6 text-muted-foreground">الأسبوع {p.start_week}–{p.end_week}</span><h3 className="mt-1 font-black leading-7"><GlossaryText text={p.name}/></h3></div><b className="shrink-0 text-sm">{pct(p.progress)}</b></div><p className="mt-2 text-sm leading-7 text-muted-foreground"><GlossaryText text={p.description}/></p><div className="mt-4 grid grid-cols-6 gap-2">{weeks.map(w=>{const active=w>=p.start_week&&w<=p.end_week;return <div key={w} className={`grid min-h-11 place-items-center rounded-xl border text-xs font-bold ${active?'border-primary bg-primary text-primary-foreground':w>10?'border-warning/20 bg-warning/10 text-warning':'border-border bg-secondary/45 text-muted-foreground'}`} aria-label={`${p.name} — الأسبوع ${w}${active?' ضمن مدة المرحلة':''}`}><span>{w}</span></div>})}</div></article>)}
    <div className="surface rounded-2xl p-4"><h3 className="font-black">بوابات الإنجاز</h3><div className="mt-3 grid gap-2 sm:grid-cols-2">{milestones.map(m=><div key={m.id} className="rounded-xl border bg-background px-3 py-3 text-sm leading-6"><b><GlossaryText text={m.title}/></b><span className="mr-2 text-xs text-muted-foreground">أسبوع {m.week}</span><p className="mt-1 text-xs leading-6 text-muted-foreground"><GlossaryText text={m.acceptance_summary}/></p></div>)}</div></div>
  </div>

  <div className="hidden rounded-2xl border border-border bg-card p-4 md:block">
    <div className="grid grid-cols-[minmax(190px,1.8fr)_repeat(12,minmax(30px,1fr))] gap-1 pb-3 text-center text-xs text-muted-foreground"><div className="text-right font-bold text-foreground">المسار</div>{weeks.map(w=><div key={w} className={`rounded-lg py-2 ${w>10?'bg-warning/10 text-warning':'bg-secondary'}`}>{w}</div>)}</div>
    {phases.map(p=><div key={p.id} className="grid grid-cols-[minmax(190px,1.8fr)_repeat(12,minmax(30px,1fr))] gap-1 border-t border-border/60 py-2"><div className="pl-3"><div className="flex items-center justify-between gap-2"><span className="min-w-0 text-sm font-bold"><GlossaryText text={p.name}/></span><span className="text-xs text-muted-foreground">{pct(p.progress)}</span></div><p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{p.description}</p></div>{weeks.map(w=>{const active=w>=p.start_week&&w<=p.end_week;return <div key={w} aria-label={`${p.name} — الأسبوع ${w}${active?' ضمن مدة المرحلة':''}`} className={`h-11 ${active?'bg-primary/90':w>10?'bg-warning/5':'bg-secondary/35'} ${w===p.start_week?'rounded-r-lg':''} ${w===p.end_week?'rounded-l-lg':''}`}/>})}</div>)}
    <div className="mt-4 grid gap-2 border-t pt-4 lg:grid-cols-2 xl:grid-cols-3">{milestones.map(m=><div key={m.id} className="rounded-xl border bg-background px-3 py-2 text-xs"><div className="flex items-center justify-between gap-2"><b><GlossaryText text={m.title}/></b><span>أسبوع {m.week}</span></div><p className="mt-1 leading-5 text-muted-foreground">{m.acceptance_summary}</p></div>)}</div>
  </div>
</>}
