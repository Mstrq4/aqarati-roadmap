import { glossaryEntries } from '@/features/glossary/glossary'
import { TermInfo } from './TermInfo'

type Segment={text:string;term?:string}
function segmentText(text:string):Segment[]{
  const matches:{start:number;end:number;term:string}[]=[]
  const lower=text.toLocaleLowerCase('en')
  for(const entry of glossaryEntries){
    for(const alias of entry.aliases){
      const needle=alias.toLocaleLowerCase('en')
      let from=0
      while(from<lower.length){
        const start=lower.indexOf(needle,from)
        if(start<0)break
        matches.push({start,end:start+alias.length,term:entry.term})
        from=start+alias.length
      }
    }
  }
  matches.sort((a,b)=>a.start-b.start||(b.end-b.start)-(a.end-a.start))
  const accepted:{start:number;end:number;term:string}[]=[]
  for(const match of matches){if(!accepted.some(item=>match.start<item.end&&match.end>item.start))accepted.push(match)}
  accepted.sort((a,b)=>a.start-b.start)
  const segments:Segment[]=[];let cursor=0
  for(const match of accepted){if(match.start>cursor)segments.push({text:text.slice(cursor,match.start)});segments.push({text:text.slice(match.start,match.end),term:match.term});cursor=match.end}
  if(cursor<text.length)segments.push({text:text.slice(cursor)})
  return segments.length?segments:[{text}]
}

export function GlossaryText({text,className=''}:{text:string;className?:string}){
  return <span className={className}>{segmentText(text).map((segment,index)=><span key={`${index}-${segment.term??'plain'}`} className={segment.term?'inline-flex items-center align-middle':''}><span>{segment.text}</span>{segment.term&&<TermInfo term={segment.term}/>}</span>)}</span>
}
