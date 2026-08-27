import { BarChart3, LayoutDashboard, ShieldCheck, Ticket, Users } from 'lucide-react'
import { PhoneFrame, StatusBar } from '@/components/phone/PhoneFrame'
import { NavBar, type NavTab } from '@/components/phone/NavBar'
import { A01 } from './A01'
import { A02 } from './A02'
import { A03 } from './A03'
import { A04 } from './A04'
import { A05 } from './A05'
import { A06 } from './A06'
import { A07 } from './A07'
import { A08 } from './A08'
import { A09 } from './A09'

const tabs: NavTab[] = [
  { id: 'a01', label: 'Console', icon: LayoutDashboard },
  { id: 'a04', label: 'Users', icon: Users },
  { id: 'a05', label: 'Compliance', icon: ShieldCheck },
  { id: 'a08', label: 'Tickets', icon: Ticket },
  { id: 'a09', label: 'Analytics', icon: BarChart3 },
]

const withNav = ['a01', 'a04', 'a05', 'a08', 'a09']

export function AdminApp({ path }: { path: string }) {
  const screen = path.replace('/admin/', '')
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EFF5F2] p-9">
      <PhoneFrame>
        <StatusBar time="9:02" />
        {screen === 'a01' && <A01 />}
        {screen === 'a02' && <A02 />}
        {screen === 'a03' && <A03 />}
        {screen === 'a04' && <A04 />}
        {screen === 'a05' && <A05 />}
        {screen === 'a06' && <A06 />}
        {screen === 'a07' && <A07 />}
        {screen === 'a08' && <A08 />}
        {screen === 'a09' && <A09 />}
        {withNav.includes(screen) && (
          <NavBar tabs={tabs} active={screen} onSelect={(id) => (window.location.hash = `/admin/${id}`)} />
        )}
      </PhoneFrame>
    </div>
  )
}