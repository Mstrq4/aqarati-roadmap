import type { RoadmapData } from './roadmap.types'

const P='11111111-1111-4111-8111-111111111111'
const phases = [
  ['p1','التحليل وتثبيت النطاق','تحويل مخرجات الاجتماعات إلى نطاق نهائي، نموذج بيانات، قواعد صلاحيات ومعايير قبول واضحة للويب وتطبيق الهاتف.',1,2,0,'planned'],
  ['p2','تجربة الويب وتطبيق React Native','نظام تصميم عربي RTL، منصة الويب SaaS، وتجربة تطبيق الهاتف الأصلي على Android وiOS.',1,4,0,'planned'],
  ['p3','البنية التقنية والأمان','Supabase، المصادقة، RLS، Realtime، ربط تطبيق React Native، النشر والمراقبة وسياسات الخصوصية.',1,3,0,'planned'],
  ['p4','دفتر العقارات والملاك','العقارات والصور والحالات والبحث والوسوم والمفضلة وبيانات الملاك الاحتياطية عبر الويب وتطبيق الهاتف.',2,5,0,'planned'],
  ['p5','الباحثون والعملاء','ملفات الباحثين والعملاء، متطلبات العقار، الميزانية، المتابعة والتهيئة لخدمة AI Matching.',3,5,0,'planned'],
  ['p6','القروبات والدعوات','قروبات 1–10 أعضاء، روابط الدعوة، الأدوار، الصلاحيات والمخزون العقاري المشترك.',4,7,0,'planned'],
  ['p7','الاشتراكات والدفع','Free / Pro / Group، الحدود، Add-ons، Upgrade Nudge وتجربة إدارة الاشتراك في الويب والتطبيق.',5,7,0,'planned'],
  ['p8','المشاركة والخصوصية','رابط عرض عام قابل للإظهار والإخفاء، مشاركة خارجية، وإخفاء اسم ورقم المالك عن المشاهد.',4,7,0,'planned'],
  ['p9','التنبيهات والبحث المحفوظ','Saved Search وتنبيهات فرص الباحثين Pro وPush Notifications على تطبيق الهاتف.',6,8,0,'planned'],
  ['p10','AI Matching','مطابقة الباحث بالعقار، حساب درجة التوافق، تفسير السبب وإعادة ترتيب النتائج AI Rerank ضمن الحصص.',7,9,0,'planned'],
  ['p11','التكامل والاختبار والإطلاق','اختبارات E2E والأمان والأداء، اختبار Android وiOS، Release Candidate والتسليم النهائي.',8,10,0,'planned'],
].map((x,i)=>({id:String(x[0]),project_id:P,name:String(x[1]),description:String(x[2]),start_week:Number(x[3]),end_week:Number(x[4]),progress:Number(x[5]),status:x[6] as any,sort_order:i+1,is_public:true}))

const taskRows = [
  ['t1','p1','اعتماد نطاق الإصدار وخطة القبول','تثبيت ما يدخل في الإصدار الأول، ما يؤجل، وما يعتبر نجاحًا عند التسليم حتى تكون حدود المشروع واضحة للطرفين.',1,0,'planned','critical','Product / QA'],
  ['t2','p1','تثبيت حالات العقار والخصوصية والباقات','تعريف حالات العقار، قواعد الظهور العام، صلاحيات المستخدمين وحدود Free / Pro / Group قبل بدء البرمجة.',1,0,'planned','high','Product / Backend'],
  ['t3','p2','نظام التصميم العربي RTL للويب وتطبيق React Native','توحيد الألوان والخطوط والمكونات وحالات الخطأ والتحميل والوضع الليلي بين منصة الويب وتطبيق الهاتف.',2,0,'planned','high','Frontend / Mobile'],
  ['t4','p2','Onboarding وشاشة التهيئة للويب وتطبيق الهاتف','تصميم خطوات البداية التي تشرح المنتج والباقات والمزايا وتساعد المستخدم على تجهيز حسابه لأول استخدام.',2,0,'planned','medium','Frontend / Mobile'],
  ['t5','p3','تهيئة Supabase وRLS وRealtime','إنشاء نموذج البيانات والمصادقة وسياسات الوصول على مستوى الصفوف والتحديثات اللحظية بين لوحة الإدارة والعرض والأجهزة.',2,0,'planned','critical','Backend'],
  ['t6','p4','CRUD العقارات والصور والحالات','تمكين إضافة العقار وعرضه وتعديله وحذفه وإدارة الصور والحالة والظهور من الويب والتطبيق.',3,0,'planned','critical','Backend / Frontend'],
  ['t7','p4','البحث والفلاتر والوسوم والمفضلة','بناء بحث عملي بالعقار مع الفلاتر والوسوم والمفضلة بحيث تعمل التجربة بنفس المنطق على الويب وتطبيق الهاتف.',3,0,'planned','high','Frontend / Mobile'],
  ['t8','p5','ملف الباحث واحتياجاته وميزانيته','حفظ بيانات الباحث ومتطلباته وميزانيته وملاحظاته ليصبح جاهزًا للمطابقة والتنبيه والمتابعة.',4,0,'planned','high','Backend / Product'],
  ['t9','p4','تعدد بيانات المالك وأرقام احتياطية','إضافة حقول مالك وأرقام احتياطية مع منع ظهورها للمشاهد العام واستخدامها فقط داخل الحساب المصرح.',4,0,'planned','medium','Backend'],
  ['t10','p8','إخفاء المالك من العرض العام','التأكد أن العميل المشاهد لا يرى اسم المالك أو رقمه، ويظهر له فقط صاحب الحساب الذي شارك العقار.',4,0,'planned','critical','Backend / QA'],
  ['t11','p6','إنشاء القروب والدعوات والأدوار','إنشاء قروب من 1–10 أعضاء، رابط دعوة، حسابات مستخدمين وأدوار وصلاحيات ومخزون مشترك.',5,0,'planned','high','Backend / Frontend'],
  ['t12','p7','الباقات والحدود وUpgrade Nudge','تطبيق حدود الباقات وإظهار تنبيه ترقية واضح وغير مزعج عندما يصل المستخدم إلى حد الباقة المجانية أو يحتاج ميزة Pro.',6,0,'planned','high','Product / Frontend'],
  ['t13','p7','Add-ons لزيادة الحصص دون تغيير الباقة','تمكين العميل من شراء أفراد أو أرقام أو حصص إضافية داخل باقته الحالية دون إجباره على تغيير الاشتراك بالكامل.',7,0,'planned','medium','Backend'],
  ['t14','p8','رابط مشاركة عام Show / Hide','إضافة مفتاح واضح لإظهار الإعلان أو إخفائه عن الرابط العام مع بقاء السجل محفوظًا داخل الحساب.',7,0,'planned','high','Frontend'],
  ['t15','p9','التنبيهات والبحث المحفوظ Pro','حفظ شروط البحث للباحث وإرسال تنبيه عند ظهور فرصة عقارية مطابقة ضمن مزايا Pro.',8,0,'planned','high','Backend / Mobile'],
  ['t16','p10','محرك المطابقة والقواعد وAI Rerank','حساب توافق الباحث مع العقار بقواعد مفهومة ثم استخدام AI Rerank لترتيب المرشحين مع إظهار سبب التوافق.',9,0,'planned','critical','AI / Backend'],
  ['t17','p11','E2E والأمان والاستجابة والأداء','اختبار الرحلات الرئيسية من البداية للنهاية، الصلاحيات والخصوصية والاستجابة والأداء على الويب وتكامل التطبيق.',10,0,'planned','critical','QA / Backend'],
  ['t18','p11','Release Candidate والتسليم','إصدار نسخة مرشحة للإطلاق، تنفيذ فحص القبول، تسليم المستودع وبيئة الإنتاج والتوثيق التشغيلي.',10,0,'planned','critical','Product / QA'],
  ['t19','p2','تهيئة مشروع React Native وبنية التطبيق','إعداد تطبيق الهاتف الحقيقي بهيكل TypeScript حديث ومكونات أصلية وربطه بنظام التصميم المشترك مع الويب.',2,0,'planned','critical','Mobile'],
  ['t20','p2','تنقل تطبيق الهاتف وDeep Linking','بناء التنقل بين الشاشات ومسارات فتح شاشة محددة من رابط مباشر داخل Android وiOS.',3,0,'planned','high','Mobile'],
  ['t21','p3','مصادقة React Native وربط البيانات مع Supabase','ربط تسجيل الدخول والجلسة وقراءة وكتابة بيانات المستخدم من تطبيق الهاتف مع الالتزام بسياسات RLS.',3,0,'planned','critical','Mobile / Backend'],
  ['t22','p4','شاشات العقارات والباحثين الأساسية في React Native','بناء شاشات الهاتف لإدارة العقارات وعرض التفاصيل والبحث وملفات الباحثين بالوظائف الأساسية المعتمدة.',5,0,'planned','high','Mobile'],
  ['t23','p9','Push Notifications لتطبيق الهاتف','إرسال إشعارات الهاتف للفرص العقارية والتنبيهات المهمة مع فتح الشاشة الصحيحة عند الضغط على الإشعار.',8,0,'planned','high','Mobile / Backend'],
  ['t24','p11','اختبار Android وiOS وتجهيز النسخة المرشحة','اختبار التطبيق على أجهزة Android وiOS فعلية، معالجة اختلافات المنصتين وتجهيز builds مرشحة للإطلاق والتسليم.',10,0,'planned','critical','Mobile / QA'],
]
const tasks = taskRows.map(x=>({id:String(x[0]),project_id:P,phase_id:String(x[1]),title:String(x[2]),description:String(x[3]),week:Number(x[4]),progress:Number(x[5]),status:x[6] as any,priority:x[7] as any,owner_label:String(x[8]),notes:'',is_public:true}))

export const seedData: RoadmapData = {
  project:{id:P,slug:'aqarati-roadmap',name:'عقاراتي',description:'خارطة تنفيذ تفاعلية لمشروع عقاراتي — منصة ويب SaaS لإدارة المشروع وعرض العميل، مع تطبيق هاتف فعلي مبني بـ React Native.',target_weeks:10,max_weeks:12,total_amount:7800,currency:'SAR',overall_progress:0,current_week:0,start_date:null},
  phases,
  tasks,
  milestones:[
    {id:'m1',project_id:P,title:'اعتماد النطاق',week:1,status:'upcoming',acceptance_summary:'اعتماد Scope وBacklog ونموذج البيانات وقواعد الخصوصية قبل بدء التنفيذ.',sort_order:1},
    {id:'m2',project_id:P,title:'Alpha Core',week:5,status:'upcoming',acceptance_summary:'وظائف العقارات والباحثين والقروب الأساسية قابلة للاستعراض على الويب مع أساس تطبيق React Native.',sort_order:2},
    {id:'m3',project_id:P,title:'Billing Beta',week:7,status:'upcoming',acceptance_summary:'الباقات والحدود وAdd-ons والمشاركة الآمنة جاهزة للاختبار المتكامل.',sort_order:3},
    {id:'m4',project_id:P,title:'AI Pro Beta',week:9,status:'upcoming',acceptance_summary:'AI Matching والبحث المحفوظ والتنبيهات تعمل مع تفسير واضح للتوافق.',sort_order:4},
    {id:'m5',project_id:P,title:'Release Candidate',week:10,status:'upcoming',acceptance_summary:'نسخة الويب ونسخة React Native المرشحتان للإطلاق تحققان معايير القبول الأساسية.',sort_order:5},
  ],
  payments:[
    {id:'pay1',project_id:P,sequence:1,percentage:40,amount:3120,trigger_title:'مقدم عند بدء المشروع',trigger_week:1,status:'pending',due_date:null,paid_at:null,notes:'تُستحق عند اعتماد بدء المشروع وتثبيت النطاق.'},
    {id:'pay2',project_id:P,sequence:2,percentage:30,amount:2340,trigger_title:'بعد اعتماد نسخة Alpha',trigger_week:5,status:'pending',due_date:null,paid_at:null,notes:'بعد قبول مخرجات Alpha بنهاية الأسبوع الخامس.'},
    {id:'pay3',project_id:P,sequence:3,percentage:30,amount:2340,trigger_title:'بعد Release Candidate والتسليم النهائي',trigger_week:10,status:'pending',due_date:null,paid_at:null,notes:'بنهاية الأسبوع 10، أو خلال هامش الأسبوعين 11–12 عند استخدامه للاختبارات والقبول.'},
  ],
  deliverables:[
    ['d1','scope','النطاق النهائي وBacklog ونماذج البيانات',false],['d2','scope','نظام التصميم وتجربة RTL للويب وتطبيق React Native',false],
    ['d3','alpha','إضافة وتعديل وبحث العقارات',false],['d4','alpha','ملفات الباحثين وبيانات الملاك والخصوصية',false],['d5','alpha','القروب والدعوات والأدوار الأساسية',false],['d12','alpha','أساس تطبيق React Native والتنقل والمصادقة',false],
    ['d6','rc','الباقات والحدود والإضافات',false],['d7','rc','التنبيهات والبحث المحفوظ وPush Notifications',false],['d8','rc','AI Matching وتفسير درجة التوافق',false],['d9','rc','اختبارات E2E والأمان والاستجابة',false],['d13','rc','نسخة Android وiOS مرشحة للاختبار',false],
    ['d10','final','تسليم الكود والمستودع وبيئة الإنتاج',false],['d11','final','توثيق الإدارة والتشغيل ومعايير القبول',false],
  ].map((x,i)=>({id:String(x[0]),project_id:P,group_key:x[1] as any,title:String(x[2]),is_complete:Boolean(x[3]),sort_order:i+1})),
  updates:[],
}
