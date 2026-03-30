'use client'

import { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import styles from './page.module.css'

const ROADMAP = [
  {
    unit: 'Unit 1 — Foundations',
    topics: [
      { title: 'Arrays & Strings',      status: 'done',   time: '3h',  mastery: 91 },
      { title: 'Linked Lists',          status: 'done',   time: '4h',  mastery: 84 },
      { title: 'Stacks & Queues',       status: 'done',   time: '2h',  mastery: 78 },
    ]
  },
  {
    unit: 'Unit 2 — Core Algorithms',
    topics: [
      { title: 'Sorting Algorithms',    status: 'active', time: '5h',  mastery: 58 },
      { title: 'Binary Search',         status: 'active', time: '2h',  mastery: 45 },
      { title: 'Recursion & Backtrack', status: 'locked', time: '6h',  mastery: 0  },
    ]
  },
  {
    unit: 'Unit 3 — Advanced Topics',
    topics: [
      { title: 'Trees & Graphs',        status: 'locked', time: '8h',  mastery: 0  },
      { title: 'Dynamic Programming',   status: 'locked', time: '10h', mastery: 0  },
      { title: 'System Design Basics',  status: 'locked', time: '7h',  mastery: 0  },
    ]
  },
]

const STATUS_META = {
  done:   { color: '#cc0000', label: 'Complete' },
  active: { color: '#ff3333', label: 'In progress' },
  locked: { color: '#2a1a1a', label: 'Locked' },
}

export default function RoadmapPage() {
  const [selected, setSelected] = useState(null)

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>

        <div className={styles.header}>
          <h1 className={styles.title}>My Roadmap</h1>
          <p className={styles.sub}>Your personalized curriculum — built by VT.</p>
        </div>

        <div className={styles.summaryBar}>
          <SummaryPill label="Completed"   value="3"   color="#cc0000" />
          <SummaryPill label="In progress" value="2"   color="#ff3333" />
          <SummaryPill label="Locked"      value="4"   color="#6b5f5f" />
          <SummaryPill label="Total hours" value="47h" color="#ff3333" />
        </div>

        {ROADMAP.map((unit, ui) => (
          <div key={unit.unit} className={styles.unit} style={{ animationDelay: `${ui * 0.1}s` }}>
            <div className={styles.unitTitle}>{unit.unit}</div>

            {unit.topics.map((topic, ti) => {
              const meta      = STATUS_META[topic.status]
              const isSelected = selected === `${ui}-${ti}`
              return (
                <div key={topic.title} onClick={() => setSelected(isSelected ? null : `${ui}-${ti}`)} style={{ animationDelay: `${(ui * 3 + ti) * 0.06}s` }} className={`${styles.topicRow} ${topic.status === 'locked' ? styles.locked : ''} ${isSelected ? styles.selected : ''}`}>
                  <div className={styles.dot} style={{ background: meta.color }} />
                  <div className={styles.topicName}>{topic.title}</div>
                  {topic.mastery > 0 && (
                    <div className={styles.miniTrack}>
                      <div className={styles.miniFill} style={{ width: `${topic.mastery}%`, background: meta.color }} />
                    </div>
                  )}
                  <span className={styles.masteryNum} style={{ color: meta.color }}>{topic.mastery > 0 ? `${topic.mastery}%` : '—'}</span>
                  <span className={styles.time}>{topic.time}</span>
                  <span className={styles.pill} style={{ color: meta.color, borderColor: meta.color }}>{meta.label}</span>
                </div>
              )
            })}
          </div>
        ))}

      </main>
    </div>
  )
}

function SummaryPill({ label, value, color }) {
  return (
    <div className={styles.summaryPill}>
      <span className={styles.pillValue} style={{ color }}>{value}</span>
      <span className={styles.pillLabel}>{label}</span>
    </div>
  )
}