import { Building2, ReceiptText, UserPlus, Users } from 'lucide-react'
import { useRouter } from '@/lib/router'
import { NavBar, type NavTab } from '@/components/phone/NavBar'
import { PhoneFrame } from '@/components/phone/PhoneFrame'
import { PT01 } from './PT01'
import { PT02 } from './PT02'
import { PT03 } from './PT03'
import { PT04 } from './PT04'
import { PT05 } from './PT05'
import { PT06 } from './PT06'
import { PT07 } from './PT07'

const tabs: NavTab[] = [
  { id: 'pt02', label: 'Hub', icon: Building2 },
  { id: 'pt03', label: 'Referrals', icon: UserPlus },
  { id: 'pt05', label: 'Staff', icon: Users },
  { id: 'pt07', label: 'Billing', icon: ReceiptText },
]

const withNav = ['pt02', 'pt03', 'pt05', 'pt07']

export function PartnerApp({ path }: { path: string }) {
  const { navigate } = useRouter()
  const screen = path.replace('/partner/', '')
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EFF5F2] p-9">
      <PhoneFrame>
        {screen === 'pt01' && <PT01 />}
        {screen === 'pt02' && <PT02 />}
        {screen === 'pt03' && <PT03 />}
        {screen === 'pt04' && <PT04 />}
        {screen === 'pt05' && <PT05 />}
        {screen === 'pt06' && <PT06 />}
        {screen === 'pt07' && <PT07 />}
        {withNav.includes(screen) && (
          <NavBar tabs={tabs} active={screen} onSelect={(id) => navigate(`/partner/${id}`)} />
        )}
      </PhoneFrame>
    </div>
  )
}
