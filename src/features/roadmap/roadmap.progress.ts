import type { Phase, RoadmapData, RoadmapTask } from './roadmap.types'

const clamp=(value:number,min:number,max:number)=>Math.min(max,Math.max(min,Number.isFinite(value)?value:0))
const average=(values:number[])=>values.length?Math.round(values.reduce((sum,value)=>sum+clamp(value,0,100),0)/values.length):0

export function normalizeTaskPatch(current:RoadmapTask,patch:Partial<RoadmapTask>):Partial<RoadmapTask>{
  const status=patch.status??current.status
  let progress=patch.progress??current.progress
  if(status==='planned')progress=0
  else if(status==='active')progress=clamp(progress,0,79)
  else if(status==='review')progress=80
  else if(status==='done')progress=100
  else if(status==='blocked')progress=clamp(current.progress,0,100)
  return {...patch,status,progress}
}

function derivePhaseStatus(tasks:RoadmapTask[]):Phase['status']{
  if(!tasks.length)return 'planned'
  if(tasks.some(task=>task.status==='blocked'))return 'blocked'
  if(tasks.every(task=>task.status==='done'||task.progress>=100))return 'done'
  if(tasks.some(task=>task.status!=='planned'||task.progress>0))return 'active'
  return 'planned'
}

export function recalculateRoadmapProgress(data:RoadmapData):RoadmapData{
  const phases=data.phases.map(phase=>{
    const tasks=data.tasks.filter(task=>task.phase_id===phase.id)
    return {...phase,progress:average(tasks.map(task=>task.progress)),status:derivePhaseStatus(tasks)}
  })
  return {...data,phases,project:{...data.project,overall_progress:average(data.tasks.map(task=>task.progress))}}
}

export function patchTaskInRoadmap(data:RoadmapData,id:string,patch:Partial<RoadmapTask>):RoadmapData{
  const current=data.tasks.find(task=>task.id===id)
  if(!current)return data
  const normalized=normalizeTaskPatch(current,patch)
  return recalculateRoadmapProgress({...data,tasks:data.tasks.map(task=>task.id===id?{...task,...normalized}:task)})
}
