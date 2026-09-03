import { useEffect, useRef } from 'react'
import { useRouter } from '@/lib/router'
import { AdminShell } from '@/components/admin/shells/AdminShell'
import { A01 } from './A01'
import { A02 } from './A02'
import { A03 } from './A03'
import { A04 } from './A04'
import { A05 } from './A05'
import { A06 } from './A06'
import { A07 } from './A07'
import { A08 } from './A08'
import { A09 } from './A09'
import { A10 } from './A10'
import { A11 } from './A11'
import { A12 } from './A12'
import { A13 } from './A13'
import { A14 } from './A14'
import { A15 } from './A15'
import { A16 } from './A16'
import { A17 } from './A17'
import { A18 } from './A18'

export function AdminApp({ path }: { path: string }) {
  const { navigate } = useRouter()
  const screen = path.replace('/admin/', '') || 'a01'
  const bootRef = useRef(true)
  const frameRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => { bootRef.current = false }, [])
  return (
    <AdminShell screen={screen} boot={bootRef.current} frameRef={frameRef} onTabSelect={(id) => navigate(`/admin/${id}`)}>
      {screen === 'a01' && <A01 />}
      {screen === 'a02' && <A02 />}
      {screen === 'a03' && <A03 />}
      {screen === 'a04' && <A04 />}
      {screen === 'a05' && <A05 />}
      {screen === 'a06' && <A06 />}
      {screen === 'a07' && <A07 />}
      {screen === 'a08' && <A08 />}
      {screen === 'a09' && <A09 />}
      {screen === 'a10' && <A10 />}
      {screen === 'a11' && <A11 />}
      {screen === 'a12' && <A12 />}
      {screen === 'a13' && <A13 />}
      {screen === 'a14' && <A14 />}
      {screen === 'a15' && <A15 />}
      {screen === 'a16' && <A16 />}
      {screen === 'a17' && <A17 />}
      {screen === 'a18' && <A18 />}
    </AdminShell>
  )
}
