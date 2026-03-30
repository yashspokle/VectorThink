'use client'

import { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import styles from './page.module.css'

const SUBJECTS = [
  { name: 'Data Structures', topics: 12, done: 9,  mastery: 74, color: '#cc0000', lastStudied: '2h ago' },
  { name: 'Algorithms',      topics: 10, done: 5,  mastery: 58, color: '#ff3333', lastStudied: '1d ago' },
  { name: 'OS Concepts',     topics: 8,  done: 3,  mastery: 45, color: '#cc0000', lastStudied: '3d ago' },
  { name: 'Computer Nets',   topics: 9,  done: 8,  mastery: 82, color: '#ff3333', lastStudied: '5h ago' },
  { name: 'DBMS',            topics: 7,  done: 2,  mastery: 31, color: '#cc0000', lastStudied: '1w ago' },
  { name: 'System Design',   topics: 6,  done: 0,  mastery: 0,  color: '#6b5f5f', lastStudied: 'Not started' },
]

export default function SubjectsPage() {
  const [search, setSearch] = useState('')

  // Filter subjects by search input
  const filtered = SUBJECTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>

        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Subjects</h1>
            <p className={styles.sub}>All your subjects in one place.</p>
          </div>
          {/* Search bar */}
          <input
            className={styles.search}
            placeholder="Search subjects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.grid}>
          {filtered.map((subject, i) => (
            <div key={subject.name} className={styles.card} style={{ animationDelay: `${i * 0.07}s` }}>

              {/* Top row — name + last studied */}
              <div className={styles.cardTop}>
                <span className={styles.subjectName}>{subject.name}</span>
                <span className={styles.lastStudied}>{subject.lastStudied}</span>
              </div>

              {/* Mastery ring — small inline SVG */}
              <div className={styles.cardMid}>
                <MiniRing percent={subject.mastery} color={subject.color} />
                <div className={styles.stats}>
                  <div className={styles.statLine}>
                    <span className={styles.statLabel}>Topics done</span>
                    <span className={styles.statVal}>{subject.done}/{subject.topics}</span>
                  </div>
                  <div className={styles.statLine}>
                    <span className={styles.statLabel}>Mastery</span>
                    <span className={styles.statVal} style={{ color: subject.color }}>{subject.mastery}%</span>
                  </div>
                </div>
              </div>

              {/* Progress bar at bottom */}
              <div className={styles.track}>
                <div className={styles.fill} style={{ width: `${subject.mastery}%`, background: subject.color }} />
              </div>

              {/* Continue button */}
              <button className={styles.btn} style={{ borderColor: subject.color, color: subject.color }}>
                {subject.done === 0 ? 'Start' : 'Continue'} →
              </button>

            </div>
          ))}
        </div>

      </main>
    </div>
  )
}

// Small ring for each subject card
function MiniRing({ percent, color }) {
  const r    = 26
  const circ = 2 * Math.PI * r
  const offset = circ - (percent / 100) * circ
  return (
    <svg viewBox="0 0 60 60" width="60" height="60">
      <circle cx="30" cy="30" r={r} fill="none" stroke="var(--vt-border)" strokeWidth="5" />
      <circle cx="30" cy="30" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} transform="rotate(-90 30 30)" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      <text x="30" y="35" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--vt-text)">{percent}%</text>
    </svg>
  )
}