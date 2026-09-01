import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus, ShieldCheck } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Chip, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { AddPrescriptionSheet } from '@/components/prescriptions/PrescriptionsSet'
import { DocumentsCard } from '@/components/prescriptions/PrescriptionsSet'
import { MessageSheet } from '@/components/prescriptions/PrescriptionsSet'
import { PrescriptionList } from '@/components/prescriptions/PrescriptionsSet'
import { PrescriptionSheet } from '@/components/prescriptions/PrescriptionsSet'
import { RefillCard } from '@/components/prescriptions/PrescriptionsSet'
import { RxHero } from '@/components/prescriptions/PrescriptionsSet'
import { PRESCRIPTIONS, RX_DOCUMENTS, activeOf, lowOf, type Prescription } from '@/data/patientPrescriptions'
import { lovedOnes } from '@/data/seed'
import { useRouter } from '@/lib/router'

export function P20() {
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(PRESCRIPTIONS)
  const [sheet, setSheet] = useState<Prescription | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [msgRx, setMsgRx] = useState<Prescription | null>(null)
  const [refilled, setRefilled] = useState(false)
  const [reminded, setReminded] = useState<string[]>([])

  const active = activeOf(prescriptions)
  const low = lowOf(prescriptions)

  const closeAll = () => {
    setSheet(null)
    setAddOpen(false)
    setMsgRx(null)
  }

  return (
    <Screen>
      <AppBar
        title="Prescriptions"
        subtitle={`${father.name}, ${prescriptions.length} prescriptions`}
        onBack={() => navigate('/patient/p19')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setAddOpen(true)}
            aria-label="Add prescription"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
          >
            <Plus className="size-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-rose-500/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <RxHero prescriptions={prescriptions} refilled={refilled} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Active prescriptions" trailing={<Chip intent="success">{active.length} verified</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <PrescriptionList prescriptions={active} reminded={reminded} onSelect={setSheet} />
            </motion.div>

            {low.length > 0 && (
              <motion.div variants={rise}>
                <RefillCard rx={low[0]} onRefilled={() => setRefilled(true)} />
              </motion.div>
            )}

            <motion.div variants={rise}>
              <Section
                label="Documents"
                trailing={
                  <Chip intent="neutral">
                    {RX_DOCUMENTS.length} file{RX_DOCUMENTS.length === 1 ? '' : 's'}
                  </Chip>
                }
              />
            </motion.div>

            <motion.div variants={rise}>
              <DocumentsCard />
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="danger" className="flex items-start gap-3 p-4">
                <Tile icon={ShieldCheck} tone="danger" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Only prescriptions from verified doctors can be added. Every change is checked by the nurse before the next
                  dose.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of prescriptions" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {(sheet || addOpen || msgRx) && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAll}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet && (
          <PrescriptionSheet
            rx={sheet}
            onClose={() => setSheet(null)}
            onRefilled={() => setRefilled(true)}
            onMessage={() => setMsgRx(sheet)}
            onReminded={() => setReminded((cur) => (cur.includes(sheet.id) ? cur : [...cur, sheet.id]))}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {msgRx && <MessageSheet prescriber={msgRx.prescriber} onClose={() => setMsgRx(null)} />}
      </AnimatePresence>

      <AnimatePresence>
        {addOpen && (
          <AddPrescriptionSheet
            onClose={() => setAddOpen(false)}
            onAdd={(rx) => {
              setPrescriptions((cur) => [...cur, rx])
              setAddOpen(false)
            }}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}