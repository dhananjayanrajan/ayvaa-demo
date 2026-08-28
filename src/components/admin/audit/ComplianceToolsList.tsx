import { motion } from 'motion/react'
import { Lock, ShieldCheck } from 'lucide-react'
import { Card, rise } from '@/components/phone/kit'
import { useRouter } from '@/lib/router'
import { ListRow } from '@/components/admin/ui/ListRow'

export function ComplianceToolsList() {
  const { navigate } = useRouter()
  return (
    <motion.div variants={rise}>
      <Card>
        <div>
          <ListRow
            icon={ShieldCheck}
            tone="success"
            title="Consent tracking"
            subtitle="1,102 active · 18 due · 2 withdrawn"
            onClick={() => navigate('/admin/a06')}
          />
        </div>
        <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
        <div>
          <ListRow
            icon={Lock}
            tone="ink"
            title="Retention policies"
            subtitle="7 policies · deletion queue running"
            onClick={() => navigate('/admin/a07')}
          />
        </div>
      </Card>
    </motion.div>
  )
}
