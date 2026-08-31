import { createContext,useCallback,useContext,useMemo,useState,type PropsWithChildren } from 'react'
import { AlertTriangle,CheckCircle2,Info,X,XCircle } from 'lucide-react'

type ToastTone='success'|'error'|'warning'|'info'
type ToastInput={title:string;description?:string;tone?:ToastTone}
type ToastItem=ToastInput&{id:string}
type ToastApi={push:(toast:ToastInput)=>void}
const ToastContext=createContext<ToastApi|null>(null)

const icons={success:CheckCircle2,error:XCircle,warning:AlertTriangle,info:Info} as const

export function ToastProvider({children}:PropsWithChildren){
  const [items,setItems]=useState<ToastItem[]>([])
  const remove=useCallback((id:string)=>setItems(current=>current.filter(item=>item.id!==id)),[])
  const push=useCallback((input:ToastInput)=>{
    const id=crypto.randomUUID()
    const item:ToastItem={...input,tone:input.tone??'success',id}
    setItems(current=>[...current.slice(-3),item])
    window.setTimeout(()=>remove(id),4200)
  },[remove])
  const value=useMemo(()=>({push}),[push])
  return <ToastContext.Provider value={value}>{children}<div className="pointer-events-none fixed bottom-4 left-1/2 z-[80] flex w-[min(92vw,430px)] -translate-x-1/2 flex-col gap-2" role="status" aria-live="polite" aria-atomic="false">{items.map(item=>{const Icon=icons[item.tone??'success'];return <div key={item.id} className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-border bg-card/95 p-4 text-card-foreground shadow-xl backdrop-blur"><span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${item.tone==='error'?'bg-destructive/10 text-destructive':item.tone==='warning'?'bg-warning/10 text-warning':item.tone==='info'?'bg-secondary text-primary':'bg-success/10 text-success'}`}><Icon className="h-5 w-5"/></span><div className="min-w-0 flex-1"><b className="block leading-6">{item.title}</b>{item.description&&<p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>}</div><button type="button" onClick={()=>remove(item.id)} aria-label="إغلاق الإشعار" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-muted-foreground transition hover:bg-secondary hover:text-foreground"><X className="h-4 w-4"/></button></div>})}</div></ToastContext.Provider>
}

export function useToast(){
  const value=useContext(ToastContext)
  if(!value)throw new Error('useToast must be used within ToastProvider')
  return value
}
