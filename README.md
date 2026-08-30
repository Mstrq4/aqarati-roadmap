# عقاراتي — خارطة التنفيذ

تطبيق React/TypeScript عربي RTL متعدد الصفحات لعرض خارطة تنفيذ مشروع عقاراتي للعميل وإدارة التقدم من لوحة خاصة.

## البنية

- `src/pages/public/`: صفحات العميل: الملخص، الخطة الزمنية، المهام، الدفعات، التسليمات، التحديثات.
- `src/pages/admin/`: صفحات الإدارة المنفصلة.
- `src/components/`: مكونات العرض المشتركة مثل Shell وKPI وGantt والجداول.
- `src/features/roadmap/`: الوصول إلى البيانات، React Query، mutations وseed fallback.
- `src/features/auth/`: حماية مسارات الإدارة والجلسة.
- `src/features/realtime/`: تحديث بيانات العميل عبر Supabase Realtime.
- `supabase/migrations/`: Schema + RLS + Seed.

## التشغيل

```bash
npm install
npm run dev
```

## التحقق

```bash
npm run test:node
npm run build
```

## Supabase

طبّق migrations بالترتيب، ثم أضف:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

بدون هذه المتغيرات يعمل التطبيق في وضع معاينة محلي باستخدام Seed/LocalStorage، بينما تسجيل دخول الإدارة يتطلب Supabase.

## Vercel

الـSPA rewrites موجودة في `vercel.json`. فرع الإنتاج هو `main`.

الخطة: 10 أسابيع تنفيذ + أسبوعان UAT/قبول كحد أقصى. القيمة: 7,800 SAR موزعة 40% / 30% / 30%.
