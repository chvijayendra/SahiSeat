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
  Tag,
  User,
  MapPin,
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
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border-custom">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <button onClick={() => scrollTo('predict')} className="flex items-center gap-2.5 focus:outline-none cursor-pointer group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-purple to-accent-blue shadow-md transition-transform duration-300 group-hover:scale-105">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-primary-text">
            Sahi<span className="bg-gradient-to-r from-primary-purple to-secondary-purple bg-clip-text text-transparent">Seat</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary-text">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="hover:text-primary-text transition-colors duration-200 focus:outline-none cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary-purple hover:after:w-full after:transition-all after:duration-300"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          {hasResult ? (
            <Button
              onClick={onReset}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-primary-purple to-accent-blue text-white text-sm font-semibold hover:shadow-[0_4px_20px_rgba(124,58,237,0.3)] transition-all duration-300 active:scale-[0.98] cursor-pointer"
            >
              New Prediction
            </Button>
          ) : (
            <Button
              onClick={() => scrollTo('predict')}
              className="px-5 py-2.5 rounded-2xl bg-primary-text text-background text-sm font-semibold hover:bg-primary-text/90 transition-all duration-300 active:scale-[0.98] cursor-pointer inline-flex items-center gap-1.5"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
          )}
        </div>

        {/* Mobile: hamburger + CTA row */}
        <div className="flex md:hidden items-center gap-2">
          {hasResult && (
            <Button
              onClick={onReset}
              className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-primary-purple to-accent-blue text-white text-xs font-semibold hover:shadow-[0_4px_20px_rgba(124,58,237,0.25)] transition-all duration-300 active:scale-[0.98] cursor-pointer"
            >
              New Prediction
            </Button>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-custom bg-card text-secondary-text hover:text-primary-text transition-colors duration-200 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border-custom bg-background/95 backdrop-blur-xl">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-secondary-text hover:text-primary-text hover:bg-card transition duration-200 focus:outline-none cursor-pointer"
              >
                {label}
              </button>
            ))}
            {!hasResult && (
              <button
                onClick={() => scrollTo('predict')}
                className="mt-2 w-full rounded-2xl bg-primary-text text-background text-sm font-semibold py-3 hover:bg-primary-text/90 transition-all duration-300 cursor-pointer text-center"
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
    <section id="hero-section" className="relative overflow-hidden pt-8 pb-6 md:pt-14 md:pb-10">
      {/* Premium subtle background radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[300px] w-[600px] md:h-[450px] md:w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-primary-purple/10 to-accent-blue/10 blur-[100px] md:blur-[140px]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">

          {/* Small Trust Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border-custom bg-secondary-bg/60 px-3.5 py-1 text-xs text-secondary-text shadow-sm backdrop-blur-md">
            <span className="text-sm">📊</span>
            <span className="font-semibold tracking-wide">Based on Official CSAB Cutoff Data</span>
          </div>

          {/* Main Heading */}
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl leading-[1.15] text-primary-text">
            CSAB 2026
            <span className="block mt-1.5 bg-gradient-to-r from-primary-purple via-secondary-purple to-accent-blue bg-clip-text text-transparent">
              College Predictor
            </span>
          </h1>

          {/* Short Description */}
          <p className="mt-4 text-sm sm:text-base text-secondary-text leading-relaxed">
            Find colleges you can realistically get based on official CSAB opening and closing ranks.
          </p>

          {/* Credibility Badge */}
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border-custom bg-primary-purple/5 px-3 py-1 text-xs text-secondary-purple font-semibold">
            <span>🎓</span>
            <span>Built by IIIT Vadodara Students</span>
          </div>

          {/* Feature Pills - 2x2 Grid */}
          <div className="mt-6 w-full max-w-xs grid grid-cols-2 gap-x-4 gap-y-2 px-4 justify-items-start text-left">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary-text">
              <span className="text-success font-bold">✓</span>
              <span>Completely Free</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary-text">
              <span className="text-success font-bold">✓</span>
              <span>No Login Required</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary-text">
              <span className="text-success font-bold">✓</span>
              <span>Official CSAB Data</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary-text">
              <span className="text-success font-bold">✓</span>
              <span>Instant Results</span>
            </div>
          </div>

          {/* Primary CTA (Slightly lower for thumb reach) */}
          <div className="mt-9 w-full sm:w-auto">
            <Button
              onClick={() => document.getElementById('predict')?.scrollIntoView({ behavior: 'smooth' })}
              className="group w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary-purple to-accent-blue text-white text-base font-bold shadow-md hover:shadow-[0_8px_30px_rgba(124,58,237,0.3)] hover:scale-[1.02] transition-all duration-300 active:scale-[0.98] cursor-pointer inline-flex items-center justify-center gap-2"
            >
              Predict My Colleges
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
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
      className={`relative rounded-2xl border p-4 transition-all duration-300 ${highlight
        ? 'border-primary-purple/35 bg-gradient-to-br from-primary-purple/[0.08] via-card to-card/50 shadow-md shadow-primary-purple/[0.02]'
        : 'border-border-custom bg-card hover:bg-card/75 hover:border-secondary-text/25'
        }`}
    >
      <div className="flex justify-between items-start gap-3 mb-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap text-[10px] mb-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-[#111118] border border-border-custom text-secondary-text text-[9px] font-bold font-mono">
              {index + 1}
            </span>
            {highlight && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary-purple/10 border border-primary-purple/20 text-secondary-purple font-semibold uppercase tracking-wider text-[8px] sm:text-[9px]">
                <Trophy className="h-2.5 w-2.5 shrink-0" /> Best Match
              </span>
            )}
            <span className="px-2 py-0.5 rounded bg-[#111118]/60 border border-border-custom text-secondary-text/80 text-[8px] sm:text-[9px] uppercase tracking-wider font-mono">
              R{rec.round}
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-bold leading-snug text-primary-text flex items-center gap-1.5">
            <Building2 className="h-4 w-4 shrink-0 text-primary-purple/80 hidden sm:block" />
            <span className="truncate" title={rec.institute}>{shortInst}</span>
          </h3>
          <p className="mt-1 text-xs text-secondary-text leading-snug flex items-center gap-1.5 font-medium">
            <BookOpen className="h-3.5 w-3.5 shrink-0 text-secondary-text/40 hidden sm:block" />
            <span className="line-clamp-1" title={rec.program}>{rec.program}</span>
          </p>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-[10px] text-secondary-text/60 font-mono">
            CR: <strong className="text-primary-text font-bold">{fmt(rec.closingRank)}</strong>
          </div>
          <div className="text-xs sm:text-sm font-bold tabular-nums text-success bg-success/10 px-2 py-0.5 rounded border border-success/20 mt-1 inline-block">
            +{fmt(rec.rankGap)}
          </div>
        </div>
      </div>

      {/* Tags & Ranks Inline Strip */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border-custom pt-2 text-[10px]">
        {/* Compact Metadata Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-secondary-text/50 font-mono text-[8px] sm:text-[9px]">
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
          <div className="hidden sm:flex items-center gap-2 font-mono text-secondary-text/50 text-[9px] sm:text-[10px]">
            <span>Op: <strong className="text-primary-text/80 font-semibold">{fmt(rec.openingRank)}</strong></span>
          </div>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-[9px] sm:hidden text-primary-purple hover:text-secondary-purple font-semibold transition py-0.5 px-2 rounded bg-primary-purple/5 border border-primary-purple/15"
          >
            {expanded ? "Hide Details" : "Show Details"}
          </button>
        </div>
      </div>

      {/* Collapsible details on mobile viewports */}
      {expanded && (
        <div className="mt-2.5 p-3 rounded-xl bg-background/80 border border-border-custom text-[10px] font-mono text-secondary-text/80 space-y-1 sm:hidden">
          <div>Opening Rank: <strong className="text-primary-text">{fmt(rec.openingRank)}</strong></div>
          <div>Seat Type: <strong className="text-primary-text">{rec.seatType}</strong></div>
          <div>Gender: <strong className="text-primary-text">{rec.gender}</strong></div>
          <div>Quota: <strong className="text-primary-text">{rec.quota}</strong></div>
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

  const [searchTerm, setSearchTerm] = useState('')
  const [instFilter, setInstFilter] = useState('All') // 'All', 'NIT', 'IIIT', 'GFTI'
  const [selectedBranches, setSelectedBranches] = useState([])
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const [sortBy, setSortBy] = useState('Best Match') // 'Best Match', 'Lowest Closing Rank', 'Highest Closing Rank', 'Alphabetical'

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

  const firstNitName = homeStateNitOpportunities.length > 0
    ? abbreviateInstituteName(homeStateNitOpportunities[0].institute)
    : `NIT ${query.state}`

  // Filtering Logic
  const filterList = (list) => {
    return (list || []).filter(item => {
      if (!item) return false;
      const queryStr = searchTerm.toLowerCase().trim();
      const college = (item.institute || '').toLowerCase();
      const program = (item.program || '').toLowerCase();
      const instType = (item.instituteType || '').toLowerCase();
      const branchCode = (item.branch || '').toLowerCase();

      const matchesSearch = !searchTerm ||
        college.includes(queryStr) ||
        program.includes(queryStr) ||
        instType.includes(queryStr) ||
        branchCode.includes(queryStr);

      const matchesInst = instFilter === 'All' || instType === instFilter.toLowerCase();

      const branch = item.branch || 'Other';
      const matchesBranch = selectedBranches.length === 0 || selectedBranches.includes(branch);

      return matchesSearch && matchesInst && matchesBranch;
    });
  };

  // Sorting Logic
  const sortList = (list) => {
    const sorted = [...list];
    if (sortBy === 'Lowest Closing Rank') {
      sorted.sort((a, b) => (a.closingRank || 0) - (b.closingRank || 0));
    } else if (sortBy === 'Highest Closing Rank') {
      sorted.sort((a, b) => (b.closingRank || 0) - (a.closingRank || 0));
    } else if (sortBy === 'Alphabetical') {
      sorted.sort((a, b) => (a.institute || '').localeCompare(b.institute || ''));
    }
    return sorted;
  };

  const processedBest = sortList(filterList(bestMatches));
  const processedGood = sortList(filterList(goodOptions));
  const processedExplore = sortList(filterList(exploreMore));
  const processedHomeState = sortList(filterList(homeStateNitOpportunities));

  const hasMatches = processedBest.length > 0 || processedGood.length > 0 || processedExplore.length > 0 || processedHomeState.length > 0;

  return (
    <section
      ref={resultsRef}
      id="college-results"
      className="relative py-8 md:py-12 border-t border-border-custom bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">

          {/* Compact SaaS Filter Toolbar */}
          <div className="mb-6 space-y-3">
            {/* Row 1: Search Input & Sorting */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Full-width Search */}
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-secondary-text/50">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search colleges or branches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-11 w-full rounded-xl border border-border-custom bg-[#13131A] pl-10 pr-4 text-xs sm:text-sm text-primary-text placeholder:text-secondary-text/45 focus:outline-none focus:border-primary-purple/50 focus:ring-1 focus:ring-primary-purple/50 transition duration-200"
                />
              </div>

              {/* Sort By Dropdown */}
              <div className="w-full sm:w-52 relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-11 w-full rounded-xl border border-border-custom bg-[#13131A] px-4 text-xs sm:text-sm text-primary-text focus:outline-none focus:border-primary-purple/50 transition appearance-none cursor-pointer pr-10"
                >
                  <option value="Best Match">Sort: Best Match</option>
                  <option value="Lowest Closing Rank">Sort: Lowest Closing</option>
                  <option value="Highest Closing Rank">Sort: Highest Closing</option>
                  <option value="Alphabetical">Sort: Alphabetical</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-secondary-text/50">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Row 2: Institute Type Selector & Branch Filters Button */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Subtle selectors for Institute filter */}
              <div className="flex rounded-xl border border-border-custom bg-[#13131A] p-0.5 gap-0.5">
                {['All', 'NIT', 'IIIT', 'GFTI'].map((type) => {
                  const isSel = instFilter === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setInstFilter(type)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${isSel
                        ? 'bg-[#1c1c24] border border-border-custom/50 text-primary-text shadow-sm'
                        : 'border border-transparent text-secondary-text hover:text-primary-text'
                        }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>

              {/* Collapsible Trigger */}
              <button
                type="button"
                onClick={() => setShowMoreFilters(!showMoreFilters)}
                className="h-11 px-4 rounded-xl border border-border-custom bg-[#13131A] text-xs font-semibold text-secondary-text hover:text-primary-text transition cursor-pointer flex items-center gap-1.5"
              >
                <span>⚡ Branch Filters</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showMoreFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Collapsible Branch Filter Pills */}
            {showMoreFilters && (
              <div className="p-4 rounded-xl border border-border-custom bg-[#13131A]/40 flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-secondary-text/60 mr-2">Branches:</span>
                {['CSE', 'AI', 'IT', 'ECE'].map((branch) => {
                  const isSel = selectedBranches.includes(branch);
                  return (
                    <button
                      key={branch}
                      type="button"
                      onClick={() => {
                        if (isSel) {
                          setSelectedBranches(selectedBranches.filter((b) => b !== branch));
                        } else {
                          setSelectedBranches([...selectedBranches, branch]);
                        }
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${isSel
                        ? 'bg-[#1c1c24] border-border-custom text-primary-text'
                        : 'bg-transparent border-border-custom/50 text-secondary-text hover:border-secondary-text hover:text-primary-text'
                        }`}
                    >
                      {branch}
                    </button>
                  );
                })}
                {selectedBranches.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedBranches([])}
                    className="text-xs text-primary-purple hover:underline font-bold ml-auto cursor-pointer"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Results Lists */}
          {!hasMatches ? (
            <Card className="border border-border-custom bg-card/50 rounded-2xl shadow-sm mt-4">
              <CardContent className="p-10 text-center">
                <div className="text-base font-bold text-primary-text">No matching options found.</div>
                <p className="mt-2 text-sm text-secondary-text max-w-md mx-auto">
                  Try adjusting your search terms or filters above to find matching choices.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Feature 1: Home State NIT Opportunities - Collapsible Premium Card */}
              {processedHomeState.length > 0 && (
                <div className="mb-6">
                  <div className="rounded-2xl border border-primary-purple/20 bg-gradient-to-r from-primary-purple/[0.05] via-card to-card shadow-sm overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setHsExpanded(!hsExpanded)}
                      className="w-full flex items-center justify-between p-5 text-left transition hover:bg-white/[0.01] cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-base font-extrabold text-primary-text flex items-center gap-2">
                          🏠 Your Home State Advantage
                        </span>
                        <span className="text-xs text-primary-purple font-semibold mt-1">
                          {firstNitName} · {processedHomeState.length} Eligible Program{processedHomeState.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-primary-purple font-bold bg-primary-purple/10 border border-primary-purple/20 px-4 py-1.5 rounded-full transition hover:bg-primary-purple/20">
                        <span>{hsExpanded ? "▲ Collapse" : "▼ Expand"}</span>
                      </div>
                    </button>
                    {hsExpanded && (
                      <div className="p-4 border-t border-border-custom bg-[#09090B]/50">
                        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
                          {processedHomeState.map((rec, i) => (
                            <ResultCard key={`hs-nit-${i}`} rec={rec} index={i} highlight />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bucket 1: Best Matches */}
              {processedBest.length > 0 && (
                <div className="mb-6">
                  <div className="mb-3.5 flex items-center justify-between border-b border-border-custom pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🏆</span>
                      <h3 className="text-sm sm:text-base font-extrabold text-primary-text tracking-tight">Best Matches</h3>
                      <span className="text-[10px] sm:text-xs text-secondary-text/80 font-normal">
                        · {processedBest.length} matching choices
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-primary-purple/10 border border-primary-purple/20 text-secondary-purple text-[10px] font-bold font-mono uppercase tracking-wider">Top Tier</span>
                  </div>
                  <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
                    {processedBest.map((rec, i) => (
                      <ResultCard key={`best-${i}`} rec={rec} index={i} highlight />
                    ))}
                  </div>
                </div>
              )}

              {/* ── Share Achievement Button ── */}
              {processedBest.length > 0 && (
                <div className="mb-6 flex justify-center">
                  <button
                    id="share-achievement-btn"
                    onClick={() => setAchievementOpen(true)}
                    className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md bg-gradient-to-r from-primary-purple to-accent-blue border border-primary-purple/20 hover:shadow-[0_8px_32px_rgba(124,58,237,0.4)]"
                  >
                    <span className="text-base">🎉</span>
                    <span>Share Achievement</span>
                    <Share2 className="h-4.5 w-4.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              )}

              {/* Achievement Modal */}
              <AchievementModal
                isOpen={achievementOpen}
                onClose={() => setAchievementOpen(false)}
                topColleges={[
                  ...processedBest.slice(0, 4).map(r => r.institute),
                  ...processedGood.slice(0, Math.max(0, 4 - processedBest.length)).map(r => r.institute),
                ].slice(0, 4)}
                eligibleCount={totalEligibleColleges}
              />

              {/* Bucket 2: Good Options */}
              {processedGood.length > 0 && (
                <div className="mb-6">
                  <div className="mb-3.5 flex items-center justify-between border-b border-border-custom pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🎯</span>
                      <h3 className="text-sm sm:text-base font-extrabold text-primary-text tracking-tight">Good Options</h3>
                      <span className="text-[10px] sm:text-xs text-secondary-text/80 font-normal">
                        · {processedGood.length} matching choices
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-[10px] font-bold font-mono uppercase tracking-wider">Suitable</span>
                  </div>
                  <div className="grid grid-cols-1 gap-3.5">
                    {processedGood.map((rec, i) => (
                      <ResultCard key={`good-${i}`} rec={rec} index={i + 10} />
                    ))}
                  </div>
                </div>
              )}

              {/* Bucket 3: Explore More */}
              {processedExplore.length > 0 && (
                <div className="mb-6">
                  <div className="mb-3.5 flex items-center justify-between border-b border-border-custom pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🔍</span>
                      <h3 className="text-sm sm:text-base font-extrabold text-primary-text tracking-tight">Explore More</h3>
                      <span className="text-[10px] sm:text-xs text-secondary-text/80 font-normal">
                        · {processedExplore.length} matching choices
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-secondary-text/10 border border-secondary-text/20 text-secondary-text text-[10px] font-bold font-mono uppercase tracking-wider font-semibold">Explore</span>
                  </div>
                  <div className="grid grid-cols-1 gap-3.5">
                    {processedExplore.map((rec, i) => (
                      <ResultCard key={`explore-${i}`} rec={rec} index={i + 30} />
                    ))}
                  </div>
                </div>
              )}

              {totalEligible > 50 && (
                <p className="mt-6 text-center text-xs text-secondary-text/60">
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
    <section id="predict" className="relative py-10 md:py-16 bg-secondary-bg/25">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-custom bg-[#13131A]/60 px-3.5 py-1 text-xs text-secondary-text shadow-sm">
              <Target className="h-3.5 w-3.5 text-primary-purple" />
              <span className="font-semibold tracking-wide">CSAB College Analyzer</span>
            </div>
            <h2 className="mt-4 text-2xl md:text-4xl font-extrabold tracking-tight text-primary-text">
              Enter your details
            </h2>
            <p className="mt-2 text-sm text-secondary-text">
              We match your JEE Main CRL rank against official historical round cutoffs.
            </p>
          </div>

          {/* Premium Glassmorphic Form Card */}
          <Card className="relative overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#13131A]/90 backdrop-blur-xl rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[80%] -translate-x-1/2 rounded-full bg-primary-purple/10 blur-3xl" />

            <CardContent className="relative p-6 md:p-10">
              <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* JEE Rank Input */}
                <div className="md:col-span-2">
                  <Label htmlFor="rank" className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary-text">
                    <Trophy className="h-4 w-4 text-primary-purple shrink-0" />
                    <span>JEE Main CRL Rank</span>
                  </Label>
                  <Input
                    id="rank"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="e.g. 15000"
                    value={rank}
                    onChange={(e) => setRank(e.target.value.replace(/[^0-9]/g, ''))}
                    className="h-[56px] w-full rounded-2xl border border-border-custom bg-[#09090B] px-5 text-sm sm:text-base text-primary-text placeholder:text-secondary-text/30 focus-visible:ring-2 focus-visible:ring-primary-purple/20 focus-visible:border-primary-purple focus-visible:outline-none transition-all duration-200"
                  />
                  <p className="mt-2 text-xs text-secondary-text/60">
                    Provide your Common Rank List (CRL) rank, not category rank.
                  </p>
                </div>

                {/* Category Dropdown */}
                <div>
                  <Label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary-text">
                    <Tag className="h-4 w-4 text-primary-purple shrink-0" />
                    <span>Category</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-[56px] rounded-2xl border border-border-custom bg-[#09090B] px-5 text-sm sm:text-base text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:border-primary-purple transition-all duration-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Gender Dropdown */}
                <div>
                  <Label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary-text">
                    <User className="h-4 w-4 text-primary-purple shrink-0" />
                    <span>Gender</span>
                  </Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="h-[56px] rounded-2xl border border-border-custom bg-[#09090B] px-5 text-sm sm:text-base text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:border-primary-purple transition-all duration-200">
                      <SelectValue placeholder="Select gender pool" />
                    </SelectTrigger>
                    <SelectContent>
                      {GENDERS.map((g) => (
                        <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Home State Dropdown */}
                <div className="md:col-span-2">
                  <Label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary-text">
                    <MapPin className="h-4 w-4 text-primary-purple shrink-0" />
                    <span>Home State</span>
                  </Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger className="h-[56px] rounded-2xl border border-border-custom bg-[#09090B] px-5 text-sm sm:text-base text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:border-primary-purple transition-all duration-200">
                      <SelectValue placeholder="Select your home state" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {STATES.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Preferred Branches (Pills Selection) */}
                <div className="md:col-span-2">
                  <Label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary-text">
                    <Target className="h-4 w-4 text-primary-purple shrink-0" />
                    <span>Preferred Branches (Optional)</span>
                  </Label>
                  <div className="flex flex-wrap gap-2.5 mt-2">
                    {['CSE', 'AI', 'IT', 'ECE'].map((branch) => {
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
                          className={`px-4 py-2 rounded-2xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${isSel
                            ? 'bg-gradient-to-r from-primary-purple to-accent-blue border-transparent text-white shadow-md shadow-primary-purple/20'
                            : 'bg-[#111118] border-border-custom text-secondary-text hover:border-primary-purple/50 hover:text-primary-text'
                            }`}
                        >
                          {branch}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="md:col-span-2 mt-4">
                  <Button
                    type="submit"
                    disabled={!ready || loading}
                    className="group h-[56px] w-full rounded-2xl bg-gradient-to-r from-primary-purple to-accent-blue text-base font-semibold text-white shadow-md hover:shadow-[0_8px_30px_rgba(124,58,237,0.35)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 disabled:shadow-none cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-white" />
                        Analyzing...
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        Predict Colleges
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    )}
                  </Button>
                  {error && (
                    <p className="mt-3 text-center text-xs text-rose-400 font-semibold">{error}</p>
                  )}
                  <p className="mt-3 text-center text-xs text-secondary-text/60">
                    Predicting across 1,400+ historical JoSAA &amp; CSAB counseling allocations.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
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
    <section id="features" className="py-12 md:py-20 bg-secondary-bg/15 border-t border-b border-border-custom">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-primary-text">Features</h2>
        </div>

        {/* Live features */}
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {live.map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-border-custom bg-card p-6 hover:border-primary-purple/35 transition-all duration-300 shadow-sm"
            >
              <div className="text-3xl mb-4">{emoji}</div>
              <h3 className="text-sm font-bold text-primary-text mb-2">{title}</h3>
              <p className="text-xs text-secondary-text leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mx-auto max-w-5xl mt-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-bold text-secondary-text uppercase tracking-widest">Coming Soon</span>
            <span className="text-base">🚀</span>
            <div className="flex-1 h-px bg-border-custom" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coming.map(({ emoji, title }) => (
              <div
                key={title}
                className="rounded-2xl border border-border-custom bg-[#111118]/50 p-4.5 flex items-center gap-3.5 opacity-65 hover:opacity-85 transition-opacity"
              >
                <span className="text-xl shrink-0">{emoji}</span>
                <span className="text-xs font-semibold text-secondary-text">{title}</span>
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
    { n: '01', t: 'Enter details & rank', d: 'Provide your JEE CRL rank, category, gender, home state, and preferred branches.' },
    { n: '02', t: 'Smart analysis', d: 'We process your criteria against historical JoSAA and CSAB cutoff databases.' },
    { n: '03', t: 'Instant matches', d: 'Receive recommended engineering seats grouped logically by admission likelihood.' },
    { n: '04', t: 'Counseling strategy', d: 'Analyze safe options and reach strategy choices with historical assurance.' },
  ]
  return (
    <section id="how" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-primary-text">How It Works</h2>
        </div>
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-border-custom bg-gradient-to-b from-card to-transparent p-6 hover:border-primary-purple/20 transition duration-300">
              <div className="text-xs font-bold tracking-widest text-primary-purple mb-3 font-mono">STEP {s.n}</div>
              <div className="text-sm font-bold text-primary-text mb-2">{s.t}</div>
              <p className="text-xs text-secondary-text leading-relaxed">{s.d}</p>
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
    <section id="faq" className="py-12 md:py-20 bg-secondary-bg/15 border-t border-border-custom">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-primary-text">Frequently Asked Questions</h2>
        </div>
        <div className="mx-auto max-w-2xl space-y-3.5">
          {items.map(({ q, a }, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border-custom bg-card overflow-hidden transition duration-300"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left text-sm font-semibold text-primary-text hover:bg-[#111118]/50 transition focus:outline-none cursor-pointer"
              >
                <span>{q}</span>
                <ChevronDown
                  className={`h-4.5 w-4.5 shrink-0 text-secondary-text/60 transition-transform duration-250 ${openIdx === i ? 'rotate-180' : ''
                    }`}
                />
              </button>
              {openIdx === i && (
                <div className="px-6 pb-5 text-sm text-secondary-text border-t border-border-custom bg-[#09090B]/30 pt-4 leading-relaxed">
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
    <section id="about" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-xl p-8 rounded-3xl border border-border-custom bg-card shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-primary-purple to-transparent" />

          <h2 className="text-2xl md:text-3xl font-extrabold text-primary-text tracking-tight mb-4">About SahiSeat</h2>
          <p className="text-sm text-secondary-text leading-relaxed mb-6">
            SahiSeat helps JEE aspirants make smarter JoSAA and CSAB counseling decisions using
            historical cutoff data and transparent recommendations. No guesswork. No black boxes.
          </p>
          <p className="text-sm text-secondary-text mb-6">
            Built by <span className="text-primary-purple font-bold">Vijayendra Ch &amp; Avinash</span> · IIIT Vadodara
          </p>

          <div className="grid grid-cols-2 gap-3.5 max-w-sm">
            <a
              href="https://www.linkedin.com/in/ch-vijayendraswamy/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-border-custom bg-secondary-bg px-4.5 py-3.5 text-xs font-semibold text-secondary-text hover:text-primary-text hover:bg-card hover:border-secondary-text/30 transition duration-200"
            >
              <svg className="h-4 w-4 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://www.linkedin.com/in/avinash-mondenor-0579ab407/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-border-custom bg-secondary-bg px-4.5 py-3.5 text-xs font-semibold text-secondary-text hover:text-primary-text hover:bg-card hover:border-secondary-text/30 transition duration-200"
            >
              <svg className="h-4 w-4 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://www.youtube.com/@SahiSeat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-border-custom bg-secondary-bg px-4.5 py-3.5 text-xs font-semibold text-secondary-text hover:text-primary-text hover:bg-card hover:border-secondary-text/30 transition duration-200"
            >
              <svg className="h-4 w-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              YouTube
            </a>
            <a
              href="https://www.instagram.com/sahiseat.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-border-custom bg-secondary-bg px-4.5 py-3.5 text-xs font-semibold text-secondary-text hover:text-primary-text hover:bg-card hover:border-secondary-text/30 transition duration-200"
            >
              <svg className="h-4 w-4 text-pink-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
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
    <footer className="border-t border-border-custom py-12 bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary-purple to-accent-blue shadow-md">
            <GraduationCap className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="text-base font-bold tracking-tight text-primary-text">
            Sahi<span className="bg-gradient-to-r from-primary-purple to-secondary-purple bg-clip-text text-transparent">Seat</span>
          </span>
        </div>
        <p className="text-xs text-secondary-text/80 font-medium">
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
    if (r) {
      const filterRecord = (item) => {
        if (!item) return false;
        const program = (item.program || '').toLowerCase();
        const institute = (item.institute || '').toLowerCase();
        const seatType = (item.seatType || '').toLowerCase();
        const quota = (item.quota || '').toLowerCase();

        // 1. Exclude ALL Architecture-related programs
        if (program.includes('arch') || program.includes('architecture')) {
          return false;
        }

        // 2. Exclude ALL Planning-related programs
        if (program.includes('planning') || program.includes('bplan') || program.includes('b.plan')) {
          return false;
        }

        // 3. Exclude ALL Schools of Planning and Architecture
        if (
          institute.includes('school of planning') ||
          institute.includes('spa') ||
          institute.includes('planning and architecture')
        ) {
          return false;
        }

        // 4. Exclude DASA / Foreign / NRI / OCI / PIO / CIWG / International quota
        if (
          quota.includes('dasa') ||
          quota.includes('foreign') ||
          quota.includes('nri') ||
          quota.includes('oci') ||
          quota.includes('pio') ||
          quota.includes('ciwg') ||
          quota.includes('international') ||
          seatType.includes('dasa') ||
          seatType.includes('foreign') ||
          seatType.includes('nri') ||
          seatType.includes('oci') ||
          seatType.includes('pio') ||
          seatType.includes('ciwg') ||
          seatType.includes('international') ||
          program.includes('dasa') ||
          program.includes('nri') ||
          program.includes('foreign')
        ) {
          return false;
        }

        // Only allow B.Tech / B.E. programs
        const isBTech =
          program.includes('b.tech') ||
          program.includes('b.e.') ||
          program.includes('bachelor of technology') ||
          program.includes('bachelor of engineering') ||
          program.includes('b. tech') ||
          program.includes('b. e.');
        if (!isBTech) return false;

        return true;
      };

      // Final Validation Step (Bulletproof Verification)
      const finalValidation = (list) => {
        return (list || []).filter(item => {
          if (!item) return false;
          const p = (item.program || '').toLowerCase();
          const inst = (item.institute || '').toLowerCase();
          const q = (item.quota || '').toLowerCase();
          const st = (item.seatType || '').toLowerCase();

          const isArch = p.includes('arch') || p.includes('architecture');
          const isPlan = p.includes('planning') || p.includes('bplan') || p.includes('b.plan');
          const isSpa = inst.includes('school of planning') || inst.includes('spa') || inst.includes('planning and architecture');
          const isDasa = q.includes('dasa') || q.includes('foreign') || q.includes('nri') || q.includes('oci') || q.includes('pio') ||
            st.includes('dasa') || st.includes('foreign') || st.includes('nri') || st.includes('oci') || st.includes('pio') ||
            p.includes('dasa') || p.includes('nri') || p.includes('foreign');

          return !isArch && !isPlan && !isSpa && !isDasa;
        });
      };

      const filteredBestMatches = finalValidation((r.bestMatches || []).filter(filterRecord));
      const filteredGoodOptions = finalValidation((r.goodOptions || []).filter(filterRecord));
      const filteredExploreMore = finalValidation((r.exploreMore || []).filter(filterRecord));
      const filteredHomeState = finalValidation((r.homeStateNitOpportunities || []).filter(filterRecord));
      const filteredAllEligible = finalValidation((r.allEligible || []).filter(filterRecord));

      const allFiltered = [...filteredBestMatches, ...filteredGoodOptions, ...filteredExploreMore];

      const filteredResult = {
        ...r,
        bestMatches: filteredBestMatches,
        goodOptions: filteredGoodOptions,
        exploreMore: filteredExploreMore,
        homeStateNitOpportunities: filteredHomeState,
        allEligible: filteredAllEligible,
        totalEligible: allFiltered.length,
        totalEligibleColleges: new Set(
          [...allFiltered, ...filteredHomeState].map(item => item.institute)
        ).size,
      };

      if (filteredResult.diagnostics) {
        let nit = 0, iiit = 0, gfti = 0, other = 0;
        allFiltered.forEach(item => {
          if (item.instituteType === 'NIT') nit++;
          else if (item.instituteType === 'IIIT') iiit++;
          else if (item.instituteType === 'GFTI') gfti++;
          else other++;
        });
        filteredResult.diagnostics = {
          ...filteredResult.diagnostics,
          totalEligibleBeforeSorting: allFiltered.length,
          eligibleNitCount: nit,
          eligibleIiitCount: iiit,
          eligibleGftiCount: gfti,
          eligibleOtherCount: other,
        };
      }

      setResult(filteredResult);
    } else {
      setResult(null);
    }
    setQuery(q);
  }

  const onReset = () => {
    setResult(null)
    setQuery(null)
    const element = document.getElementById("predict")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const [showFloatingCta, setShowFloatingCta] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const resultsEl = document.getElementById("college-results");

      // If college results are not present yet
      if (!resultsEl) {
        setShowFloatingCta(window.scrollY > 150);
        return;
      }

      const resultsRect = resultsEl.getBoundingClientRect();

      const areResultsVisible =
        resultsRect.top < window.innerHeight &&
        resultsRect.bottom > 0;

      // Hide CTA only when college cards are visible
      setShowFloatingCta(
        window.scrollY > 150 && !areResultsVisible
      );
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav hasResult={!!result} onReset={onReset} />
      <Hero />
      <PredictForm onResult={onResult} hasResult={!!result} query={query} />
      {result && query && <Results result={result} query={query} />}
      <Features />
      <HowItWorks />
      <FAQ />
      <About />
      <Footer />

      {/* Floating Hero CTA */}
      {showFloatingCta && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm px-4 transition-all duration-300">
          <Button
            onClick={() => document.getElementById('predict')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full h-[52px] rounded-2xl bg-gradient-to-r from-primary-purple to-accent-blue text-white text-sm font-bold shadow-lg shadow-primary-purple/20 hover:shadow-[0_8px_30px_rgba(124,58,237,0.35)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
          >
            Predict My Colleges
            <ArrowRight className="h-4.5 w-4.5" />
          </Button>
        </div>
      )}
    </main>
  )
}

export default App
