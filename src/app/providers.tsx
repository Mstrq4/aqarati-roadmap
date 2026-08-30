import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type PropsWithChildren } from 'react'
import { useRoadmapRealtime } from '@/features/realtime/useRoadmapRealtime'
function RealtimeBridge({children}:{children:React.ReactNode}){useRoadmapRealtime();return <>{children}</>}
export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient({defaultOptions:{queries:{staleTime:20_000,refetchOnWindowFocus:true,retry:1},mutations:{retry:0}}}))
  return <QueryClientProvider client={queryClient}><RealtimeBridge>{children}</RealtimeBridge></QueryClientProvider>
}
