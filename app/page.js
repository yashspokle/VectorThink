'use client'

import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import ProgressRings from '../components/ProgressRings/ProgressRings'
import CognitivePanel from '../components/CognitivePanel/CognitivePanel'
import styles from './page.module.css'

// Decide which part of day we're in
function getTimePeriod(hour) {
  if (hour >= 6 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 21) return 'evening'
  return 'night'
}

// Messages grouped by time period
const GREETING_MESSAGES = {
  morning: [
    "A calm start goes a long way",
    "Ready to get into it",
    "A good time to begin",
    "Steady start, clear mind"
  ],
  afternoon: [
    "Hope the day is treating you well",
    "Keep the momentum going",
    "Good to have you here",
    "A little progress still counts"
  ],
  evening: [
    "A good time to settle in",
    "Nice to have you back",
    "Ease in and keep moving",
    "The evening is yours"
  ],
  night: [
    "It's late — but you're here",
    "Still going, and that counts",
    "Quiet hours, clear focus",
    "A little progress before rest",
    "Glad you're here tonight"
  ]
}

// Pick one message for the current period
function getGreetingForPeriod(period) {
  const messages = GREETING_MESSAGES[period]
  const index = Math.floor(Math.random() * messages.length)
  return {
    period,
    text: messages[index]
  }
}

// Returns ms until the next period boundary
function getMsUntilNextBoundary(now = new Date()) {
  const next = new Date(now)

  if (now.getHours() < 6) {
    next.setHours(6, 0, 0, 0)
  } else if (now.getHours() < 12) {
    next.setHours(12, 0, 0, 0)
  } else if (now.getHours() < 17) {
    next.setHours(17, 0, 0, 0)
  } else if (now.getHours() < 21) {
    next.setHours(21, 0, 0, 0)
  } else {
    next.setDate(next.getDate() + 1)
    next.setHours(6, 0, 0, 0)
  }

  return next.getTime() - now.getTime()
}

// Session-locked greeting that only changes when the time period changes
function useStableGreeting() {
  const [greeting, setGreeting] = useState({ text: '', period: '' })

  useEffect(() => {
    const now = new Date()
    const period = getTimePeriod(now.getHours())
    const sessionKey = 'dashboardGreeting'

    const storedRaw = sessionStorage.getItem(sessionKey)

    if (storedRaw) {
      try {
        const stored = JSON.parse(storedRaw)

        if (stored.period === period && stored.text) {
          setGreeting(stored)
        } else {
          const freshGreeting = getGreetingForPeriod(period)
          sessionStorage.setItem(sessionKey, JSON.stringify(freshGreeting))
          setGreeting(freshGreeting)
        }
      } catch {
        const freshGreeting = getGreetingForPeriod(period)
        sessionStorage.setItem(sessionKey, JSON.stringify(freshGreeting))
        setGreeting(freshGreeting)
      }
    } else {
      const freshGreeting = getGreetingForPeriod(period)
      sessionStorage.setItem(sessionKey, JSON.stringify(freshGreeting))
      setGreeting(freshGreeting)
    }

    let timeoutId

    const scheduleNextUpdate = () => {
      const delay = getMsUntilNextBoundary()
      timeoutId = setTimeout(() => {
        const currentPeriod = getTimePeriod(new Date().getHours())
        const nextGreeting = getGreetingForPeriod(currentPeriod)
        sessionStorage.setItem(sessionKey, JSON.stringify(nextGreeting))
        setGreeting(nextGreeting)
        scheduleNextUpdate()
      }, delay)
    }

    scheduleNextUpdate()

    return () => clearTimeout(timeoutId)
  }, [])

  return greeting
}

// Animates a number from 0 to target
function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let start = null
    let frameId = null

    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setValue(Math.floor(eased * target))

      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      }
    }

    frameId = requestAnimationFrame(step)

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [target, duration])

  return value
}

// Stat card with animated number
function StatCard({ label, value, suffix = '' }) {
  const numeric = parseInt(String(value).replace(/[^0-9]/g, ''), 10) || 0
  const animated = useCountUp(numeric, 1000)
  const display = `${animated}${suffix}`

  return (
    <div className={styles.card}>
      <span className={styles.cardLabel}>{label}</span>
      <span className={styles.cardValue}>{display}</span>
    </div>
  )
}

export default function DashboardPage() {
  const greeting = useStableGreeting()

  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      )
    }

    tick()
    const id = setInterval(tick, 1000)

    return () => clearInterval(id)
  }, [])

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.greeting}>
              {greeting.text || 'Welcome'}
            </h1>
            <p className={styles.sub}>
              Your cognitive state is ready. Let&apos;s learn.
            </p>
          </div>

          <div className={styles.clock}>{time}</div>
        </div>

        <div className={styles.statRow}>
          <StatCard label="Sessions today" value="3" />
          <StatCard label="Mastery score" value="74" suffix="%" />
          <StatCard label="Streak" value="12" suffix=" days" />
          <StatCard label="Next review" value="2" suffix="h" />
        </div>

        <div className={styles.twoCol}>
          <div>
            <p className={styles.sectionLabel}>Subject mastery</p>
            <ProgressRings />
          </div>

          <div>
            <p className={styles.sectionLabel}>Cognitive vitals</p>
            <CognitivePanel />
          </div>
        </div>
      </main>
    </div>
  )
}