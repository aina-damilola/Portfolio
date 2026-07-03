import { useState } from 'react'
import { AppIcon } from './icons'
import { appDescription } from './data.js'
import { useTheme } from './theme.js'

function DesktopIcon({ app, size, h, onOpen }) {
  const t = useTheme()
  const [active, setActive] = useState(false)
  const desc = appDescription(app.id)

  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => onOpen?.(app.id)}
      onDoubleClick={() => onOpen?.(app.id)}
      style={{
        position: 'relative',
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
        color: t.iconLabel,
        textAlign: 'center',
        lineHeight: 1.15,
        textShadow: t.iconLabelShadow,
      }}>
        {app.label}
      </span>

      {/* Brief-description popup beside the icon (old-portfolio style). */}
      {active && desc && (
        <div style={{
          position: 'absolute',
          left: '108%',
          top: 0,
          width: h * 0.22,
          padding: `${h * 0.012}px ${h * 0.014}px`,
          background: t.popupBg,
          color: t.popupText,
          borderRadius: h * 0.01,
          fontSize: h * 0.018,
          lineHeight: 1.45,
          boxShadow: `0 ${h * 0.012}px ${h * 0.03}px rgba(0,0,0,0.5)`,
          zIndex: 8000,
          pointerEvents: 'none',
        }}>
          <div style={{ fontWeight: 600, marginBottom: h * 0.004 }}>{app.label}</div>
          <div style={{ color: t.popupMuted }}>{desc}</div>
        </div>
      )}
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
        <DesktopIcon key={app.id} app={app} size={iconSize} h={h} onOpen={onOpen} />
      ))}
    </div>
  )
}
