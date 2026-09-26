import { useState, FormEvent, useRef } from 'react'
import { useContent, type Project, type Testimonial } from '../context/ContentContext'
import {
  ArrowLeft,
  Plus,
  Trash2,
  Download,
  Upload,
  Save,
  Lock,
  Unlock,
  BarChart3,
  FolderKanban,
  MessageSquareQuote,
  Building2,
  Link2,
  Video,
  ImageIcon,
  ExternalLink,
} from 'lucide-react'

/** Mot de passe admin — change-le avant livraison */
const ADMIN_PASSWORD = 'praxis2026'

type Tab = 'projects' | 'testimonials' | 'stats' | 'agency'

export function Admin({ onClose }: { onClose: () => void }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('praxis-admin') === '1')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState<Tab>('projects')
  const [saved, setSaved] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const {
    projects,
    testimonials,
    stats,
    autoStats,
    agency,
    addProject,
    updateProject,
    removeProject,
    addTestimonial,
    updateTestimonial,
    removeTestimonial,
    setStats,
    setAutoStats,
    setAgency,
    exportJson,
    importJson,
    resetToDefaults,
  } = useContent()

  const flash = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const login = (e: FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('praxis-admin', '1')
      setAuthed(true)
      setError('')
    } else {
      setError('Mot de passe incorrect')
    }
  }

  const logout = () => {
    sessionStorage.removeItem('praxis-admin')
    setAuthed(false)
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
        <form
          onSubmit={login}
          className="w-full max-w-md p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A5BD7] to-[#00C6FF] flex items-center justify-center text-white">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-[var(--text)]">Admin Praxis</h1>
              <p className="text-sm text-[var(--text-muted)]">Gestion du contenu du site</p>
            </div>
          </div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] mb-3 focus:outline-none focus:ring-2 focus:ring-[#00C6FF]/40"
            placeholder="••••••••"
            autoFocus
          />
          {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
          <button type="submit" className="btn-primary w-full py-3 text-sm">
            Se connecter
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
          >
            ← Retour au site
          </button>
          
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--primary)]"
            >
              <ArrowLeft className="w-4 h-4" /> Site
            </button>
            <span className="font-display font-bold">Admin CMS</span>
            {saved && (
              <span className="text-xs text-[#00C6FF] font-medium animate-pulse">✓ Enregistré</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                exportJson()
                flash()
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[var(--border)] hover:border-[var(--primary)]"
            >
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button
              onClick={() => fileRef.current?.click()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[var(--border)] hover:border-[var(--primary)]"
            >
              <Upload className="w-3.5 h-3.5" /> Import
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0]
                if (f) {
                  await importJson(f)
                  flash()
                }
              }}
            />
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-red-500"
            >
              <Unlock className="w-3.5 h-3.5" /> Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {(
            [
              { id: 'projects' as Tab, label: 'Projets', icon: FolderKanban },
              { id: 'testimonials' as Tab, label: 'Témoignages', icon: MessageSquareQuote },
              { id: 'stats' as Tab, label: 'Stats', icon: BarChart3 },
              { id: 'agency' as Tab, label: 'Agence', icon: Building2 },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-display font-semibold transition-all ${
                tab === t.id
                  ? 'bg-gradient-to-r from-[#0A84FF] to-[#00C6FF] text-white shadow-sm'
                  : 'bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'projects' && (
          <ProjectsTab
            projects={projects}
            onAdd={(p) => {
              addProject(p)
              flash()
            }}
            onUpdate={(id, p) => {
              updateProject(id, p)
              flash()
            }}
            onRemove={(id) => {
              removeProject(id)
              flash()
            }}
          />
        )}

        {tab === 'testimonials' && (
          <TestimonialsTab
            testimonials={testimonials}
            onAdd={(t) => {
              addTestimonial(t)
              flash()
            }}
            onUpdate={(i, t) => {
              updateTestimonial(i, t)
              flash()
            }}
            onRemove={(i) => {
              removeTestimonial(i)
              flash()
            }}
          />
        )}

        {tab === 'stats' && (
          <StatsTab
            stats={stats}
            autoStats={autoStats}
            onToggleAuto={(v) => {
              setAutoStats(v)
              flash()
            }}
            onChange={(s) => {
              setStats(s)
              flash()
            }}
          />
        )}

        {tab === 'agency' && (
          <AgencyTab
            agency={agency}
            onChange={(a) => {
              setAgency(a)
              flash()
            }}
          />
        )}

        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-wrap gap-3">
          <button
            onClick={() => {
              if (confirm('Réinitialiser tout le contenu ?')) {
                resetToDefaults()
                flash()
              }
            }}
            className="text-sm text-red-500 hover:underline"
          >
            Réinitialiser le contenu
          </button>
          <p className="text-xs text-[var(--text-muted)] w-full mt-2">
            Les modifications sont sauvegardées automatiquement dans ce navigateur (localStorage).
            Utilise Export pour sauvegarder un fichier JSON de secours.
          </p>
        </div>
      </div>
    </div>
  )
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > 1.5 * 1024 * 1024) {
      reject(new Error('Image trop lourde (max 1,5 Mo). Compresse-la ou utilise une URL.'))
      return
    }
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Lecture impossible'))
    reader.readAsDataURL(file)
  })
}

function ProjectsTab({
  projects,
  onAdd,
  onUpdate,
  onRemove,
}: {
  projects: Project[]
  onAdd: (p: Omit<Project, 'id'>) => void
  onUpdate: (id: number, p: Partial<Project>) => void
  onRemove: (id: number) => void
}) {
  const [form, setForm] = useState({
    category: 'web' as Project['category'],
    tag: '',
    title: '',
    description: '',
    metric1Label: 'Année',
    metric1Value: '',
    metric2Label: 'Type',
    metric2Value: '',
    link: '',
    demoUrl: '',
    videoUrl: '',
    coverImage: '',
  })
  const [imgError, setImgError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onAdd({
      category: form.category,
      tag: form.tag || form.category.toUpperCase(),
      title: form.title.trim(),
      description: form.description.trim(),
      metrics: [
        { label: form.metric1Label || 'Année', value: form.metric1Value || '—' },
        { label: form.metric2Label || 'Type', value: form.metric2Value || '—' },
      ],
      link: form.link.trim() || undefined,
      demoUrl: form.demoUrl.trim() || undefined,
      videoUrl: form.videoUrl.trim() || undefined,
      coverImage: form.coverImage.trim() || undefined,
    })
    setForm({
      category: 'web',
      tag: '',
      title: '',
      description: '',
      metric1Label: 'Année',
      metric1Value: '',
      metric2Label: 'Type',
      metric2Value: '',
      link: '',
      demoUrl: '',
      videoUrl: '',
      coverImage: '',
    })
    setImgError('')
  }

  const onCoverFile = async (file: File | null) => {
    if (!file) return
    setImgError('')
    try {
      const data = await fileToDataUrl(file)
      setForm((f) => ({ ...f, coverImage: data }))
    } catch (err) {
      setImgError(err instanceof Error ? err.message : 'Erreur image')
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={submit}
        className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4"
      >
        <h2 className="font-display font-bold flex items-center gap-2">
          <Plus className="w-5 h-5 text-[var(--primary)]" /> Ajouter un projet
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-[var(--text-muted)]">Catégorie</label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as Project['category'] })
              }
              className="w-full mt-1 px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
            >
              <option value="ia">IA</option>
              <option value="web">Web</option>
              <option value="data">Data</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--text-muted)]">Tag (label)</label>
            <input
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
              placeholder="Ex: Site vitrine"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-[var(--text-muted)]">Titre *</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            placeholder="Nom du projet"
            className="w-full mt-1 px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-[var(--text-muted)]">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            placeholder="Ce que tu as livré au client..."
            className="w-full mt-1 px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[var(--border)]">
          <div>
            <label className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1">
              <Link2 className="w-3.5 h-3.5" /> Lien live (site)
            </label>
            <input
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="https://..."
              className="w-full mt-1 px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1">
              <ExternalLink className="w-3.5 h-3.5" /> Lien démo
            </label>
            <input
              value={form.demoUrl}
              onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
              placeholder="https://demo... ou Figma"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1">
              <Video className="w-3.5 h-3.5" /> Vidéo (YouTube / Vimeo)
            </label>
            <input
              value={form.videoUrl}
              onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
              placeholder="https://youtube.com/..."
              className="w-full mt-1 px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5" /> Image couverture (URL)
            </label>
            <input
              value={form.coverImage.startsWith('data:') ? '' : form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              placeholder="https://.../image.jpg"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--text-muted)]">Ou uploader une image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onCoverFile(e.target.files?.[0] || null)}
              className="w-full mt-1 text-sm text-[var(--text-muted)]"
            />
            {form.coverImage && (
              <p className="text-[10px] text-[#00C6FF] mt-1">Image prête ✓</p>
            )}
            {imgError && <p className="text-xs text-red-500 mt-1">{imgError}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <input
            value={form.metric1Label}
            onChange={(e) => setForm({ ...form, metric1Label: e.target.value })}
            placeholder="Label 1"
            className="px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-sm"
          />
          <input
            value={form.metric1Value}
            onChange={(e) => setForm({ ...form, metric1Value: e.target.value })}
            placeholder="Valeur 1"
            className="px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-sm"
          />
          <input
            value={form.metric2Label}
            onChange={(e) => setForm({ ...form, metric2Label: e.target.value })}
            placeholder="Label 2"
            className="px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-sm"
          />
          <input
            value={form.metric2Value}
            onChange={(e) => setForm({ ...form, metric2Value: e.target.value })}
            placeholder="Valeur 2"
            className="px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-sm"
          />
        </div>
        <button type="submit" className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2">
          <Save className="w-4 h-4" /> Enregistrer le projet
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="font-display font-semibold text-sm text-[var(--text-muted)]">
          {projects.length} projet{projects.length !== 1 ? 's' : ''}
        </h3>
        {projects.length === 0 && (
          <p className="text-sm text-[var(--text-muted)] py-6 text-center border border-dashed border-[var(--border)] rounded-xl">
            Aucun projet — ajoute le premier ci-dessus.
          </p>
        )}
        {projects.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-start gap-3"
          >
            {p.coverImage && (
              <img
                src={p.coverImage}
                alt=""
                className="w-full sm:w-24 h-16 object-cover rounded-lg shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#00C6FF]/15 text-[#00C6FF]">
                  {p.category}
                </span>
                <span className="font-display font-bold text-[var(--text)] truncate">{p.title}</span>
              </div>
              <p className="text-sm text-[var(--text-muted)] line-clamp-2">{p.description}</p>
              <div className="flex flex-wrap gap-2 mt-2 text-[10px]">
                {p.link && (
                  <span className="px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--primary)]">Live</span>
                )}
                {p.demoUrl && (
                  <span className="px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--primary)]">Démo</span>
                )}
                {p.videoUrl && (
                  <span className="px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--primary)]">Vidéo</span>
                )}
              </div>
            </div>
            <button
              onClick={() => onRemove(p.id)}
              className="shrink-0 p-2 rounded-lg text-red-500 hover:bg-red-500/10"
              aria-label="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function TestimonialsTab({
  testimonials,
  onAdd,
  onUpdate,
  onRemove,
}: {
  testimonials: Testimonial[]
  onAdd: (t: Testimonial) => void
  onUpdate: (i: number, t: Partial<Testimonial>) => void
  onRemove: (i: number) => void
}) {
  const [form, setForm] = useState({
    initials: '',
    name: '',
    role: '',
    text: '',
    avatar: '',
  })
  const [imgError, setImgError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.text.trim()) return
    const initials =
      form.initials.trim() ||
      form.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    onAdd({
      initials,
      name: form.name.trim(),
      role: form.role.trim(),
      text: form.text.trim(),
      avatar: form.avatar.trim() || undefined,
    })
    setForm({ initials: '', name: '', role: '', text: '', avatar: '' })
    setImgError('')
  }

  const onAvatarFile = async (file: File | null) => {
    if (!file) return
    setImgError('')
    try {
      const data = await fileToDataUrl(file)
      setForm((f) => ({ ...f, avatar: data }))
    } catch (err) {
      setImgError(err instanceof Error ? err.message : 'Erreur image')
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={submit}
        className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4"
      >
        <h2 className="font-display font-bold flex items-center gap-2">
          <Plus className="w-5 h-5 text-[var(--primary)]" /> Ajouter un témoignage
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-[var(--text-muted)]">Initiales</label>
            <input
              value={form.initials}
              onChange={(e) => setForm({ ...form, initials: e.target.value })}
              placeholder="AM"
              maxLength={3}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--text-muted)]">Nom *</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="Amine M."
              className="w-full mt-1 px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--text-muted)]">Poste / Entreprise</label>
            <input
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="CEO, Startup"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-[var(--text-muted)]">Citation *</label>
          <textarea
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            required
            rows={3}
            placeholder="Ce que le client a dit..."
            className="w-full mt-1 px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] resize-none"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[var(--border)]">
          <div>
            <label className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5" /> Photo / logo (URL)
            </label>
            <input
              value={form.avatar.startsWith('data:') ? '' : form.avatar}
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              placeholder="https://.../photo.jpg ou logo"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--text-muted)]">Ou uploader photo / logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onAvatarFile(e.target.files?.[0] || null)}
              className="w-full mt-1 text-sm text-[var(--text-muted)]"
            />
            {form.avatar && (
              <div className="mt-2 flex items-center gap-2">
                <img src={form.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-[var(--border)]" />
                <span className="text-[10px] text-[#00C6FF]">Prêt ✓</span>
              </div>
            )}
            {imgError && <p className="text-xs text-red-500 mt-1">{imgError}</p>}
          </div>
        </div>
        <button type="submit" className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2">
          <Save className="w-4 h-4" /> Enregistrer le témoignage
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="font-display font-semibold text-sm text-[var(--text-muted)]">
          {testimonials.length} témoignage{testimonials.length !== 1 ? 's' : ''}
        </h3>
        {testimonials.length === 0 && (
          <p className="text-sm text-[var(--text-muted)] py-6 text-center border border-dashed border-[var(--border)] rounded-xl">
            Aucun témoignage — ajoute le premier ci-dessus.
          </p>
        )}
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-start gap-3"
          >
            {t.avatar ? (
              <img src={t.avatar} alt="" className="w-12 h-12 rounded-full object-cover shrink-0" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A5BD7] to-[#00C6FF] flex items-center justify-center text-white font-display font-bold text-sm shrink-0">
                {t.initials}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-[var(--text)]">{t.name}</p>
              <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
              <p className="text-sm text-[var(--text-muted)] mt-1 line-clamp-2">« {t.text} »</p>
            </div>
            <button
              onClick={() => onRemove(i)}
              className="shrink-0 p-2 rounded-lg text-red-500 hover:bg-red-500/10"
              aria-label="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatsTab({
  stats,
  autoStats,
  onToggleAuto,
  onChange,
}: {
  stats: { value: string; label: string; sub: string }[]
  autoStats: boolean
  onToggleAuto: (v: boolean) => void
  onChange: (s: { value: string; label: string; sub: string }[]) => void
}) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="font-display font-bold">Stats automatiques</h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Quand activé, les chiffres se mettent à jour selon le nombre de projets et de
              témoignages.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onToggleAuto(!autoStats)}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              autoStats ? 'bg-[#00C6FF]' : 'bg-[var(--border)]'
            }`}
          >
            <span
              className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                autoStats ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>
        {autoStats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-center"
              >
                <p className="font-display text-3xl font-bold text-[var(--primary)]">{s.value}</p>
                <p className="text-sm text-[var(--text)] mt-1">{s.label}</p>
                <p className="text-xs text-[var(--text-muted)]">{s.sub}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {!autoStats && (
        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4">
          <h2 className="font-display font-bold">Stats manuelles</h2>
          {stats.map((s, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                value={s.value}
                onChange={(e) => {
                  const next = [...stats]
                  next[i] = { ...next[i], value: e.target.value }
                  onChange(next)
                }}
                placeholder="Valeur"
                className="px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
              />
              <input
                value={s.label}
                onChange={(e) => {
                  const next = [...stats]
                  next[i] = { ...next[i], label: e.target.value }
                  onChange(next)
                }}
                placeholder="Label"
                className="px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
              />
              <input
                value={s.sub}
                onChange={(e) => {
                  const next = [...stats]
                  next[i] = { ...next[i], sub: e.target.value }
                  onChange(next)
                }}
                placeholder="Sous-titre"
                className="px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function AgencyTab({
  agency,
  onChange,
}: {
  agency: ReturnType<typeof useContent>['agency']
  onChange: (a: ReturnType<typeof useContent>['agency']) => void
}) {
  const fields: { key: keyof typeof agency; label: string }[] = [
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Téléphone (tel:)' },
    { key: 'phoneDisplay', label: 'Téléphone affiché' },
    { key: 'location', label: 'Ville / pays' },
    { key: 'locationDetail', label: 'Détail localisation' },
    { key: 'hours', label: 'Horaires' },
    { key: 'instagram', label: 'Instagram URL' },
    { key: 'facebook', label: 'Facebook URL' },
    { key: 'linkedin', label: 'LinkedIn URL' },
  ]

  return (
    <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4">
      <h2 className="font-display font-bold">Informations agence</h2>
      <div>
        <label className="text-xs font-medium text-[var(--text-muted)]">Description</label>
        <textarea
          value={agency.description}
          onChange={(e) => onChange({ ...agency, description: e.target.value })}
          rows={3}
          className="w-full mt-1 px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] resize-none"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="text-xs font-medium text-[var(--text-muted)]">{f.label}</label>
            <input
              value={String(agency[f.key] ?? '')}
              onChange={(e) => onChange({ ...agency, [f.key]: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-[var(--text-muted)]">
        Les changements s&apos;appliquent immédiatement sur le site (footer, contact…).
      </p>
    </div>
  )
}
