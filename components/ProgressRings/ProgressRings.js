// ProgressRings.js
// Rings now animate — they draw in from 0 to their value on load
'use client'

import { useEffect, useState } from 'react'
import styles from './ProgressRings.module.css'

const SUBJECTS = [
  { name: 'Data Structures', percent: 74, color: '#534AB7' },
  { name: 'Algorithms',      percent: 58, color: '#1D9E75' },
  { name: 'OS Concepts',     percent: 45, color: '#D85A30' },
  { name: 'Computer Nets',   percent: 82, color: '#7F77DD' },
]

function Ring({ percent, color, delay = 0 }) {
  // Animate from 0 to actual percent on mount
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    // Small delay so each ring staggers its animation
    const timeout = setTimeout(() => {
      setCurrent(percent)
    }, delay)
    return () => clearTimeout(timeout)
  }, [percent, delay])

  const r = 36
  const circ = 2 * Math.PI * r
  const offset = circ - (current / 100) * circ

  return (
    <svg viewBox="0 0 90 90" width="90" height="90">
      {/* Background track */}
      <circle
        cx="45" cy="45" r={r}
        fill="none"
        stroke="var(--vt-border)"
        strokeWidth="8"
      />
      {/* Animated fill ring */}
      <circle
        cx="45" cy="45" r={r}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 45 45)"
        style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
      />
    </svg>
  )
}

export default function ProgressRings() {
  return (
    <div className={styles.wrapper}>
      {SUBJECTS.map((s, i) => (
        <div key={s.name} className={styles.ringCard}
          style={{ animationDelay: `${i * 0.1}s` }}>
          <div className={styles.svgWrapper}>
            {/* Each ring starts 150ms later than the previous */}
            <Ring percent={s.percent} color={s.color} delay={i * 150} />
            <span className={styles.ringLabel}>{s.percent}%</span>
          </div>
          <span className={styles.subject}>{s.name}</span>
          <span className={styles.tag}>mastery</span>
        </div>
      ))}
    </div>
  )
}