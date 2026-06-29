import { useRef, useEffect } from "react"
import Desktop from './desktop'
import Taskbar from './taskbar'
import { APPS } from './apps'

const WALLPAPER = `
  radial-gradient(60% 52% at 50% 36%, rgba(95,155,255,0.45) 0%, rgba(60,110,220,0.12) 46%, transparent 72%),
  radial-gradient(42% 38% at 64% 60%, rgba(150,110,255,0.30) 0%, transparent 62%),
  radial-gradient(46% 42% at 36% 64%, rgba(40,165,225,0.30) 0%, transparent 62%),
  linear-gradient(150deg, #06122e 0%, #0c2150 46%, #123a86 100%)
`

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

  const onOpen =()=>{

  }

  return (
    <div 
      ref={rootRef}
      style={{
      width: w,
      height: h,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Segoe UI Variable', 'Segoe UI', 'Inter', system-ui, sans-serif",
      background: WALLPAPER,
    }}>
      <Desktop apps={APPS} h={h} onOpen={onOpen} />
      <Taskbar apps={APPS} h={h} onOpen={onOpen}/>
    </div>
  )
}

export default ScreenContent