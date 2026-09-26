import { motion } from 'framer-motion'
import { PROCESS_STEPS } from '../data/content'

const GRADIENTS = [
  'from-[#0A5BD7] to-[#0A84FF]',
  'from-[#0A84FF] to-[#00C6FF]',
  'from-[#006685] to-[#0A5BD7]',
  'from-[#00C6FF] to-[#006685]',
]

export function Process() {
  return (
    <section id="processus" className="relative w-full py-24 lg:py-32 section-alt">
      <div className="max-w-container mx-auto px-5 lg:px-16">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
          <span className="px-3.5 py-1 rounded-full bg-[var(--surface)] text-[var(--primary)] font-display text-xs font-semibold uppercase tracking-wider mb-4 border border-[var(--border)]">
            Méthodologie
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">
            Notre Processus
          </h2>
          <p className="text-lg text-[var(--text-muted)] mt-3">
            Une méthodologie claire et agile pour livrer des résultats concrets.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-1 bg-gradient-to-r from-[#0A5BD7] via-[#00C6FF] to-[#0A5BD7] z-0 rounded-full opacity-40" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative z-10">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="flex flex-col items-center text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-tr ${GRADIENTS[i]} text-white flex items-center justify-center font-display text-xl font-bold shadow-[0_8px_25px_rgba(10,91,215,0.3)] mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {step.num}
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
