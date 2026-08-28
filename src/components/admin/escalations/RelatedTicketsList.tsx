import { motion } from 'motion/react'
import { ChevronRight, Link2 } from 'lucide-react'
import { Card, Tile, rise } from '@/components/phone/kit'
import { escalatedTickets } from '@/data/seed'

type NotifyFn = (payload: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void

interface RelatedTicketsListProps {
  notify: NotifyFn
}

export function RelatedTicketsList({ notify }: RelatedTicketsListProps) {
  const [, e2, e3] = escalatedTickets

  return (
    <motion.div variants={rise}>
      <Card>
        {[e2, e3].map((e, i) => (
          <div key={e.title}>
            {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
            <motion.button
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              onClick={() =>
                notify({
                  title: 'Ticket opened',
                  body: `${e.title} · ${i === 0 ? 'linked receipts attached' : 'usage report attached'}`,
                  kind: 'info',
                })
              }
              className="group flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors duration-200 hover:bg-[#0B211B]/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
            >
              <Tile icon={Link2} tone="neutral" className="transition-transform duration-200 group-hover:scale-105" />
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{e.title}</span>
                <span className="mt-0.5 block line-clamp-2 text-xs font-medium leading-relaxed text-[#0B211B]/55">{e.meta}</span>
              </span>
              <ChevronRight
                className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-emerald-600"
                aria-hidden
              />
            </motion.button>
          </div>
        ))}
      </Card>
    </motion.div>
  )
}
