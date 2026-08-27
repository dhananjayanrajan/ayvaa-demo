import { CalendarDays, HeartPulse, Home, LifeBuoy, User } from 'lucide-react'
import { useRouter } from '@/lib/router'
import { NavBar, type NavTab } from '@/components/phone/NavBar'
import { PhoneFrame } from '@/components/phone/PhoneFrame'
import { P01 } from './P01'
import { P02 } from './P02'
import { P03 } from './P03'
import { P04 } from './P04'
import { P05 } from './P05'
import { P06 } from './P06'
import { P07 } from './P07'
import { P08 } from './P08'
import { P09 } from './P09'
import { P10 } from './P10'
import { P11 } from './P11'
import { P12 } from './P12'
import { P13 } from './P13'
import { P14 } from './P14'
import { P15 } from './P15'
import { P16 } from './P16'
import { P17 } from './P17'
import { P18 } from './P18'
import { P19 } from './P19'
import { P20 } from './P20'
import { P21 } from './P21'
import { P22 } from './P22'
import { P23 } from './P23'
import { P24 } from './P24'
import { P25 } from './P25'
import { P26 } from './P26'
import { P27 } from './P27'
import { P28 } from './P28'
import { P29 } from './P29'
import { P30 } from './P30'
import { P31 } from './P31'
import { P31b } from './P31b'
import { P32 } from './P32'
import { P33 } from './P33'
import { P34 } from './P34'

const patientTabs: NavTab[] = [
  { id: 'p06', label: 'Home', icon: Home },
  { id: 'p15', label: 'Visits', icon: CalendarDays },
  { id: 'p21', label: 'Records', icon: HeartPulse },
  { id: 'p25', label: 'Support', icon: LifeBuoy },
  { id: 'p28', label: 'Profile', icon: User },
]

const withNav = ['p06', 'p15', 'p21', 'p25', 'p28']

export function PatientApp({ path }: { path: string }) {
  const { navigate } = useRouter()
  const screen = path.replace('/patient/', '') || 'p01'
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EFF5F2] p-9">
      <PhoneFrame>
        {screen === 'p01' && <P01 />}
        {screen === 'p02' && <P02 />}
        {screen === 'p03' && <P03 />}
        {screen === 'p04' && <P04 />}
        {screen === 'p05' && <P05 />}
        {screen === 'p06' && <P06 />}
        {screen === 'p07' && <P07 />}
        {screen === 'p08' && <P08 />}
        {screen === 'p09' && <P09 />}
        {screen === 'p10' && <P10 />}
        {screen === 'p11' && <P11 />}
        {screen === 'p12' && <P12 />}
        {screen === 'p13' && <P13 />}
        {screen === 'p14' && <P14 />}
        {screen === 'p15' && <P15 />}
        {screen === 'p16' && <P16 />}
        {screen === 'p17' && <P17 />}
        {screen === 'p18' && <P18 />}
        {screen === 'p19' && <P19 />}
        {screen === 'p20' && <P20 />}
        {screen === 'p21' && <P21 />}
        {screen === 'p22' && <P22 />}
        {screen === 'p23' && <P23 />}
        {screen === 'p24' && <P24 />}
        {screen === 'p25' && <P25 />}
        {screen === 'p26' && <P26 />}
        {screen === 'p27' && <P27 />}
        {screen === 'p28' && <P28 />}
        {screen === 'p29' && <P29 />}
        {screen === 'p30' && <P30 />}
        {screen === 'p31' && <P31 />}
        {screen === 'p31b' && <P31b />}
        {screen === 'p32' && <P32 />}
        {screen === 'p33' && <P33 />}
        {screen === 'p34' && <P34 />}
        {withNav.includes(screen) && (
          <NavBar tabs={patientTabs} active={screen} onSelect={(id) => navigate(`/patient/${id}`)} />
        )}
      </PhoneFrame>
    </div>
  )
}
