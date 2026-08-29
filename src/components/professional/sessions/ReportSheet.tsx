import { useState } from 'react'
import { motion } from 'motion/react'
import { FileText, X } from 'lucide-react'
import { Tile } from '@/components/phone/kit'

interface ReportSheetProps {
  open: boolean
  onClose: () => void
  onSubmit: (note: string) => void
}

export function ReportSheet({ open, onClose, onSubmit }: ReportSheetProps) {
  const [note, setNote] = useState('')

  if (!open) return null

  const handleSubmit = () => {
    onSubmit(note)
    setNote('')
    onClose()
  }

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative rounded-t-[28px] bg-white p-5 pb-7"
      >
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#0B211B]/10" />
        <div className="flex items-start gap-3">
          <Tile icon={FileText} tone="warning" size="lg" />
          <div className="min-w-0 flex-1">
            <h3 className="text-[17px] font-extrabold tracking-tight text-[#0B211B]">Field task report</h3>
            <p className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Complete the report to maintain dispatch priority.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
            aria-label="Close report sheet"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your visit summary…"
          className="mt-4 min-h-[100px] w-full resize-none rounded-2xl bg-[#0B211B]/[0.04] p-3 text-sm font-medium text-[#0B211B] outline-none focus:ring-2 focus:ring-emerald-500/40"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 w-full rounded-2xl bg-emerald-500 py-3.5 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
        >
          Submit report
        </button>
      </motion.div>
    </motion.div>
  )
}
