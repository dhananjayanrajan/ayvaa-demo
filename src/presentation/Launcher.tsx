import { Activity, Building2, HeartPulse, ShieldCheck, Stethoscope, Users } from 'lucide-react'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const apps = [
  { id: 'patient', name: 'Patient & Guardian', screens: 34, icon: HeartPulse, home: '/patient/p01', desc: 'Book care, track visits, manage plans' },
  { id: 'professional', name: 'Professional', screens: 12, icon: Stethoscope, home: '/professional/pr01', desc: 'Offers, sessions, earnings' },
  { id: 'partner', name: 'Partner', screens: 7, icon: Building2, home: '/partner/pt01', desc: 'Referrals, staff, corporate billing' },
  { id: 'admin', name: 'Admin', screens: 9, icon: ShieldCheck, home: '/admin/a01', desc: 'Console, compliance, analytics' },
  { id: 'system', name: 'System', screens: 3, icon: Activity, home: '/system/s01', desc: 'Event trail, dispatch, notifications' },
]

export function Launcher() {
  const { navigate } = useRouter()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-[#0E1B17] px-8 py-14">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-mint text-brand-ink">
          <Users className="size-7" />
        </span>
        <h1 className="text-3xl font-black tracking-tight text-white">Ayvaa · Caregiver</h1>
        <p className="max-w-md text-sm font-medium text-white/50">
          On-demand homecare platform · Hyderabad · five applications, one presentation
        </p>
      </div>
      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((a) => {
          const Icon = a.icon
          return (
            <button
              key={a.id}
              onClick={() => navigate(a.home)}
              className={cn(
                'group flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left transition-all hover:border-mint/40 hover:bg-white/[0.07]',
                a.id === 'system' && 'sm:col-span-2 lg:col-span-1',
              )}
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-mint text-brand-ink">
                <Icon className="size-5.5" />
              </span>
              <span>
                <span className="block text-base font-bold text-white">{a.name}</span>
                <span className="mt-0.5 block text-xs font-medium text-white/50">{a.desc}</span>
              </span>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white/70">
                {a.screens} screens
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}