update public.projects
set description='خارطة تنفيذ تفاعلية لمشروع عقاراتي — منصة ويب SaaS لإدارة المشروع وعرض العميل، مع تطبيق هاتف فعلي مبني بـ React Native.'
where slug='aqarati-roadmap';

update public.phases set
  name='تجربة الويب وتطبيق React Native',
  description='نظام تصميم عربي RTL، منصة الويب SaaS، وتجربة تطبيق الهاتف الأصلي على Android وiOS.'
where id='20000000-0000-4000-8000-000000000002';

update public.phases set description='Supabase، المصادقة، RLS، Realtime، ربط تطبيق React Native، النشر والمراقبة وسياسات الخصوصية.' where id='20000000-0000-4000-8000-000000000003';
update public.phases set description='العقارات والصور والحالات والبحث والوسوم والمفضلة وبيانات الملاك الاحتياطية عبر الويب وتطبيق الهاتف.' where id='20000000-0000-4000-8000-000000000004';
update public.phases set description='Saved Search وتنبيهات فرص الباحثين Pro وPush Notifications على تطبيق الهاتف.' where id='20000000-0000-4000-8000-000000000009';
update public.phases set description='اختبارات E2E والأمان والأداء، اختبار Android وiOS، Release Candidate والتسليم النهائي.' where id='20000000-0000-4000-8000-000000000011';

update public.tasks set title='نظام التصميم العربي RTL للويب وتطبيق React Native', description='توحيد الألوان والخطوط والمكونات وحالات الخطأ والتحميل والوضع الليلي بين منصة الويب وتطبيق الهاتف.', owner_label='Frontend / Mobile' where title='Design System عربي RTL والوضع الليلي';
update public.tasks set title='Onboarding وشاشة التهيئة للويب وتطبيق الهاتف', description='تصميم خطوات البداية التي تشرح المنتج والباقات والمزايا وتساعد المستخدم على تجهيز حسابه لأول استخدام.', owner_label='Frontend / Mobile' where title='Onboarding وشاشة التهيئة';
update public.tasks set description='إنشاء نموذج البيانات والمصادقة وسياسات الوصول على مستوى الصفوف والتحديثات اللحظية بين لوحة الإدارة والعرض والأجهزة.', owner_label='Backend' where title='تهيئة Supabase وRLS وRealtime';
update public.tasks set description='تمكين إضافة العقار وعرضه وتعديله وحذفه وإدارة الصور والحالة والظهور من الويب والتطبيق.', owner_label='Backend / Frontend' where title='CRUD العقارات والصور والحالات';
update public.tasks set description='بناء بحث عملي بالعقار مع الفلاتر والوسوم والمفضلة بحيث تعمل التجربة بنفس المنطق على الويب وتطبيق الهاتف.', owner_label='Frontend / Mobile' where title='البحث والفلاتر والوسوم والمفضلة';
update public.tasks set description='حفظ بيانات الباحث ومتطلباته وميزانيته وملاحظاته ليصبح جاهزًا للمطابقة والتنبيه والمتابعة.', owner_label='Backend / Product' where title='ملف الباحث واحتياجاته وميزانيته';
update public.tasks set description='تطبيق حدود الباقات وإظهار تنبيه ترقية واضح وغير مزعج عندما يصل المستخدم إلى حد الباقة المجانية أو يحتاج ميزة Pro.', owner_label='Product / Frontend' where title='الباقات والحدود وUpgrade Nudge';
update public.tasks set description='حفظ شروط البحث للباحث وإرسال تنبيه عند ظهور فرصة عقارية مطابقة ضمن مزايا Pro.', owner_label='Backend / Mobile' where title='التنبيهات والبحث المحفوظ Pro';
update public.tasks set description='حساب توافق الباحث مع العقار بقواعد مفهومة ثم استخدام AI Rerank لترتيب المرشحين مع إظهار سبب التوافق.', owner_label='AI / Backend' where title='محرك المطابقة والقواعد وAI Rerank';
update public.tasks set description='اختبار الرحلات الرئيسية من البداية للنهاية، الصلاحيات والخصوصية والاستجابة والأداء على الويب وتكامل التطبيق.', owner_label='QA / Backend' where title='E2E والأمان والاستجابة والأداء';
update public.tasks set description='إصدار نسخة مرشحة للإطلاق، تنفيذ فحص القبول، تسليم المستودع وبيئة الإنتاج والتوثيق التشغيلي.', owner_label='Product / QA' where title='Release Candidate والتسليم';

insert into public.tasks (id,project_id,phase_id,title,description,week,progress,status,priority,owner_label,notes,is_public) values
('30000000-0000-4000-8000-000000000019','11111111-1111-4111-8111-111111111111','20000000-0000-4000-8000-000000000002','تهيئة مشروع React Native وبنية التطبيق','إعداد تطبيق الهاتف الحقيقي بهيكل TypeScript حديث ومكونات أصلية وربطه بنظام التصميم المشترك مع الويب.',2,0,'planned','critical','Mobile','',true),
('30000000-0000-4000-8000-000000000020','11111111-1111-4111-8111-111111111111','20000000-0000-4000-8000-000000000002','تنقل تطبيق الهاتف وDeep Linking','بناء التنقل بين الشاشات ومسارات فتح شاشة محددة من رابط مباشر داخل Android وiOS.',3,0,'planned','high','Mobile','',true),
('30000000-0000-4000-8000-000000000021','11111111-1111-4111-8111-111111111111','20000000-0000-4000-8000-000000000003','مصادقة React Native وربط البيانات مع Supabase','ربط تسجيل الدخول والجلسة وقراءة وكتابة بيانات المستخدم من تطبيق الهاتف مع الالتزام بسياسات RLS.',3,0,'planned','critical','Mobile / Backend','',true),
('30000000-0000-4000-8000-000000000022','11111111-1111-4111-8111-111111111111','20000000-0000-4000-8000-000000000004','شاشات العقارات والباحثين الأساسية في React Native','بناء شاشات الهاتف لإدارة العقارات وعرض التفاصيل والبحث وملفات الباحثين بالوظائف الأساسية المعتمدة.',5,0,'planned','high','Mobile','',true),
('30000000-0000-4000-8000-000000000023','11111111-1111-4111-8111-111111111111','20000000-0000-4000-8000-000000000009','Push Notifications لتطبيق الهاتف','إرسال إشعارات الهاتف للفرص العقارية والتنبيهات المهمة مع فتح الشاشة الصحيحة عند الضغط على الإشعار.',8,0,'planned','high','Mobile / Backend','',true),
('30000000-0000-4000-8000-000000000024','11111111-1111-4111-8111-111111111111','20000000-0000-4000-8000-000000000011','اختبار Android وiOS وتجهيز النسخة المرشحة','اختبار التطبيق على أجهزة Android وiOS فعلية، معالجة اختلافات المنصتين وتجهيز builds مرشحة للإطلاق والتسليم.',10,0,'planned','critical','Mobile / QA','',true)
on conflict (id) do update set title=excluded.title,description=excluded.description,week=excluded.week,priority=excluded.priority,owner_label=excluded.owner_label,is_public=excluded.is_public;

update public.milestones set acceptance_summary='وظائف العقارات والباحثين والقروب الأساسية قابلة للاستعراض على الويب مع أساس تطبيق React Native.' where title='Alpha Core';
update public.milestones set acceptance_summary='نسخة الويب ونسخة React Native المرشحتان للإطلاق تحققان معايير القبول الأساسية.' where title='Release Candidate';

insert into public.deliverables (id,project_id,group_key,title,is_complete,sort_order) values
('40000000-0000-4000-8000-000000000012','11111111-1111-4111-8111-111111111111','alpha','أساس تطبيق React Native والتنقل والمصادقة',false,6),
('40000000-0000-4000-8000-000000000013','11111111-1111-4111-8111-111111111111','rc','نسخة Android وiOS مرشحة للاختبار',false,12)
on conflict (id) do update set title=excluded.title,group_key=excluded.group_key,sort_order=excluded.sort_order;
