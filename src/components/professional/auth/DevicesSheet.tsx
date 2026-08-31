import { useState } from 'react'
import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { CalendarClock, Loader2, LogOut, Monitor, Smartphone, X } from 'lucide-react'
import { Chip, Tile } from '@/components/phone/kit'
import { SheetShell } from '@/components/phone/SheetShell'
import { cn } from '@/lib/utils'

const devices: { icon: LucideIcon; name: string; where: string; when: string; current: boolean }[] = [
  { icon: Smartphone, name: 'This phone', where: 'Hyderabad · Ayvaa app', when: 'Active now', current: true },
  { icon: Monitor, name: 'Sunrise partner kiosk', where: 'Banjara Hills · staff desk', when: 'Mar 1 · 2:14 PM', current: false },
  { icon: Smartphone, name: 'Backup phone', where: 'Hyderabad · Ayvaa app', when: 'Feb 28 · 7:03 AM', current: false },
]

interface DevicesSheetProps {
  onClose: () => void
  onSignOutOthers: () => void
}

export function DevicesSheet({ onClose, onSignOutOthers }: DevicesSheetProps) {
  const [signOutLoading, setSignOutLoading] = useState(false)

  const handleSignOut = () => {
    if (signOutLoading) return
    setSignOutLoading(true)
    setTimeout(() => {
      setSignOutLoading(false)
      onSignOutOthers()
    }, 1000)
  }

  return (
    <SheetShell onClose={onClose} height="scroll">
      <div className="flex flex-col gap-3.5">
        <div className="flex items-start gap-3">
          <Tile icon={Smartphone} tone="ink" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Devices & sessions</div>
            <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Every place your account is signed in</div>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
            aria-label="Close sheet"
          >
            <X className="h-4 w-4" aria-hidden />
          </motion.button>
        </div>

        <div className="flex flex-col">
          {devices.map((d) => (
            <div key={d.name}>
              <div className="flex items-center gap-3 px-1 py-3.5">
                <Tile icon={d.icon} tone={d.current ? 'success' : 'neutral'} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{d.name}</div>
                  <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/50">{d.where}</div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  {d.current ? (
                    <Chip intent="success" dot className="border-transparent">Active now</Chip>
                  ) : (
                    <Chip intent="neutral" className="border-transparent">{d.when}</Chip>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <motion.button
          type="button"
          whileTap={signOutLoading ? undefined : { scale: 0.97 }}
          onClick={handleSignOut}
          disabled={signOutLoading}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(225,29,72,0.65)]',
            signOutLoading && 'opacity-80',
          )}
        >
          {signOutLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Signing out…
            </>
          ) : (
            <>
              <LogOut className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Sign out other devices
            </>
          )}
        </motion.button>
        <div className="flex items-center justify-start gap-1.5 text-[10.5px] font-semibold text-[#0B211B]/45">
          <CalendarClock className="h-3 w-3" aria-hidden />
          Sessions auto-expire after 30 days of inactivity
        </div>
      </div>
    </SheetShell>
  )
}
