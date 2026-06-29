export function AppIcon({ id, size }) {
  const common = { width: size, height: size, viewBox: '0 0 48 48' }
  switch (id) {
    case 'projects':
      return (
        <svg {...common}>
          <path d="M6 12a3 3 0 0 1 3-3h8.2l3.5 4H39a3 3 0 0 1 3 3v3H6z" fill="#e0a92e" />
          <rect x="6" y="15" width="36" height="26" rx="3" fill="#ffd066" />
          <rect x="6" y="15" width="36" height="6" fill="#ffdc85" />
        </svg>
      )
    case 'about':
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="20" fill="#3b7dd8" />
          <circle cx="24" cy="19.5" r="6.8" fill="#fff" />
          <path d="M11.5 38c2.2-6.6 7.4-9.6 12.5-9.6S34.3 31.4 36.5 38z" fill="#fff" />
        </svg>
      )
    case 'experience':
      return (
        <svg {...common}>
          <path d="M18 14v-2.5A3.5 3.5 0 0 1 21.5 8h5A3.5 3.5 0 0 1 30 11.5V14" fill="none" stroke="#8aa0c8" strokeWidth="3" />
          <rect x="6" y="15" width="36" height="25" rx="3.5" fill="#5b6b8c" />
          <rect x="6" y="24" width="36" height="5" fill="#475068" />
          <rect x="21" y="25" width="6" height="3" rx="1.5" fill="#cdd6e8" />
        </svg>
      )
    case 'contact':
      return (
        <svg {...common}>
          <rect x="6" y="12" width="36" height="24" rx="3.5" fill="#e8533f" />
          <path d="M7.5 14.5 24 27l16.5-12.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinejoin="round" />
        </svg>
      )
    default:
      return <svg {...common}><rect x="6" y="6" width="36" height="36" rx="6" fill="#888" /></svg>
  }
}

export function WindowsLogo({ size }) {
  const g = size * 0.06
  const s = (size - g) / 2
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <rect x="5"  y="5"  width="16.5" height="16.5" rx="1.5" fill="#43b6ff" />
      <rect x="26.5" y="5"  width="16.5" height="16.5" rx="1.5" fill="#43b6ff" />
      <rect x="5"  y="26.5" width="16.5" height="16.5" rx="1.5" fill="#43b6ff" />
      <rect x="26.5" y="26.5" width="16.5" height="16.5" rx="1.5" fill="#43b6ff" />
    </svg>
  )
}

export function TrayIcon({ id, size }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: '#e8eefc', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (id) {
    case 'wifi':
      return (
        <svg {...common}>
          <path d="M3.5 9.5a13 13 0 0 1 17 0" />
          <path d="M6.5 13a8.5 8.5 0 0 1 11 0" />
          <path d="M9.5 16.4a4 4 0 0 1 5 0" />
          <circle cx="12" cy="19.5" r="0.6" fill="#e8eefc" stroke="none" />
        </svg>
      )
    case 'volume':
      return (
        <svg {...common}>
          <path d="M5 9.5v5h3.5L13 18.5V5.5L8.5 9.5z" fill="#e8eefc" />
          <path d="M16 9.5a3.5 3.5 0 0 1 0 5" />
        </svg>
      )
    case 'battery':
      return (
        <svg {...common}>
          <rect x="3" y="8.5" width="16" height="7" rx="1.6" />
          <rect x="4.6" y="10" width="9" height="4" rx="0.6" fill="#e8eefc" stroke="none" />
          <path d="M20.2 11v2" />
        </svg>
      )
    default:
      return null
  }
}
