interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

const sizes = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-lg',
  lg: 'w-12 h-12 text-xl',
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  return (
    <a href="#accueil" className={`flex items-center gap-3 group ${className}`}>
      <div
        className={`${sizes[size]} rounded-xl bg-gradient-to-br from-[#0A5BD7] via-[#0A84FF] to-[#00C6FF] flex items-center justify-center shadow-cyan-glow group-hover:scale-105 transition-transform duration-300`}
      >
        <span className="font-display font-bold text-white leading-none">P</span>
      </div>
      {showText && (
        <span className="font-display font-bold text-lg tracking-tight text-[var(--text)]">
          Praxis
        </span>
      )}
    </a>
  )
}
