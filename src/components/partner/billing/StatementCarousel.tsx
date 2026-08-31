import { motion } from 'motion/react'
import { ReceiptText } from 'lucide-react'
import { Chip } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import type { Invoice } from '@/data/partnerBillingTypes'

interface StatementCarouselProps {
  invoices: Invoice[]
  onSelect: (invoice: Invoice) => void
}

export function StatementCarousel({ invoices, onSelect }: StatementCarouselProps) {
  return (
    <div className="-mx-1 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {invoices.map((inv, i) => {
        const paid = inv.status === 'paid'
        return (
          <motion.button
            key={inv.month}
            type="button"
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => onSelect(inv)}
            className={cn(
              'w-[148px] shrink-0 snap-start rounded-2xl p-4 text-left outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-emerald-500/40',
              i === 0 ? 'bg-[#0B231C] shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]' : 'bg-white ring-1 ring-inset ring-[#0B211B]/[0.08]',
            )}
          >
            <div className="flex items-center justify-between">
              <ReceiptText
                className={cn('h-4 w-4', i === 0 ? 'text-emerald-300' : paid ? 'text-emerald-600' : 'text-[#0B211B]/35')}
                strokeWidth={2.2}
                aria-hidden
              />
              <Chip
                intent={paid ? 'success' : 'neutral'}
                className={cn('border-transparent', i === 0 && 'bg-white/[0.1] text-emerald-200')}
              >
                {paid ? 'Paid' : 'Proj.'}
              </Chip>
            </div>
            <div className={cn('mt-3 font-mono text-[17px] font-black tabular-nums tracking-tight', i === 0 ? 'text-white' : 'text-[#0B211B]')}>
              {inv.amount}
            </div>
            <div className={cn('mt-0.5 truncate text-[10px] font-bold', i === 0 ? 'text-emerald-100/50' : 'text-[#0B211B]/45')}>
              {inv.month} · {inv.sessions} sessions
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
