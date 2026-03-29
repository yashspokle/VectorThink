// CognitivePanel.js — bars now animate in on load
'use client'

import { useEffect, useState } from 'react'
import styles from './CognitivePanel.module.css'

const SIGNALS = [
  { label: 'Flow',      value: 82, color: '#534AB7' },
  { label: 'Focus',     value: 74, color: '#7F77DD' },
  { label: 'Curiosity', value: 68, color: '#1D9E75' },
  { label: 'Fatigue',   value: 31, color: '#D85A30' },
]

function deriveState(signals) {
  const flow    = signals.find(s => s.label === 'Flow').value
  const fatigue = signals.find(s => s.label === 'Fatigue').value
  if (flow > 75 && fatigue < 40) return { text: 'Deep flow state',     color: '#1D9E75' }
  if (fatigue > 70)               return { text: 'High fatigue — rest', color: '#D85A30' }
  if (flow > 50)                  return { text: 'Focused',             color: '#534AB7' }
  return                                 { text: 'Warming up',          color: '#6e6c88' }
}

export default function CognitivePanel() {
  // Bars start at 0 width, animate to real value after mount
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    // Tiny delay so CSS transition actually fires
    const t = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(t)
  }, [])

  const state = deriveState(SIGNALS)

  return (
    <div className={styles.panel}>
      <div className={styles.title}>Cognitive vitals</div>

      {SIGNALS.map((signal, i) => (
        <div key={signal.label} className={styles.row}
          style={{ animationDelay: `${i * 0.08}s` }}>

          <span className={styles.label}>{signal.label}</span>

          <div className={styles.track}>
            <div
              className={styles.fill}
              style={{
                // Start at 0, animate to real value once `animated` flips true
                width: animated ? `${signal.value}%` : '0%',
                background: signal.color,
                // Each bar transitions slightly after the previous
                transitionDelay: `${i * 0.1}s`,
              }}
            />
          </div>

          <span className={styles.value}>{signal.value}</span>

        </div>
      ))}

      <div className={styles.badge}
        style={{ color: state.color, borderColor: state.color }}>
        {state.text}
      </div>
    </div>
  )
}