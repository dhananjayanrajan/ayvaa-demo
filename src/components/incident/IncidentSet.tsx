import { motion } from 'motion/react'
import { CheckCircle2, ChevronRight, Lock, ShieldAlert } from 'lucide-react'
import { Card, Chip, Hero, Kicker, Tile, rise } from '@/components/phone/kit'
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

interface IncidentHeroCardProps {
  inc: Incident
}

export function IncidentHeroCard({ inc }: IncidentHeroCardProps) {
  return (
    <motion.div variants={rise}>
      <Hero tone="rose">
        <Kicker>Critical incident · auto-contained</Kicker>
        <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          Care plan{' '}
          <span className="bg-gradient-to-r from-rose-300 to-orange-200 bg-clip-text text-transparent">paused automatically</span>
        </h2>
        <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-rose-100/55">
          Post-operative care plan · week 4 of 6 · paused until a supervisor closes this incident.
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          <Chip intent="neutral" light>Raised {inc.raised}</Chip>
          <Chip intent="neutral" light>By {inc.by}</Chip>
          <Chip intent="danger" light icon={ShieldAlert}>Containment active</Chip>
        </div>
      </Hero>
    </motion.div>
  )
}

interface IncidentSummaryCardProps {
  inc: Incident
}

export function IncidentSummaryCard({ inc }: IncidentSummaryCardProps) {
  return (
    <motion.div variants={rise}>
      <Card>
        <div className="p-4">
          <Overline>What happened</Overline>
          <p className="mt-1.5 text-pretty text-[13px] font-medium leading-relaxed text-[#0B211B]/75">{inc.summary}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {inc.tags.map((t) => (
              <Chip key={t} intent="neutral">
                {t}
              </Chip>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

interface LinkedRecordsCardProps {
  inc: Incident
}

export function LinkedRecordsCard({ inc }: LinkedRecordsCardProps) {
  return (
    <motion.div variants={rise}>
      <Card>
        <div className="flex items-start gap-3 p-4">
          <Tile icon={CheckCircle2} tone="success" />
          <div className="min-w-0 flex-1">
            <div className="text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{inc.linkedVisit}</div>
            <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Visit record · sealed and timestamped
            </div>
          </div>
          <Chip intent="success">Sealed</Chip>
        </div>
        <div className="flex items-start gap-3 p-4">
          <Tile icon={ShieldAlert} tone="warning" />
          <div className="min-w-0 flex-1">
            <div className="text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{inc.linkedPlan}</div>
            <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Care plan · resumes when incident closes
            </div>
          </div>
          <Chip intent="warning">Paused</Chip>
        </div>
      </Card>
    </motion.div>
  )
}

interface PhotoEvidenceCardProps {
  inc: Incident
  onClick: () => void
}

export function PhotoEvidenceCard({ inc, onClick }: PhotoEvidenceCardProps) {
  return (
    <motion.div variants={rise}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.985 }}
        onClick={onClick}
        className="group block w-full text-left"
      >
        <Card intent="danger">
          <div className="flex items-center gap-3 p-4">
            <Tile icon={Lock} tone="danger" />
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{inc.photo}</span>
              <span className="mt-0.5 block text-xs font-medium leading-relaxed text-[#0B211B]/55">
                View is logged with your name
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-rose-500/60 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </div>
        </Card>
      </motion.button>
    </motion.div>
  )
}
