import { useRef, useState, useCallback } from 'react'
import Desktop from './desktop'
import Taskbar from './taskbar'
import Window from './window'
import WindowBody from './windowBody'
import { APPS } from './apps'
import { PROJECTS } from './data.js'
import { THEMES, ThemeContext } from './theme.js'

function ScreenContent({ w, h, onZoomOut }) {
  const desktopRef = useRef(null)
  const zRef = useRef(10)
  const [windows, setWindows] = useState([])
  const [mode, setMode] = useState('light')
  const t = THEMES[mode]

  // Shared hover tooltip rendered at the desktop root so it can't be clipped by a
  // window's overflow. Positioned by the pointer (converted to content px), clamped
  // to the screen — same content-px scaling the window drag uses.
  const [tip, setTip] = useState(null)
  const showTip = useCallback((text, hint, clientX, clientY) => {
    const rect = desktopRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = (clientX - rect.left) / rect.width * w
    const cy = (clientY - rect.top) / rect.height * h
    const tipW = h * 0.26
    const tipH = h * 0.09
    let x = cx + h * 0.018
    let y = cy - tipH - h * 0.01
    if (y < 0) y = cy + h * 0.02
    x = Math.max(0, Math.min(w - tipW, x))
    y = Math.max(0, Math.min(h - tipH, y))
    setTip({ text, hint, x, y, tipW })
  }, [w, h])
  const hideTip = useCallback(() => setTip(null), [])

  const nextZ = () => (zRef.current += 1)

  const openWindow = useCallback((spec) => {
    setWindows(ws => {
      const existing = ws.find(x => x.key === spec.key)
      if (existing) {
        const z = nextZ()
        return ws.map(x => x.key === spec.key ? { ...x, minimized: false, z } : x)
      }
      const winW = h * 0.62
      const winH = h * 0.5
      const step = (ws.length % 5) * h * 0.028
      return [...ws, {
        ...spec,
        w: winW, h: winH,
        x: w * 0.5 - winW * 0.5 + step,
        y: h * 0.4 - winH * 0.5 + step,
        minimized: false,
        z: nextZ(),
      }]
    })
  }, [w, h])

  const openApp = useCallback((appId) => {
    const app = APPS.find(a => a.id === appId)
    if (!app) return
    const kind = app.type === 'folder' ? 'folder' : 'doc'
    openWindow({ key: `${kind}:${appId}`, appId, kind, refId: appId, title: app.label })
  }, [openWindow])

  const openProject = useCallback((projId) => {
    const p = PROJECTS.find(x => x.id === projId)
    if (!p) return
    openWindow({ key: `project:${projId}`, appId: 'projects', icon: 'file', kind: 'project', refId: projId, title: p.name })
  }, [openWindow])

  const activateApp = useCallback((appId) => {
    const mine = windows.filter(x => x.appId === appId)
    if (mine.length === 0) { openApp(appId); return }
    const top = mine.reduce((a, b) => (b.z > a.z ? b : a))
    const z = nextZ()
    setWindows(ws => ws.map(x => x.key === top.key ? { ...x, minimized: false, z } : x))
  }, [windows, openApp])

  const focusWindow = useCallback((key) => {
    setWindows(ws => {
      const top = ws.find(x => x.key === key)
      if (top && top.z === zRef.current && !top.minimized) return ws
      const z = nextZ()
      return ws.map(x => x.key === key ? { ...x, z } : x)
    })
  }, [])
  const updateWindow   = useCallback((key, patch) => setWindows(ws => ws.map(w => w.key === key ? { ...w, ...patch } : w)), [])
  const minimizeWindow = useCallback((key) => setWindows(ws => ws.map(w => w.key === key ? { ...w, minimized: true } : w)), [])
  const closeWindow    = useCallback((key) => setWindows(ws => ws.filter(w => w.key !== key)), [])
  const restoreWindow  = useCallback((key) => {
    const z = nextZ()
    setWindows(ws => ws.map(w => w.key === key ? { ...w, minimized: false, z } : w))
  }, [])

  const topKey = windows.reduce((a, b) => (!a || b.z > a.z) && !b.minimized ? b : a, null)?.key

  return (
    <ThemeContext.Provider value={t}>
      <div
        ref={desktopRef}
        style={{
          width: w,
          height: h,
          position: 'relative',
          overflow: 'hidden',
          fontFamily: "'Segoe UI Variable', 'Segoe UI', 'Inter', system-ui, sans-serif",
          background: t.wallpaper,
        }}
      >
        <Desktop apps={APPS} h={h} onOpen={openApp} />

        {windows.map(win => (
          <Window
            key={win.key}
            win={win}
            w={w}
            h={h}
            desktopRef={desktopRef}
            focused={win.key === topKey}
            onFocus={focusWindow}
            onMove={updateWindow}
            onResize={updateWindow}
            onMinimize={minimizeWindow}
            onClose={closeWindow}
          >
            <WindowBody win={win} h={h} onOpenProject={openProject} showTip={showTip} hideTip={hideTip} />
          </Window>
        ))}

        {tip && (
          <div style={{
            position: 'absolute', left: tip.x, top: tip.y, width: tip.tipW,
            padding: `${h * 0.01}px ${h * 0.012}px`,
            background: t.popupBg, color: t.popupText, borderRadius: h * 0.01,
            fontSize: h * 0.016, lineHeight: 1.4,
            boxShadow: `0 ${h * 0.01}px ${h * 0.025}px rgba(0,0,0,0.5)`,
            zIndex: 8500, pointerEvents: 'none',
          }}>
            {tip.text}{tip.hint && <span style={{ color: t.popupMuted }}> · {tip.hint}</span>}
          </div>
        )}

        <Taskbar
          apps={APPS}
          h={h}
          windows={windows}
          onOpen={activateApp}
          onRestore={restoreWindow}
          onZoomOut={onZoomOut}
          mode={mode}
          onToggleTheme={() => setMode(m => (m === 'light' ? 'dark' : 'light'))}
        />
      </div>
    </ThemeContext.Provider>
  )
}

export default ScreenContent
