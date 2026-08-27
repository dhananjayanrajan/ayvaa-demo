import { RouterProvider, useRouter } from '@/lib/router'
import { DemoProvider } from '@/lib/store'
import { Launcher } from '@/presentation/Launcher'
import { SystemApp } from '@/apps/system/SystemApp'

function Routes() {
  const { path } = useRouter()
  if (path.startsWith('/system')) return <SystemApp path={path} />
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