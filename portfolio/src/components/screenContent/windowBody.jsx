import { useState } from 'react'
import { FileIcon } from './icons'
import { ABOUT, SKILLS, EDUCATION, EXPERIENCE, CONTACT, PROJECTS } from './data.js'
import { useTheme } from './theme.js'

function H({ h, children }) {
  const t = useTheme()
  return <div style={{ fontSize: h * 0.034, fontWeight: 700, marginBottom: h * 0.016, color: t.text }}>{children}</div>
}

function SkillChip({ s, h }) {
  const t = useTheme()
  const [hover, setHover] = useState(false)
  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span style={{
        fontSize: h * 0.018, color: t.chipText, background: t.chipBg,
        padding: `${h * 0.006}px ${h * 0.014}px`, borderRadius: h * 0.02,
        border: `1px solid ${t.accent}33`, cursor: 'help', whiteSpace: 'nowrap',
      }}>{s.name}</span>
      {hover && (
        <span style={{
          position: 'absolute', bottom: '132%', left: '50%', transform: 'translateX(-50%)',
          width: h * 0.22, padding: `${h * 0.01}px ${h * 0.012}px`,
          background: t.popupBg, color: t.popupText, borderRadius: h * 0.01,
          fontSize: h * 0.016, lineHeight: 1.4, textAlign: 'center',
          boxShadow: `0 ${h * 0.01}px ${h * 0.025}px rgba(0,0,0,0.5)`,
          zIndex: 20, pointerEvents: 'none',
        }}>{s.desc}</span>
      )}
    </span>
  )
}

function DocAbout({ h }) {
  const t = useTheme()
  return (
    <div>
      <H h={h}>About Me</H>
      {ABOUT.paragraphs.map((p, i) => (
        <p key={i} style={{ fontSize: h * 0.021, lineHeight: 1.55, color: t.text, margin: `0 0 ${h * 0.014}px` }}>{p}</p>
      ))}
      <div style={{ fontSize: h * 0.024, fontWeight: 700, color: t.text, margin: `${h * 0.018}px 0 ${h * 0.012}px` }}>Skills</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: h * 0.01 }}>
        {SKILLS.map(s => <SkillChip key={s.name} s={s} h={h} />)}
      </div>
    </div>
  )
}

function DocExperience({ h }) {
  const t = useTheme()
  return (
    <div>
      <H h={h}>Education</H>
      <div style={{ marginBottom: h * 0.026 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: h * 0.02 }}>
          <span style={{ fontSize: h * 0.024, fontWeight: 600, color: t.text }}>{EDUCATION.school}</span>
          <span style={{ fontSize: h * 0.018, color: t.muted, whiteSpace: 'nowrap' }}>{EDUCATION.period}</span>
        </div>
        <div style={{ fontSize: h * 0.02, color: t.accentText, marginBottom: h * 0.006 }}>{EDUCATION.degree}</div>
        <div style={{ fontSize: h * 0.0185, color: t.text }}>Relevant coursework: {EDUCATION.courses}</div>
      </div>

      <H h={h}>Experience</H>
      {EXPERIENCE.map((e, i) => (
        <div key={i} style={{ marginBottom: h * 0.022 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: h * 0.02 }}>
            <span style={{ fontSize: h * 0.024, fontWeight: 600, color: t.text }}>{e.role}</span>
            <span style={{ fontSize: h * 0.018, color: t.muted, whiteSpace: 'nowrap' }}>{e.period}</span>
          </div>
          <div style={{ fontSize: h * 0.02, color: t.accentText, marginBottom: h * 0.008 }}>{e.org}</div>
          <ul style={{ margin: 0, paddingLeft: h * 0.024 }}>
            {e.points.map((pt, j) => (
              <li key={j} style={{ fontSize: h * 0.019, lineHeight: 1.5, color: t.text, marginBottom: h * 0.004 }}>{pt}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function DocContact({ h }) {
  const t = useTheme()
  return (
    <div>
      <H h={h}>Contact</H>
      <div style={{ display: 'flex', flexDirection: 'column', gap: h * 0.012 }}>
        {CONTACT.map((c, i) => (
          <a key={i} href={c.href} target="_blank" rel="noreferrer"
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: `${h * 0.014}px ${h * 0.018}px`, borderRadius: h * 0.01,
              background: t.rowBg, textDecoration: 'none',
              borderLeft: `${h * 0.004}px solid ${t.accent}`,
            }}>
            <span style={{ fontSize: h * 0.021, fontWeight: 600, color: t.text }}>{c.label}</span>
            <span style={{ fontSize: h * 0.02, color: t.accentText }}>{c.value}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

function FileCell({ p, h, sel, onSelect, onOpen }) {
  const t = useTheme()
  const [hover, setHover] = useState(false)
  const cell = h * 0.13
  return (
    <div
      onClick={() => onSelect(p.id)}
      onDoubleClick={() => onOpen(p.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        width: cell, padding: h * 0.012, borderRadius: h * 0.008,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: h * 0.008,
        background: sel ? `${t.accent}28` : 'transparent',
        border: `1px solid ${sel ? `${t.accent}66` : 'transparent'}`,
        cursor: 'pointer', textAlign: 'center',
      }}
    >
      <FileIcon size={cell * 0.5} />
      <span style={{ fontSize: h * 0.018, color: t.text, lineHeight: 1.2 }}>{p.name}</span>
      {hover && (
        <span style={{
          position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
          marginBottom: h * 0.004, width: h * 0.24, padding: `${h * 0.009}px ${h * 0.011}px`,
          background: t.popupBg, color: t.popupText, borderRadius: h * 0.01,
          fontSize: h * 0.0155, lineHeight: 1.4, textAlign: 'center',
          boxShadow: `0 ${h * 0.01}px ${h * 0.025}px rgba(0,0,0,0.5)`, zIndex: 20, pointerEvents: 'none',
        }}>
          {p.blurb} <span style={{ color: t.popupMuted }}>· double-click to open</span>
        </span>
      )}
    </div>
  )
}

function FolderView({ h, onOpenProject }) {
  const [sel, setSel] = useState(null)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: h * 0.012, alignContent: 'flex-start' }}>
      {PROJECTS.map(p => (
        <FileCell key={p.id} p={p} h={h} sel={sel === p.id} onSelect={setSel} onOpen={onOpenProject} />
      ))}
    </div>
  )
}

function ProjectView({ h, projId }) {
  const t = useTheme()
  const p = PROJECTS.find(x => x.id === projId)
  if (!p) return null
  return (
    <div>
      <H h={h}>{p.name}</H>
      {p.meta && (
        <div style={{ fontSize: h * 0.018, fontWeight: 600, color: t.accent, marginTop: -h * 0.008, marginBottom: h * 0.012 }}>
          {p.meta}
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: h * 0.008, marginBottom: h * 0.018 }}>
        {p.tech.map(tag => (
          <span key={tag} style={{
            fontSize: h * 0.016, color: t.chipText, background: t.chipBg,
            padding: `${h * 0.004}px ${h * 0.012}px`, borderRadius: h * 0.02,
          }}>{tag}</span>
        ))}
      </div>
      {p.body.map((para, i) => (
        <p key={i} style={{ fontSize: h * 0.021, lineHeight: 1.55, color: t.text, margin: `0 0 ${h * 0.014}px` }}>{para}</p>
      ))}
      {p.link && (
        <a href={p.link} target="_blank" rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: h * 0.008,
            marginTop: h * 0.006, padding: `${h * 0.01}px ${h * 0.018}px`,
            fontSize: h * 0.018, fontWeight: 600, color: '#fff',
            background: t.accent, borderRadius: h * 0.008, textDecoration: 'none',
          }}>
          {p.link.includes('github.com') ? 'View on GitHub ↗' : 'Visit site ↗'}
        </a>
      )}
    </div>
  )
}

export default function WindowBody({ win, h, onOpenProject }) {
  switch (win.kind) {
    case 'doc':
      if (win.refId === 'about') return <DocAbout h={h} />
      if (win.refId === 'experience') return <DocExperience h={h} />
      if (win.refId === 'contact') return <DocContact h={h} />
      return null
    case 'folder':
      return <FolderView h={h} onOpenProject={onOpenProject} />
    case 'project':
      return <ProjectView h={h} projId={win.refId} />
    default:
      return null
  }
}
