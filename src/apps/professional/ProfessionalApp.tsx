import { BadgeCheck, CalendarDays, Mail, Wallet } from 'lucide-react'
import { useRouter } from '@/lib/router'
import { NavBar, type NavTab } from '@/components/phone/NavBar'
import { PhoneFrame } from '@/components/phone/PhoneFrame'
import { PR01 } from './PR01'
import { PR02 } from './PR02'
import { PR03 } from './PR03'
import { PR04 } from './PR04'
import { PR05 } from './PR05'
import { PR06 } from './PR06'
import { PR07 } from './PR07'
import { PR08 } from './PR08'
import { PR09 } from './PR09'
import { PR10 } from './PR10'
import { PR11 } from './PR11'
import { PR12 } from './PR12'

const tabs: NavTab[] = [
  { id: 'pr03', label: 'Offers', icon: Mail },
  { id: 'pr04', label: 'Sessions', icon: CalendarDays },
  { id: 'pr09', label: 'Earnings', icon: Wallet },
  { id: 'pr11', label: 'Profile', icon: BadgeCheck },
]

const withNav = ['pr03', 'pr04', 'pr09', 'pr11']

export function ProfessionalApp({ path }: { path: string }) {
  const { navigate } = useRouter()
  const screen = path.replace('/professional/', '') || 'pr01'
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EFF5F2] p-9">
      <PhoneFrame>
        {screen === 'pr01' && <PR01 />}
        {screen === 'pr02' && <PR02 />}
        {screen === 'pr03' && <PR03 />}
        {screen === 'pr04' && <PR04 />}
        {screen === 'pr05' && <PR05 />}
        {screen === 'pr06' && <PR06 />}
        {screen === 'pr07' && <PR07 />}
        {screen === 'pr08' && <PR08 />}
        {screen === 'pr09' && <PR09 />}
        {screen === 'pr10' && <PR10 />}
        {screen === 'pr11' && <PR11 />}
        {screen === 'pr12' && <PR12 />}
        {withNav.includes(screen) && (
          <NavBar tabs={tabs} active={screen} onSelect={(id) => navigate(`/professional/${id}`)} />
        )}
      </PhoneFrame>
    </div>
  )
}
