import { motion } from 'motion/react'
import { Download } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import {
  Chip,
  Section,
  rise,
  stagger,
} from '@/components/phone/kit'
import { deletionQueue, retentionPolicies } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { VaultHeroCard } from '@/components/admin/retention/VaultHeroCard'
import { RetentionPeriodsList } from '@/components/admin/retention/RetentionPeriodsList'
import { DeletionQueueList } from '@/components/admin/retention/DeletionQueueList'
import { CryptoDeletionCard } from '@/components/admin/retention/CryptoDeletionCard'

export function A07() {
  const { notify } = useDemo()
  const running = deletionQueue.filter((d) => d.state === 'Running').length

  return (
    <Screen>
      <AppBar
        title="Retention policies"
        subtitle="How long Ayvaa keeps data"
        trailing={<AgentAvatar seed="ayvaa-retention" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.12] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <VaultHeroCard />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Retention periods" trailing={<Chip intent="neutral">{retentionPolicies.length} rules</Chip>} />
            </motion.div>

            <RetentionPeriodsList />

            <motion.div variants={rise}>
              <Section label="Deletion queue" trailing={<Chip intent="warning" dot={running > 0}>{deletionQueue.length} items</Chip>} />
            </motion.div>

            <DeletionQueueList />

            <CryptoDeletionCard />

            <motion.div variants={rise}>
              <EndOfScroll label="End of retention" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => notify({ title: 'Policy export queued', body: 'Full retention policy will be emailed to you', kind: 'info' })}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.7)]"
        >
          <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Export policy
        </motion.button>
      </FootBar>
    </Screen>
  )
}
