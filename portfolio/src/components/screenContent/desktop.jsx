import { useState } from 'react'
import { AppIcon } from './icons'

function DesktopIcon({ app, size, onOpen }) {
  const [active, setActive] = useState(false)

  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => onOpen?.(app.id)}
      style={{
        width: size * 1.75,
        padding: `${size * 0.16}px ${size * 0.1}px`,
        borderRadius: size * 0.14,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: size * 0.16,
        background: active ? 'rgba(255,255,255,0.13)' : 'transparent',
        border: `1px solid ${active ? 'rgba(255,255,255,0.18)' : 'transparent'}`,
        cursor: 'pointer',
        transition: 'background 0.08s',
      }}
    >
      <AppIcon id={app.id} size={size} />
      <span style={{
        fontSize: size * 0.32,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 1.15,
        textShadow: '0 1px 4px rgba(0,0,0,0.65)',
      }}>
        {app.label}
      </span>
    </div>
  )
}

export default function Desktop({ apps, h, onOpen }) {
  const iconSize = h * 0.05
  return (
    <div style={{
      position: 'absolute',      
      paddingTop: h * 0.036,
      paddingBottom: h * 0.036,
      paddingLeft: h * 0.012,
      paddingRight: h * 0.012,      
      display: 'flex',
      flexDirection: 'column',
      gap: h * 0.01,
    }}>
      {apps.map(app => (
        <DesktopIcon key={app.id} app={app} size={iconSize} onOpen={onOpen} />
      ))}
    </div>
  )
}
