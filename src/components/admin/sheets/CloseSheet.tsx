import { motion } from 'motion/react'
import { CheckCircle2 } from 'lucide-react'
import { Panel, TimeChip } from '@/components/phone/kit'

interface CloseSheetProps {
  onClose: () => void
  notify: (payload: { title: string; body: string; kind: 'ok' }) => void
  onConfirm: () => void
  decision?: string
}

export function CloseSheet({ onClose, notify, onConfirm, decision }: CloseSheetProps) {
  return (
    <>
      <Panel intent="success" className="p-3.5">
        <div className="flex items-center gap-1.5">
          <TimeChip>Note</TimeChip>
          <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-700/70">Your decision</span>
        </div>
        <p className="mt-1.5 text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">{decision}</p>
      </Panel>

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          onClose()
          notify({ title: 'Incident closed', body: 'Care plan resumed · family and caregiver notified', kind: 'ok' })
          onConfirm()
        }}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        Confirm close
      </motion.button>
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={onClose}
        className="w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/70"
      >
        Keep it open
      </motion.button>
    </>
  )
}
