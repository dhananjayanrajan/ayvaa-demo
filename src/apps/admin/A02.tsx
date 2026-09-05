import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2, ShieldAlert } from 'lucide-react'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/base/phone/screen'
import { Chip, Section, rise, stagger } from '@/components/base/phone/kit'
import { a02Incident } from '@/data/admin/a02Data'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { IncidentHeroCard } from '@/components/patterns/heroes/incident-hero-card'
import { IncidentSummaryCard } from '@/components/patterns/cards/incident-summary-card'
import { PhotoEvidenceCard } from '@/components/patterns/cards/photo-evidence-card'
import { LinkedRecordsCard } from '@/components/patterns/cards/linked-records-card'
import { DecisionNoteCard } from '@/components/patterns/cards/decision-note-card'
import { EscalateSheet } from '@/components/patterns/sheets/escalate-sheet'
import { CloseSheet } from '@/components/patterns/sheets/close-sheet'
import { BottomSheet } from '@/components/base/phone/sheet-shell'
import { IncidentActions } from '@/components/patterns/actions'
import { PhotoOverlay } from '@/components/patterns/overlays/photo-overlay'

type Sheet = 'none' | 'photo' | 'escalate' | 'close'

export function A02() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [sheet, setSheet] = useState<Sheet>('none')
  const inc = a02Incident

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
        <IncidentActions onEscalate={() => setSheet('escalate')} onClose={() => setSheet('close')} />
      </FootBar>

      <AnimatePresence>
        <PhotoOverlay open={sheet === 'photo'} onClose={() => setSheet('none')} notify={notify} />
      </AnimatePresence>

      <BottomSheet
        open={sheet === 'escalate'}
        onClose={() => setSheet('none')}
        icon={ShieldAlert}
        title="Escalate this incident"
        subtitle="Choose who takes it next"
      >
        <EscalateSheet
          onClose={() => setSheet('none')}
          notify={notify}
        />
      </BottomSheet>

      <BottomSheet
        open={sheet === 'close'}
        onClose={() => setSheet('none')}
        icon={CheckCircle2}
        title="Close this incident?"
        subtitle="Closing resumes the care plan and notifies the family and caregiver."
      >
        <CloseSheet
          onClose={() => setSheet('none')}
          notify={notify}
          onConfirm={() => navigate('/admin/a01')}
          decision={inc.decision}
        />
      </BottomSheet>
    </Screen>
  )
}
