'use client'

import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()
  const expanded = pathname === '/'

  return (
    <aside className={`${styles.sidebar} ${expanded ? styles.expanded : styles.collapsed}`}>

      <div className={styles.brand}>
        <a href="/" className={styles.vtBadge}>VT</a>
        {expanded && <span className={styles.brandName}>VectorThink</span>}
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <a key={item.href} href={item.href} title={!expanded ? item.label : ''} className={`${styles.navItem} ${isActive ? styles.active : ''}`}>
              {/* Red left bar — only on active link */}
              {isActive && <span className={styles.activeBar} />}
              <span className={styles.dot} style={{ background: isActive ? '#cc0000' : 'transparent' }} />
              {expanded && item.label}
            </a>
          )
        })}
      </nav>

      {expanded && (
        <div className={styles.userSection}>
          <div className={styles.avatar}>Y</div>
          <div>
            <div className={styles.userName}>Yash</div>
            <div className={styles.userRole}>Learner · B.Tech CSE</div>
          </div>
        </div>
      )}

      {!expanded && <div className={styles.avatarCollapsed}>Y</div>}

    </aside>
  )
}