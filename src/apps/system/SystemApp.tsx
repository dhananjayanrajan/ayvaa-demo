import { Activity, BellRing, Workflow } from 'lucide-react'
import { PhoneFrame, StatusBar } from '@/components/phone/PhoneFrame'
import { NavBar } from '@/components/phone/NavBar'
import { useRouter } from '@/lib/router'
import { S01 } from './S01'
import { S02 } from './S02'
import { S03 } from './S03'

const tabs = [
  { id: 's01', label: 'Trail', icon: Activity },
  { id: 's02', label: 'Dispatch', icon: Workflow },
  { id: 's03', label: 'Alerts', icon: BellRing },
]

export function SystemApp({ path }: { path: string }) {
  const { navigate } = useRouter()
  const screen = path.replace('/system/', '') || 's01'
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EFF5F2] p-9">
      <PhoneFrame>
        <StatusBar time="2:02" />
        {screen === 's01' && <S01 />}
        {screen === 's02' && <S02 />}
        {screen === 's03' && <S03 />}
        <NavBar tabs={tabs} active={screen} onSelect={(id) => navigate(`/system/${id}`)} />
      </PhoneFrame>
    </div>
  )
}