export const formatSar = (value:number) => new Intl.NumberFormat('ar-SA',{style:'currency',currency:'SAR',maximumFractionDigits:0}).format(value)
export const formatDate = (value?:string|null) => value ? new Intl.DateTimeFormat('ar-SA',{dateStyle:'medium'}).format(new Date(value)) : '—'
export const pct = (value:number) => `${Math.max(0,Math.min(100,Math.round(value)))}٪`
