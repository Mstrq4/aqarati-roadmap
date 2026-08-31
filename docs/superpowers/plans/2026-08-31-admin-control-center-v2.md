# Aqarati Admin Control Center V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** إعادة بناء لوحة الإدارة لتصبح فورية وقابلة للإدارة الكاملة، وتصحيح الخطة لتطبيق React Native فعلي، وإضافة شرح ذاتي للمصطلحات التقنية.

**Architecture:** يبقى Supabase مصدر الحقيقة. تنفذ واجهة React Optimistic Updates على TanStack Query مع rollback وإشعارات، بينما يتولى PostgreSQL فرض قواعد التقدم وحساب تقدم المراحل والمشروع. تُعرض المصطلحات عبر قاموس مركزي ومكون InfoPopover قابل للوصول. الويب هو SaaS/لوحة الإدارة والعرض العام، وتطبيق الهاتف مسار React Native مستقل في الخطة.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind, TanStack Query, Supabase Auth/Postgres/Realtime, Lucide, React Native (ضمن خطة المنتج وليس هذا مستودع تطبيق الهاتف).

**Spec:** `docs/superpowers/specs/2026-08-31-admin-control-center-redesign-design.md` + `docs/superpowers/specs/2026-08-31-native-app-roadmap-glossary-addendum.md`

## Global Constraints

- RTL عربي أولًا وخط Thmanyah Serif Display.
- لا يوصف تطبيق الهاتف بأنه PWA؛ التطبيق React Native فعلي.
- مخططة 0%، قيد التنفيذ 0–79%، مراجعة 80%، مكتملة 100%، متوقفة تحتفظ بنسبة التقدم.
- كل عملية تعديل تُرى فورًا محليًا، وتُراجع نهائيًا من Supabase.
- CRUD الإداري يخضع لـRLS الحالية.
- سطح المكتب: Sidebar/Header ثابتان؛ المحتوى وحده يمرر.
- الجوال: لا تمرير أفقي إجباري للخطة أو التنقل.
- المصطلحات التقنية تحمل شرحًا عربيًا يمكن فتحه باللمس ولوحة المفاتيح.

---

### Task 1: Progress rules + optimistic mutation infrastructure

**Files:**
- Create: `src/features/roadmap/roadmap.progress.ts`
- Create: `src/components/feedback/ToastProvider.tsx`
- Modify: `src/app/providers.tsx`
- Modify: `src/features/roadmap/roadmap.mutations.ts`
- Create: `tests/node/admin-v2-contract.test.mjs`

**Interfaces:**
- Produces: `normalizeTaskPatch(current, patch)` and toast API `useToast()`.
- Mutations update `roadmapKeys.project('aqarati-roadmap')` cache in `onMutate`, rollback on error, invalidate on settled.

- [ ] Write contract tests for status/progress rules and optimistic hooks.
- [ ] Verify tests fail against current code.
- [ ] Implement progress normalizer and ToastProvider.
- [ ] Convert mutations to optimistic mutations with success/error messages.
- [ ] Run node tests and TypeScript build.

### Task 2: Full CRUD data API + database enforcement

**Files:**
- Modify: `src/features/roadmap/roadmap.api.ts`
- Create: `supabase/migrations/20260831021000_admin_v2_progress_and_crud.sql`
- Modify: `src/features/roadmap/roadmap.types.ts`

**Interfaces:**
- Produces create/update/delete functions for tasks, phases, payments, milestones, deliverables, updates.
- Database trigger enforces progress rules before insert/update.

- [ ] Add failing contract assertions for CRUD exports and migration trigger.
- [ ] Implement CRUD functions.
- [ ] Add PostgreSQL trigger enforcing status/progress invariants.
- [ ] Verify RLS-admin policies cover insert/update/delete.
- [ ] Run CI checks.

### Task 3: React Native roadmap correction + detailed timeline content

**Files:**
- Modify: `src/features/roadmap/seed.ts`
- Create: `supabase/migrations/20260831022000_native_app_roadmap_copy.sql`

**Interfaces:**
- Produces corrected phase/task copy in fallback data and production DB.

- [ ] Replace `SaaS/PWA` with separate Web SaaS + React Native wording.
- [ ] Add React Native tasks: foundation, navigation/deep linking, auth/data, push notifications, Android/iOS QA, release builds.
- [ ] Replace generic task descriptions with client-friendly detailed descriptions.
- [ ] Add Mobile owner labels where applicable.
- [ ] Verify target remains 10 weeks with maximum 12.

### Task 4: Glossary and self-explaining terminology

**Files:**
- Create: `src/features/glossary/glossary.ts`
- Create: `src/components/glossary/TermInfo.tsx`
- Create: `src/components/glossary/GlossaryText.tsx`
- Create: `src/components/glossary/GlossaryPanel.tsx`
- Modify: public/admin timeline and task pages.

**Interfaces:**
- `GlossaryText({text})` renders text plus Info buttons for detected terms.
- `TermInfo` uses button + non-modal explanatory popover, not hover-only tooltip.

- [ ] Add glossary contract tests for React Native, RLS, Realtime, CRUD, Deep Linking, Push Notifications, AI Matching, Release Candidate, E2E.
- [ ] Implement accessible info button and Escape/outside-close behavior.
- [ ] Add full glossary panel to timeline pages.
- [ ] Verify touch targets and no hover dependency.

### Task 5: Admin shell + dashboard density

**Files:**
- Modify: `src/components/app-shell/AdminShell.tsx`
- Modify: `src/pages/admin/AdminDashboardPage.tsx`
- Modify: `src/styles/globals.css`

- [ ] Make desktop shell `h-screen`, fixed/sticky navigation areas, scroll only main content.
- [ ] Replace mobile horizontal admin navigation with compact wrap/menu behavior.
- [ ] Render 4 KPI cards on wide screens and 2/1 responsively.
- [ ] Add operational KPIs: blocked tasks, due payments, deliverables, milestones.

### Task 6: Tasks and timeline CRUD UX

**Files:**
- Create: `src/components/admin/EntityDialog.tsx`
- Create: `src/components/admin/ConfirmDialog.tsx`
- Modify: `src/pages/admin/AdminTasksPage.tsx`
- Modify: `src/pages/admin/AdminTimelinePage.tsx`

- [ ] Cards/Table view switch for tasks.
- [ ] Add/edit/delete task dialogs with status-driven progress editor.
- [ ] Add/edit/delete phases; phase progress/status remain derived and read-only.
- [ ] Compact 1/2/3/4-card responsive grids.
- [ ] Keep Gantt/timeline visualization as secondary read-only view.

### Task 7: Payments + deliverables/milestones control center

**Files:**
- Modify: `src/pages/admin/AdminPaymentsPage.tsx`
- Modify: `src/pages/admin/AdminDeliverablesPage.tsx`

- [ ] Payments KPI strip: contract, paid, remaining, due.
- [ ] Add/edit/delete payments including amount, percent, trigger, week, dates, notes, status.
- [ ] Deliverables/Milestones top-level tabs.
- [ ] CRUD on both types; deliverables retain group tabs scope/alpha/rc/final.

### Task 8: Site icon, acceptance tests, merge

**Files:**
- Create: `public/aqarati-mark.svg`
- Modify: `index.html`
- Modify: `tests/node/admin-v2-contract.test.mjs`

- [ ] Create simple SVG mark combining property outline + progress/check motif in existing brand colors.
- [ ] Add favicon link.
- [ ] Run node tests and production build in GitHub Actions.
- [ ] Open PR, review changed files, merge only after green CI.
- [ ] Verify Vercel production deploy comes from merged `main`.
