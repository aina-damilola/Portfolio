import { useRef } from 'react'
import { AppIcon, FileIcon } from './icons'
import { useTheme } from './theme.js'

function barH(h) { return h * 0.036 }

function TitleBarButton({ size, danger, onClick, children }) {
  const t = useTheme()
  const ref = useRef(null)
  const hoverBg = danger ? '#e81123' : (t.name === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)')
  return (
    <div
      ref={ref}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => { e.stopPropagation(); onClick() }}
      onMouseEnter={() => { ref.current.style.background = hoverBg; if (danger) ref.current.style.color = '#fff' }}
      onMouseLeave={() => { ref.current.style.background = 'transparent'; ref.current.style.color = t.titleText }}
      style={{
        width: size * 1.6,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: t.titleText,
        fontSize: size * 0.62,
        cursor: 'pointer',
        transition: 'background 0.1s, color 0.1s',
      }}
    >
      {children}
    </div>
  )
}

const HANDLES = [
  { dir: 'n',  cursor: 'ns-resize',   edge: true },
  { dir: 's',  cursor: 'ns-resize',   edge: true },
  { dir: 'w',  cursor: 'ew-resize',   edge: true },
  { dir: 'e',  cursor: 'ew-resize',   edge: true },
  { dir: 'nw', cursor: 'nwse-resize', edge: false },
  { dir: 'ne', cursor: 'nesw-resize', edge: false },
  { dir: 'sw', cursor: 'nesw-resize', edge: false },
  { dir: 'se', cursor: 'nwse-resize', edge: false },
]

function handleStyle(dir, edge, thick) {
  const corner = thick * 1.5
  const s = { position: 'absolute', zIndex: 5 }
  if (edge) {
    if (dir === 'n') Object.assign(s, { top: 0, left: 0, right: 0, height: thick })
    if (dir === 's') Object.assign(s, { bottom: 0, left: 0, right: 0, height: thick })
    if (dir === 'w') Object.assign(s, { top: 0, bottom: 0, left: 0, width: thick })
    if (dir === 'e') Object.assign(s, { top: 0, bottom: 0, right: 0, width: thick })
  } else {
    if (dir.includes('n')) s.top = 0; else s.bottom = 0
    if (dir.includes('w')) s.left = 0; else s.right = 0
    s.width = corner; s.height = corner; s.zIndex = 6
  }
  return s
}

export default function Window({ win, w, h, desktopRef, focused, onFocus, onMove, onResize, onMinimize, onClose, children }) {
  const t = useTheme()
  const drag = useRef(null)
  const rez = useRef(null)

  const scale = () => {
    const rect = desktopRef.current?.getBoundingClientRect()
    return { sx: rect ? w / rect.width : 1, sy: rect ? h / rect.height : 1 }
  }

  // ── drag (title bar) ──
  const onTitlePointerDown = (e) => {
    onFocus(win.key)
    const { sx, sy } = scale()
    drag.current = { px: e.clientX, py: e.clientY, ox: win.x, oy: win.y, sx, sy }
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* noop */ }
  }
  const onTitlePointerMove = (e) => {
    const d = drag.current
    if (!d) return
    const nx = d.ox + (e.clientX - d.px) * d.sx
    const ny = d.oy + (e.clientY - d.py) * d.sy
    onMove(win.key, {
      x: Math.max(-win.w * 0.6, Math.min(w - win.w * 0.4, nx)),
      y: Math.max(0, Math.min(h - barH(h) * 1.2, ny)),
    })
  }
  const onTitlePointerUp = (e) => {
    drag.current = null
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch { /* noop */ }
  }

  // ── resize (edges + corners) ──
  const minW = h * 0.3
  const minH = h * 0.2
  const onRezDown = (dir) => (e) => {
    e.stopPropagation()
    onFocus(win.key)
    const { sx, sy } = scale()
    rez.current = { dir, px: e.clientX, py: e.clientY, ox: win.x, oy: win.y, ow: win.w, oh: win.h, sx, sy }
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* noop */ }
  }
  const onRezMove = (e) => {
    const d = rez.current
    if (!d) return
    const dx = (e.clientX - d.px) * d.sx
    const dy = (e.clientY - d.py) * d.sy
    let nx = d.ox, ny = d.oy, nw = d.ow, nh = d.oh
    if (d.dir.includes('e')) nw = Math.max(minW, d.ow + dx)
    if (d.dir.includes('s')) nh = Math.max(minH, d.oh + dy)
    if (d.dir.includes('w')) { nw = Math.max(minW, d.ow - dx); nx = d.ox + (d.ow - nw) }
    if (d.dir.includes('n')) { nh = Math.max(minH, d.oh - dy); ny = d.oy + (d.oh - nh) }
    onResize(win.key, { x: nx, y: ny, w: nw, h: nh })
  }
  const onRezUp = (e) => {
    rez.current = null
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch { /* noop */ }
  }

  const bar = barH(h)
  const btn = bar * 0.5
  const thick = h * 0.01

  return (
    <div
      onPointerDown={() => onFocus(win.key)}
      style={{
        position: 'absolute',
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        display: win.minimized ? 'none' : 'flex',
        flexDirection: 'column',
        background: t.winBg,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: h * 0.012,
        border: `1px solid ${t.border}`,
        boxShadow: focused
          ? `0 ${h * 0.03}px ${h * 0.06}px rgba(0,0,0,0.5)`
          : `0 ${h * 0.015}px ${h * 0.035}px rgba(0,0,0,0.35)`,
        overflow: 'hidden',
        zIndex: win.z,
        color: t.text,
      }}
    >
      {/* Title bar */}
      <div
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={onTitlePointerUp}
        style={{
          position: 'relative',
          height: bar,
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: h * 0.008,
          paddingLeft: h * 0.012,
          background: t.titleBar,
          borderBottom: `1px solid ${t.border}`,
          // subtle accent so it isn't a flat grey bar
          boxShadow: `inset 0 ${h * 0.0022}px 0 ${t.accent}55`,
          cursor: 'default',
          userSelect: 'none',
          zIndex: 4,
        }}
      >
        {win.icon === 'file'
          ? <FileIcon size={bar * 0.52} />
          : <AppIcon id={win.appId} size={bar * 0.52} />}
        <span style={{ fontSize: h * 0.02, fontWeight: 600, color: t.titleText, flex: 1 }}>{win.title}</span>
        <TitleBarButton size={btn} onClick={() => onMinimize(win.key)}>
          <svg width={btn * 0.7} height={btn * 0.7} viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="2" rx="1" fill="currentColor" /></svg>
        </TitleBarButton>
        <TitleBarButton size={btn} danger onClick={() => onClose(win.key)}>
          <svg width={btn * 0.6} height={btn * 0.6} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
        </TitleBarButton>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: `${h * 0.026}px ${h * 0.03}px` }}>
        {children}
      </div>

      {/* Resize handles */}
      {HANDLES.map(hd => (
        <div
          key={hd.dir}
          onPointerDown={onRezDown(hd.dir)}
          onPointerMove={onRezMove}
          onPointerUp={onRezUp}
          style={{ ...handleStyle(hd.dir, hd.edge, thick), cursor: hd.cursor }}
        />
      ))}
    </div>
  )
}
