import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ShieldCheck } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Chip, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { ProfessionalHero } from '@/components/professional/auth/ProfessionalHero'
import { PasswordCard } from '@/components/professional/auth/PasswordCard'
import { StandingCard } from '@/components/professional/auth/StandingCard'
import { SecurityDevicesCard } from '@/components/professional/auth/SecurityDevicesCard'
import { CredentialsSheet } from '@/components/professional/auth/CredentialsSheet'
import { DevicesSheet } from '@/components/professional/auth/DevicesSheet'
import { professional } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

export function PR01() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [showPass, setShowPass] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [sheet, setSheet] = useState<'none' | 'creds' | 'devices'>('none')
  const close = () => setSheet('none')

  const unlock = () => {
    if (scanning) return
    setScanning(true)
    setTimeout(() => {
      notify({ title: 'Unlocked', body: 'Fingerprint matched · welcome back, Arjun', kind: 'ok' })
      navigate('/professional/pr02')
    }, 1100)
  }

  return (
    <Screen>
      <AppBar
        title="ayvaa+"
        subtitle="Professional access"
        trailing={
          <Chip intent="success" icon={ShieldCheck} className="border-transparent">
            Secure
          </Chip>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <ProfessionalHero scanning={scanning} onUnlock={unlock} />
            </motion.div>

            <motion.div variants={rise}>
              <PasswordCard
                email={professional.email}
                showPass={showPass}
                onTogglePass={() => setShowPass((v) => !v)}
                onSignIn={() => {
                  notify({ title: 'Welcome back', body: `Signed in as ${professional.name}`, kind: 'ok' })
                  navigate('/professional/pr02')
                }}
                onForgot={() => notify({ title: 'Reset link sent', body: `Check ${professional.email} · valid 30 minutes`, kind: 'info' })}
              />
            </motion.div>

            <motion.div variants={rise}>
              <StandingCard onViewCredentials={() => setSheet('creds')} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Security" trailing={<Chip intent="neutral" className="border-transparent">Managed by you</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <SecurityDevicesCard onOpenDevices={() => setSheet('devices')} />
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="success" className="flex items-start gap-3 p-4">
                <Tile icon={ShieldCheck} tone="success" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Your licence and screening stay visible to families as verified facts — never as documents.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Ayvaa · Hyderabad" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {sheet !== 'none' && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet === 'creds' && <CredentialsSheet onClose={close} />}
        {sheet === 'devices' && (
          <DevicesSheet
            onClose={close}
            onSignOutOthers={() => {
              close()
              notify({ title: 'Signed out everywhere', body: '2 other devices signed out · this phone stays active', kind: 'ok' })
            }}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
