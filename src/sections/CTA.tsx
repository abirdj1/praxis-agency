import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A5BD7] via-[#0A84FF] to-[#00C6FF]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative max-w-container mx-auto px-5 lg:px-16 text-center">
        <motion.h2
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          SMART SOLUTIONS.
          <br className="sm:hidden" /> REAL IMPACT.
        </motion.h2>
        <motion.p
          className="text-lg text-white/85 max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Votre idée, notre expertise. Transformons ensemble votre vision en produit digital
          performant.
        </motion.p>
        <motion.a
          href="#contact"
          className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-white text-[#0A5BD7] font-display font-bold text-base shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Parlons de votre projet
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </div>
    </section>
  )
}
