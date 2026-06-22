'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  ShieldCheck,
  ChevronRight,
  Trophy,
  ListChecks,
  Building2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Share2,
  Download,
  X,
} from 'lucide-react'
import { abbreviateInstituteName } from './lib/formatters'

// Category dropdown: label shown to user, value used to match Seat Type in CSV.
const CATEGORIES = [
  { label: 'General (OPEN)', value: 'OPEN' },
  { label: 'EWS', value: 'EWS' },
  { label: 'OBC-NCL', value: 'OBC-NCL' },
  { label: 'SC', value: 'SC' },
  { label: 'ST', value: 'ST' },
  { label: 'General-PwD', value: 'OPEN (PwD)' },
  { label: 'EWS-PwD', value: 'EWS (PwD)' },
  { label: 'OBC-NCL-PwD', value: 'OBC-NCL (PwD)' },
  { label: 'SC-PwD', value: 'SC (PwD)' },
  { label: 'ST-PwD', value: 'ST (PwD)' },
]

const GENDERS = [
  { label: 'Gender-Neutral', value: 'Gender-Neutral' },
  { label: 'Female-only (including Supernumerary)', value: 'Female-only (including Supernumerary)' },
]

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Chandigarh', 'Dadra & Nagar Haveli',
  'Daman & Diu', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
  'Andaman & Nicobar Islands',
]

function Nav({ hasResult, onReset }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollTo = (id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const NAV_LINKS = [
    { label: 'Predictor', id: 'predict' },
    { label: 'Features', id: 'features' },
    { label: 'How It Works', id: 'how' },
    { label: 'FAQ', id: 'faq' },
    { label: 'About', id: 'about' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/60 border-b border-white/5">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <button onClick={() => scrollTo('predict')} className="flex items-center gap-2 focus:outline-none">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            Sahi<span className="text-violet-400">Seat</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="hover:text-foreground transition focus:outline-none"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          {hasResult ? (
            <Button
              size="sm"
              onClick={onReset}
              className="rounded-full bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-600/20"
            >
              New Prediction
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => scrollTo('predict')}

            >
              Get Started
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {/* Mobile: hamburger + CTA row */}
        <div className="flex md:hidden items-center gap-2">
          {hasResult && (
            <Button
              size="sm"
              onClick={onReset}
              className="rounded-full bg-violet-600 text-white hover:bg-violet-500 text-xs px-3 h-8"
            >
              New Prediction
            </Button>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 hover:text-white transition focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl">
          <nav className="flex flex-col px-4 py-3 gap-0.5">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition focus:outline-none"
              >
                {label}
              </button>
            ))}
            {!hasResult && (
              <button
                onClick={() => scrollTo('predict')}
                className="mt-2 w-full rounded-xl bg-white text-black text-sm font-medium py-2.5 hover:bg-white/90 transition"
              >
                Get Started
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-4 pb-2 md:pt-14 md:pb-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[300px] w-[600px] md:h-[520px] md:w-[860px] -translate-x-1/2 rounded-full bg-violet-600/10 md:bg-violet-600/20 blur-[100px] md:blur-[140px]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] md:opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
        }}
      />

      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] md:text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-violet-400" />
            <span>CSAB 2026 — Special Round</span>
            <ChevronRight className="h-3 w-3" />
          </div>

          <h1 className="mt-4 text-center">
            <span className="block text-4xl md:text-6xl font-bold text-white">
              CSAB 2026
            </span>

            <span className="block text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              College Predictor
            </span>
          </h1>

          <p className="mt-4 text-sm md:text-lg text-gray-300 max-w-md mx-auto">
            Find colleges you can realistically get based on
            official CSAB opening and closing ranks.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 text-xs md:text-sm max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 rounded-full border border-violet-500/20 bg-white/5 py-2">
              ✓ Completely Free
            </div>

            <div className="flex items-center justify-center gap-2 rounded-full border border-violet-500/20 bg-white/5 py-2">
              ✓ No Login Required
            </div>

            <div className="flex items-center justify-center gap-2 rounded-full border border-violet-500/20 bg-white/5 py-2">
              ✓ Official CSAB Data
            </div>

            <div className="flex items-center justify-center gap-2 rounded-full border border-violet-500/20 bg-white/5 py-2">
              ✓ Instant Results
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 w-full max-w-md mx-auto">
            <button
              onClick={() =>
                document.getElementById("predict")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Button
                className="w-full h-16 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-lg font-semibold shadow-2xl shadow-violet-500/30 hover:from-violet-600 hover:to-indigo-600"
              >
                → Predict Your Colleges
              </Button>
            </button>

            <button
              onClick={() =>
                document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Button
                variant="outline"
                className="w-full h-16 rounded-full border border-violet-500/30 bg-black/20 text-white text-lg font-semibold hover:bg-violet-500/10"
              >
                How it works
              </Button>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function fmt(n) {
  if (n === null || n === undefined || n === '') return '—'
  return Number(n).toLocaleString()
}

function ResultCard({ rec, index, highlight = false }) {
  const [expanded, setExpanded] = useState(false);
  const shortInst = abbreviateInstituteName(rec.institute);
  return (
    <div
      className={`relative rounded-xl border p-3 sm:p-4 transition ${highlight
        ? 'border-violet-400/30 bg-gradient-to-br from-violet-500/[0.08] via-white/[0.02] to-transparent'
        : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
        }`}
    >
      <div className="flex justify-between items-start gap-2 mb-1.5 sm:mb-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap text-[10px] mb-1">
            <span className="inline-flex h-4.5 w-4.5 items-center justify-center rounded bg-white/[0.06] text-white/50 text-[9px] font-semibold">
              {index + 1}
            </span>
            {highlight && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 text-violet-200 font-semibold uppercase tracking-wider text-[8px] sm:text-[9px]">
                <Trophy className="h-2.5 w-2.5 shrink-0" /> Best Match
              </span>
            )}
            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-white/40 text-[8px] sm:text-[9px] uppercase tracking-wider font-mono">
              R{rec.round}
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-bold leading-snug text-white flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 shrink-0 text-violet-300 hidden sm:block" />
            <span className="truncate" title={rec.institute}>{shortInst}</span>
          </h3>
          <p className="mt-0.5 text-xs text-white/70 leading-snug flex items-center gap-1.5 font-medium">
            <BookOpen className="h-3 w-3 shrink-0 text-white/30 hidden sm:block" />
            <span className="line-clamp-1" title={rec.program}>{rec.program}</span>
          </p>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-[10px] text-white/40 font-mono">
            CR: <strong className="text-white font-semibold">{fmt(rec.closingRank)}</strong>
          </div>
          <div className="text-xs sm:text-sm font-bold tabular-nums text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 mt-0.5 inline-block">
            +{fmt(rec.rankGap)}
          </div>
        </div>
      </div>

      {/* Tags & Ranks Inline Strip */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-1.5 text-[10px]">
        {/* Compact Metadata Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-white/40 font-mono text-[8px] sm:text-[9px]">
          <span>{rec.quota}</span>
          <span>|</span>
          <span>{rec.seatType}</span>
          <span>|</span>
          <span className="truncate max-w-[80px]">
            {rec.gender === 'Female-only (including Supernumerary)' ? 'Female' : 'Gender-Neutral'}
          </span>
        </div>

        {/* Ranks (Desktop shows opening rank, Mobile shows details toggle) */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 font-mono text-white/40 text-[9px] sm:text-[10px]">
            <span>Op: <strong className="text-white/80 font-normal">{fmt(rec.openingRank)}</strong></span>
          </div>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-[9px] sm:hidden text-violet-400 hover:text-violet-300 font-medium transition py-0.5 px-1.5 rounded bg-violet-500/5 border border-violet-500/10"
          >
            {expanded ? "Hide Details" : "Show Details"}
          </button>
        </div>
      </div>

      {/* Collapsible details on mobile viewports */}
      {expanded && (
        <div className="mt-2 p-2 rounded bg-black/40 border border-white/5 text-[10px] font-mono text-white/50 space-y-1 sm:hidden">
          <div>Opening Rank: <strong className="text-white">{fmt(rec.openingRank)}</strong></div>
          <div>Seat Type: <strong className="text-white">{rec.seatType}</strong></div>
          <div>Gender: <strong className="text-white">{rec.gender}</strong></div>
          <div>Quota: <strong className="text-white">{rec.quota}</strong></div>
        </div>
      )}
    </div>
  )
}

// ─── Achievement Modal ──────────────────────────────────────────────────────
function AchievementModal({ isOpen, onClose, topColleges, eligibleCount }) {
  const cardRef = useRef(null)
  const [isSharing, setIsSharing] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const generateImage = useCallback(async () => {
    if (!cardRef.current) return null
    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      })
      return canvas
    } catch (err) {
      console.error('Canvas generation error:', err)
      return null
    }
  }, [])

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const canvas = await generateImage()
      if (!canvas) return
      const link = document.createElement('a')
      link.download = 'sahiseat-achievement.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } finally {
      setIsDownloading(false)
    }
  }

  const handleShare = async () => {
    setIsSharing(true)
    try {
      const canvas = await generateImage()
      if (!canvas) return
      canvas.toBlob(async (blob) => {
        if (!blob) return
        const file = new File([blob], 'sahiseat-achievement.png', { type: 'image/png' })
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'My College Prediction Results',
            text: `I just found ${eligibleCount} eligible colleges on SahiSeat! Check it out.`,
            files: [file],
          })
        } else {
          // Fallback: download
          const link = document.createElement('a')
          link.download = 'sahiseat-achievement.png'
          link.href = canvas.toDataURL('image/png')
          link.click()
        }
      }, 'image/png')
    } catch (err) {
      console.error('Share error:', err)
    } finally {
      setIsSharing(false)
    }
  }

  if (!isOpen) return null

  const displayColleges = topColleges.slice(0, 4)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Achievement Card"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col gap-4 max-h-[95vh] overflow-y-auto">
        {/* The Achievement Card (rendered to canvas) */}
        <div
          ref={cardRef}
          id="achievement-card"
          style={{
            background: 'linear-gradient(135deg, #1a0533 0%, #2d0a6e 25%, #4c1199 50%, #6a21a6 75%, #9333ea 100%)',
            borderRadius: '24px',
            padding: '32px 28px',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            minWidth: '320px',
          }}
        >
          {/* Glassmorphism orb backgrounds */}
          <div style={{
            position: 'absolute', top: '-60px', right: '-60px',
            width: '200px', height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-40px', left: '-40px',
            width: '160px', height: '160px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,181,253,0.2) 0%, transparent 70%)',
            filter: 'blur(25px)',
          }} />
          <div style={{
            position: 'absolute', top: '40%', left: '50%',
            width: '300px', height: '300px',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }} />

          {/* Grid texture overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            borderRadius: '24px',
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '100px',
                padding: '4px 12px',
                backdropFilter: 'blur(8px)',
                marginBottom: '14px',
              }}>
                <span style={{ fontSize: '13px' }}>🎓</span>
                <span style={{ fontSize: '11px', color: 'rgba(216,180,254,0.9)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>SahiSeat Prediction</span>
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.95)',
                lineHeight: 1.35,
                letterSpacing: '-0.01em',
              }}>
                Your Rank Has More Potential
                <br />
                <span style={{ color: '#c4b5fd' }}>Than You Think</span>
              </div>
            </div>

            {/* Divider */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(167,139,250,0.4), transparent)',
              marginBottom: '20px',
            }} />

            {/* Hero Count */}
            <div style={{
              textAlign: 'center',
              marginBottom: '20px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(167,139,250,0.25)',
              borderRadius: '16px',
              padding: '18px 16px',
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{
                fontSize: '52px',
                fontWeight: 800,
                lineHeight: 1,
                background: 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 60%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '4px',
              }}>
                {eligibleCount}
              </div>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'rgba(196,181,253,0.8)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}>
                Colleges Found
              </div>
            </div>

            {/* Top Matches */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                color: 'rgba(196,181,253,0.7)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '10px',
                textAlign: 'center',
              }}>
                ✦ Top Matches ✦
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {displayColleges.map((college, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(167,139,250,0.2)',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <span style={{ fontSize: '14px', flexShrink: 0 }}>🏆</span>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.92)',
                      lineHeight: 1.3,
                      flex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {abbreviateInstituteName(college)}
                    </span>
                  </div>
                ))}
                {displayColleges.length < 4 && Array.from({ length: 4 - displayColleges.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    style={{
                      height: '37px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px dashed rgba(167,139,250,0.15)',
                      borderRadius: '12px',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={{
              textAlign: 'center',
              paddingTop: '14px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '8px',
              }}>
                <div style={{
                  width: '18px', height: '18px',
                  borderRadius: '5px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '10px' }}>🎓</span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>
                  Sahi<span style={{ color: '#c084fc' }}>Seat</span>
                </span>
              </div>
              <div style={{
                fontSize: '8.5px',
                color: 'rgba(255,255,255,0.3)',
                lineHeight: 1.4,
                display: 'block',
              }}>
                Beta • Based on previous year JoSAA &amp; CSAB cutoff data. Predictions may vary.
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            id="achievement-share-btn"
            onClick={handleShare}
            disabled={isSharing}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '12px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
              border: 'none',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              cursor: isSharing ? 'wait' : 'pointer',
              opacity: isSharing ? 0.7 : 1,
              boxShadow: '0 4px 24px rgba(124,58,237,0.35)',
            }}
          >
            <Share2 size={15} />
            {isSharing ? 'Sharing…' : 'Share'}
          </button>
          <button
            id="achievement-download-btn"
            onClick={handleDownload}
            disabled={isDownloading}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '12px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              cursor: isDownloading ? 'wait' : 'pointer',
              opacity: isDownloading ? 0.7 : 1,
              backdropFilter: 'blur(8px)',
            }}
          >
            <Download size={15} />
            {isDownloading ? 'Saving…' : 'Download'}
          </button>
          <button
            id="achievement-close-btn"
            onClick={onClose}
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.10)',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <X size={15} />
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

function Results({ result, query }) {
  const resultsRef = useRef(null)
  const [hsExpanded, setHsExpanded] = useState(false)
  const [achievementOpen, setAchievementOpen] = useState(false)

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [result])

  if (!result) return null

  const {
    bestMatches = [],
    goodOptions = [],
    exploreMore = [],
    homeStateNitOpportunities = [],
    totalEligible = 0,
    totalEligibleColleges = 0
  } = result

  const prefText = query.preferredBranches && query.preferredBranches.length > 0
    ? query.preferredBranches.join(', ')
    : 'None Selected'

  const firstNitName = homeStateNitOpportunities.length > 0
    ? abbreviateInstituteName(homeStateNitOpportunities[0].institute)
    : `NIT ${query.state}`

  return (
    <section ref={resultsRef} id="results" className="relative py-6 md:py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* Compact Results Summary Bar */}
          <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div>
                  <span className="text-white/40">Rank:</span> <strong className="text-white font-mono">{Number(query.rank).toLocaleString()}</strong>
                </div>
                <div className="text-white/20 hidden md:block">|</div>
                <div>
                  <span className="text-white/40">Category:</span> <strong className="text-white">{query.category}</strong>
                </div>
                <div className="text-white/20 hidden md:block">|</div>
                <div>
                  <span className="text-white/40">Gender:</span> <strong className="text-white">{query.gender === 'Female-only (including Supernumerary)' ? 'Female' : 'Gender-Neutral'}</strong>
                </div>
                <div className="text-white/20 hidden md:block">|</div>
                <div>
                  <span className="text-white/40">Home State:</span> <strong className="text-white">{query.state}</strong>
                </div>
                {prefText !== 'None Selected' && (
                  <>
                    <div className="text-white/20 hidden md:block">|</div>
                    <div className="truncate max-w-[150px] sm:max-w-none">
                      <span className="text-white/45">Branches:</span> <strong className="text-violet-300" title={prefText}>{prefText}</strong>
                    </div>
                  </>
                )}
              </div>
              <div className="shrink-0 font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded text-center md:text-right">
                Eligible Colleges: {totalEligibleColleges.toLocaleString()} ({totalEligible.toLocaleString()} seats)
              </div>
            </div>

            {result.diagnostics && result.diagnostics.eligibleOldLogicCount !== undefined && (
              <div className="mt-2.5 pt-2 border-t border-white/5 text-[11px] text-violet-300 flex items-center gap-1.5">
                <span>⚡ <strong>Predictor comparison</strong>: Found <strong>{result.diagnostics.eligibleNewLogicCount?.toLocaleString()}</strong> matches using standard logic (<code className="text-white">Rank &le; Closing</code>) vs <strong>{result.diagnostics.eligibleOldLogicCount?.toLocaleString()}</strong> matches under old restrictive logic (<code className="text-white">Opening &le; Rank &le; Closing</code>).</span>
              </div>
            )}
          </div>

          {totalEligible === 0 ? (
            <Card className="border-white/10 bg-white/[0.02]">
              <CardContent className="p-8 text-center">
                <div className="text-base font-medium">No eligible seats found.</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your rank is higher than every closing rank for the selected Seat Type
                  &amp; Gender. Try a different category or check rounds with more openings.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Feature 1: Home State NIT Opportunities - Collapsible Premium Card */}
              <div className="mb-6">
                {homeStateNitOpportunities.length === 0 ? (
                  <div className="rounded-xl border border-white/10 bg-white/[0.01] p-4 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white/60 flex items-center gap-1.5">
                        🏠 Your Home State Advantage
                      </span>
                      <span className="text-[11px] text-muted-foreground mt-0.5">
                        NIT {query.state} · 0 Eligible Programs
                      </span>
                    </div>
                    <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">No Options</span>
                  </div>
                ) : (
                  <div className="rounded-xl border border-violet-500/20 bg-gradient-to-r from-violet-500/[0.08] via-white/[0.02] to-transparent overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setHsExpanded(!hsExpanded)}
                      className="w-full flex items-center justify-between p-4 text-left transition hover:bg-white/[0.02]"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                          🏠 Your Home State Advantage
                        </span>
                        <span className="text-xs text-violet-300 font-semibold mt-0.5">
                          {firstNitName} · {homeStateNitOpportunities.length} Eligible Program{homeStateNitOpportunities.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-violet-300 font-semibold bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full transition hover:bg-violet-500/20">
                        <span>{hsExpanded ? "▲ Collapse" : "▼ Expand"}</span>
                      </div>
                    </button>
                    {hsExpanded && (
                      <div className="p-3 sm:p-4 border-t border-white/5 bg-black/20">
                        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                          {homeStateNitOpportunities.map((rec, i) => (
                            <ResultCard key={`hs-nit-${i}`} rec={rec} index={i} highlight />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bucket 1: Best Matches */}
              <div className="mb-6">
                <div className="mb-2.5 flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🏆</span>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">Best Matches</h3>
                    <span className="text-[10px] sm:text-xs text-white/40 font-normal">
                      · Top {bestMatches.length} recommended choices
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-semibold font-mono uppercase tracking-wider">Top Tier</span>
                </div>
                {bestMatches.length === 0 ? (
                  <p className="text-xs text-white/40 italic py-1">No matches in this bucket.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                    {bestMatches.map((rec, i) => (
                      <ResultCard key={`best-${i}`} rec={rec} index={i} highlight />
                    ))}
                  </div>
                )}
              </div>

              {/* ── Share Achievement Button ── */}
              <div className="mb-6 flex justify-center">
                <button
                  id="share-achievement-btn"
                  onClick={() => setAchievementOpen(true)}
                  className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #9333ea 100%)',
                    boxShadow: '0 0 0 1px rgba(167,139,250,0.25), 0 8px 32px rgba(124,58,237,0.35)',
                  }}
                >
                  {/* Shimmer effect */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)',
                      backgroundSize: '200% 100%',
                    }}
                  />
                  <span className="text-base">🎉</span>
                  <span>Share Achievement</span>
                  <Share2 className="h-4 w-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Achievement Modal */}
              <AchievementModal
                isOpen={achievementOpen}
                onClose={() => setAchievementOpen(false)}
                topColleges={[
                  ...bestMatches.slice(0, 4).map(r => r.institute),
                  ...goodOptions.slice(0, Math.max(0, 4 - bestMatches.length)).map(r => r.institute),
                ].slice(0, 4)}
                eligibleCount={totalEligibleColleges}
              />

              {/* Bucket 2: Good Options */}
              <div className="mb-6">
                <div className="mb-2.5 flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🎯</span>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">Good Options</h3>
                    <span className="text-[10px] sm:text-xs text-white/40 font-normal">
                      · Next {goodOptions.length} suitable choices
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-semibold font-mono uppercase tracking-wider">Suitable</span>
                </div>
                {goodOptions.length === 0 ? (
                  <p className="text-xs text-white/40 italic py-1">No matches in this bucket.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-2.5">
                    {goodOptions.map((rec, i) => (
                      <ResultCard key={`good-${i}`} rec={rec} index={i + 10} />
                    ))}
                  </div>
                )}
              </div>

              {/* Bucket 3: Explore More */}
              <div className="mb-6">
                <div className="mb-2.5 flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔍</span>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">Explore More</h3>
                    <span className="text-[10px] sm:text-xs text-white/40 font-normal">
                      · {exploreMore.length} additional opportunities
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 text-[10px] font-semibold font-mono uppercase tracking-wider">Explore</span>
                </div>
                {exploreMore.length === 0 ? (
                  <p className="text-xs text-white/40 italic py-1">No matches in this bucket.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-2.5">
                    {exploreMore.map((rec, i) => (
                      <ResultCard key={`explore-${i}`} rec={rec} index={i + 30} />
                    ))}
                  </div>
                )}
              </div>

              {/* Technical Details / Collapsible Diagnostics Accordion */}
              {result.diagnostics && (
                <details className="mt-8 border border-white/5 bg-white/[0.01] rounded-xl overflow-hidden group">
                  <summary className="p-3 text-xs text-white/40 cursor-pointer hover:text-white/70 transition font-medium flex items-center justify-between select-none">
                    <span>🛠️ Technical Details & Diagnostics</span>
                    <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                  </summary>
                  <div className="p-4 border-t border-white/5 bg-black/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <div className="text-white/40 font-medium">Loaded Records</div>
                      <div className="mt-0.5 text-sm sm:text-base font-semibold text-white font-mono">{result.diagnostics.totalRecordsLoaded.toLocaleString()}</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <div className="text-white/40 font-medium">Eligible Options</div>
                      <div className="mt-0.5 text-sm sm:text-base font-semibold text-white font-mono">{result.diagnostics.totalEligibleBeforeSorting.toLocaleString()}</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <div className="text-white/40 font-medium">Eligible NITs</div>
                      <div className="mt-0.5 text-sm sm:text-base font-semibold text-violet-300 font-mono">{result.diagnostics.eligibleNitCount.toLocaleString()}</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <div className="text-white/40 font-medium">Eligible IIITs</div>
                      <div className="mt-0.5 text-sm sm:text-base font-semibold text-indigo-300 font-mono">{result.diagnostics.eligibleIiitCount.toLocaleString()}</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <div className="text-white/40 font-medium">Eligible GFTIs</div>
                      <div className="mt-0.5 text-sm sm:text-base font-semibold text-fuchsia-300 font-mono">{result.diagnostics.eligibleGftiCount.toLocaleString()}</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <div className="text-white/40 font-medium">Eligible Others</div>
                      <div className="mt-0.5 text-sm sm:text-base font-semibold text-emerald-300 font-mono">{result.diagnostics.eligibleOtherCount.toLocaleString()}</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <div className="text-white/40 font-medium">Eligible HS Seats</div>
                      <div className="mt-0.5 text-sm sm:text-base font-semibold text-rose-300 font-mono">{result.diagnostics.hsEligibleCount.toLocaleString()}</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <div className="text-white/40 font-medium">Eligible OS Seats</div>
                      <div className="mt-0.5 text-sm sm:text-base font-semibold text-sky-300 font-mono">{result.diagnostics.osEligibleCount.toLocaleString()}</div>
                    </div>
                  </div>
                </details>
              )}

              {totalEligible > 50 && (
                <p className="mt-6 text-center text-xs text-muted-foreground">
                  Showing the first 50 of {totalEligible.toLocaleString()} eligible records, prioritizing your preferred branches.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function PredictForm({ onResult, hasResult, query }) {
  const [rank, setRank] = useState('')
  const [category, setCategory] = useState('')
  const [gender, setGender] = useState('Gender-Neutral')
  const [state, setState] = useState('')
  const [preferredBranches, setPreferredBranches] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rank: Number(rank),
          category,
          gender,
          state,
          preferredBranches,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || 'Failed to predict')
        onResult(null, null)
      } else {
        onResult(json, { rank, category, gender, state, preferredBranches })
      }
    } catch (err) {
      setError(err.message || 'Network error')
      onResult(null, null)
    } finally {
      setLoading(false)
    }
  }

  const ready = rank && category && gender && state

  const isDirty = query && (
    Number(query.rank) !== Number(rank) ||
    query.category !== category ||
    query.gender !== gender ||
    query.state !== state ||
    JSON.stringify(query.preferredBranches) !== JSON.stringify(preferredBranches)
  )

  const showSticky = !hasResult || isDirty

  return (
    <section id="predict" className="relative py-6 md:py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] md:text-xs text-muted-foreground">
              <Target className="h-3 w-3 text-violet-400" />
              College Predictor
            </div>
            <h2 className="mt-2 text-xl md:text-3xl font-semibold tracking-tight">
              Enter your details
            </h2>
            <p className="mt-1 text-xs md:text-sm text-muted-foreground">
              We match your rank against official CSAB opening &amp; closing ranks.
            </p>
          </div>

          <Card className="relative overflow-hidden border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5" />
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[80%] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />

            <CardContent className="relative p-5 md:p-8">
              <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label htmlFor="rank" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    JEE Main CRL Rank
                  </Label>
                  <Input
                    id="rank"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="e.g. 15000"
                    value={rank}
                    onChange={(e) => setRank(e.target.value.replace(/[^0-9]/g, ''))}
                    className="h-11 rounded-xl border-white/10 bg-black/30 px-4 text-sm sm:text-base placeholder:text-muted-foreground/60 focus-visible:ring-violet-500/40"
                  />
                  <p className="mt-1.5 text-[11px] text-muted-foreground/70">
                    Enter your Common Rank List (CRL) rank from JEE Main.
                  </p>
                </div>

                <div>
                  <Label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                    Category
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-11 rounded-xl border-white/10 bg-black/30 text-sm sm:text-base">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                    Gender
                  </Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="h-11 rounded-xl border-white/10 bg-black/30 text-sm sm:text-base">
                      <SelectValue placeholder="Select gender pool" />
                    </SelectTrigger>
                    <SelectContent>
                      {GENDERS.map((g) => (
                        <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                    Home State
                  </Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger className="h-11 rounded-xl border-white/10 bg-black/30 text-sm sm:text-base">
                      <SelectValue placeholder="Select your home state" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {STATES.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                    Preferred Branches (Optional)
                  </Label>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {['CSE', 'AI', 'IT', 'ECE', 'EE', 'Mechanical', 'Civil', 'Chemical', 'Biotechnology', 'Other'].map((branch) => {
                      const isSel = preferredBranches.includes(branch);
                      return (
                        <button
                          key={branch}
                          type="button"
                          onClick={() => {
                            if (isSel) {
                              setPreferredBranches(preferredBranches.filter(b => b !== branch));
                            } else {
                              setPreferredBranches([...preferredBranches, branch]);
                            }
                          }}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition ${isSel
                            ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/20'
                            : 'bg-black/40 border-white/5 text-white/60 hover:border-white/20 hover:text-white'
                            }`}
                        >
                          {branch}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="md:col-span-2 mt-2">
                  <Button
                    type="submit"
                    disabled={!ready || loading}
                    className="group h-11 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-base font-medium text-white shadow-lg shadow-violet-600/30 transition hover:opacity-95 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                        Analyzing…
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        Predict Colleges
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                    )}
                  </Button>
                  {error && (
                    <p className="mt-2 text-center text-xs text-red-300">{error}</p>
                  )}
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    Matched against 1,400+ official CSAB cutoff records.
                  </p>
                  {/* Beta note */}
                  <p className="mt-3 text-center text-[11px] text-muted-foreground/50">
                    🚀 SahiSeat Beta • Based on previous year JoSAA &amp; CSAB cutoff data.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sticky Mobile Predict Button */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/85 backdrop-blur-md border-t border-white/10 p-3 md:hidden">
          <Button
            type="button"
            onClick={onSubmit}
            disabled={!ready || loading}
            className="group h-11 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-sm font-medium text-white shadow-lg shadow-violet-600/30 transition hover:opacity-95 disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2 justify-center w-full">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                Analyzing…
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 justify-center w-full">
                Predict Colleges
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </div>
      )}
    </section>
  )
}

function Features() {
  const live = [
    { emoji: '🎯', title: 'Rank-Based Prediction', desc: 'Find colleges and branches based on your JEE Main rank.' },
    { emoji: '🏠', title: 'Home State Advantage', desc: 'Discover opportunities available through your home state quota.' },
    { emoji: '📊', title: 'Smart Recommendations', desc: 'Results grouped into Best Matches, Good Options and Explore More.' },
    { emoji: '⚡', title: 'Instant Results', desc: 'No signup required. Get recommendations instantly.' },
  ]
  const coming = [
    { emoji: '📋', title: 'Personalized Choice List Generator' },
    { emoji: '⚖️', title: 'College Comparison Tool' },
    { emoji: '🧠', title: 'CSAB Strategy Assistant' },
    { emoji: '💾', title: 'Save & Track Choices' },
  ]
  return (
    <section id="features" className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Features</h2>
        </div>

        {/* Live features */}
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {live.map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.04] transition"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <h3 className="text-sm font-semibold text-white mb-1.5">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mx-auto max-w-5xl mt-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold text-white/60">Coming Soon</span>
            <span className="text-base">🚀</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {coming.map(({ emoji, title }) => (
              <div
                key={title}
                className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-4 flex items-center gap-3 opacity-60"
              >
                <span className="text-xl shrink-0">{emoji}</span>
                <span className="text-xs font-medium text-white/50">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { n: '01', t: 'Enter your rank and preferences.', d: 'Provide your JEE rank, category, gender, home state and preferred branches.' },
    { n: '02', t: 'SahiSeat analyzes the data.', d: 'We match your inputs against historical JoSAA and CSAB cutoff records.' },
    { n: '03', t: 'Get personalized recommendations.', d: 'Receive college and branch suggestions ranked by how closely they fit your rank.' },
    { n: '04', t: 'Build a smarter strategy.', d: 'Explore options and build a smarter counseling strategy before filling choices.' },
  ]
  return (
    <section id="how" className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">How It Works</h2>
        </div>
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5">
              <div className="text-xs font-bold tracking-widest text-violet-400 mb-2">Step {s.n}</div>
              <div className="text-sm font-semibold text-white mb-1.5">{s.t}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)
  const items = [
    {
      q: 'Is SahiSeat official?',
      a: 'No. SahiSeat is an independent guidance tool and is not affiliated with NTA, JoSAA or CSAB.',
    },
    {
      q: 'Does SahiSeat guarantee admission?',
      a: 'No. Recommendations are based on historical cutoff trends and should be used as a guide, not a guarantee.',
    },
    {
      q: 'Is the data based on JoSAA and CSAB cutoffs?',
      a: 'Yes. All predictions use official JoSAA and CSAB published closing rank data from previous rounds.',
    },
    {
      q: 'Do I need to create an account?',
      a: 'No. SahiSeat requires no registration. Just enter your details and get results instantly.',
    },
    {
      q: 'Is SahiSeat free?',
      a: 'Yes. SahiSeat is completely free to use.',
    },
  ]
  return (
    <section id="faq" className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Frequently Asked Questions</h2>
        </div>
        <div className="mx-auto max-w-2xl space-y-2">
          {items.map(({ q, a }, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-white hover:bg-white/[0.03] transition focus:outline-none"
              >
                <span>{q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-white/40 transition-transform duration-200 ${openIdx === i ? 'rotate-180' : ''
                    }`}
                />
              </button>
              {openIdx === i && (
                <div className="px-5 pb-4 text-sm text-muted-foreground border-t border-white/5 pt-3">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">About SahiSeat</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            SahiSeat helps JEE aspirants make smarter JoSAA and CSAB counseling decisions using
            historical cutoff data and transparent recommendations. No guesswork. No black boxes.
          </p>
          <p className="text-sm text-white/70 mb-6">
            Built by <span className="text-violet-300 font-semibold">Vijayendra Ch & Avinash</span> · IIIT Vadodara
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/in/ch-vijayendraswamy/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.07] hover:border-white/20 transition"
            >
              <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://www.linkedin.com/in/avinash-mondenor-0579ab407/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.07] hover:border-white/20 transition"
            >
              <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://www.youtube.com/@SahiSeat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.07] hover:border-white/20 transition"
            >
              <svg className="h-4 w-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              YouTube
            </a>
            <a
              href="https://www.instagram.com/sahiseat.in?igsh=MXZ0dGVhNWMxYmp3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.07] hover:border-white/20 transition"
            >
              <svg className="h-4 w-4 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0120 7.75v8.5A3.75 3.75 0 0116.25 20h-8.5A3.75 3.75 0 014 16.25v-8.5A3.75 3.75 0 017.75 4zm8.75 1a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500">
            <GraduationCap className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-medium">
            Sahi<span className="text-violet-400">Seat</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} SahiSeat. Not affiliated with NTA, JoSAA or CSAB.
        </p>
      </div>
    </footer>
  )
}

const App = () => {
  const [result, setResult] = useState(null)
  const [query, setQuery] = useState(null)

  const onResult = (r, q) => {
    setResult(r)
    setQuery(q)
  }

  const onReset = () => {
    setResult(null)
    setQuery(null)
    const element = document.getElementById("predict")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Nav hasResult={!!result} onReset={onReset} />
      <Hero />
      <PredictForm onResult={onResult} hasResult={!!result} query={query} />
      {result && query && <Results result={result} query={query} />}
      <Features />
      <HowItWorks />
      <FAQ />
      <About />
      <Footer />
    </main>
  )
}

export default App
