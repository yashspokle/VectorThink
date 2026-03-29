// not-found.js — shows for any unknown route
// Inline styles used here to avoid the missing CSS module error

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--vt-bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        background: '#534AB7',
        color: '#fff',
        fontWeight: 700,
        fontSize: '18px',
        padding: '8px 16px',
        borderRadius: '8px',
        letterSpacing: '2px'
      }}>VT</div>

      <h1 style={{ color: '#e8e6f0', fontSize: '28px', fontWeight: 700 }}>
        Coming soon
      </h1>
      <p style={{ color: '#6e6c88', fontSize: '14px' }}>
        This page is part of Phase 2 — we'll build it next.
      </p>
      <a href="/" style={{
        marginTop: '12px',
        color: '#7F77DD',
        textDecoration: 'none',
        fontSize: '14px',
        border: '1px solid #2a2850',
        padding: '10px 20px',
        borderRadius: '8px'
      }}>← Back to dashboard</a>

    </div>
  )
}