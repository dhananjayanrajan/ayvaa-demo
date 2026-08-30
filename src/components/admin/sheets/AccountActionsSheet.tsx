import { motion } from 'motion/react'
import { AlertTriangle, MapPin, SlidersHorizontal } from 'lucide-react'
import { Tile } from '@/components/phone/kit'
import { BottomSheet } from '@/components/phone/SheetShell'

type NotifyFn = (payload: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void

interface AccountActionsSheetProps {
  open: boolean
  onClose: () => void
  notify: NotifyFn
  accountName: string
}

export function AccountActionsSheet({ open, onClose, notify, accountName }: AccountActionsSheetProps) {
  const actions = [
    {
      key: 'area',
      label: 'Adjust care area',
      sub: 'Widen service area and re-dispatch offers',
      icon: MapPin,
      tone: 'neutral' as const,
      onSelect: () => {
        notify({ title: 'Area adjusted', body: 'Care area widened · new offers will reach more professionals', kind: 'info' })
        onClose()
      },
    },
    {
      key: 'pause',
      label: 'Pause account',
      sub: 'Stop new offers until manually reactivated',
      icon: AlertTriangle,
      tone: 'warning' as const,
      onSelect: () => {
        notify({ title: 'Account paused', body: 'No new offers until reactivated', kind: 'warn' })
        onClose()
      },
    },
  ]

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      icon={SlidersHorizontal}
      title="Manage account"
      subtitle={`Choose an action for ${accountName}`}
    >
      <div className="flex flex-col gap-2">
        {actions.map((a) => (
          <motion.button
            key={a.key}
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={a.onSelect}
            className="group flex w-full items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] p-3.5 text-left transition-all duration-200 hover:bg-[#0B211B]/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
          >
            <Tile icon={a.icon} tone={a.tone} size="sm" className="transition-transform group-hover:scale-105" />
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{a.label}</span>
              <span className="mt-0.5 block text-[11.5px] font-medium leading-relaxed text-[#0B211B]/45">{a.sub}</span>
            </span>
          </motion.button>
        ))}
      </div>
    </BottomSheet>
  )
}
