import { motion } from 'motion/react'
import { Lock } from 'lucide-react'
import { Card, rise } from '@/components/phone/kit'
import { Overline } from '@/components/phone/Overline'
import { Textarea } from '@/components/ui/textarea'
import type { Incident } from '@/data/types'

interface DecisionNoteCardProps {
  inc: Incident
}

export function DecisionNoteCard({ inc }: DecisionNoteCardProps) {
  return (
    <motion.div variants={rise}>
      <Card>
        <div className="p-4">
          <Overline icon={Lock}>Decision note</Overline>
          <Textarea
            defaultValue={inc.decision}
            className="mt-2 min-h-24 w-full resize-none rounded-2xl border border-[#0B211B]/[0.08] bg-[#0B211B]/[0.03] p-3.5 text-[13px] font-medium leading-relaxed text-[#0B211B] placeholder:text-[#0B211B]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30"
          />
          <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold text-[#0B211B]/40">
            <Lock className="h-3 w-3" aria-hidden />
            Written to the audit record with your name
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
