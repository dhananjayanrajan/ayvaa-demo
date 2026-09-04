import { Mail, MapPin, Phone, User } from 'lucide-react'
import { CredentialCard } from '@/components/base/phone/credential-card'
import { Field } from '@/components/base/phone/field'
import { SectionHeader } from '@/components/sets/onboarding-set'

type Props = {
  form: { name: string; phone: string; email: string; address: string }
  saved: boolean
  changes: boolean
  stepsDone: number
  nameState: 'valid' | 'invalid' | 'empty'
  phoneState: 'valid' | 'invalid' | 'empty'
  emailState: 'valid' | 'invalid' | 'empty'
  addressState: 'valid' | 'invalid' | 'empty'
  onChange: (key: 'name' | 'phone' | 'email' | 'address', v: string) => void
}

export function ProfileEditor({ form, saved, changes, stepsDone, nameState, phoneState, emailState, addressState, onChange }: Props) {
  return (
    <>
      <SectionHeader label="Edit profile" done={saved} trailing={changes ? 'Unsaved' : saved ? 'Saved' : 'Current'} />
      <CredentialCard stepsDone={stepsDone} stepsTotal={4} footerNote="Changes are sealed in the audit log after saving.">
        <Field icon={User} label="Full name" htmlFor="a13-name" value={form.name} placeholder="Enter full name" state={nameState} invalidHint="Name must be at least 2 characters" onChange={(v) => onChange('name', v)} />
        <Field icon={Phone} label="Phone number" htmlFor="a13-phone" type="tel" value={form.phone} placeholder="98765 43210" state={phoneState} invalidHint="Enter a valid phone number" onChange={(v) => onChange('phone', v)} />
        <Field icon={Mail} label="Email address" htmlFor="a13-email" type="email" value={form.email} placeholder="you@example.com" state={emailState} invalidHint="Enter a valid email address" onChange={(v) => onChange('email', v)} />
        <Field icon={MapPin} label="Address" htmlFor="a13-address" value={form.address} placeholder="Enter full address" state={addressState} invalidHint="Address must be at least 5 characters" onChange={(v) => onChange('address', v)} />
      </CredentialCard>
    </>
  )
}
