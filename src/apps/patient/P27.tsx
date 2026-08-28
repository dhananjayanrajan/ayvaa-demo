import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import {
  Check,
  CheckCheck,
  ChevronRight,
  ImagePlus,
  Link2,
  ScrollText,
  Send,
  ShieldCheck,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { supportChat, supportTickets } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type Msg = { id: number; from: string; text: string; time: string; mine: boolean }

export function P27() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const ticket = supportTickets[0]
  const endRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Msg[]>(() =>
    supportChat.map((m, i) => ({ id: i, from: m.from, text: m.text, time: m.time, mine: m.from === 'Priya' })),
  )
  const [draft, setDraft] = useState('')
  const [resolved, setResolved] = useState(false)

  const send = () => {
    const text = draft.trim()
    if (!text) return
    const now = new Date()
    const time = `${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`
    setMessages((prev) => [...prev, { id: Date.now(), from: 'Priya', text, time, mine: true }])
    setDraft('')
    notify({ title: 'Message sent', body: 'Kavya will reply in a few minutes', kind: 'ok' })
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, resolved])

  return (
    <Screen>
      <AppBar
        title="Ayvaa care team"
        subtitle={`${ticket.title} · replies in ~5 min`}
        onBack={() => navigate('/patient/p25')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              notify({
                title: 'Ticket details',
                body: `${ticket.title} · opened today · every reply is a permanent record`,
                kind: 'info',
              })
            }
            aria-label="Ticket details"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
          >
            <ScrollText className="size-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-4 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div className="relative flex items-center gap-3">
                  <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-[13px] font-black text-white shadow-[0_10px_22px_-10px_rgba(16,185,129,0.8)]">
                    K
                    <span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-emerald-300 ring-2 ring-[#0B231C]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0B231C]" />
                    </span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-[14px] font-extrabold tracking-tight text-white">Kavya · care team</span>
                      <span className="shrink-0 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-[0.14em] text-emerald-200">
                        Online
                      </span>
                    </div>
                    <p className="mt-0.5 truncate font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-100/45">
                      {ticket.title} · {messages.length} messages sealed
                    </p>
                  </div>
                  <Chip intent={resolved ? 'success' : 'live'} light dot={!resolved}>
                    {resolved ? 'Resolved' : 'Open'}
                  </Chip>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-center">
                  <span className="rounded-full bg-[#0B211B]/[0.05] px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
                    Today · ticket opened 11:04 AM
                  </span>
                </div>

                {messages.map((m, i) => (
                  <div key={m.id} className="contents">
                    {i > 0 && messages[i - 1].from !== m.from && (
                      <div className="flex justify-center pt-1">
                        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/30">
                          {m.from}
                        </span>
                      </div>
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      className={cn('flex w-full', m.mine ? 'justify-end' : 'justify-start')}
                    >
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          notify({ title: `${m.from} · ${m.time}`, body: 'Sealed in the permanent ticket record', kind: 'info' })
                        }
                        className={cn(
                          'max-w-[272px] rounded-[20px] p-3.5 text-left',
                          m.mine
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-[0_14px_30px_-16px_rgba(16,185,129,0.7)]'
                            : 'bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_14px_32px_-22px_rgba(11,33,27,0.28)]',
                        )}
                      >
                        <p
                          className={cn(
                            'font-serif text-pretty text-[13.5px] font-medium leading-relaxed',
                            m.mine ? 'text-white' : 'text-[#0B211B]/85',
                          )}
                        >
                          {m.text}
                        </p>
                        <div
                          className={cn(
                            'mt-1.5 flex items-center gap-1.5 text-[10px] font-bold',
                            m.mine ? 'justify-end text-emerald-50/70' : 'text-[#0B211B]/40',
                          )}
                        >
                          {m.mine && <CheckCheck className="h-3 w-3 shrink-0" strokeWidth={2.6} aria-hidden />}
                          <span className="truncate">
                            {m.from} · {m.time}
                          </span>
                        </div>
                      </motion.button>
                    </motion.div>
                  </div>
                ))}

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex w-full justify-start">
                  <div className="relative overflow-hidden rounded-[20px] bg-white p-3.5 shadow-[0_1px_2px_rgba(11,33,27,0.06),0_14px_32px_-22px_rgba(11,33,27,0.28)]">
                    <div className="flex items-center gap-1.5 font-mono text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-700/60">
                      <CheckCheck className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                      System update · 12:20 PM
                    </div>
                    <p className="mt-2 text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">
                      All Friday visits now start at 10:00 AM. Your consent record and visit log were updated automatically.
                    </p>
                    <div className="mt-2.5 flex items-center gap-2.5 border-t border-[#0B211B]/[0.06] pt-2.5">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-[10px] font-extrabold text-emerald-700">
                        A
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[11px] font-bold text-[#0B211B]/70">Ayvaa system · automatic</span>
                      <span className="shrink-0 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-700">
                        Sealed
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <div className="flex gap-2.5">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setResolved(true)
                    notify({ title: 'Ticket resolved', body: 'Change confirmed · record sealed · you can reopen anytime', kind: 'ok' })
                  }}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-[13px] font-bold transition-all duration-300',
                    resolved
                      ? 'bg-emerald-500/[0.1] text-emerald-700'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
                  )}
                >
                  <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                  <span className="truncate">{resolved ? 'Resolved' : 'Mark resolved'}</span>
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    notify({ title: 'Still open', body: 'The care team stays on this request until you confirm', kind: 'info' })
                  }
                  className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
                >
                  <span className="truncate">Still open</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Linked context" trailing={<Chip intent="success" icon={Link2}>1 visit</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate('/patient/p15')}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <Tile icon={ChevronRight} tone="success" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">Friday, March 15 · 10:00 AM</span>
                    <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">
                      Lakshmi Reddy · recurring · confirmed
                    </span>
                  </span>
                  <Chip intent="success">Updated</Chip>
                </motion.button>
                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate('/patient/p22')}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <Tile icon={ShieldCheck} tone="neutral" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">Consent record</span>
                    <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">
                      Re-confirmed automatically with this change
                    </span>
                  </span>
                  <Chip intent="success">Sealed</Chip>
                </motion.button>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={ScrollText} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  This conversation is part of the ticket record forever — readable by you and the care team, nobody else.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of conversation" />
            </motion.div>
            <div ref={endRef} />
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => notify({ title: 'Attach', body: 'Camera, gallery or visit PDF · sealed into the record', kind: 'info' })}
            aria-label="Attach"
            className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#0B211B]/[0.05] text-[#0B211B]/55 transition-colors hover:bg-[#0B211B]/[0.09]"
          >
            <ImagePlus className="size-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
          <div className="flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-2xl bg-[#0B211B]/[0.04] px-3.5 transition-colors focus-within:bg-emerald-500/[0.06] focus-within:shadow-[0_14px_30px_-18px_rgba(16,185,129,0.6)]">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Write a message…"
              className="min-w-0 flex-1 bg-transparent text-[13px] font-bold tracking-tight text-[#0B211B] outline-none placeholder:text-[#0B211B]/35"
            />
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            disabled={!draft.trim()}
            onClick={send}
            aria-label="Send"
            className={cn(
              'grid size-11 shrink-0 place-items-center rounded-2xl transition-all duration-300',
              draft.trim()
                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-[0_10px_22px_-10px_rgba(16,185,129,0.8)]'
                : 'bg-[#0B211B]/[0.06] text-[#0B211B]/30',
            )}
          >
            <Send className="size-[18px]" strokeWidth={2.4} aria-hidden />
          </motion.button>
        </div>
      </FootBar>
    </Screen>
  )
}
