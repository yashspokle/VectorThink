'use client'

import { useEffect, useRef } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import styles from './page.module.css'

// Weekly study hours data — will come from backend later
const WEEKLY = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 4.0 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 3.5 },
  { day: 'Fri', hours: 5.0 },
  { day: 'Sat', hours: 2.0 },
  { day: 'Sun', hours: 3.0 },
]

const MAX_HOURS = Math.max(...WEEKLY.map(d => d.hours))

// Mastery over time (last 7 days)
const MASTERY_TREND = [62, 65, 64, 68, 71, 73, 74]

export default function AnalyticsPage() {
  const canvasRef = useRef(null)

  // Draw mastery trend line on canvas after mount
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx    = canvas.getContext('2d')
    const w      = canvas.width
    const h      = canvas.height
    const pad    = 20
    const min    = 55
    const max    = 80

    ctx.clearRect(0, 0, w, h)

    // Plot points
    const pts = MASTERY_TREND.map((v, i) => ({
      x: pad + (i / (MASTERY_TREND.length - 1)) * (w - pad * 2),
      y: h - pad - ((v - min) / (max - min)) * (h - pad * 2)
    }))

    // Draw line
    ctx.beginPath()
    ctx.strokeStyle = '#cc0000'
    ctx.lineWidth   = 2
    ctx.lineJoin    = 'round'
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
    ctx.stroke()

    // Draw dots
    pts.forEach(p => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#ff3333'
      ctx.fill()
    })
  }, [])

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>

        <div className={styles.header}>
          <h1 className={styles.title}>Analytics</h1>
          <p className={styles.sub}>Your learning data — updated every session.</p>
        </div>

        {/* Summary stats */}
        <div className={styles.statRow}>
          <MiniStat label="Total hours"   value="47h"  />
          <MiniStat label="Avg per day"   value="2.9h" />
          <MiniStat label="Best day"      value="Fri"  />
          <MiniStat label="Topics done"   value="27"   />
        </div>

        <div className={styles.twoCol}>

          {/* Bar chart — weekly hours */}
          <div className={styles.chartCard}>
            <div className={styles.chartTitle}>Weekly study hours</div>
            <div className={styles.barChart}>
              {WEEKLY.map((d) => (
                <div key={d.day} className={styles.barCol}>
                  <span className={styles.barVal}>{d.hours}h</span>
                  <div className={styles.barTrack}>
                    <div className={styles.barFill} style={{ height: `${(d.hours / MAX_HOURS) * 100}%` }} />
                  </div>
                  <span className={styles.barDay}>{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Line chart — mastery trend */}
          <div className={styles.chartCard}>
            <div className={styles.chartTitle}>Mastery trend (7 days)</div>
            <canvas ref={canvasRef} width={300} height={160} className={styles.canvas} />
            <div className={styles.trendFooter}>
              <span style={{ color: '#6b5f5f' }}>62% → </span>
              <span style={{ color: '#ff3333' }}>74%</span>
              <span style={{ color: '#6b5f5f' }}> this week</span>
            </div>
          </div>

        </div>

        {/* Subject breakdown */}
        <div className={styles.chartCard} style={{ marginTop: 20 }}>
          <div className={styles.chartTitle}>Subject breakdown</div>
          <div className={styles.subjectList}>
            {[
              { name: 'Data Structures', mastery: 74, hours: 14 },
              { name: 'Algorithms',      mastery: 58, hours: 10 },
              { name: 'OS Concepts',     mastery: 45, hours: 8  },
              { name: 'Computer Nets',   mastery: 82, hours: 9  },
              { name: 'DBMS',            mastery: 31, hours: 6  },
            ].map(s => (
              <div key={s.name} className={styles.subjectRow}>
                <span className={styles.subName}>{s.name}</span>
                <div className={styles.subTrack}>
                  <div className={styles.subFill} style={{ width: `${s.mastery}%` }} />
                </div>
                <span className={styles.subMastery} style={{ color: '#ff3333' }}>{s.mastery}%</span>
                <span className={styles.subHours}>{s.hours}h</span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}

function MiniStat({ label, value }) {
  return (
    <div className={styles.miniStat}>
      <span className={styles.miniVal}>{value}</span>
      <span className={styles.miniLabel}>{label}</span>
    </div>
  )
}