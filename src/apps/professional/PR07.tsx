import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, FootBar, Screen } from '@/components/phone/Screen'
import { Tile, rise, stagger } from '@/components/phone/kit'
import { lovedOnes } from '@/data/seed'
import { medVerification, quickTags, sessionNote } from '@/data/professionalCare'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { EntrySheetsHero } from '@/components/professional/sheets/EntrySheetsHero'
import { SealedNotice } from '@/components/professional/sheets/SealedNotice'
import { SegmentedTabs } from '@/components/phone/SegmentedTabs'
import { VitalsPanel } from '@/components/professional/sheets/VitalsPanel'
import { MedVerificationPanel } from '@/components/professional/sheets/MedVerificationPanel'
import { NotesPanel } from '@/components/professional/sheets/NotesPanel'
import { SaveSheetButton, type SaveStatus } from '@/components/professional/sheets/SaveSheetButton'
import { SheetFooterNote } from '@/components/professional/sheets/SheetFooterNote'
import { ReopenSheetsBar } from '@/components/professional/sheets/ReopenSheetsBar'
import {
  MODE_META,
  SAVE_LABELS,
  SHEET_MODES,
  type SheetMode,
  type VitalReading,
} from '@/data/sheetData'

const modeProgress = (
  mode: SheetMode,
  recorded: string[],
  checks: string[],
  scanned: boolean,
  tags: string[],
): { done: number; total: number } => {
  if (mode === 'vitals') return { done: recorded.length, total: 4 }
  if (mode === 'meds') return { done: checks.length + (scanned ? 1 : 0), total: 4 }
  return { done: tags.length > 0 ? 1 : 0, total: 1 }
}

export function PR07() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const [sheetOpen, setSheetOpen] = useState(true)
  const [mode, setMode] = useState<SheetMode>('vitals')
  const [recorded, setRecorded] = useState<string[]>([])
  const [checks, setChecks] = useState<string[]>([])
  const [scanned, setScanned] = useState(false)
  const [tags, setTags] = useState<string[]>(['Good mobility', 'Good appetite'])
  const [saved, setSaved] = useState<SheetMode[]>([])
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const toggleCheck = (v: string) =>
    setChecks((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))

  const toggleTag = (t: string) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  const allChecked = checks.length === medVerification.length && scanned
  const canSave = mode !== 'meds' || allChecked
  const status: SaveStatus = saved.includes(mode) ? 'saved' : saveStatus

  const recordVital = (v: VitalReading) => {
    if (recorded.includes(v.key)) {
      notify({ title: `${v.label} already logged`, body: `${v.value} · sealed at sign off`, kind: 'info' })
      return
    }
    setRecorded((prev) => [...prev, v.key])
    notify({ title: `${v.label} logged`, body: `${v.value} · ${v.delta}`, kind: 'ok' })
  }

  const rescan = () => {
    if (scanned) {
      notify({ title: 'Rescanning pack', body: 'Hold the barcode steady · label matched in demo mode', kind: 'info' })
      return
    }
    setScanned(true)
    notify({ title: 'Barcode matched', body: 'Pack label verified against the prescription', kind: 'ok' })
  }

  const save = () => {
    if (!canSave) {
      notify({
        title: 'Verification incomplete',
        body: scanned ? 'Complete all three checks before giving the dose' : 'Scan the pack barcode before giving the dose',
        kind: 'warn',
      })
      return
    }
    if (saved.includes(mode) || saveStatus !== 'idle') return
    setSaveStatus('saving')
    timers.current.push(
      setTimeout(() => {
        setSaved((prev) => (prev.includes(mode) ? prev : [...prev, mode]))
        const messages: Record<SheetMode, { title: string; body: string }> = {
          vitals: { title: 'Readings saved', body: '128/76 · 72 bpm · 97% · sealed at sign off', kind: 'ok' },
          meds: { title: 'Dose confirmed', body: 'Amlodipine 5 mg given · recorded permanently', kind: 'ok' },
          notes: { title: 'Notes saved', body: 'Written by you alone · sealed at sign off', kind: 'ok' },
        }
        notify(messages[mode])
        setSaveStatus('idle')
        timers.current.push(
          setTimeout(() => {
            setSaved((currentSaved) => {
              const remaining = SHEET_MODES.filter((m) => !currentSaved.includes(m.id))
              if (remaining.length > 0) {
                setMode(remaining[0].id)
              } else {
                setSheetOpen(false)
              }
              return currentSaved
            })
          }, 900),
        )
      }, 900),
    )
  }

  const footerNote =
    mode === 'meds'
      ? 'Dose recording is permanent once saved and cannot be edited later.'
      : 'Sealed once the visit is signed off.'

  return (
    <Screen>
      <AppBar
        title={`Visit with ${father.name.split(' ')[0]}`}
        subtitle="Entry sheets · live during the visit"
        onBack={() => navigate('/professional/pr06')}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-blue-400/[0.12] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <EntrySheetsHero
                saved={saved}
                activeMode={mode}
                activeProgress={modeProgress(mode, recorded, checks, scanned, tags)}
              />
            </motion.div>

            <motion.div variants={rise}>
              <SealedNotice />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <FootBar>
        <ReopenSheetsBar saved={saved} onPress={() => setSheetOpen(true)} />
      </FootBar>

      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              key="dim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSheetOpen(false)}
              className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.45)] backdrop-blur-[2px]"
            />
            <motion.div
              key="sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 40 }}
              className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.4)]"
            >
              <div className="shrink-0 px-5 pt-4">
                <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
              </div>

              <div className="shrink-0 px-5 pb-3 pt-2">
                <div className="flex items-start gap-3">
                  <Tile icon={MODE_META[mode].icon} tone={MODE_META[mode].tile} size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">{MODE_META[mode].title}</div>
                    <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">{MODE_META[mode].subtitle}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSheetOpen(false)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors hover:bg-[#0B211B]/[0.09]"
                    aria-label="Close entry sheet"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                </div>

                <div className="mt-3">
                  <SegmentedTabs
                    tabs={SHEET_MODES.map((m) => ({ id: m.id, label: m.label, icon: m.icon, done: saved.includes(m.id) }))}
                    value={mode}
                    onChange={(id) => setMode(id as SheetMode)}
                    layoutId="pr07-mode"
                    tracking="0.12em"
                  />
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 pb-4">
                <AnimatePresence mode="wait" initial={false}>
                  {mode === 'vitals' && (
                    <motion.div key="vitals" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <VitalsPanel recorded={recorded} onRecord={recordVital} />
                    </motion.div>
                  )}

                  {mode === 'meds' && (
                    <motion.div key="meds" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <MedVerificationPanel
                        checks={checks}
                        allChecked={allChecked}
                        saved={saved.includes('meds')}
                        scanned={scanned}
                        verifications={medVerification}
                        total={medVerification.length}
                        onToggleCheck={toggleCheck}
                        onRescan={rescan}
                      />
                    </motion.div>
                  )}

                  {mode === 'notes' && (
                    <motion.div key="notes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <NotesPanel
                        note={sessionNote}
                        quickTags={quickTags}
                        tags={tags}
                        onToggleTag={toggleTag}
                        onPressNote={() => notify({ title: 'Notes', body: 'Your words go to the family verbatim', kind: 'info' })}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <SaveSheetButton
                  label={SAVE_LABELS[mode]}
                  disabled={!canSave || saved.includes(mode)}
                  status={status}
                  onPress={save}
                />
                <SheetFooterNote text={footerNote} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Screen>
  )
}
