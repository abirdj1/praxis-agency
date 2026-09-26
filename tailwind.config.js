/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        praxis: {
          blue: '#0A5BD7',
          cyan: '#00C6FF',
          navy: '#0B1B33',
          deep: '#060B18',
          ice: '#F4F9FF',
        },
      },
      maxWidth: {
        container: '1360px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      boxShadow: {
        glass: '0 8px 32px -4px rgba(10, 91, 215, 0.08)',
        'glass-hover': '0 20px 40px -4px rgba(0, 196, 253, 0.22)',
        'cyan-glow': '0 4px 20px rgba(0, 198, 255, 0.35)',
        'cyan-glow-lg': '0 8px 30px rgba(0, 198, 255, 0.5)',
      },
    },
  },
  plugins: [],
}
