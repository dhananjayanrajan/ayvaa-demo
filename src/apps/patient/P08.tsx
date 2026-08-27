import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Accessibility,
  Activity,
  ArrowUpDown,
  Baby,
  Brain,
  Flower2,
  HeartHandshake,
  Search,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Chip, Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { serviceCategories, services, type Service } from '@/data/services'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

function iconFor(s: Service): LucideIcon {
  if (s.name.startsWith('Certified')) return Stethoscope
  if (s.name.startsWith('Post-operative')) return HeartHandshake
  if (s.name.startsWith('Physio')) return Activity
  if (s.name.startsWith('Pediatric')) return Baby
  if (s.name.startsWith('Chronic')) return Brain
  if (s.name.startsWith('Palliative')) return Flower2
  if (s.name.startsWith('Disability')) return Accessibility
  if (s.name.startsWith('Special')) return Sparkles
  return HeartHandshake
}

function ServiceRow({ service, onOpen }: { service: Service; onOpen: (s: Service) => void }) {
  const Icon = iconFor(service)
  return (
    <button onClick={() => onOpen(service)} className="flex w-full items-center gap-3 px-2 py-1.5 text-left">
      <IconTile icon={Icon} tone="mint" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-bold text-foreground">{service.name}</div>
        <div className="truncate text-xs font-medium text-muted-foreground">{service.detail}</div>
      </div>
      <Pill tone="grey">From {service.from}</Pill>
    </button>
  )
}

export function P08() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [category, setCategory] = useState<string>('All services')

  const filtered = category === 'All services' ? services : services.filter((s) => s.category === category)

  const open = (s: Service) => {
    notify({ title: s.name, body: 'Starting a booking for this service', kind: 'ok' })
    navigate('/patient/p09')
  }

  return (
    <Screen>
      <AppBar
        title="Find care"
        onBack={() => navigate('/patient/p06')}
        trailing={
          <button
            onClick={() => notify({ title: 'Filters', body: 'Price, distance and language filters arrive with booking', kind: 'info' })}
            className="grid size-10.5 shrink-0 place-items-center rounded-full bg-tonal text-foreground/70 transition-colors hover:bg-mint"
            aria-label="Filters"
          >
            <SlidersHorizontal className="size-5" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <button
              onClick={() => notify({ title: 'Search', body: 'Type to search across all Ayvaa services', kind: 'info' })}
              className="flex h-[54px] w-full items-center gap-2.5 rounded-full border border-border bg-card px-4 text-left"
            >
              <Search className="size-5 shrink-0 text-muted-foreground" />
              <span className="flex-1 text-sm font-medium text-foreground">home care</span>
              <X className="size-4 text-muted-foreground" />
            </button>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-2">
            {serviceCategories.map((c) => (
              <Chip key={c} on={category === c} onClick={() => setCategory(c)}>
                {c}
              </Chip>
            ))}
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader
              label={`${filtered.length} services found`}
              action="Sort · nearest first"
              onAction={() => notify({ title: 'Sort', body: 'Nearest caregivers first · based on care address', kind: 'info' })}
            />
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {filtered.map((s, i) => (
                <div key={s.id}>
                  {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                  <ServiceRow service={s} onOpen={open} />
                </div>
              ))}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={Sparkles}
              body="Not sure what you need? Describe your situation and we will match the right service and caregiver."
            />
          </motion.div>

          <motion.div variants={item}>
            <button
              onClick={() => notify({ title: 'Guided matching', body: 'A few questions and we will suggest the right care', kind: 'info' })}
              className="flex w-full items-center justify-center gap-2 text-[13px] font-bold text-primary"
            >
              <ArrowUpDown className="size-4" /> Let Ayvaa match the care for me
            </button>
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of catalogue" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
