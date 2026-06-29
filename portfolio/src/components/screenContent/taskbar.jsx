import { useState, useEffect } from 'react'
import { AppIcon, WindowsLogo, TrayIcon } from './icons'

function TaskbarButton({ children, size, onClick }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        width: size * 1.3,
        height: size * 1.3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: size * 0.22,
        background: hover ? 'rgba(255,255,255,0.11)' : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.08s',
      }}
    >
      {children}
    </div>
  )
}

function Clock({ h }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  const date = now.toLocaleDateString()

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      fontSize: h * 0.018,
      color: '#eef3ff',
      lineHeight: 1.3,
      padding: `0 ${h * 0.006}px`,
      cursor: 'default',
    }}>
      <span>{time}</span>
      <span>{date}</span>
    </div>
  )
}

export default function Taskbar({ apps, h, onOpen }) {
  const barH = h * 0.056
  const icon = h * 0.04

  return (
    <div style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: barH,
      background: 'rgba(28,34,49,0.72)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.09)',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: h * 0.004,
      }}>
        <TaskbarButton size={icon}>
          <WindowsLogo size={icon * 0.74} />
        </TaskbarButton>
        {apps.map(app => (
          <TaskbarButton key={app.id} size={icon} onClick={() => onOpen?.(app.id)}>
            <AppIcon id={app.id} size={icon * 0.82} />
          </TaskbarButton>
        ))}
      </div>
      <div style={{
        position: 'absolute',
        right: h * 0.016,
        display: 'flex',
        alignItems: 'center',
        gap: h * 0.012,
      }}>
        <TrayIcon id="wifi" size={h * 0.022} />
        <TrayIcon id="volume" size={h * 0.022} />
        <TrayIcon id="battery" size={h * 0.022} />
        <Clock h={h} />
      </div>
    </div>
  )
}
