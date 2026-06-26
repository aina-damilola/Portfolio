import { useRef, useEffect } from "react"

function ScreenContent({ w, h, zoomed, onActivate }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const stop = (e) => {
      e.stopPropagation()
      if (e.type === 'click' && !zoomed) onActivate?.()
    }
    const types = ['pointerdown', 'pointerup', 'click']
    types.forEach(t => el.addEventListener(t, stop))
    return () => types.forEach(t => el.removeEventListener(t, stop))
  }, [zoomed, onActivate])

  return (
    <div
      ref={rootRef}
      style={{
      width: w, height: h,
      background: '#070d1e',
      overflow: 'hidden',
      fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      boxSizing: 'border-box',
      padding: `${h * 0.07}px ${w * 0.065}px`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: '#c8d8f0',
      userSelect: 'none',
      cursor: zoomed ? 'default' : 'pointer',
    }}>
      {/* Hero */}
      <div>
        <div style={{
          fontSize: h * 0.04,
          letterSpacing: '0.18em',
          color: '#3a5590',
          marginBottom: h * 0.025,
          textTransform: 'uppercase',
        }}>
          Portfolio
        </div>
        <div style={{
          fontSize: h * 0.145,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
        }}>
          Dami Aina
        </div>
        <div style={{
          fontSize: h * 0.053,
          color: '#506a99',
          marginTop: h * 0.018,
          lineHeight: 1.4,
        }}>
          Computer Engineering · Full-Stack · Embedded
        </div>
      </div>
    </div>
  )
}

export default ScreenContent