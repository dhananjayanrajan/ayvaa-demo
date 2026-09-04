import { motion } from 'motion/react'
import AgentAvatar from '@/components/base/smoothui/agent-avatar'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/base/phone/screen'
import { PolicyExportAction } from '@/components/patterns/actions/policy-export-action'
import {
  Chip,
  Section,
  rise,
  stagger,
} from '@/components/base/phone/kit'
import { deletionQueue, retentionPolicies } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { VaultHeroCard } from '@/components/patterns/cards/vault-hero-card'
import { RetentionPeriodsList } from '@/components/patterns/lists/retention-periods-list'
import { DeletionQueueList } from '@/components/patterns/lists/deletion-queue-list'
import { CryptoDeletionCard } from '@/components/patterns/cards/crypto-deletion-card'

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
        <PolicyExportAction onExport={() => notify({ title: 'Policy export queued', body: 'Full retention policy will be emailed to you', kind: 'info' })} />
      </FootBar>
    </Screen>
  )
}
