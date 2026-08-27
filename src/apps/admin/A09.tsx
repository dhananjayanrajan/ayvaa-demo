import { FileDown, TrendingUp } from 'lucide-react'
import { motion } from 'motion/react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, FootBar, Screen } from '@/components/phone/Screen'
import { Pill, StatCard } from '@/components/phone/Controls'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDemo } from '@/lib/store'
import { analytics } from '@/data/seed'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

const barColors = ['bg-tonal', 'bg-[#BFE5DA]', 'bg-tonal', 'bg-primary']

export function A09() {
  const { notify } = useDemo()

  return (
    <Screen>
      <AppBar title="Analytics" subtitle="March 2024 · verified sessions" />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <Card className="rounded-[20px] border-0 bg-mint p-4">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-bold uppercase tracking-[0.9px] text-brand-ink/70">Revenue this month</div>
                <Pill tone="ok" className="bg-white/70">
                  {analytics.delta}
                </Pill>
              </div>
              <div className="mt-1 text-2xl font-black text-brand-ink">{analytics.revenue}</div>
              <div className="mt-1 text-xs font-medium text-brand-ink/70">{analytics.sessions}</div>
            </Card>
          </motion.div>
          <motion.div variants={item} className="flex gap-3">
            <StatCard icon={TrendingUp} value={analytics.utilisation} label="Utilisation" />
            <StatCard icon={TrendingUp} value={analytics.quality} label="Quality score" />
            <StatCard icon={TrendingUp} value={analytics.missRate} label="Miss rate" tone="error" />
          </motion.div>
          <motion.div variants={item}>
            <div className="px-1 text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground">Sessions per week</div>
            <Card className="rounded-[20px] border-border p-4">
              <div className="flex h-24 items-end gap-3">
                {analytics.weekly.map((w, i) => (
                  <motion.div
                    key={w}
                    initial={{ height: 0 }}
                    animate={{ height: `${w}%` }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: 'easeOut' }}
                    className={`flex-1 rounded-t-[10px] ${barColors[i]}`}
                  />
                ))}
              </div>
              <div className="mt-2 flex gap-3">
                {['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'].map((w) => (
                  <div key={w} className="flex-1 text-center text-[11px] font-bold text-muted-foreground">
                    {w}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <div className="px-1 text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground">Care category mix</div>
            <Card className="rounded-[20px] border-border p-4">
              <div className="flex flex-col gap-3">
                {analytics.mix.map((m) => (
                  <div key={m.label}>
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-medium text-foreground/80">{m.label}</span>
                      <span className="text-[13px] font-bold text-foreground">{m.value}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-tonal">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: m.value }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card className="flex items-start gap-3 rounded-[20px] border-0 bg-tonal p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-brand-ink">
                <TrendingUp className="size-5" />
              </span>
              <span className="text-xs font-medium leading-relaxed text-foreground/70">{analytics.watch}</span>
            </Card>
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <Button
          variant="secondary"
          className="h-13 w-full rounded-full"
          onClick={() => notify({ title: 'Export started', body: 'March analytics pack · revenue, utilisation and quality', kind: 'ok' })}
        >
          <FileDown className="size-4" />
          Export March analytics pack
        </Button>
      </FootBar>
    </Screen>
  )
}