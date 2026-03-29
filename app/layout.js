// layout.jsx wraps EVERY page in the app
// Think of it as the outer shell that never changes

import './globals.css'

export const metadata = {
  title: 'VectorThink',
  description: 'Neuro-Symbiotic Learning OS',
}

export default function RootLayout({ children }) {
  // {children} = whatever page is currently active
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}