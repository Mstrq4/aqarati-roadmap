import { Navigate,useLocation } from 'react-router-dom'
import { useAdminSession } from './useAdminSession'
export function ProtectedRoute({children}:{children:React.ReactNode}){const {session,loading}=useAdminSession();const loc=useLocation();if(loading)return <div className="grid min-h-[60vh] place-items-center text-muted-foreground">جارٍ التحقق من الجلسة…</div>;if(!session)return <Navigate to="/login" replace state={{from:loc.pathname}}/>;return <>{children}</>}
