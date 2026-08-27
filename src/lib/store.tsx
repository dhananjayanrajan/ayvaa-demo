import { createContext, useContext, useState, type ReactNode } from 'react'

export type Notification = {
  id: string
  title: string
  body?: string
  time: string
  kind: 'ok' | 'warn' | 'error' | 'info'
  read?: boolean
}

export type TrailEvent = {
  id: string
  time: string
  title: string
  body: string
  state: 'done' | 'now' | 'pending'
}

export type DispatchState = {
  round: number
  waiting: number
  declined: number
  recheck: number
  expiresAt: string
  minutesLeft: number
}

type DemoStore = {
  notifications: Notification[]
  notify: (n: Omit<Notification, 'id' | 'read'>) => void
  markAllRead: () => void
  trail: TrailEvent[]
  pushTrail: (e: Omit<TrailEvent, 'id'>) => void
  dispatch: DispatchState
  setDispatch: (d: Partial<DispatchState>) => void
  incidents: number
  setIncidents: (n: number) => void
}

const DemoContext = createContext<DemoStore | null>(null)

let seq = 0

export function DemoProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [trail, setTrail] = useState<TrailEvent[]>([])
  const [dispatch, setDispatchState] = useState<DispatchState>({
    round: 2,
    waiting: 5,
    declined: 2,
    recheck: 1,
    expiresAt: '9:45 AM',
    minutesLeft: 17,
  })
  const [incidents, setIncidents] = useState(3)

  const notify = (n: Omit<Notification, 'id' | 'read'>) => {
    const item = { ...n, id: `n${++seq}`, read: false }
    setNotifications((prev) => [item, ...prev])
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const pushTrail = (e: Omit<TrailEvent, 'id'>) => {
    setTrail((prev) => [...prev, { ...e, id: `t${++seq}` }])
  }

  const setDispatch = (d: Partial<DispatchState>) => {
    setDispatchState((prev) => ({ ...prev, ...d }))
  }

  return (
    <DemoContext.Provider
      value={{
        notifications,
        notify,
        markAllRead,
        trail,
        pushTrail,
        dispatch,
        setDispatch,
        incidents,
        setIncidents,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}

export function useDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo must be used within DemoProvider')
  return ctx
}