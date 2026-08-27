import { RouterProvider, useRouter } from '@/lib/router'
import { DemoProvider } from '@/lib/store'
import { Launcher } from '@/presentation/Launcher'
import { SystemApp } from '@/apps/system/SystemApp'
import { PartnerApp } from '@/apps/partner/PartnerApp'
import { AdminApp } from '@/apps/admin/AdminApp'

function Routes() {
  const { path } = useRouter()
  if (path.startsWith('/system')) return <SystemApp path={path} />
  if (path.startsWith('/partner')) return <PartnerApp path={path} />
  if (path.startsWith('/admin')) return <AdminApp path={path} />
  return <Launcher />
}

export default function App() {
  return (
    <RouterProvider>
      <DemoProvider>
        <Routes />
      </DemoProvider>
    </RouterProvider>
  )
}