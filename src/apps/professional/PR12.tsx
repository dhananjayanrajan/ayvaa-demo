import { useState } from 'react'
import { motion } from 'motion/react'
import { Check, ChevronRight, Download, Lock, Search, Star } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Chip, Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { pastSessions } from '@/data/professionalHistory'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function PR12() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [filter, setFilter] = useState<'all' | 'notes' | 'incidents'>('all')

  const filtered = pastSessions.filter((s) => {
    if (filter === 'notes') return Boolean(s.note)
    if (filter === 'incidents') return Boolean(s.incident)
    return true
  })

  const [latest, ...earlier] = filtered

  return (
    <Screen>
      <AppBar
        title="Past sessions"
        subtitle="Ramesh Sharma · twelve completed with you"
        onBack={() => navigate('/professional/pr04')}
        trailing={
          <button
            onClick={() => notify({ title: 'Search', body: 'Search across all your past sessions', kind: 'info' })}
            className="grid size-10.5 shrink-0 place-items-center rounded-full bg-tonal text-foreground/70 transition-colors hover:bg-mint"
            aria-label="Search sessions"
          >
            <Search className="size-5" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item} className="flex gap-2">
            <Chip on={filter === 'all'} onClick={() => setFilter('all')}>
              All sessions
            </Chip>
            <Chip on={filter === 'notes'} onClick={() => setFilter('notes')}>
              With notes
            </Chip>
            <Chip on={filter === 'incidents'} onClick={() => setFilter('incidents')}>
              With incidents
            </Chip>
          </motion.div>

          {latest ? (
            <>
              <motion.div variants={item}>
                <SectionHeader label="Expanded record" />
              </motion.div>
              <motion.div variants={item}>
                <ScreenCard className="flex flex-col gap-3 border-l-4 border-l-primary">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">{latest.date}</span>
                    <Pill tone="ok">
                      <Star className="size-3.5 fill-current" /> All steps
                    </Pill>
                  </div>
                  <div className="text-[13px] font-medium leading-snug text-foreground/80">{latest.detail}</div>
                  {latest.note && (
                    <ScreenCard tone="tonal" className="p-3">
                      <div className="text-[13px] font-medium leading-snug text-foreground/80">"{latest.note}"</div>
                    </ScreenCard>
                  )}
                  {latest.incident && <Pill tone="warn">{latest.incident}</Pill>}
                </ScreenCard>
              </motion.div>
            </>
          ) : (
            <motion.div variants={item}>
              <InfoCard icon={Search} body="No sessions match this filter." />
            </motion.div>
          )}

          {earlier.length > 0 && (
            <>
              <motion.div variants={item}>
                <SectionHeader label="Earlier this week" />
              </motion.div>
              <motion.div variants={item}>
                <ScreenCard className="p-2">
                  {earlier.map((s, i) => (
                    <div key={s.id}>
                      {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                      <button
                        onClick={() => notify({ title: s.date, body: s.detail, kind: 'info' })}
                        className="flex w-full items-center gap-3 px-2 py-1.5 text-left"
                      >
                        <IconTile icon={s.incident ? Star : Check} tone={s.incident ? 'warn' : 'mint'} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-bold text-foreground">{s.date}</div>
                          <div className="truncate text-xs font-medium text-muted-foreground">
                            {s.incident ?? s.detail}
                          </div>
                        </div>
                        <ChevronRight className="size-4.5 shrink-0 text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                </ScreenCard>
              </motion.div>
            </>
          )}

          <motion.div variants={item}>
            <InfoCard
              icon={Lock}
              body="Past records are sealed. They are your evidence of care delivered and can be shown to hospitals or partners with consent."
            />
          </motion.div>

          <motion.div variants={item}>
            <SmoothButton
              variant="soft"
              shape="pill"
              size="lg"
              className="w-full"
              onClick={() => notify({ title: 'Export queued', body: 'Your session records will be emailed as a PDF', kind: 'info' })}
            >
              <Download className="size-4" /> Export my session records
            </SmoothButton>
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of history" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
