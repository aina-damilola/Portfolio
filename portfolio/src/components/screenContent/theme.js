import { createContext, useContext } from 'react'

// Teal-leaning palette (matches Dami's old portfolio accent #528b9d/#426a77).
// Light is a warm off-white rather than pure grey so it doesn't read as generic.
export const THEMES = {
  light: {
    name: 'light',
    wallpaper: `
      radial-gradient(58% 50% at 50% 34%, rgba(86,150,170,0.42) 0%, rgba(60,110,150,0.12) 46%, transparent 72%),
      radial-gradient(42% 38% at 66% 62%, rgba(70,140,160,0.26) 0%, transparent 62%),
      radial-gradient(46% 42% at 34% 66%, rgba(40,120,150,0.26) 0%, transparent 62%),
      linear-gradient(150deg, #08161f 0%, #0c2630 46%, #134a55 100%)
    `,
    text: '#26303a',
    muted: '#5d6b78',
    accent: '#2f7f90',
    accentText: '#236374',
    chipBg: '#e0edef',
    chipText: '#236374',
    winBg: 'rgba(246,244,239,0.97)',    
    titleBar: 'rgba(235,234,227,0.92)',
    titleText: '#2a3440',
    border: 'rgba(40,34,24,0.10)',
    rowBg: '#eceff0',
    iconLabel: '#ffffff',
    iconLabelShadow: '0 1px 4px rgba(0,0,0,0.65)',
    taskbar: 'rgba(28,40,46,0.72)',
    popupBg: 'rgba(22,30,34,0.94)',
    popupText: '#eaf1f2',
    popupMuted: '#9fb4ba',
  },
  dark: {
    name: 'dark',
    wallpaper: `
      radial-gradient(58% 50% at 50% 36%, rgba(56,120,140,0.34) 0%, rgba(36,80,110,0.10) 46%, transparent 72%),
      radial-gradient(45% 40% at 34% 66%, rgba(34,110,130,0.22) 0%, transparent 62%),
      linear-gradient(150deg, #05080d 0%, #081620 52%, #0c2330 100%)
    `,
    text: '#e6ecf2',
    muted: '#94a4b3',
    accent: '#54bccf',
    accentText: '#76cfdf',
    chipBg: 'rgba(84,188,207,0.16)',
    chipText: '#86d4e3',
    winBg: 'rgba(30,35,43,0.97)',
    titleBar: 'rgba(38,45,55,0.95)',
    titleText: '#dde6f0',
    border: 'rgba(255,255,255,0.10)',
    rowBg: 'rgba(255,255,255,0.06)',
    iconLabel: '#eef4f8',
    iconLabelShadow: '0 1px 4px rgba(0,0,0,0.8)',
    taskbar: 'rgba(12,18,24,0.8)',
    popupBg: 'rgba(20,26,32,0.96)',
    popupText: '#e6eef2',
    popupMuted: '#8fa3ac',
  },
}

export const ThemeContext = createContext(THEMES.light)
export const useTheme = () => useContext(ThemeContext)
