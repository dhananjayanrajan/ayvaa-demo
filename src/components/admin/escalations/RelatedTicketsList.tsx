import { motion } from 'motion/react'
import { Link2 } from 'lucide-react'
import { Card, rise } from '@/components/phone/kit'
import { escalatedTickets } from '@/data/seed'
import { ListRow } from '@/components/admin/ui/ListRow'

type NotifyFn = (payload: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void

interface RelatedTicketsListProps {
  notify: NotifyFn
}

export function RelatedTicketsList({ notify }: RelatedTicketsListProps) {
  const [, e2, e3] = escalatedTickets

  return (
    <motion.div variants={rise}>
      <Card>
        {[e2, e3].map((e, i) => (
          <div key={e.title}>
            <ListRow
              icon={Link2}
              title={e.title}
              subtitle={e.meta}
              onClick={() =>
                notify({
                  title: 'Ticket opened',
                  body: `${e.title} · ${i === 0 ? 'linked receipts attached' : 'usage report attached'}`,
                  kind: 'info',
                })
              }
            />
          </div>
        ))}
      </Card>
    </motion.div>
  )
}
