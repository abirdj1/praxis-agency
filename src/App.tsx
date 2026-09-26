import { useState, useEffect } from 'react'
import { ContentProvider } from './context/ContentContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Process } from './sections/Process'
import { Portfolio } from './sections/Portfolio'
import { Testimonials } from './sections/Testimonials'
import { CTA } from './sections/CTA'
import { Contact } from './sections/Contact'
import { Admin } from './pages/Admin'
import { Legal } from './pages/Legal'
import { WhatsAppButton } from './components/WhatsAppButton'
import { Seo } from './components/Seo'

type View = 'site' | 'admin' | 'mentions' | 'confidentialite'

function getViewFromHash(): View {
  if (typeof window === 'undefined') return 'site'
  const h = window.location.hash.replace('#', '')
  if (h === 'admin') return 'admin'
  if (h === 'mentions') return 'mentions'
  if (h === 'confidentialite') return 'confidentialite'
  return 'site'
}

function Site() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default function App() {
  const [view, setView] = useState<View>(getViewFromHash)

  useEffect(() => {
    const onHash = () => setView(getViewFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const goSite = () => {
    window.location.hash = ''
    setView('site')
  }

  return (
    <ContentProvider>
      <Seo />
      {view === 'admin' && <Admin onClose={goSite} />}
      {view === 'mentions' && <Legal type="mentions" onClose={goSite} />}
      {view === 'confidentialite' && <Legal type="confidentialite" onClose={goSite} />}
      {view === 'site' && (
        <>
          <Site />
          <button
            type="button"
            onClick={() => {
              window.location.hash = 'admin'
              setView('admin')
            }}
            className="fixed bottom-4 left-4 z-40 text-[10px] text-[var(--text-muted)]/40 hover:text-[var(--primary)] transition-colors"
            aria-label="Admin"
          >
            Admin
          </button>
        </>
      )}
    </ContentProvider>
  )
}
