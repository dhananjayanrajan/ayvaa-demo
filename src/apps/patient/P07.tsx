import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Section, rise, stagger } from '@/components/phone/kit'
import { EntryRow } from '@/components/notifications/NotificationsSet'
import { MarkAllReadButton } from '@/components/notifications/NotificationsSet'
import { FeedHero } from '@/components/notifications/NotificationsSet'
import { SegmentedTabs } from '@/components/phone/SegmentedTabs'
import { ActionCard } from '@/components/notifications/NotificationsSet'
import { CaughtUpCard } from '@/components/notifications/NotificationsSet'
import { SettingsCard } from '@/components/notifications/NotificationsSet'
import { buildEntries, buildStats } from '@/data/patientNotifications'
import type { FilterKey, NotificationEntry } from '@/data/patientNotifications'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

export function P07() {
  const { notify, markAllRead } = useDemo()
  const { navigate } = useRouter()
  const [filter, setFilter] = useState<FilterKey>('all')
  const [readKeys, setReadKeys] = useState<string[]>([])

  const baseEntries = useMemo(() => buildEntries(), [])
  const entries = baseEntries.map((e) => ({ ...e, unread: e.unread && !readKeys.includes(e.key) }))
  const stats = buildStats(entries)

  const feed = entries.filter((e) => !e.action)
  const actionItems = entries.filter((e) => e.action)
  const todayFeed = feed.filter((e) => e.group === 'today')
  const yesterdayFeed = feed.filter((e) => e.group === 'yesterday')

  function markAll() {
    if (stats.unreadCount === 0) return
    setReadKeys(baseEntries.map((e) => e.key))
    markAllRead()
    notify({ title: 'All caught up', body: 'Every notification marked as read', kind: 'ok' })
  }

  function openEntry(entry: NotificationEntry) {
    if (entry.unread) setReadKeys((keys) => [...keys, entry.key])
    navigate(entry.to)
  }

  return (
    <Screen>
      <AppBar
        title="Notifications"
        subtitle="Sent by the system · nobody pressed send"
        onBack={() => navigate('/patient/p06')}
        trailing={<MarkAllReadButton unreadCount={stats.unreadCount} onPress={markAll} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <FeedHero
                total={stats.total}
                actionCount={stats.actionCount}
                unreadCount={stats.unreadCount}
              />
            </motion.div>

            <motion.div variants={rise}>
              <SegmentedTabs
                tabs={[
                  { id: 'all', label: 'Everything', count: stats.total },
                  { id: 'action', label: 'Needs action', count: stats.actionCount },
                ]}
                value={filter}
                onChange={(f) => setFilter(f as FilterKey)}
                layoutId="p07-filter-pill"
                tone="white"
                labelSize="10px"
                tracking="0.1em"
                count="inline"
                whileTap={false}
              />
            </motion.div>

            {filter === 'all' && (
              <>
                <motion.div variants={rise} className="flex flex-col gap-3">
                  <Section label="Today" trailing={<Chip intent="success">{todayFeed.length}</Chip>} />
                  <Card>
                    <div className="flex flex-col gap-2 p-4">
                      {todayFeed.map((entry) => (
                        <EntryRow
                          key={entry.key}
                          entry={entry}
                          unread={entry.unread}
                          onPress={openEntry}
                        />
                      ))}
                    </div>
                  </Card>
                </motion.div>

                <motion.div variants={rise} className="flex flex-col gap-3">
                  <Section label="Yesterday" trailing={<Chip intent="neutral">{yesterdayFeed.length}</Chip>} />
                  <Card>
                    <div className="flex flex-col gap-2 p-4">
                      {yesterdayFeed.map((entry) => (
                        <EntryRow
                          key={entry.key}
                          entry={entry}
                          unread={entry.unread}
                          onPress={openEntry}
                        />
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </>
            )}

            <motion.div variants={rise}>
              <ActionCard entries={actionItems} oldestLabel="Monday" onPress={openEntry} />
            </motion.div>

            <AnimatePresence>
              {filter === 'action' && (
                <motion.div
                  key="caught-up"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <CaughtUpCard stats={stats} />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={rise}>
              <SettingsCard onPress={() => navigate('/patient/p29')} />
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of notifications" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
