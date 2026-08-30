# عقاراتي — خارطة التنفيذ

واجهة React عربية RTL لعرض الخطة الزمنية لمشروع عقاراتي للعميل، مع لوحة إدارة محمية بواسطة Supabase Auth وRLS عند ربط متغيرات البيئة.

## التشغيل

```bash
npm install
npm run dev
```

## النشر

- GitHub: `Mstrq4/aqarati-roadmap`
- Vercel: استخدم `main`
- Supabase: طبّق ملفات `supabase/migrations/` ثم أضف `VITE_SUPABASE_URL` و`VITE_SUPABASE_PUBLISHABLE_KEY`.

## التحقق

كل Push إلى `main` يشغّل GitHub Actions لاختبار المنطق وبناء نسخة الإنتاج.

الخطة: 10 أسابيع تنفيذ + أسبوعان UAT/قبول كحد أقصى. القيمة: 7,800 SAR موزعة 40% / 30% / 30%.
