import { motion } from 'framer-motion'
import { Brain, Code2, BarChart3, Store, Briefcase, Rocket, GraduationCap, Laptop, Lightbulb } from 'lucide-react'
import { SERVICES, AUDIENCE } from '../data/content'

const ICONS = [Brain, Code2, BarChart3]
const AUDIENCE_ICONS = [Store, Briefcase, Rocket, GraduationCap, Laptop, Lightbulb]

export function Services() {
  return (
    <section id="services" className="relative w-full py-24 lg:py-32 bg-[var(--bg)]">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none dot-grid" />
      <div className="relative max-w-container mx-auto px-5 lg:px-16">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <span className="px-3.5 py-1 rounded-full bg-[var(--surface-2)] text-[var(--primary)] font-display text-xs font-semibold uppercase tracking-wider mb-4">
            Pôles d'expertise
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">
            Nos Services
          </h2>
          <p className="text-lg text-[var(--text-muted)] mt-3">
            Des solutions technologiques complètes, du concept algorithmique au déploiement souverain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i] ?? Brain
            return (
              <motion.div
                key={service.id}
                className="card-service group flex flex-col justify-between p-8 lg:p-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0A5BD7] to-[#00C6FF] flex items-center justify-center text-white shadow-cyan-glow mb-8">
                    <Icon className="w-8 h-8" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[var(--text)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[var(--text-muted)] leading-relaxed">{service.description}</p>
                </div>
                <div className="pt-8">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 font-display text-sm font-semibold text-[var(--primary)] group-hover:gap-3 transition-all"
                  >
                    En savoir plus
                    <span>→</span>
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-[var(--text-muted)] mb-6 font-medium">
            Pour tous ceux qui veulent avancer grâce au digital
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {AUDIENCE.map((label, i) => {
              const Icon = AUDIENCE_ICONS[i] ?? Lightbulb
              return (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-2)] border border-[var(--border)]"
                >
                  <Icon className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-sm font-medium text-[var(--text)]">{label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
