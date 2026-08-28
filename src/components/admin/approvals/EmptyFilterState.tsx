import { motion } from 'motion/react'
import { Inbox } from 'lucide-react'
import { Card, Chip, rise } from '@/components/phone/kit'

interface EmptyFilterStateProps {
  filter: string
}

export function EmptyFilterState({ filter }: EmptyFilterStateProps) {
  return (
    <motion.div variants={rise}>
      <Card>
        <div className="p-4">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-emerald-600/20 bg-emerald-500/[0.04] px-6 py-8 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-emerald-600">
              <Inbox className="h-5 w-5" strokeWidth={2.2} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[13.5px] font-bold tracking-tight text-[#0B211B]/70">No {filter} decisions here</p>
              <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/45">
                Every decision lands in the audit log
              </p>
            </div>
            <Chip intent="success">Nothing pending</Chip>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
