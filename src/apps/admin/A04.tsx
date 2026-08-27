import { useState } from 'react'
import { motion } from 'motion/react'
import { AlertTriangle, Building2, Eye, HeartHandshake, MapPin, Phone, Search, Stethoscope } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import SmoothButton from '@/components/smoothui/smooth-button'
import AnimatedTabs from '@/components/smoothui/animated-tabs'
import SearchableDropdown from '@/components/smoothui/searchable-dropdown'
import DropdownMenu from '@/components/smoothui/dropdown-menu'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { ActionRow, IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { flaggedAccount, recentActivity } from '@/data/seed'
import { useDemo } from '@/lib/store'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const iconMap: Record<string, typeof Eye> = {
  Partner: Building2,
  Guardian: HeartHandshake,
  RN: Stethoscope,
}

export function A04() {
  const { notify } = useDemo()
  const [filter, setFilter] = useState('all')
  const visible = filter === 'all' ? recentActivity : recentActivity.filter((a) => a.role.toLowerCase() === filter)

  return (
    <Screen>
      <AppBar
        title="Accounts"
        subtitle="Patients · professionals · partners"
        trailing={<AgentAvatar seed="ayvaa-accounts" size={42} />}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <SearchableDropdown
              label="Search accounts"
              placeholder="Name, phone, licence…"
              items={[
                { id: 'rao', label: 'Mr. Ramesh Rao', description: 'Patient · Banjara Hills', icon: <Search className="size-4" /> },
                { id: 'iyer', label: 'Mrs. Shanta Iyer', description: 'Patient · Jubilee Hills', icon: <Search className="size-4" /> },
                { id: 'deshmukh', label: 'Arjun Deshmukh', description: 'Professional · RN', icon: <Search className="size-4" /> },
                { id: 'sunrise', label: 'Sunrise Multispeciality', description: 'Partner · Begumpet', icon: <Search className="size-4" /> },
              ]}
              onChange={(id) => notify({ title: 'Account opened', body: `Viewing ${id} · access logged`, kind: 'info' })}
            />
          </motion.div>
          <motion.div variants={item}>
            <AnimatedTabs
              tabs={[
                { id: 'all', label: 'All' },
                { id: 'patients', label: 'Patients' },
                { id: 'professionals', label: 'Professionals' },
                { id: 'partners', label: 'Partners' },
              ]}
              variant="pill"
              defaultTab="all"
              onChange={setFilter}
            />
          </motion.div>
          <motion.div variants={item} className={filter === 'all' ? undefined : 'hidden'}>
            <ScreenCard tone="error">
              <div className="flex items-start gap-3">
                <IconTile icon={AlertTriangle} tone="destructive" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-destructive">{flaggedAccount.name} · flagged</div>
                  <div className="mt-0.5 text-[13px] font-medium leading-snug text-destructive/80">
                    {flaggedAccount.body}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {flaggedAccount.flags.map((t) => (
                  <Pill key={t} tone="warn">{t}</Pill>
                ))}
              </div>
              <div className="mt-3 flex gap-2.5">
                <SmoothButton variant="secondary" shape="pill" className="flex-1" onClick={() => notify({ title: 'Family contacted', body: 'Guardian called · outcome logged', kind: 'ok' })}>
                  <Phone className="size-4" /> Contact family
                </SmoothButton>
                <DropdownMenu
                  items={[
                    { key: 'area', label: 'Adjust care area', icon: <MapPin className="size-4" />, onSelect: () => notify({ title: 'Area adjusted', body: 'Care area widened · new offers will reach more professionals', kind: 'info' }) },
                    { key: 'pause', label: 'Pause account', icon: <AlertTriangle className="size-4" />, variant: 'destructive', onSelect: () => notify({ title: 'Account paused', body: 'No new offers until reactivated', kind: 'warn' }) },
                  ]}
                >
                  <SmoothButton variant="outline" shape="pill" className="flex-1">
                    Adjust area
                  </SmoothButton>
                </DropdownMenu>
              </div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Recent activity" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {visible.length === 0 && (
                <div className="px-2 py-6 text-center text-[13px] font-medium text-muted-foreground">No {filter} activity yet</div>
              )}
              {visible.map((a, i) => {
                const Icon = iconMap[a.role] ?? Eye
                return (
                  <div key={i} className="px-2 py-1.5">
                    <ActionRow
                      icon={Icon}
                      title={a.name}
                      subtitle={a.body}
                      trailing={<Pill tone={a.pill === 'Healthy' ? 'ok' : a.pill === 'None' ? 'grey' : 'warn'}>{a.pill}</Pill>}
                      onClick={() => notify({ title: 'Account opened', body: `${a.name} · access logged`, kind: 'info' })}
                    />
                  </div>
                )
              })}
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <InfoCard icon={Eye} body="Every account view is logged with your name. Flagged accounts stay visible to supervisors only." />
          </motion.div>
          <motion.div variants={item}>
            <EndOfScroll label="End of accounts" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}