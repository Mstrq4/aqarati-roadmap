import type { RoadmapData } from './roadmap.types'

const P='11111111-1111-4111-8111-111111111111'
const phases = [
  ['p1','التحليل وتثبيت النطاق','تحويل المتطلبات إلى نطاق نهائي ونماذج بيانات ومعايير قبول.',1,2,100,'done'],
  ['p2','UX/UI + SaaS/PWA','نظام تصميم RTL، التهيئة، لوحة المعلومات وتجربة المنصة على كل الشاشات.',1,4,82,'active'],
  ['p3','البنية التقنية والأمان','Supabase، المصادقة، الصلاحيات، النشر، المراقبة وسياسات الخصوصية.',1,3,78,'active'],
  ['p4','دفتر العقارات والملاك','العقارات، الصور، البحث، الوسوم، المفضلة وبيانات الملاك الاحتياطية.',2,5,56,'active'],
  ['p5','الباحثون والعملاء','ملفات الباحثين والعملاء، المتطلبات، الميزانية والربط الذكي.',3,5,38,'active'],
  ['p6','القروبات والدعوات','قروبات 1–10 أعضاء، الدعوات، الصلاحيات والمخزون المشترك.',4,7,18,'active'],
  ['p7','الاشتراكات والدفع','Free / Pro / Group، الحدود، الإضافات وبوابة الدفع داخل المنتج.',5,7,0,'planned'],
  ['p8','المشاركة والخصوصية','رابط عام قابل للإيقاف، واتساب يدوي، وإخفاء بيانات المالك.',4,7,16,'active'],
  ['p9','التنبيهات والبحث المحفوظ','التذكيرات، Saved Search، وتنبيهات فرص الباحثين Pro.',6,8,0,'planned'],
  ['p10','AI Matching','مطابقة الباحث بالعقار بدرجة توافق وسبب واضح ضمن الحصص.',7,9,0,'planned'],
  ['p11','التكامل والاختبار والإطلاق','اختبارات شاملة، إصلاحات، Release Candidate والتسليم.',8,10,0,'planned'],
].map((x,i)=>({id:String(x[0]),project_id:P,name:String(x[1]),description:String(x[2]),start_week:Number(x[3]),end_week:Number(x[4]),progress:Number(x[5]),status:x[6] as any,sort_order:i+1,is_public:true}))

const tasks = [
  ['t1','p1','اعتماد نطاق الإصدار وخطة القبول',1,100,'done','critical'],
  ['t2','p1','تثبيت حالات العقار والخصوصية والباقات',1,100,'done','high'],
  ['t3','p2','Design System عربي RTL والوضع الليلي',2,90,'review','high'],
  ['t4','p2','Onboarding وشاشة التهيئة',2,75,'active','medium'],
  ['t5','p3','تهيئة Supabase وRLS وRealtime',2,70,'active','critical'],
  ['t6','p4','CRUD العقارات والصور والحالات',3,55,'active','critical'],
  ['t7','p4','البحث والفلاتر والوسوم والمفضلة',3,42,'active','high'],
  ['t8','p5','ملف الباحث واحتياجاته وميزانيته',4,35,'active','high'],
  ['t9','p4','تعدد بيانات المالك وأرقام احتياطية',4,45,'active','medium'],
  ['t10','p8','إخفاء المالك من العرض العام',4,30,'active','critical'],
  ['t11','p6','إنشاء القروب والدعوات والأدوار',5,20,'active','high'],
  ['t12','p7','الباقات والحدود وUpgrade Nudge',6,0,'planned','high'],
  ['t13','p7','Add-ons لزيادة الحصص دون تغيير الباقة',7,0,'planned','medium'],
  ['t14','p8','رابط مشاركة عام Show / Hide',7,0,'planned','high'],
  ['t15','p9','التنبيهات والبحث المحفوظ Pro',8,0,'planned','high'],
  ['t16','p10','محرك المطابقة والقواعد وAI Rerank',9,0,'planned','critical'],
  ['t17','p11','E2E والأمان والاستجابة والأداء',10,0,'planned','critical'],
  ['t18','p11','Release Candidate والتسليم',10,0,'planned','critical'],
].map((x,i)=>({id:String(x[0]),project_id:P,phase_id:String(x[1]),title:String(x[2]),description:'مهمة تنفيذية ضمن الخطة الزمنية المعتمدة.',week:Number(x[3]),progress:Number(x[4]),status:x[5] as any,priority:x[6] as any,owner_label:i%3===0?'Backend':i%3===1?'Frontend':'Product / QA',notes:'',is_public:true}))

export const seedData: RoadmapData = {
  project:{id:P,slug:'aqarati-roadmap',name:'عقاراتي',description:'خارطة تنفيذ تفاعلية لمشروع عقاراتي — عرض مباشر للعميل وإدارة تقدم خاصة بصاحب المشروع.',target_weeks:10,max_weeks:12,total_amount:7800,currency:'SAR',overall_progress:34,current_week:2,start_date:null},
  phases,
  tasks,
  milestones:[
    {id:'m1',project_id:P,title:'اعتماد النطاق',week:1,status:'approved',acceptance_summary:'Scope / Backlog ونموذج البيانات معتمد.',sort_order:1},
    {id:'m2',project_id:P,title:'Alpha Core',week:5,status:'upcoming',acceptance_summary:'دفتر العقارات + الباحثون + القروب الأساسي قابل للاستعراض.',sort_order:2},
    {id:'m3',project_id:P,title:'Billing Beta',week:7,status:'upcoming',acceptance_summary:'الباقات والحدود والإضافات والمشاركة الآمنة جاهزة.',sort_order:3},
    {id:'m4',project_id:P,title:'AI Pro Beta',week:9,status:'upcoming',acceptance_summary:'محرك المطابقة يعمل بحصص وسبب توافق واضح.',sort_order:4},
    {id:'m5',project_id:P,title:'Release Candidate',week:10,status:'upcoming',acceptance_summary:'النسخة المرشحة للإطلاق تحقق معايير القبول.',sort_order:5},
  ],
  payments:[
    {id:'pay1',project_id:P,sequence:1,percentage:40,amount:3120,trigger_title:'مقدم عند بدء المشروع',trigger_week:1,status:'paid',due_date:null,paid_at:null,notes:'تُستحق عند اعتماد بدء المشروع وتثبيت النطاق.'},
    {id:'pay2',project_id:P,sequence:2,percentage:30,amount:2340,trigger_title:'بعد اعتماد نسخة Alpha',trigger_week:5,status:'pending',due_date:null,paid_at:null,notes:'بعد قبول مخرجات Alpha بنهاية الأسبوع الخامس.'},
    {id:'pay3',project_id:P,sequence:3,percentage:30,amount:2340,trigger_title:'بعد Release Candidate والتسليم النهائي',trigger_week:10,status:'pending',due_date:null,paid_at:null,notes:'بنهاية الأسبوع 10، أو خلال هامش الأسبوعين 11–12 عند استخدامه للاختبارات والقبول.'},
  ],
  deliverables:[
    ['d1','scope','النطاق النهائي وBacklog ونماذج البيانات',true],['d2','scope','نظام التصميم وتجربة RTL الأساسية',true],
    ['d3','alpha','إضافة وتعديل وبحث العقارات',false],['d4','alpha','ملفات الباحثين وبيانات الملاك والخصوصية',false],['d5','alpha','القروب والدعوات والأدوار الأساسية',false],
    ['d6','rc','الباقات والحدود والإضافات',false],['d7','rc','التنبيهات والبحث المحفوظ',false],['d8','rc','AI Matching وتفسير درجة التوافق',false],['d9','rc','اختبارات E2E والأمان والاستجابة',false],
    ['d10','final','تسليم الكود والمستودع وبيئة الإنتاج',false],['d11','final','توثيق الإدارة والتشغيل ومعايير القبول',false],
  ].map((x,i)=>({id:String(x[0]),project_id:P,group_key:x[1] as any,title:String(x[2]),is_complete:Boolean(x[3]),sort_order:i+1})),
  updates:[
    {id:'u1',project_id:P,title:'اعتماد الخطة الزمنية والدفعات',body:'تم اعتماد خطة تنفيذ مكثفة من 10 أسابيع مع هامش قبول حتى 12 أسبوعًا، وربط الدفعات ببوابات إنجاز واضحة.',related_phase_id:'p1',published:true,created_at:'2026-08-30T18:00:00Z',updated_at:'2026-08-30T18:00:00Z'},
    {id:'u2',project_id:P,title:'بدء تصميم منصة المتابعة',body:'تم تثبيت الهوية البصرية، العربية RTL، الوضعين الليلي والنهاري، ونموذج العرض العام للعميل.',related_phase_id:'p2',published:true,created_at:'2026-08-30T20:00:00Z',updated_at:'2026-08-30T20:00:00Z'},
  ],
}
