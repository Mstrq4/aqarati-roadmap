import { createBrowserRouter } from 'react-router-dom'
import { PublicShell } from '@/components/app-shell/PublicShell'
import { AdminShell } from '@/components/app-shell/AdminShell'
import { ProtectedRoute } from '@/features/auth/ProtectedRoute'
import DashboardPage from '@/pages/public/DashboardPage'
import TimelinePage from '@/pages/public/TimelinePage'
import TasksPage from '@/pages/public/TasksPage'
import PaymentsPage from '@/pages/public/PaymentsPage'
import DeliverablesPage from '@/pages/public/DeliverablesPage'
import UpdatesPage from '@/pages/public/UpdatesPage'
import LoginPage from '@/pages/auth/LoginPage'
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'
import AdminTasksPage from '@/pages/admin/AdminTasksPage'
import AdminTimelinePage from '@/pages/admin/AdminTimelinePage'
import AdminPaymentsPage from '@/pages/admin/AdminPaymentsPage'
import AdminUpdatesPage from '@/pages/admin/AdminUpdatesPage'
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage'

export const router=createBrowserRouter([
 {element:<PublicShell/>,children:[{index:true,element:<DashboardPage/>},{path:'timeline',element:<TimelinePage/>},{path:'tasks',element:<TasksPage/>},{path:'payments',element:<PaymentsPage/>},{path:'deliverables',element:<DeliverablesPage/>},{path:'updates',element:<UpdatesPage/>}]},
 {path:'login',element:<LoginPage/>},
 {path:'admin',element:<ProtectedRoute><AdminShell/></ProtectedRoute>,children:[{index:true,element:<AdminDashboardPage/>},{path:'tasks',element:<AdminTasksPage/>},{path:'timeline',element:<AdminTimelinePage/>},{path:'payments',element:<AdminPaymentsPage/>},{path:'updates',element:<AdminUpdatesPage/>},{path:'settings',element:<AdminSettingsPage/>}]},
 {path:'*',element:<div className="page-shell py-20"><h1 className="text-4xl font-black">الصفحة غير موجودة</h1><a href="/" className="mt-4 inline-block text-primary underline">العودة للرئيسية</a></div>}
])
