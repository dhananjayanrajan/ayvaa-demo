import { Activity, AlertTriangle, CalendarCheck, ChevronRight, Settings, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Fade, Screen } from '@/components/phone/Screen'
import { Avatar, Pill, StatCard } from '@/components/phone/Controls'
import { Card } from '@/components/ui/card'
import { useRouter } from '@/lib/router'
import { adminAttention, adminMetrics } from '@/data/seed'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function A01() {
  const { navigate } = useRouter()

  return (
    <Screen>
      <AppBar
        title="Operations console"
        subtitle="Ayvaa HQ · live"
        onBack={() => navigate('/')}
        trailing={
          <Avatar tone="ink" className="size-10.5">
            <Settings className="size-5" />
          </Avatar>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item} className="flex gap-3">
            <StatCard icon={CalendarCheck} value={adminMetrics.activeBookings} label="Active bookings" tone="mint" />
            <StatCard icon={Activity} value={adminMetrics.sessionsToday} label="Sessions today" />
          </motion.div>
          <motion.div variants={item} className="flex gap-3">
            <StatCard icon={ShieldCheck} value={adminMetrics.verified} label="Sessions verified" />
            <button onClick={() => navigate('/admin/a02')} className="flex-1">
              <StatCard icon={AlertTriangle} value={String(adminMetrics.openIncidents)} label="Open incidents" tone="error" />
            </button>
          </motion.div>
          <motion.div variants={item}>
            <Card className="rounded-[20px] border-border p-2">
              <div className="px-2 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground">
                Needs attention now
              </div>
              {adminAttention.map((a, i) => (
                <button
                  key={a.title}
                  onClick={() => navigate(i === 1 ? '/admin/a03' : i === 2 ? '/admin/a06' : '/admin/a01')}
                  className="flex w-full items-center gap-3 px-2 py-2.5 text-left"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-tonal text-foreground/70">
                    <AlertTriangle className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-foreground">{a.title}</span>
                    <span className="block truncate text-xs font-medium text-muted-foreground">{a.body}</span>
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </button>
              ))}
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card className="flex items-center gap-3 rounded-[20px] border-0 bg-tonal p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-brand-ink">
                <Activity className="size-5 animate-pulse" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-foreground">{adminMetrics.liveSessions} sessions live right now</span>
                <span className="block text-xs font-medium text-muted-foreground">GPS-verified check-ins across Hyderabad</span>
              </span>
              <Pill tone="ok">Live</Pill>
            </Card>
          </motion.div>
        </motion.div>
      </BodyArea>
      <Fade />
    </Screen>
  )
}