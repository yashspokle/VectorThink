'use client'

import { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import styles from './page.module.css'

export default function ProfilePage() {
  // Editable fields — will connect to backend tomorrow
  const [name,   setName]   = useState('Yash Pokle')
  const [branch, setBranch] = useState('Electronics & Computer Science')
  const [year,   setYear]   = useState('2nd Year')
  const [goal,   setGoal]   = useState('Crack product-based company placements')
  const [saved,  setSaved]  = useState(false)

  function handleSave() {
    // For now just shows a confirmation — backend integration comes in Phase 4
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>

        <div className={styles.header}>
          <h1 className={styles.title}>Profile</h1>
          <p className={styles.sub}>Your learner identity — VT personalizes around this.</p>
        </div>

        {/* Avatar + name row */}
        <div className={styles.profileTop}>
          <div className={styles.avatar}>Y</div>
          <div>
            <div className={styles.profileName}>{name}</div>
            <div className={styles.profileTag}>Learner · B.Tech CSE · Ramdeobaba University</div>
          </div>
        </div>

        {/* Editable fields */}
        <div className={styles.form}>

          <Field label="Full name"    value={name}   onChange={setName} />
          <Field label="Branch"       value={branch} onChange={setBranch} />
          <Field label="Year"         value={year}   onChange={setYear} />
          <Field label="Learning goal" value={goal}  onChange={setGoal} />

          {/* Read-only stats */}
          <div className={styles.readOnly}>
            <span className={styles.fieldLabel}>University</span>
            <span className={styles.readVal}>Ramdeobaba University, Nagpur</span>
          </div>

          <div className={styles.readOnly}>
            <span className={styles.fieldLabel}>Member since</span>
            <span className={styles.readVal}>2024</span>
          </div>

          <button className={styles.saveBtn} onClick={handleSave}>
            {saved ? 'Saved!' : 'Save changes'}
          </button>

        </div>

        {/* Learner stats */}
        <div className={styles.statsGrid}>
          <StatBox label="DSA problems solved" value="200+" />
          <StatBox label="Hackathons"           value="2 finalist" />
          <StatBox label="Streak"               value="12 days" />
          <StatBox label="Mastery score"        value="74%" />
        </div>

      </main>
    </div>
  )
}

function Field({ label, value, onChange }) {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.fieldLabel}>{label}</label>
      <input className={styles.input} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  )
}

function StatBox({ label, value }) {
  return (
    <div className={styles.statBox}>
      <span className={styles.statVal}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}