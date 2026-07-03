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
            <WindowBody win={win} h={h} onOpenProject={openProject} />
          </Window>
        ))}

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
