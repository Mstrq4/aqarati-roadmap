export type Status = 'planned' | 'active' | 'review' | 'done' | 'blocked'
export type PhaseStatus = 'planned' | 'active' | 'done' | 'blocked'
export type PaymentStatus = 'pending' | 'due' | 'paid'

export interface Project {
  id: string; slug: string; name: string; description: string; target_weeks: number; max_weeks: number;
  total_amount: number; currency: string; overall_progress: number; current_week: number; start_date?: string | null;
}
export interface Phase { id:string; project_id:string; name:string; description:string; start_week:number; end_week:number; progress:number; status:PhaseStatus; sort_order:number; is_public:boolean }
export interface RoadmapTask { id:string; project_id:string; phase_id:string; title:string; description:string; week:number; progress:number; status:Status; priority:'low'|'medium'|'high'|'critical'; owner_label:string; notes:string; is_public:boolean }
export interface Milestone { id:string; project_id:string; title:string; week:number; status:'upcoming'|'ready'|'approved'|'delayed'; acceptance_summary:string; sort_order:number }
export interface Payment { id:string; project_id:string; sequence:number; percentage:number; amount:number; trigger_title:string; trigger_week:number|null; status:PaymentStatus; due_date:string|null; paid_at:string|null; notes:string }
export interface Deliverable { id:string; project_id:string; group_key:'scope'|'alpha'|'rc'|'final'; title:string; is_complete:boolean; sort_order:number }
export interface ProjectUpdate { id:string; project_id:string; title:string; body:string; related_phase_id:string|null; published:boolean; created_at:string; updated_at:string }
export interface RoadmapData { project:Project; phases:Phase[]; tasks:RoadmapTask[]; milestones:Milestone[]; payments:Payment[]; deliverables:Deliverable[]; updates:ProjectUpdate[] }
