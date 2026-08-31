import { findGlossaryTerms } from '@/features/glossary/glossary'
import { TermInfo } from './TermInfo'

export function GlossaryText({text,className=''}:{text:string;className?:string}){
  const terms=findGlossaryTerms(text)
  return <span className={`inline-flex flex-wrap items-center gap-x-1 ${className}`}><span>{text}</span>{terms.map(entry=><TermInfo key={entry.term} term={entry.term}/>)}</span>
}
