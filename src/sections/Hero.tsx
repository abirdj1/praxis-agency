import { motion } from 'framer-motion'
import { useContent } from '../context/ContentContext'

export function Hero() {
  const { stats: STATS } = useContent()
  return (
    <section
      id="accueil"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#0B1B33] via-[#082046] to-[#07285A] text-white"
    >
      {/* Ambient orbs */}
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#00C6FF]/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-[#0A5BD7]/25 blur-[140px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#0A5BD7 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-container mx-auto px-5 lg:px-16 pt-14 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start gap-6 z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00C6FF] animate-pulse shadow-[0_0_10px_#00c4fd]" />
              <span className="font-display text-xs font-semibold tracking-wider uppercase text-[#bfe9ff]">
                AI & Digital Solutions
              </span>
            </div>

            <div className="flex flex-col font-display font-bold tracking-tight uppercase leading-none space-y-1">
              <span className="text-4xl sm:text-5xl lg:text-6xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                Une idée ?
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                Un projet ?
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl gradient-text drop-shadow-[0_0_35px_rgba(0,196,253,0.35)]">
                Un besoin ?
              </span>
            </div>

            <p className="text-lg sm:text-xl text-[#c9dbf9] max-w-xl leading-relaxed">
              Nous transformons vos idées en solutions digitales intelligentes. De l'architecture
              prédictive au logiciel sur-mesure d'élite.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="#contact" className="btn-primary px-8 py-4 text-base">
                Démarrer votre projet →
              </a>
              <a href="#services" className="btn-ghost px-7 py-4 text-base">
                Découvrir nos services
              </a>
            </div>

            <div className="flex items-center gap-4 pt-4 text-[#9EB3D1]">
              <div className="flex -space-x-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#496297] text-white text-xs font-bold">
                  AI
                </span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0A5BD7] text-white text-xs font-bold">
                  BI
                </span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#006685] text-white text-xs font-bold">
                  DX
                </span>
              </div>
              <span className="text-sm text-[#6dd2ff]">
                Approuvé par des leaders visionnaires & scale-ups
              </span>
            </div>
          </motion.div>

          {/* Right visual - Dashboard mock */}
          <motion.div
            className="lg:col-span-5 relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-[540px] aspect-[4/3] rounded-2xl p-2 bg-gradient-to-br from-white/[0.15] via-white/[0.03] to-transparent backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00C6FF] via-[#0A5BD7] to-[#0A84FF] rounded-2xl opacity-40 blur-xl group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#061224] flex flex-col p-6">
                <div className="w-full h-full flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A5BD7] to-[#00C6FF] flex items-center justify-center">
                        <span className="font-display font-bold text-white text-sm">P</span>
                      </div>
                      <span className="font-display text-sm font-semibold text-white">
                        Praxis Analytics
                      </span>
                    </div>
                    <span className="text-xs text-[#00C6FF] font-medium px-2 py-0.5 rounded-full bg-[#00C6FF]/10">
                      Live
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {STATS.map((stat) => (
                      <div
                        key={stat.value}
                        className="rounded-xl bg-white/5 p-3 border border-white/10"
                      >
                        <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider truncate">
                          {stat.label.split(' ')[0]}
                        </p>
                        <p className="font-display text-2xl font-bold mt-1 text-[#00C6FF]">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex-1 rounded-xl bg-white/5 border border-white/10 p-4 flex items-end gap-1.5 min-h-[80px]">
                    {[45, 70, 55, 85, 65, 95, 75].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-[#0A5BD7] to-[#00C6FF] rounded-t opacity-90"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#091C32]/85 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#00C6FF]/20 flex items-center justify-center text-[#00C6FF]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-white">
                        Interface Algorithmique v4.2
                      </p>
                      <p className="text-xs text-[#6dd2ff]">Télémétrie en direct active</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#00C6FF]/20 text-[#00C6FF]">
                    99.98% · 12ms
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          className="mt-16 lg:mt-24 p-8 rounded-2xl bg-[#F4F9FF] shadow-[0_16px_48px_-8px_rgba(10,91,215,0.2)] dark:bg-[#0d1526]/80 dark:border dark:border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#c2c6d6]/40 dark:divide-white/10">
            {STATS.map((stat, i) => (
              <div
                key={stat.value}
                className={`flex flex-col items-center md:items-start text-center md:text-left md:px-6 ${
                  i > 0 ? 'pt-6 md:pt-0' : 'first:pl-0'
                }`}
              >
                <div className="font-display text-4xl font-bold text-[#0A5BD7] dark:text-[#00C6FF] tracking-tight">
                  {stat.value}
                </div>
                <p className="text-base text-[#5A6B85] dark:text-[#94A3B8] mt-1">{stat.label}</p>
                <span className="text-xs font-semibold text-[#006685] dark:text-[#6dd2ff] tracking-wide uppercase mt-1">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
