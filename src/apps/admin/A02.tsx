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
import { IncidentHeroCard } from '@/components/incident/IncidentSet'
import { IncidentSummaryCard } from '@/components/incident/IncidentSet'
import { PhotoEvidenceCard } from '@/components/incident/IncidentSet'
import { LinkedRecordsCard } from '@/components/incident/IncidentSet'
import { DecisionNoteCard } from '@/components/incident/IncidentSet'
import { PhotoViewSheet } from '@/components/sheets/SheetsSet'
import { EscalateSheet } from '@/components/sheets/SheetsSet'
import { CloseSheet } from '@/components/sheets/SheetsSet'
import { StaticButton } from '@/components/phone/LifecycleButton'
import { BottomSheet } from '@/components/phone/SheetShell'

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
          <StaticButton tone="danger" icon={ArrowUpRight} onClick={() => setSheet('escalate')}>
            Escalate higher
          </StaticButton>
          <StaticButton tone="success" icon={CheckCircle2} onClick={() => setSheet('close')}>
            Close incident
          </StaticButton>
        </div>
      </FootBar>

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
