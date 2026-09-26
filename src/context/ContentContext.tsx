import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import {
  AGENCY as DEFAULT_AGENCY,
  PROJECTS as DEFAULT_PROJECTS,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  STATS as DEFAULT_STATS,
  SERVICES,
  AUDIENCE,
  PROCESS_STEPS,
  PORTFOLIO_FILTERS,
} from '../data/content'

export type Project = {
  id: number
  category: 'ia' | 'web' | 'data'
  tag: string
  title: string
  description: string
  metrics: { label: string; value: string }[]
  /** Lien vers le site live */
  link?: string
  /** Lien démo (staging, Figma, etc.) */
  demoUrl?: string
  /** Vidéo (YouTube, Vimeo, ou fichier hébergé) */
  videoUrl?: string
  /** Image de couverture (URL ou base64) */
  coverImage?: string
}

export type Testimonial = {
  initials: string
  name: string
  role: string
  text: string
  /** Photo client ou logo entreprise (URL ou base64) */
  avatar?: string
}

export type Stat = {
  value: string
  label: string
  sub: string
}

export type Agency = typeof DEFAULT_AGENCY

type ContentState = {
  agency: Agency
  projects: Project[]
  testimonials: Testimonial[]
  stats: Stat[]
  autoStats: boolean
}

type ContentContextValue = ContentState & {
  services: typeof SERVICES
  audience: typeof AUDIENCE
  processSteps: typeof PROCESS_STEPS
  portfolioFilters: typeof PORTFOLIO_FILTERS
  setAgency: (a: Agency) => void
  setProjects: (p: Project[]) => void
  addProject: (p: Omit<Project, 'id'>) => void
  updateProject: (id: number, p: Partial<Project>) => void
  removeProject: (id: number) => void
  setTestimonials: (t: Testimonial[]) => void
  addTestimonial: (t: Testimonial) => void
  updateTestimonial: (index: number, t: Partial<Testimonial>) => void
  removeTestimonial: (index: number) => void
  setStats: (s: Stat[]) => void
  setAutoStats: (v: boolean) => void
  resetToDefaults: () => void
  exportJson: () => void
  importJson: (file: File) => Promise<void>
}

const STORAGE_KEY = 'praxis-cms-content'

const defaultState: ContentState = {
  agency: DEFAULT_AGENCY,
  projects: (DEFAULT_PROJECTS as Project[]) || [],
  testimonials: (DEFAULT_TESTIMONIALS as Testimonial[]) || [],
  stats: DEFAULT_STATS as Stat[],
  autoStats: true,
}

function loadState(): ContentState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as Partial<ContentState>
    return {
      agency: { ...DEFAULT_AGENCY, ...parsed.agency },
      projects: Array.isArray(parsed.projects) ? parsed.projects : [],
      testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : [],
      stats: Array.isArray(parsed.stats) ? parsed.stats : defaultState.stats,
      autoStats: parsed.autoStats !== false,
    }
  } catch {
    return defaultState
  }
}

function computeAutoStats(projects: Project[], testimonials: Testimonial[]): Stat[] {
  const n = projects.length
  const t = testimonials.length
  return [
    {
      value: n > 0 ? `${n}+` : '—',
      label: 'Projets livrés',
      sub: n > 0 ? 'Portfolio à jour' : 'Ajoute des projets',
    },
    {
      value: t > 0 ? `${Math.min(98, 85 + t * 2)}%` : '—',
      label: 'Clients satisfaits',
      sub: t > 0 ? 'Basé sur les avis' : 'Ajoute des témoignages',
    },
    {
      value: n > 0 ? `+${Math.min(120, 40 + n * 8)}%` : '—',
      label: 'Impact moyen',
      sub: n > 0 ? 'Estimé projets' : 'À compléter',
    },
  ]
}

const ContentContext = createContext<ContentContextValue | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContentState>(() =>
    typeof window !== 'undefined' ? loadState() : defaultState
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const displayStats = useMemo(() => {
    if (state.autoStats) {
      return computeAutoStats(state.projects, state.testimonials)
    }
    return state.stats
  }, [state.autoStats, state.projects, state.testimonials, state.stats])

  const setAgency = useCallback((agency: Agency) => {
    setState((s) => ({ ...s, agency }))
  }, [])

  const setProjects = useCallback((projects: Project[]) => {
    setState((s) => ({ ...s, projects }))
  }, [])

  const addProject = useCallback((p: Omit<Project, 'id'>) => {
    setState((s) => {
      const id = s.projects.reduce((max, x) => Math.max(max, x.id), 0) + 1
      return { ...s, projects: [...s.projects, { ...p, id }] }
    })
  }, [])

  const updateProject = useCallback((id: number, patch: Partial<Project>) => {
    setState((s) => ({
      ...s,
      projects: s.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }))
  }, [])

  const removeProject = useCallback((id: number) => {
    setState((s) => ({
      ...s,
      projects: s.projects.filter((p) => p.id !== id),
    }))
  }, [])

  const setTestimonials = useCallback((testimonials: Testimonial[]) => {
    setState((s) => ({ ...s, testimonials }))
  }, [])

  const addTestimonial = useCallback((t: Testimonial) => {
    setState((s) => ({ ...s, testimonials: [...s.testimonials, t] }))
  }, [])

  const updateTestimonial = useCallback((index: number, patch: Partial<Testimonial>) => {
    setState((s) => ({
      ...s,
      testimonials: s.testimonials.map((t, i) => (i === index ? { ...t, ...patch } : t)),
    }))
  }, [])

  const removeTestimonial = useCallback((index: number) => {
    setState((s) => ({
      ...s,
      testimonials: s.testimonials.filter((_, i) => i !== index),
    }))
  }, [])

  const setStats = useCallback((stats: Stat[]) => {
    setState((s) => ({ ...s, stats, autoStats: false }))
  }, [])

  const setAutoStats = useCallback((autoStats: boolean) => {
    setState((s) => ({ ...s, autoStats }))
  }, [])

  const resetToDefaults = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setState(defaultState)
  }, [])

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `praxis-content-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [state])

  const importJson = useCallback(async (file: File) => {
    const text = await file.text()
    const parsed = JSON.parse(text) as Partial<ContentState>
    setState({
      agency: { ...DEFAULT_AGENCY, ...parsed.agency },
      projects: Array.isArray(parsed.projects) ? parsed.projects : [],
      testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : [],
      stats: Array.isArray(parsed.stats) ? parsed.stats : defaultState.stats,
      autoStats: parsed.autoStats !== false,
    })
  }, [])

  const value: ContentContextValue = {
    agency: state.agency,
    projects: state.projects,
    testimonials: state.testimonials,
    stats: displayStats,
    autoStats: state.autoStats,
    services: SERVICES,
    audience: AUDIENCE,
    processSteps: PROCESS_STEPS,
    portfolioFilters: PORTFOLIO_FILTERS,
    setAgency,
    setProjects,
    addProject,
    updateProject,
    removeProject,
    setTestimonials,
    addTestimonial,
    updateTestimonial,
    removeTestimonial,
    setStats,
    setAutoStats,
    resetToDefaults,
    exportJson,
    importJson,
  }

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
