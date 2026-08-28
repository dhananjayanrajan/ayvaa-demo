import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import {
  Chip,
  Section,
  rise,
  stagger,
} from '@/components/phone/kit'
import { incidents } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { IncidentHeroCard } from '@/components/admin/incident/IncidentHeroCard'
import { IncidentSummaryCard } from '@/components/admin/incident/IncidentSummaryCard'
import { PhotoEvidenceCard } from '@/components/admin/incident/PhotoEvidenceCard'
import { LinkedRecordsCard } from '@/components/admin/incident/LinkedRecordsCard'
import { DecisionNoteCard } from '@/components/admin/incident/DecisionNoteCard'
import { PhotoViewSheet } from '@/components/admin/sheets/PhotoViewSheet'
import { EscalateSheet } from '@/components/admin/sheets/EscalateSheet'
import { CloseSheet } from '@/components/admin/sheets/CloseSheet'
import { SheetButton } from '@/components/admin/ui/SheetButton'
import { SheetHeader } from '@/components/admin/ui/SheetHeader'

type Sheet = 'none' | 'photo' | 'escalate' | 'close'

export function A02() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [sheet, setSheet] = useState<Sheet>('none')
  const inc = incidents[0]

  return (
    <Screen>
      <AppBar
        title={`Near fall · ${inc.patient}`}
        subtitle={`Raised ${inc.raised} by ${inc.by}`}
        trailing={
          <Chip intent="danger" dot>
            Critical
          </Chip>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-rose-400/[0.14] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <IncidentHeroCard inc={inc} />
            <IncidentSummaryCard inc={inc} />
            <PhotoEvidenceCard inc={inc} onClick={() => setSheet('photo')} />

            <motion.div variants={rise}>
              <Section label="Linked records" trailing={<Chip intent="neutral">Sealed</Chip>} />
            </motion.div>
            <LinkedRecordsCard inc={inc} />

            <motion.div variants={rise}>
              <Section label="Supervisor decision" trailing={<Chip intent="info">Required</Chip>} />
            </motion.div>
            <DecisionNoteCard inc={inc} />

            <motion.div variants={rise}>
              <EndOfScroll label="End of incident" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <FootBar>
        <div className="flex gap-2.5">
          <SheetButton tone="danger" icon={ArrowUpRight} onClick={() => setSheet('escalate')}>
            Escalate higher
          </SheetButton>
          <SheetButton tone="success" icon={CheckCircle2} onClick={() => setSheet('close')}>
            Close incident
          </SheetButton>
        </div>
      </FootBar>

      <AnimatePresence>
        {sheet !== 'none' && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSheet('none')}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet === 'photo' && (
          <motion.div
            key="photo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col bg-[rgba(10,18,15,0.94)] p-5 pb-7 backdrop-blur-sm"
          >
            <PhotoViewSheet
              onClose={() => setSheet('none')}
              notify={notify}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(sheet === 'escalate' || sheet === 'close') && (
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] border-t border-white/40 bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />

            {sheet === 'escalate' ? (
              <>
                <SheetHeader
                  icon={ShieldAlert}
                  tone="warning"
                  title="Escalate this incident"
                  sub="Choose who takes it next"
                  onClose={() => setSheet('none')}
                />
                <EscalateSheet
                  onClose={() => setSheet('none')}
                  notify={notify}
                />
              </>
            ) : (
              <>
                <SheetHeader
                  icon={CheckCircle2}
                  tone="success"
                  title="Close this incident?"
                  sub="Closing resumes the care plan and notifies the family and caregiver."
                  onClose={() => setSheet('none')}
                />
                <CloseSheet
                  onClose={() => setSheet('none')}
                  notify={notify}
                  onConfirm={() => navigate('/admin/a01')}
                  decision={inc.decision}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
