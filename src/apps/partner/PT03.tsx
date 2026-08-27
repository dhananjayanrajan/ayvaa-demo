import { motion } from 'motion/react'
import { Send, ShieldCheck } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import AnimatedTags from '@/components/smoothui/animated-tags'
import AnimatedFileUpload from '@/components/smoothui/animated-file-upload'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Field } from '@/components/phone/Controls'
import { useDemo } from '@/lib/store'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const categories = ['Elderly care', 'Post-operative', 'Chronic care', 'Pediatric', 'Palliative', 'Disability']

export function PT03() {
  const { notify } = useDemo()
  return (
    <Screen>
      <AppBar title="Refer a patient" subtitle="Sunrise Multispeciality Hospital" />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <InfoCard icon={ShieldCheck} body="Referrals are shared only with Ayvaa's care team. The guardian consents before any caregiver is matched." />
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Patient details" />
          </motion.div>
          <motion.div variants={item}>
            <Field label="Full name" value="Mrs. Shanta Iyer" hint="Patient's full name" onClick={() => notify({ title: 'Patient', body: 'Mrs. Shanta Iyer · 71 · referred by Dr. Venkatesh', kind: 'info' })} />
          </motion.div>
          <motion.div variants={item}>
            <Field label="Age" value="71" hint="Age" onClick={() => notify({ title: 'Age', body: '71 years · post-operative hip recovery', kind: 'info' })} />
          </motion.div>
          <motion.div variants={item}>
            <Field label="Guardian phone" value="+91 98450 12345" hint="Guardian's mobile number" onClick={() => notify({ title: 'Guardian', body: 'Priya Sharma · daughter · primary contact', kind: 'info' })} />
          </motion.div>
          <motion.div variants={item}>
            <Field label="Care address" value="Jubilee Hills, Hyderabad" hint="Area, Hyderabad" onClick={() => notify({ title: 'Care address', body: 'Jubilee Hills, Hyderabad · verified by Ayvaa', kind: 'info' })} />
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Care category" />
          </motion.div>
          <motion.div variants={item}>
            <AnimatedTags initialTags={categories} selectedTags={['Post-operative']} />
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Discharge summary" />
          </motion.div>
          <motion.div variants={item}>
            <AnimatedFileUpload
              accept=".pdf"
              onFilesSelected={(files) =>
                notify({ title: 'File attached', body: `${files.length} file(s) ready to send`, kind: 'ok' })
              }
            />
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Recommended plan" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="flex flex-col gap-2.5">
              <Field value="Post-operative care" hint="Plan" icon={ShieldCheck} onClick={() => notify({ title: 'Plan', body: 'Post-operative care · clinical recommendation', kind: 'info' })} />
              <Field value="6 weeks · 3 visits a week" hint="Duration" icon={ShieldCheck} onClick={() => notify({ title: 'Duration', body: '6 weeks · 3 visits a week', kind: 'info' })} />
              <Field value="Recovery assistant preferred" hint="Caregiver" icon={ShieldCheck} onClick={() => notify({ title: 'Caregiver', body: 'Recovery assistant preferred by the family', kind: 'info' })} />
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <EndOfScroll label="End of referral" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton
          variant="default"
          shape="pill"
          size="lg"
          className="w-full"
          onClick={() => notify({ title: 'Referral sent', body: 'Ayvaa care team will reach the guardian within 2 hours', kind: 'ok' })}
        >
          <Send className="size-4" /> Send referral to Ayvaa
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}