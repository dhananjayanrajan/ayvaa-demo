import { RouterProvider, useRouter } from '@/lib/router'
import { DemoProvider } from '@/lib/store'
import { FrameworkProvider } from '@/components/base/phone/framework-runtime'
import { Launcher } from '@/presentation/Launcher'
import { SystemApp } from '@/apps/system/SystemApp'
import { PartnerApp } from '@/apps/partner/PartnerApp'
import { AdminApp } from '@/apps/admin/AdminApp'
import { PatientApp } from '@/apps/patient/PatientApp'
import { ProfessionalApp } from '@/apps/professional/ProfessionalApp'

function Routes() {
  const { path } = useRouter()
  if (path.startsWith('/system')) return <SystemApp path={path} />
  if (path.startsWith('/partner')) return <PartnerApp path={path} />
  if (path.startsWith('/admin')) return <AdminApp path={path} />
  if (path.startsWith('/patient')) return <PatientApp path={path} />
  if (path.startsWith('/professional')) return <ProfessionalApp path={path} />
  return <Launcher />
}

export default function App() {
  return (
    <RouterProvider>
      <DemoProvider>
        <FrameworkProvider>
          <Routes />
        </FrameworkProvider>
      </DemoProvider>
    </RouterProvider>
  )
}
