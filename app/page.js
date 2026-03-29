// page.js = the dashboard HOME page (route: "/")
// In Next.js App Router, every page.js inside /app is a route
// This one lives at app/page.js so it's the root "/"
import Sidebar from '../components/Sidebar/Sidebar'
import styles from './page.module.css'

export default function DashboardPage() {
  return (
    // Outer wrapper: flex row — sidebar on left, main content on right
    <div className={styles.layout}>

      {/* Left: our sidebar component */}
      <Sidebar />

      {/* Right: scrollable content area */}
      {/* margin-left: 220px so content starts AFTER the sidebar */}
      <main className={styles.main}>

        {/* Greeting header */}
        <div className={styles.header}>
          <h1 className={styles.greeting}>Good morning, Yash</h1>
          <p className={styles.sub}>Your cognitive state is ready. Let's learn.</p>
        </div>

        {/* Stat cards — 4 quick metrics in a row */}
        {/* StatCard is defined below in the same file */}
        <div className={styles.statRow}>
          <StatCard label="Sessions today"  value="3" />
          <StatCard label="Mastery score"   value="74%" />
          <StatCard label="Streak"          value="12 days" />
          <StatCard label="Next review"     value="2h" />
        </div>

        {/* Placeholder for next components we'll add */}
        <div className={styles.comingSoon}>
          Progress rings + Cognitive panel coming next →
        </div>

      </main>
    </div>
  )
}

// ── StatCard component ──
// A small reusable card that shows a label + big value
// Props: label (string), value (string)
// Props are like arguments you pass into a component
function StatCard({ label, value }) {
  return (
    <div className={styles.card}>
      <span className={styles.cardLabel}>{label}</span>
      <span className={styles.cardValue}>{value}</span>
    </div>
  )
}