import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useContent } from '../context/ContentContext'

export function Testimonials() {
  const { testimonials } = useContent()

  return (
    <section id="temoignages" className="relative w-full py-24 lg:py-32 section-alt">
      <div className="max-w-container mx-auto px-5 lg:px-16">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-[var(--surface)] text-[var(--primary)] font-display text-xs font-semibold uppercase tracking-wider mb-4 border border-[var(--border)]">
            Ils nous font confiance
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">
            Témoignages
          </h2>
          <p className="text-lg text-[var(--text-muted)] mt-3">
            Ce que disent nos clients après avoir travaillé avec Praxis.
          </p>
        </div>

        {testimonials.length === 0 ? (
          <p className="text-center text-[var(--text-muted)] py-8 max-w-md mx-auto">
            Les témoignages clients apparaîtront ici. Ajoute-les via le{' '}
            <a href="#admin" className="text-[var(--primary)] font-medium underline">
              panneau Admin
            </a>
            .
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={`${t.name}-${i}`}
                className="card-service p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-[#00C6FF] text-[#00C6FF]" />
                  ))}
                </div>
                <p className="text-[var(--text-muted)] leading-relaxed mb-6">« {t.text} »</p>
                <div className="flex items-center gap-3">
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover border border-[var(--border)] shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0A5BD7] to-[#00C6FF] flex items-center justify-center text-white font-display font-bold text-sm shrink-0">
                      {t.initials}
                    </div>
                  )}
                  <div>
                    <p className="font-display font-semibold text-[var(--text)]">{t.name}</p>
                    <p className="text-sm text-[var(--text-muted)]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
