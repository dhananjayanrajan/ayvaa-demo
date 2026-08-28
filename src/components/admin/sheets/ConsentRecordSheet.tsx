import { motion } from 'motion/react'
import {
  CalendarClock,
  CheckCircle2,
  Clock,
  FileText,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import { Overline } from '@/components/admin/ui/Overline'
import { consentReview } from '@/data/seed'
import { BottomSheet } from '@/components/admin/ui/BottomSheet'

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
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white p-3">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
              <CalendarClock className="h-3 w-3" aria-hidden />
              Signed
            </div>
            <div className="mt-1 text-[14px] font-extrabold tabular-nums text-[#0B211B]">{consentReview.signed}</div>
          </div>
          <div className="rounded-xl bg-white p-3">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
              <Clock className="h-3 w-3" aria-hidden />
              Pauses
            </div>
            <div className="mt-1 text-[14px] font-extrabold tabular-nums text-[#0B211B]">{consentReview.pauses}</div>
          </div>
          <div className="rounded-xl bg-white p-3">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
              <Phone className="h-3 w-3" aria-hidden />
              Reminded
            </div>
            <div className="mt-1 text-[14px] font-extrabold tabular-nums text-[#0B211B]">{consentReview.reminded}x</div>
          </div>
          <div className="rounded-xl bg-white p-3">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
              <ShieldCheck className="h-3 w-3" aria-hidden />
              Status
            </div>
            <div className="mt-1 text-[14px] font-extrabold text-[#0B211B]">{consentReview.due}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <Overline>Recent activity</Overline>
        <div className="mt-3 flex flex-col">
          {recordTimeline.map((item, i) => {
            const last = i === recordTimeline.length - 1
            return (
              <div key={`${item.date}-${item.label}`} className="flex gap-3">
                <div className="flex flex-col items-center">
                  {item.done ? (
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                      <CheckCircle2 className="h-3 w-3" strokeWidth={3} aria-hidden />
                    </span>
                  ) : (
                    <span className="relative grid h-5 w-5 shrink-0 place-items-center">
                      <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-amber-400/40" />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-amber-500" />
                    </span>
                  )}
                  {!last && <span aria-hidden className="my-1 w-px flex-1 bg-[#0B211B]/10" />}
                </div>
                <div className={last ? 'min-w-0 flex-1 pb-0.5' : 'min-w-0 flex-1 pb-4'}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="break-words text-[13px] font-bold tracking-tight text-[#0B211B]">{item.label}</span>
                    <span className="shrink-0 text-[10px] font-bold text-[#0B211B]/40">{item.date}</span>
                  </div>
                  <div className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">{item.note}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </BottomSheet>
  )
}
