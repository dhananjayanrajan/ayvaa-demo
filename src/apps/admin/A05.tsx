import { useState } from 'react'
import { motion } from 'motion/react'
import { AlertTriangle, CheckCircle2, Download, Eye, Gavel, Lock, ShieldCheck, UserCheck } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import SmoothButton from '@/components/smoothui/smooth-button'
import AnimatedTabs from '@/components/smoothui/animated-tabs'
import Pagination from '@/components/smoothui/pagination'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { ActionRow, IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { auditEntries } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const iconMap: Record<string, { icon: typeof Eye; tone: 'mint' | 'tonal' | 'warn' | 'error' }> = {
  ok: { icon: CheckCircle2, tone: 'mint' },
  view: { icon: Eye, tone: 'tonal' },
  approve: { icon: UserCheck, tone: 'mint' },
  error: { icon: AlertTriangle, tone: 'error' },
  gavel: { icon: Gavel, tone: 'warn' },
}

export function A05() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [page, setPage] = useState(1)
  const [range, setRange] = useState('today')

  return (
    <Screen>
      <AppBar
        title="Audit log"
        subtitle="Every action · every access"
        trailing={<AgentAvatar seed="ayvaa-audit" size={42} />}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex items-center gap-3">
              <IconTile icon={ShieldCheck} tone="white" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-brand-ink">Audit health · 100%</div>
                <div className="mt-0.5 text-[13px] font-medium text-brand-ink/80">No gaps in the last 90 days</div>
              </div>
              <Pill tone="ok" className="bg-white/70">Healthy</Pill>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <AnimatedTabs
              tabs={[
                { id: 'today', label: 'Today' },
                { id: 'week', label: 'This week' },
                { id: 'custom', label: 'Custom' },
              ]}
              variant="pill"
              defaultTab="today"
              onChange={setRange}
            />
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label={range === 'today' ? 'Live feed · today' : range === 'week' ? 'Live feed · this week' : 'Live feed · custom range'} />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {auditEntries.map((e, i) => {
                const { icon: Icon, tone } = iconMap[e.icon] ?? iconMap.view
                return (
                  <div key={e.id}>
                    {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                    <button
                      onClick={() =>
                        notify(
                          e.icon === 'error'
                            ? { title: e.title, body: `${e.body} · flagged for review`, kind: 'warn' }
                            : { title: e.title, body: `${e.body} · opened from ${range} log`, kind: 'info' },
                        )
                      }
                      className="flex w-full items-center gap-3 px-2 py-1.5 text-left"
                    >
                      <IconTile icon={Icon} tone={tone} size="sm" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-bold text-foreground">{e.title}</div>
                        <div className="truncate text-xs font-medium text-muted-foreground">{e.body}</div>
                      </div>
                      <Lock className="size-4 shrink-0 text-muted-foreground" />
                    </button>
                  </div>
                )
              })}
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <Pagination page={page} totalPages={3} onPageChange={setPage} />
          </motion.div>
          <motion.div variants={item}>
            <InfoCard icon={ShieldCheck} body="Entries are append-only. Nothing here can be edited or deleted — not by anyone." />
          </motion.div>
          <motion.div variants={item}>
            <EndOfScroll label="End of audit log" />
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Compliance tools" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <div className="px-2 py-1.5">
                <ActionRow icon={ShieldCheck} title="Consent tracking" subtitle="1,102 active · 18 due · 2 withdrawn" onClick={() => navigate('/admin/a06')} />
              </div>
              <div className="px-2 py-1.5">
                <ActionRow icon={Lock} title="Retention policies" subtitle="7 policies · deletion queue running" onClick={() => navigate('/admin/a07')} />
              </div>
            </ScreenCard>
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton variant="outline" shape="pill" size="lg" className="w-full" onClick={() => notify({ title: 'Export queued', body: "Today's log will be emailed to you", kind: 'info' })}>
          <Download className="size-4" /> Export today's log
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}