import { motion } from 'motion/react'
import {
  Award,
  CalendarDays,
  ChevronRight,
  Plus,
  Star,
  Stethoscope,
  Target,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { ActionRow, IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Avatar, Chip, Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { availability, certifications, professional, professionalSkills } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function PR11() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const initials = professional.name.split(' ').map((w) => w[0]).join('')
  const openDays = availability.filter((d) => !d.off)

  return (
    <Screen>
      <AppBar
        title="Professional profile"
        onBack={() => navigate('/professional/pr01')}
        trailing={
          <button
            onClick={() => notify({ title: 'Edit profile', body: 'Skills and certifications can be updated any time', kind: 'info' })}
            className="grid size-10.5 shrink-0 place-items-center rounded-full bg-tonal text-foreground/70 transition-colors hover:bg-mint"
            aria-label="Edit profile"
          >
            <Stethoscope className="size-5" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard className="flex items-center gap-3">
              <Avatar tone="alt" className="size-[58px]">
                {initials}
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="text-base font-bold text-foreground">{professional.name}</div>
                <div className="text-xs font-medium text-muted-foreground">{professional.role}</div>
                <div className="mt-0.5 flex items-center gap-1 text-xs font-bold text-foreground/70">
                  <Star className="size-3.5 fill-current text-[#DBA800]" /> {professional.rating} · {professional.visits} visits
                </div>
              </div>
              <Pill tone="ok">
                <Target className="size-3.5" /> {professional.years} yrs
              </Pill>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Certifications" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {certifications.map((c, i) => (
                <div key={c.name}>
                  {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                  <div className="flex items-center gap-3 px-2 py-1.5">
                    <IconTile icon={Award} tone={c.status === 'valid' ? 'mint' : 'tonal'} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-foreground">{c.name}</div>
                      <div className="truncate text-xs font-medium text-muted-foreground">
                        {c.status === 'valid' ? 'Verified by Ayvaa · current' : 'Uploaded · under review within 2 days'}
                      </div>
                    </div>
                    <Pill tone={c.status === 'valid' ? 'ok' : 'warn'}>{c.status === 'valid' ? 'Valid' : 'In review'}</Pill>
                  </div>
                </div>
              ))}
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <ActionRow
                icon={Plus}
                title="Add a certification"
                subtitle="Photo or PDF · verified within 2 days"
                onClick={() => notify({ title: 'Upload certification', body: 'Ayvaa verifies within two working days', kind: 'info' })}
              />
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Skills and care categories" />
          </motion.div>
          <motion.div variants={item} className="flex flex-wrap gap-2">
            {professionalSkills.map((s) => (
              <Chip key={s} on onClick={() => notify({ title: s, body: 'Part of your matched categories', kind: 'info' })}>
                {s}
              </Chip>
            ))}
            <Chip onClick={() => notify({ title: 'Add category', body: 'New categories need a matching certification', kind: 'info' })}>
              Add disability care
            </Chip>
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard tone="tonal" className="p-2">
              <button
                onClick={() => navigate('/professional/pr05')}
                className="flex w-full items-center gap-3 px-2 py-1.5 text-left"
              >
                <IconTile icon={CalendarDays} tone="mint" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-foreground">Availability</span>
                  <span className="block text-xs font-medium text-muted-foreground">
                    {openDays.length} days open · {openDays[0]?.day} from {openDays[0]?.hours}
                  </span>
                </span>
                <ChevronRight className="size-4.5 shrink-0 text-muted-foreground" />
              </button>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={Award}
              body="Families see your verified facts only: licence status, years of experience and rating. Documents stay private."
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of profile" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
