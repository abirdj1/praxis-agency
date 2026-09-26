import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Play, Link2 } from 'lucide-react'
import { useContent } from '../context/ContentContext'

type Category = 'all' | 'ia' | 'web' | 'data'

function youtubeEmbed(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`
    }
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}`
    }
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop()
      if (id) return `https://player.vimeo.com/video/${id}`
    }
  } catch {
    /* ignore */
  }
  return null
}

export function Portfolio() {
  const { projects, portfolioFilters } = useContent()
  const [filter, setFilter] = useState<Category>('all')
  const [videoOpen, setVideoOpen] = useState<string | null>(null)

  const filtered =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="portfolio" className="relative w-full py-24 lg:py-32 bg-[var(--bg)]">
      <div className="max-w-container mx-auto px-5 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-[var(--surface-2)] text-[var(--primary)] font-display text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
              Études de cas
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">
              Nos Réalisations
            </h2>
            <p className="text-lg text-[var(--text-muted)] mt-2">
              Quelques projets représentatifs de notre savoir-faire.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)]">
            {portfolioFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-5 py-2 rounded-full font-display text-xs font-semibold transition-all duration-200 ${
                  filter === f.id
                    ? 'bg-gradient-to-r from-[#0A84FF] to-[#00C6FF] text-white shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B1B33] via-[#0E2242] to-[#11284A] text-white shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                {project.coverImage && (
                  <div className="relative w-full h-44 overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33] to-transparent opacity-80" />
                  </div>
                )}

                <div className="p-8 lg:p-10 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#00C6FF]/20 text-[#00C6FF] font-display text-xs font-semibold tracking-wide uppercase">
                      {project.tag}
                    </span>
                    {(project.link || project.demoUrl) && (
                      <ArrowUpRight className="w-5 h-5 text-[#9EB3D1] group-hover:text-[#00C6FF] transition-all" />
                    )}
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-[#c9dbf9] mb-6 leading-relaxed flex-1">{project.description}</p>

                  {project.metrics?.length > 0 && (
                    <div className="relative w-full rounded-xl overflow-hidden bg-white/[0.04] p-4 flex flex-col gap-2 border border-white/10 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#00C6FF] animate-pulse" />
                        <span className="text-xs text-[#6dd2ff]">Indicateurs clés</span>
                      </div>
                      <div className="flex flex-wrap justify-between items-center text-[#6dd2ff] text-xs gap-3">
                        {project.metrics.map((m) => (
                          <span key={m.label}>
                            {m.label} : <strong className="text-white">{m.value}</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions : Live / Démo / Vidéo */}
                  {(project.link || project.demoUrl || project.videoUrl) && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00C6FF]/15 text-[#00C6FF] text-xs font-semibold hover:bg-[#00C6FF]/25 transition-colors"
                        >
                          <Link2 className="w-3.5 h-3.5" /> Site live
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Démo
                        </a>
                      )}
                      {project.videoUrl && (
                        <button
                          type="button"
                          onClick={() => setVideoOpen(project.videoUrl!)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
                        >
                          <Play className="w-3.5 h-3.5" /> Vidéo
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-[var(--text-muted)] py-16 max-w-lg mx-auto">
            <p className="text-lg mb-2">Aucun projet pour le moment.</p>
            <p className="text-sm">
              Ajoute tes réalisations via le{' '}
              <a href="#admin" className="text-[var(--primary)] font-medium underline">
                panneau Admin
              </a>
              .
            </p>
          </div>
        )}
      </div>

      {/* Modal vidéo */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setVideoOpen(null)}
        >
          <div
            className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {youtubeEmbed(videoOpen) ? (
              <iframe
                src={youtubeEmbed(videoOpen)!}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Vidéo projet"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-white p-6">
                <p className="text-sm text-center">Ouvrir la vidéo dans un nouvel onglet :</p>
                <a
                  href={videoOpen}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-6 py-2 text-sm"
                >
                  Voir la vidéo
                </a>
                <button
                  type="button"
                  onClick={() => setVideoOpen(null)}
                  className="text-sm text-white/60 hover:text-white"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setVideoOpen(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-sm"
          >
            Fermer ✕
          </button>
        </div>
      )}
    </section>
  )
}
