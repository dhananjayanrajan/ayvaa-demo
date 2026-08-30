import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { Chip, Tile } from '@/components/phone/kit'
import { fmtINR, type Receipt } from '@/data/patientBilling'
import { cn } from '@/lib/utils'
import { ReceiptTicket } from './ReceiptTicket'

interface ReceiptRowProps {
  receipt: Receipt
  open: boolean
  onToggle: () => void
}

export function ReceiptRow({ receipt, open, onToggle }: ReceiptRowProps) {
  const Icon = receipt.icon

  if (receipt.state === 'planned') {
    return (
      <div className="flex items-center gap-3.5 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.07] text-[#0B211B]/50">
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-bold tracking-tight text-[#0B211B]/70">
            {receipt.day}, {receipt.date}
          </span>
          <span className="mt-0.5 block break-words text-[11.5px] font-medium leading-snug text-[#0B211B]/45">
            {receipt.note}
          </span>
        </span>
        <Chip intent="neutral" className="shrink-0">
          {receipt.chip}
        </Chip>
      </div>
    )
  }

  const live = receipt.state === 'live'
  const refund = receipt.state === 'refund'

  return (
    <div className={cn('rounded-2xl', live ? 'bg-emerald-500/[0.06]' : 'bg-[#0B211B]/[0.03]')}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-3.5 rounded-2xl p-4 text-left transition-colors duration-200 hover:bg-[#0B211B]/[0.06]"
      >
        <span className="relative shrink-0">
          <Tile icon={Icon} tone={refund ? 'warning' : live ? 'success' : 'neutral'} />
          {live && (
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" aria-hidden />
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            <span className="min-w-0 truncate text-[13px] font-extrabold tracking-tight text-[#0B211B]">
              {receipt.day}, {receipt.date}
            </span>
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
              <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/35" aria-hidden />
            </motion.span>
          </span>
          <span className="mt-1 block break-words text-[11.5px] font-medium leading-snug text-[#0B211B]/55">
            {receipt.note}
          </span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-1.5">
          <Chip intent={refund ? 'warning' : live ? 'live' : 'success'} dot={live}>
            {receipt.chip}
          </Chip>
          {!refund && (
            <span className="text-[12.5px] font-extrabold tabular-nums text-[#0B211B]/80">
              {fmtINR(receipt.amount)}
            </span>
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <ReceiptTicket receipt={receipt} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
