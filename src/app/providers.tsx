import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type PropsWithChildren } from 'react'
import { useRoadmapRealtime } from '@/features/realtime/useRoadmapRealtime'
import { ToastProvider } from '@/components/feedback/ToastProvider'

function RealtimeBridge({children}:{children:React.ReactNode}){useRoadmapRealtime();return <>{children}</>}

export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient({defaultOptions:{queries:{staleTime:20_000,refetchOnWindowFocus:true,retry:1},mutations:{retry:0}}}))
  return <QueryClientProvider client={queryClient}><ToastProvider><RealtimeBridge>{children}</RealtimeBridge></ToastProvider></QueryClientProvider>
}
