import styles from './Sidebar.module.css'

const NAV_ITEMS = [
  { label: 'Dashboard',  href: '/' },
  { label: 'My Roadmap', href: '/roadmap' },
  { label: 'Subjects',   href: '/subjects' },
  { label: 'Quiz',       href: '/quiz' },
  { label: 'Analytics',  href: '/analytics' },
  { label: 'Profile',    href: '/profile' },
]

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>

      {/* VT brand mark */}
      <div className={styles.brand}>
        <span className={styles.vtBadge}>VT</span>
        <span className={styles.brandName}>VectorThink</span>
      </div>

      {/* Nav links — one <a> per item, all on one line each */}
      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} className={styles.navItem}>
            {item.label}
          </a>
        ))}
      </nav>

      {/* User info at bottom */}
      <div className={styles.userSection}>
        <div className={styles.avatar}>Y</div>
        <div>
          <div className={styles.userName}>Yash</div>
          <div className={styles.userRole}>Learner · B.Tech CSE</div>
        </div>
      </div>

    </aside>
  )
}