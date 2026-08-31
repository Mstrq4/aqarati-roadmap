import { useEffect,useId,useRef,useState } from 'react'
import { Info,X } from 'lucide-react'
import { getGlossaryEntry } from '@/features/glossary/glossary'

export function TermInfo({term}:{term:string}){
  const entry=getGlossaryEntry(term)
  const [open,setOpen]=useState(false)
  const triggerRef=useRef<HTMLButtonElement>(null)
  const closeRef=useRef<HTMLButtonElement>(null)
  const id=useId()
  useEffect(()=>{
    if(!open)return
    closeRef.current?.focus()
    const onKey=(event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);requestAnimationFrame(()=>triggerRef.current?.focus())}}
    window.addEventListener('keydown',onKey)
    return()=>window.removeEventListener('keydown',onKey)
  },[open])
  if(!entry)return null
  const close=()=>{setOpen(false);requestAnimationFrame(()=>triggerRef.current?.focus())}
  return <span className="inline-flex align-middle">
    <button ref={triggerRef} type="button" onClick={()=>setOpen(true)} aria-label={`شرح المصطلح: ${term}`} aria-haspopup="dialog" aria-expanded={open} aria-controls={id} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"><Info className="h-4 w-4"/></button>
    {open&&<div className="fixed inset-0 z-[90] grid place-items-center bg-background/70 p-4 backdrop-blur-sm" onMouseDown={event=>{if(event.currentTarget===event.target)close()}}><div id={id} role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} aria-describedby={`${id}-desc`} className="surface w-[min(92vw,520px)] rounded-2xl p-5 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><span className="text-xs font-bold text-primary">شرح المصطلح</span><h2 id={`${id}-title`} className="mt-1 text-xl font-black">{term}</h2><p className="mt-1 text-sm font-bold text-muted-foreground">{entry.title}</p></div><button ref={closeRef} type="button" onClick={close} aria-label="إغلاق الشرح" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition hover:bg-secondary"><X className="h-5 w-5"/></button></div><p id={`${id}-desc`} className="mt-5 text-base leading-8 text-muted-foreground">{entry.description}</p></div></div>}
  </span>
}
