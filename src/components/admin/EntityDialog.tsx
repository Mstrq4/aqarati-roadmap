import { useEffect,useId,useRef,type PropsWithChildren } from 'react'
import { X } from 'lucide-react'

export function EntityDialog({open,title,description,onClose,children}:{open:boolean;title:string;description?:string;onClose:()=>void;children:React.ReactNode}){
  const id=useId();const closeRef=useRef<HTMLButtonElement>(null)
  useEffect(()=>{if(!open)return;closeRef.current?.focus();const onKey=(event:KeyboardEvent)=>{if(event.key==='Escape')onClose()};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[open,onClose])
  if(!open)return null
  return <div className="fixed inset-0 z-[85] grid place-items-center overflow-y-auto bg-background/75 p-3 backdrop-blur-sm" onMouseDown={event=>{if(event.currentTarget===event.target)onClose()}}><section role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} className="surface my-4 w-[min(96vw,760px)] rounded-2xl shadow-2xl"><header className="flex items-start justify-between gap-4 border-b p-4 sm:p-5"><div><h2 id={`${id}-title`} className="text-xl font-black">{title}</h2>{description&&<p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>}</div><button ref={closeRef} type="button" onClick={onClose} aria-label="إغلاق النافذة" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border hover:bg-secondary"><X className="h-5 w-5"/></button></header><div className="p-4 sm:p-5">{children}</div></section></div>
}

export function Field({label,children,hint}:{label:string;children:React.ReactNode;hint?:string}){return <label className="block text-sm font-bold"><span>{label}</span>{hint&&<span className="mr-2 text-xs font-normal text-muted-foreground">{hint}</span>}<span className="mt-2 block">{children}</span></label>}
export const inputClass='min-h-11 w-full rounded-xl border bg-background px-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20'
export const textareaClass='min-h-28 w-full resize-y rounded-xl border bg-background px-3 py-2 outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20'
