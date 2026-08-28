import { motion, AnimatePresence } from 'motion/react'
import {
  AlertTriangle,
  MapPin,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { Tile } from '@/components/phone/kit'

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
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[88%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-700">
                  <SlidersHorizontal className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Manage account</div>
                  <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">
                    Choose an action for {accountName}
                  </div>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={onClose}
                  aria-label="Close sheet"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors hover:bg-[#0B211B]/[0.08]"
                >
                  <X className="h-4 w-4" aria-hidden />
                </motion.button>
              </div>

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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
