import { useState, useEffect } from 'react'
import { AppIcon, WindowsLogo, TrayIcon } from './icons'
import { useTheme } from './theme.js'

function TaskbarButton({ children, size, onClick }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        width: size * 1.3, height: size * 1.3,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: size * 0.22,
        background: hover ? 'rgba(255,255,255,0.11)' : 'transparent',
        cursor: 'pointer', transition: 'background 0.08s',
      }}
    >
      {children}
    </div>
  )
}

function Flyout({ h, align = 'center', children }) {
  const t = useTheme()
  return (
    <div style={{
      position: 'absolute', bottom: '100%',
      left: align === 'center' ? '50%' : 'auto',
      right: align === 'right' ? 0 : 'auto',
      transform: align === 'center' ? 'translateX(-50%)' : 'none',
      paddingBottom: h * 0.01, zIndex: 50,
    }}>
      <div style={{
        minWidth: h * 0.2,
        background: t.popupBg,
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${t.border}`,
        borderRadius: h * 0.012,
        boxShadow: `0 ${h * 0.012}px ${h * 0.03}px rgba(0,0,0,0.5)`,
        padding: h * 0.008, color: t.popupText,
      }}>
        {children}
      </div>
    </div>
  )
}

function FlyoutRow({ wn, h, onRestore }) {
  const t = useTheme()
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onRestore(wn.key)}
      style={{
        display: 'flex', alignItems: 'center', gap: h * 0.008,
        padding: `${h * 0.008}px ${h * 0.01}px`, borderRadius: h * 0.008,
        cursor: 'pointer', background: hover ? 'rgba(255,255,255,0.1)' : 'transparent',
      }}
    >
      <span style={{ flex: 1, fontSize: h * 0.017, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {wn.title}
      </span>
      {wn.minimized && <span style={{ fontSize: h * 0.013, color: t.popupMuted }}>minimized</span>}
    </div>
  )
}

function AppTaskbarButton({ app, icon, h, wins, onOpen, onRestore }) {
  const t = useTheme()
  const [hover, setHover] = useState(false)
  const running = wins.length > 0
  return (
    <div
      style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <TaskbarButton size={icon} onClick={() => onOpen(app.id)}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AppIcon id={app.id} size={icon * 0.82} />
          {running && (
            <span style={{
              position: 'absolute', bottom: -icon * 0.32, left: '50%', transform: 'translateX(-50%)',
              width: icon * 0.22, height: Math.max(2, icon * 0.05), borderRadius: 99, background: t.accent,
            }} />
          )}
        </div>
      </TaskbarButton>
      {hover && running && (
        <Flyout h={h} align="center">
          <div style={{ fontSize: h * 0.015, color: t.popupMuted, padding: `${h * 0.002}px ${h * 0.01}px ${h * 0.006}px` }}>
            {app.label}
          </div>
          {wins.map(wn => <FlyoutRow key={wn.key} wn={wn} h={h} onRestore={onRestore} />)}
        </Flyout>
      )}
    </div>
  )
}

function ThemeToggle({ h, mode, onToggle }) {
  const [hover, setHover] = useState(false)
  const s = h * 0.024
  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={mode === 'light' ? 'Dark mode' : 'Light mode'}
      style={{
        width: s * 1.5, height: s * 1.5, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', background: hover ? 'rgba(255,255,255,0.12)' : 'transparent',
      }}
    >
      {mode === 'light' ? (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#e8eefc" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" fill="#e8eefc" stroke="none" />
        </svg>
      ) : (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#ffd86b" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.2" fill="#ffd86b" stroke="none" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
            const r = a * Math.PI / 180
            const x1 = 12 + Math.cos(r) * 7, y1 = 12 + Math.sin(r) * 7
            const x2 = 12 + Math.cos(r) * 9.2, y2 = 12 + Math.sin(r) * 9.2
            return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} />
          })}
        </svg>
      )}
    </div>
  )
}

function HelpButton({ h, onZoomOut }) {
  const t = useTheme()
  const [hover, setHover] = useState(false)
  const s = h * 0.027
  return (
    <div
      style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{
        width: s, height: s, borderRadius: '50%',
        border: '1.5px solid #c2cfe6', color: '#e8eefc',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: s * 0.66, fontWeight: 600, cursor: 'help',
      }}>?</div>
      {hover && (
        <Flyout h={h} align="right">
          <div style={{ width: h * 0.32, padding: `${h * 0.004}px ${h * 0.008}px` }}>
            <div style={{ fontSize: h * 0.02, fontWeight: 700, marginBottom: h * 0.01, color: t.popupText }}>Exit the desktop</div>
            <div style={{ fontSize: h * 0.0165, lineHeight: 1.6, color: t.popupMuted }}>
              · Press <b style={{ color: t.popupText }}>Esc</b><br />
              · Click <b style={{ color: t.popupText }}>✕ Exit</b> below<br />
              · Or click anywhere outside the screen
            </div>
            <button
              onClick={onZoomOut}
              style={{
                marginTop: h * 0.012, width: '100%',
                padding: `${h * 0.01}px`, fontSize: h * 0.017, fontWeight: 600,
                background: 'rgba(232,17,35,0.92)', color: '#fff',
                border: 'none', borderRadius: h * 0.008, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              ✕ Exit
            </button>
          </div>
        </Flyout>
      )}
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
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
      fontSize: h * 0.018, color: '#eef3ff', lineHeight: 1.3,
      padding: `0 ${h * 0.006}px`, cursor: 'default',
    }}>
      <span>{time}</span>
      <span>{date}</span>
    </div>
  )
}

export default function Taskbar({ apps, h, windows = [], onOpen, onRestore, onZoomOut, mode, onToggleTheme }) {
  const t = useTheme()
  const barH = h * 0.056
  const icon = h * 0.04
  const winsFor = (id) => windows.filter(w => w.appId === id)

  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, height: barH,
      background: t.taskbar,
      backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.09)',
      display: 'flex', alignItems: 'center', zIndex: 9000,
    }}>
      {/* Centered: Start + pinned apps */}
      <div style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        height: '100%', display: 'flex', alignItems: 'center', gap: h * 0.004,
      }}>
        <TaskbarButton size={icon}><WindowsLogo size={icon * 0.74} /></TaskbarButton>
        {apps.map(app => (
          <AppTaskbarButton
            key={app.id} app={app} icon={icon} h={h}
            wins={winsFor(app.id)} onOpen={onOpen} onRestore={onRestore}
          />
        ))}
      </div>

      {/* Right: help + theme toggle + tray + clock */}
      <div style={{
        position: 'absolute', right: h * 0.016,
        display: 'flex', alignItems: 'center', gap: h * 0.012,
      }}>
        <HelpButton h={h} onZoomOut={onZoomOut} />
        <ThemeToggle h={h} mode={mode} onToggle={onToggleTheme} />
        <TrayIcon id="wifi" size={h * 0.022} />
        <TrayIcon id="volume" size={h * 0.022} />
        <TrayIcon id="battery" size={h * 0.022} />
        <Clock h={h} />
      </div>
    </div>
  )
}
