'use client'

import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import ProgressRings from '../components/ProgressRings/ProgressRings'
import CognitivePanel from '../components/CognitivePanel/CognitivePanel'
import styles from './page.module.css'

function getTimePeriod(hour) {
  if (hour >= 6 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 21) return 'evening'
  return 'night'
}

const GREETING_MESSAGES = {
  morning:   ["A calm start goes a long way", "Ready to get into it", "A good time to begin", "Steady start, clear mind"],
  afternoon: ["Hope the day is treating you well", "Keep the momentum going", "Good to have you here", "A little progress still counts"],
  evening:   ["A good time to settle in", "Nice to have you back", "Ease in and keep moving", "The evening is yours"],
  night:     ["It's late — but you're here", "Still going, and that counts", "Quiet hours, clear focus", "A little progress before rest", "Glad you're here tonight"],
}

function getGreetingForPeriod(period) {
  const messages = GREETING_MESSAGES[period]
  return { period, text: messages[Math.floor(Math.random() * messages.length)] }
}

function getMsUntilNextBoundary(now = new Date()) {
  const next = new Date(now)
  if (now.getHours() < 6)       next.setHours(6, 0, 0, 0)
  else if (now.getHours() < 12) next.setHours(12, 0, 0, 0)
  else if (now.getHours() < 17) next.setHours(17, 0, 0, 0)
  else if (now.getHours() < 21) next.setHours(21, 0, 0, 0)
  else { next.setDate(next.getDate() + 1); next.setHours(6, 0, 0, 0) }
  return next.getTime() - now.getTime()
}

function useStableGreeting() {
  const [greeting, setGreeting] = useState({ text: '', period: '' })
  useEffect(() => {
    const now    = new Date()
    const period = getTimePeriod(now.getHours())
    const key    = 'dashboardGreeting'
    const raw    = sessionStorage.getItem(key)
    if (raw) {
      try {
        const stored = JSON.parse(raw)
        if (stored.period === period && stored.text) { setGreeting(stored); }
        else { const g = getGreetingForPeriod(period); sessionStorage.setItem(key, JSON.stringify(g)); setGreeting(g) }
      } catch { const g = getGreetingForPeriod(period); sessionStorage.setItem(key, JSON.stringify(g)); setGreeting(g) }
    } else { const g = getGreetingForPeriod(period); sessionStorage.setItem(key, JSON.stringify(g)); setGreeting(g) }
    let tid
    const schedule = () => { tid = setTimeout(() => { const p = getTimePeriod(new Date().getHours()); const g = getGreetingForPeriod(p); sessionStorage.setItem(key, JSON.stringify(g)); setGreeting(g); schedule() }, getMsUntilNextBoundary()) }
    schedule()
    return () => clearTimeout(tid)
  }, [])
  return greeting
}

function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let start = null, fid = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setValue(Math.floor((1 - Math.pow(1 - p, 4)) * target))
      if (p < 1) fid = requestAnimationFrame(step)
    }
    fid = requestAnimationFrame(step)
    return () => { if (fid) cancelAnimationFrame(fid) }
  }, [target, duration])
  return value
}

function StatCard({ label, value, suffix = '' }) {
  const numeric  = parseInt(String(value).replace(/[^0-9]/g, ''), 10) || 0
  const animated = useCountUp(numeric, 1000)
  return (
    <div className={styles.card}>
      <span className={styles.cardLabel}>{label}</span>
      <span className={styles.cardValue}>{animated}{suffix}</span>
    </div>
  )
}

export default function DashboardPage() {
  const greeting = useStableGreeting()
  const [time, setTime]           = useState('')

  // ── NEW: controls whether cognitive panel is visible ──
  const [showPanel, setShowPanel] = useState(true)

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.greeting}>{greeting.text || 'Welcome'}</h1>
            <p className={styles.sub}>Your cognitive state is ready. Let&apos;s learn.</p>
          </div>
          <div className={styles.clock}>{time}</div>
        </div>

        {/* Stat cards */}
        <div className={styles.statRow}>
          <StatCard label="Sessions today" value="3" />
          <StatCard label="Mastery score"  value="74" suffix="%" />
          <StatCard label="Streak"         value="12" suffix=" days" />
          <StatCard label="Next review"    value="2"  suffix="h" />
        </div>

        {/* Section row header — label left, toggle button right */}
        <div className={styles.twoColHeader}>
          <p className={styles.sectionLabel}>Subject mastery</p>
          <div className={styles.panelToggleRow}>
            <p className={styles.sectionLabel}>Cognitive vitals</p>
            {/* Toggle button — text changes based on showPanel state */}
            <button
              className={styles.toggleBtn}
              onClick={() => setShowPanel(prev => !prev)}
            >
              {showPanel ? 'Hide panel' : 'Show panel'}
            </button>
          </div>
        </div>

        {/* Two column grid */}
        <div className={styles.twoCol}>
          <div><ProgressRings /></div>

          {/* Only render panel if showPanel is true */}
          {/* The CSS transition handles the smooth hide/show */}
          {showPanel && (
            <div className={styles.panelWrapper}>
              <CognitivePanel />
            </div>
          )}
        </div>

      </main>
    </div>
  )
}