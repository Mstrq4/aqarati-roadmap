export interface GlossaryEntry { term:string; title:string; description:string; aliases:string[] }

export const glossaryEntries:GlossaryEntry[]=[
  {term:'React Native',title:'تطبيق الهاتف الأصلي',description:'إطار لبناء تطبيقات Android وiOS باستخدام React، مع واجهات تُرسم إلى مكونات المنصة الأصلية بدل تشغيل التطبيق كصفحة ويب.',aliases:['React Native']},
  {term:'SaaS',title:'منصة برمجية عبر الإنترنت',description:'خدمة تُستخدم من المتصفح وتُدار مركزيًا دون الحاجة إلى تثبيت برنامج مكتبي منفصل.',aliases:['SaaS']},
  {term:'RTL',title:'واجهة عربية من اليمين إلى اليسار',description:'تنسيق يجعل اتجاه النصوص والقوائم والعناصر مناسبًا للغة العربية.',aliases:['RTL']},
  {term:'Onboarding',title:'التهيئة الأولى للمستخدم',description:'الخطوات التي تعرّف المستخدم بالنظام والباقات والمزايا وتساعده على تجهيز حسابه عند أول استخدام.',aliases:['Onboarding']},
  {term:'Supabase',title:'الخلفية وقاعدة البيانات',description:'الخدمة المستخدمة لحفظ البيانات وتسجيل الدخول والصلاحيات والتحديثات اللحظية بين الأجهزة.',aliases:['Supabase']},
  {term:'RLS',title:'صلاحيات على مستوى السجل',description:'سياسات داخل قاعدة البيانات تحدد بدقة من يستطيع قراءة أو تعديل كل سجل، حتى لو وصل الطلب مباشرة إلى قاعدة البيانات.',aliases:['RLS']},
  {term:'Realtime',title:'تحديث لحظي',description:'إرسال التغييرات إلى الشاشات المفتوحة فور حدوثها دون الحاجة إلى تحديث الصفحة يدويًا.',aliases:['Realtime']},
  {term:'CRUD',title:'إدارة البيانات الأساسية',description:'اختصار لعمليات إنشاء السجل وقراءته وتعديله وحذفه.',aliases:['CRUD']},
  {term:'Deep Linking',title:'رابط يفتح شاشة داخل التطبيق',description:'رابط مباشر يمكنه فتح شاشة محددة داخل تطبيق الهاتف بدل فتح الصفحة الرئيسية فقط.',aliases:['Deep Linking']},
  {term:'Push Notifications',title:'إشعارات الهاتف',description:'تنبيهات تصل إلى جهاز المستخدم حتى عندما لا تكون شاشة التطبيق مفتوحة.',aliases:['Push Notifications']},
  {term:'Saved Search',title:'بحث محفوظ',description:'حفظ شروط بحث الباحث لاستخدامها لاحقًا أو لإرسال تنبيه عند ظهور عقار يطابقها.',aliases:['Saved Search']},
  {term:'AI Matching',title:'المطابقة الذكية',description:'مقارنة احتياجات الباحث بخصائص العقار لإنتاج درجة توافق وشرح مبسط لسبب المطابقة.',aliases:['AI Matching']},
  {term:'AI Rerank',title:'إعادة ترتيب النتائج بالذكاء الاصطناعي',description:'إعادة ترتيب النتائج المرشحة بعد البحث لإبراز العناصر الأكثر ملاءمة للباحث.',aliases:['AI Rerank']},
  {term:'Alpha',title:'نسخة مبكرة للاختبار',description:'مرحلة مبكرة تركز على التأكد من أن الوظائف الأساسية تعمل قبل توسيع الاختبار.',aliases:['Alpha']},
  {term:'Beta',title:'نسخة اختبار أوسع',description:'نسخة أقرب للاكتمال تُستخدم لاختبار نطاق أكبر من الوظائف والتكاملات قبل الإصدار النهائي.',aliases:['Beta']},
  {term:'Release Candidate',title:'نسخة مرشحة للإطلاق',description:'نسخة يُفترض أنها مكتملة وظيفيًا، ويمنع إطلاقها فقط وجود مشكلة تظهر أثناء الاختبارات أو القبول.',aliases:['Release Candidate']},
  {term:'E2E',title:'اختبار الرحلة كاملة',description:'اختبار سيناريو كامل من أول خطوة يقوم بها المستخدم إلى النتيجة النهائية عبر الواجهة والخلفية وقاعدة البيانات.',aliases:['E2E']},
  {term:'Add-ons',title:'إضافات على الباقة',description:'حصص أو مزايا إضافية يمكن شراؤها دون الحاجة إلى تغيير الباقة الأساسية بالكامل.',aliases:['Add-ons']},
  {term:'Upgrade Nudge',title:'تنبيه اقتراح الترقية',description:'رسالة غير مزعجة تظهر عندما يصل المستخدم إلى حد الباقة أو يحتاج ميزة أعلى وتقترح عليه الترقية.',aliases:['Upgrade Nudge']},
  {term:'Backlog',title:'قائمة العمل المعتمدة',description:'قائمة مرتبة بالميزات والمهام المطلوب تنفيذها خلال المشروع.',aliases:['Backlog']},
  {term:'Scope',title:'نطاق المشروع',description:'الحدود المتفق عليها لما سيتم تنفيذه في هذا الإصدار وما يقع خارجه.',aliases:['Scope']},
]

export function findGlossaryTerms(text:string){
  const normalized=text.toLocaleLowerCase('en')
  return glossaryEntries.filter(entry=>entry.aliases.some(alias=>normalized.includes(alias.toLocaleLowerCase('en'))))
}

export function getGlossaryEntry(term:string){return glossaryEntries.find(entry=>entry.term===term)}
