import type { RoadmapData, Project } from './roadmap.types'

const clamp=(value:number,min:number,max:number)=>Math.min(max,Math.max(min,value))
const average=(values:number[])=>values.length?Math.round(values.reduce((sum,value)=>sum+clamp(value,0,100),0)/values.length):0

export function deriveCurrentWeek(project:Project, now=new Date()){
  if(!project.start_date)return 0
  const start=new Date(`${project.start_date}T00:00:00`)
  if(Number.isNaN(start.getTime()))return 0
  const diffDays=Math.floor((now.getTime()-start.getTime())/86_400_000)
  if(diffDays<0)return 0
  return clamp(Math.floor(diffDays/7)+1,1,project.max_weeks)
}

export function deriveRoadmapMetrics(data:RoadmapData, now=new Date()){
  const taskProgress=data.tasks.map(task=>task.progress)
  const overallProgress=average(taskProgress)
  const doneTasks=data.tasks.filter(task=>task.status==='done'||task.progress>=100).length
  const activeTasks=data.tasks.filter(task=>task.status==='active'||task.status==='review').length
  const blockedTasks=data.tasks.filter(task=>task.status==='blocked').length
  const paidAmount=data.payments.filter(payment=>payment.status==='paid').reduce((sum,payment)=>sum+Number(payment.amount),0)
  const currentWeek=deriveCurrentWeek(data.project,now)
  const nextMilestone=data.milestones.find(milestone=>milestone.status!=='approved')??null
  const completedDeliverables=data.deliverables.filter(item=>item.is_complete).length
  return {
    overallProgress,
    doneTasks,
    activeTasks,
    blockedTasks,
    paidAmount,
    remainingAmount:Math.max(0,Number(data.project.total_amount)-paidAmount),
    currentWeek,
    nextMilestone,
    completedDeliverables,
    totalTasks:data.tasks.length,
    totalDeliverables:data.deliverables.length,
  }
}
