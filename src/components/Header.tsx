import { useState } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { Logo } from './Logo'
import { useTheme } from '../hooks/useTheme'

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#processus', label: 'Processus' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#temoignages', label: 'Témoignages' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-glass">
      <div className="max-w-container mx-auto px-5 lg:px-16 h-20 flex items-center justify-between gap-4">
        <Logo />

        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-sm font-semibold tracking-wide text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--primary)] transition-all"
            aria-label="Changer de thème"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-[var(--text)]" />
            ) : (
              <Moon className="w-5 h-5 text-[var(--text)]" />
            )}
          </button>

          <a href="#contact" className="hidden sm:inline-flex btn-primary px-6 py-2.5 text-sm">
            Parlons de votre projet →
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center bg-[var(--surface-2)] border border-[var(--border)]"
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-[var(--text)]" />
            ) : (
              <Menu className="w-5 h-5 text-[var(--text)]" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden flex flex-col gap-1 px-5 pb-6 border-t border-[var(--border)] bg-[var(--bg)]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 font-display font-semibold text-[var(--text)] border-b border-[var(--border)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-3 btn-primary px-6 py-3 text-sm text-center"
          >
            Parlons de votre projet →
          </a>
        </div>
      )}
    </header>
  )
}
