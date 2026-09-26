import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Building2, Clock, Loader2 } from 'lucide-react'
import { useContent } from '../context/ContentContext'
import { CONFIG } from '../config'

export function Contact() {
  const { agency: AGENCY } = useContent()
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const data = new FormData(form)

    if (!CONFIG.formspreeId) {
      // Mode démo sans Formspree configuré
      setStatus('ok')
      form.reset()
      return
    }

    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch(`https://formspree.io/f/${CONFIG.formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('ok')
        form.reset()
      } else {
        const body = await res.json().catch(() => ({}))
        setErrorMsg(body?.error || 'Envoi impossible. Réessayez ou contactez-nous par email.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Erreur réseau. Vérifiez votre connexion.')
      setStatus('error')
    }
  }

  const infoCards = [
    {
      icon: Mail,
      color: 'bg-[#0A5BD7]',
      title: 'Email',
      content: (
        <a href={`mailto:${AGENCY.email}`} className="text-[var(--primary)] hover:underline">
          {AGENCY.email}
        </a>
      ),
      sub: 'Support & nouvelles sollicitations',
    },
    {
      icon: Phone,
      color: 'bg-[#006685]',
      title: 'Téléphone',
      content: (
        <a href={`tel:${AGENCY.phone.replace(/\s/g, '')}`} className="text-[var(--primary)] hover:underline">
          {AGENCY.phoneDisplay}
        </a>
      ),
      sub: 'Ligne directe',
    },
    {
      icon: Building2,
      color: 'bg-[#0A5BD7]',
      title: 'Bureau',
      content: <span className="text-[var(--text)]">{AGENCY.location}</span>,
      sub: AGENCY.locationDetail,
    },
    {
      icon: Clock,
      color: 'bg-[#496297]',
      title: 'Horaires',
      content: <span className="text-[var(--text)]">{AGENCY.hours}</span>,
      sub: AGENCY.hoursDetail,
    },
  ]

  return (
    <section id="contact" className="relative w-full py-24 lg:py-32 bg-[var(--bg)]">
      <div className="max-w-container mx-auto px-5 lg:px-16">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-[var(--surface-2)] text-[var(--primary)] font-display text-xs font-semibold uppercase tracking-wider mb-4">
            Contact
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">
            Parlons de votre projet
          </h2>
          <p className="text-lg text-[var(--text-muted)] mt-3">
            Envoyez-nous un message. Nous répondons sous 24h ouvrées.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)]/60 focus:outline-none focus:ring-2 focus:ring-[#00C6FF]/40 focus:border-[#0A5BD7] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="vous@exemple.com"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)]/60 focus:outline-none focus:ring-2 focus:ring-[#00C6FF]/40 focus:border-[#0A5BD7] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Sujet</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Ex: Développement d'une app IA"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)]/60 focus:outline-none focus:ring-2 focus:ring-[#00C6FF]/40 focus:border-[#0A5BD7] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Décrivez votre projet, vos objectifs et votre timeline..."
                  className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)]/60 focus:outline-none focus:ring-2 focus:ring-[#00C6FF]/40 focus:border-[#0A5BD7] transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary px-9 py-4 text-base w-full sm:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Envoi…
                  </>
                ) : (
                  'Envoyer le message'
                )}
              </button>
            </form>
            {status === 'ok' && (
              <div className="mt-6 p-4 rounded-xl bg-[#00C6FF]/10 border border-[#00C6FF]/30 text-[var(--text)]">
                Message bien reçu. Nous vous répondrons sous 24h ouvrées.
                {!CONFIG.formspreeId && (
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    (Mode démo : configure VITE_FORMSPREE_ID pour recevoir les emails.)
                  </p>
                )}
              </div>
            )}
            {status === 'error' && (
              <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm">
                {errorMsg}
              </div>
            )}
          </motion.div>

          <motion.div
            className="lg:col-span-5 flex flex-col gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {infoCards.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] flex items-start gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${item.color} text-white flex items-center justify-center shrink-0 shadow-md`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-[var(--text)]">{item.title}</h4>
                  {item.content}
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B1B33] to-[#07285A] text-white">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00C6FF]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6dd2ff]">
                  Engagement Praxis
                </span>
              </div>
              <p className="text-sm text-[#c9dbf9]">
                Confidentialité garantie dès le premier échange. NDA disponible sur demande.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
