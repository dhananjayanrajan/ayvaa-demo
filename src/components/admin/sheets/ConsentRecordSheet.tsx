import { motion } from 'motion/react'
import { CalendarClock, Clock, FileText, Phone, ShieldCheck } from 'lucide-react'
import { Overline } from '@/components/admin/ui/Overline'
import { FactTile, FactTileGrid } from '@/components/phone/FactTile'
import { MiniTimeline } from '@/components/phone/MiniTimeline'
import { BottomSheet } from '@/components/phone/SheetShell'
import { consentReview } from '@/data/seed'

type NotifyFn = (payload: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void

interface ConsentRecordSheetProps {
  open: boolean
  onClose: () => void
  notify: NotifyFn
}

const recordTimeline = [
  { date: 'Jan 14', time: '9:42 AM', label: 'Signed', note: 'Via guardian app', done: true },
  { date: 'Mar 28', time: '6:05 PM', label: 'Reminder sent', note: 'Push + SMS', done: true },
  { date: 'Apr 04', time: '8:00 AM', label: 'Reminder sent', note: 'Push + SMS', done: true },
  { date: 'Apr 18', time: '8:00 AM', label: 'Reminder sent', note: 'Push + SMS', done: true },
  { date: 'May 01', time: '8:00 AM', label: 'Due now', note: 'Awaiting renewal', done: false },
]

export function ConsentRecordSheet({ open, onClose, notify }: ConsentRecordSheetProps) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      icon={FileText}
      title={consentReview.name}
      subtitle={consentReview.category}
      footer={
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            onClose()
            notify({ title: 'Guardian called', body: 'Priya Sharma reached · review scheduled', kind: 'ok' })
          }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-all duration-200 hover:shadow-[0_22px_40px_-18px_rgba(5,150,105,0.85)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
        >
          <Phone className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="break-words">Call guardian now</span>
        </motion.button>
      }
    >
      <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <Overline>Consent details</Overline>
        <FactTileGrid className="mt-3">
          <FactTile icon={CalendarClock} label="Signed" value={consentReview.signed} />
          <FactTile icon={Clock} label="Pauses" value={consentReview.pauses} />
          <FactTile icon={Phone} label="Reminded" value={`${consentReview.reminded}x`} />
          <FactTile icon={ShieldCheck} label="Status" value={consentReview.due} />
        </FactTileGrid>
      </div>

      <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <Overline>Recent activity</Overline>
        <MiniTimeline
          className="mt-3"
          items={recordTimeline.map((item) => ({
            title: item.label,
            note: item.note,
            done: item.done,
            pending: !item.done,
            trailing: <span className="shrink-0 text-[10px] font-bold text-[#0B211B]/40">{item.date}</span>,
          }))}
        />
      </div>
    </BottomSheet>
  )
}
