import { Cake, CheckCircle2, ClipboardList, FileText, Home, Mail, Pill, PersonStanding, Send, ShieldCheck, StickyNote } from 'lucide-react'
import { motion } from 'motion/react'
import { useDemo } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, FootBar, Screen } from '@/components/phone/Screen'
import { Chip, Field, SectionLabel } from '@/components/phone/Controls'
import { referrals } from '@/data/seed'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

const categories = ['Elderly', 'Post-operative', 'Chronic', 'Pediatric', 'Palliative', 'Disability']

export function PT03() {
  const { notify } = useDemo()
  const patient = referrals[0]

  return (
    <Screen>
      <AppBar title="Refer a patient" />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <Card className="flex items-start gap-3 rounded-[20px] border-0 bg-tonal p-4">
              <ShieldCheck className="mt-0.5 size-5.5 shrink-0 text-primary" />
              <p className="text-[13px] font-medium leading-[19px] text-muted-foreground">
                The patient&apos;s guardian approves everything before care starts. Ayvaa never begins care on a
                referral alone.
              </p>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <SectionLabel>Patient details</SectionLabel>
          </motion.div>
          <motion.div variants={item} className="flex flex-col gap-2">
            <Field icon={PersonStanding} value={patient.name} />
            <Field icon={Cake} value={`Age ${patient.age}`} />
            <Field icon={Mail} hint="Guardian phone number" />
            <Field icon={Home} hint="Home address for visits" />
          </motion.div>
          <motion.div variants={item}>
            <SectionLabel>Care category needed</SectionLabel>
          </motion.div>
          <motion.div variants={item} className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Chip key={c} on={c === 'Post-operative'}>
                {c}
              </Chip>
            ))}
          </motion.div>
          <motion.div variants={item}>
            <SectionLabel>Discharge summary</SectionLabel>
          </motion.div>
          <motion.div variants={item}>
            <Card className="flex items-center gap-3 rounded-[20px] p-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-error-bg text-destructive">
                <FileText className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-foreground">shanta-discharge.pdf</span>
                <span className="block truncate text-xs font-medium text-muted-foreground">
                  Attached from hospital records · shared with consent
                </span>
              </span>
              <CheckCircle2 className="size-5 shrink-0 text-primary" />
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <SectionLabel>Recommended care plan</SectionLabel>
          </motion.div>
          <motion.div variants={item}>
            <Card className="flex flex-col gap-2 rounded-[20px] p-3">
              <Field icon={ClipboardList} value="Hip recovery · 6 weeks · 3 visits weekly" />
              <Field icon={Pill} hint="Medication instructions · optional" />
              <Field icon={StickyNote} hint="Notes for the care team · optional" />
            </Card>
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <Button
          onClick={() => notify({ title: 'Referral sent', body: `${patient.name} · guardian gets a call within one hour`, kind: 'ok' })}
          className="h-13 w-full rounded-full text-[15px] font-bold"
        >
          <Send className="size-5" />
          Send referral to Ayvaa
        </Button>
        <div className="text-center text-xs font-medium text-muted-foreground">
          The guardian gets a call within one hour to give consent.
        </div>
      </FootBar>
    </Screen>
  )
}