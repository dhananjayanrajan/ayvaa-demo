import { motion } from 'motion/react'
import { Building2, ReceiptText, UserPlus, Users } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { ActionRow, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill, StatCard } from '@/components/phone/Controls'
import { partner, referrals } from '@/data/seed'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function PT02() {
  const { navigate } = useRouter()
  return (
    <Screen>
      <AppBar
        title="Care partnership"
        subtitle={partner.location}
        trailing={<AgentAvatar seed="sunrise" size={42} />}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item} className="flex gap-3">
            <StatCard icon={UserPlus} value={String(partner.referred)} label="Referred" tone="mint" />
            <StatCard icon={Users} value={String(partner.activeCare)} label="In care" />
          </motion.div>
          <motion.div variants={item} className="flex gap-3">
            <StatCard icon={Building2} value={String(partner.staffOnAyvaa)} label="Staff on Ayvaa" />
            <StatCard icon={ReceiptText} value={String(partner.sessionsThisMonth)} label="Sessions" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="p-2">
              <ActionRow
                icon={UserPlus}
                title="Refer a patient for home care"
                subtitle="Discharge summary · category · plan"
                onClick={() => navigate('/partner/pt03')}
              />
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Referred patients" action="See all" onAction={() => navigate('/partner/pt04')} />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {referrals.map((r) => (
                <div key={r.id} className="px-2 py-1.5">
                  <ActionRow
                    icon={r.status === 'active' ? Users : UserPlus}
                    title={`${r.name} · ${r.age}`}
                    subtitle={`${r.condition} · ${r.progress} · ${r.visits}`}
                    trailing={<Pill tone={r.status === 'active' ? 'ok' : 'warn'}>{r.status === 'active' ? 'Active' : 'Matching'}</Pill>}
                    onClick={() => navigate('/partner/pt04')}
                  />
                </div>
              ))}
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <ActionRow
                icon={ReceiptText}
                title="February invoice"
                subtitle="₹2,18,400 · 42 sessions · paid Mar 5"
                onClick={() => navigate('/partner/pt07')}
              />
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <EndOfScroll label="End of partnership" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}