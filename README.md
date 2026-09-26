# Praxis Agency — Site Vitrine

> **AI & Digital Solution Agency**  
> Smart Solutions. Real Impact.  
> Innovate. Automate. Elevate.

Site vitrine moderne, responsive, avec mode clair / sombre, animations et design fidèle aux maquettes.

---

## 🚀 Stack technique

| Techno | Usage |
|--------|--------|
| **React 19** | UI |
| **TypeScript** | Typage strict |
| **Vite 6** | Build ultra-rapide |
| **Tailwind CSS 3** | Design system |
| **Framer Motion** | Animations d'entrée & interactions |
| **Lucide React** | Icônes |

---

## ✨ Fonctionnalités

- Mode **clair / sombre** (toggle + persistance localStorage)
- Header glassmorphism fixe + menu mobile
- Hero avec dashboard animé + stats
- Services (AI, Web, Data) + badges audience
- Processus en 4 étapes
- Portfolio **filtrable** (Tous / IA / Web / Data)
- Témoignages clients
- CTA « SMART SOLUTIONS. REAL IMPACT. »
- Formulaire de contact
- Footer complet + réseaux sociaux
- 100 % responsive
- SEO-ready (meta, structure sémantique)

---

## 📦 Installation

```bash
# Cloner ou décompresser le projet
cd praxis-agency

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Ouvre [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production → `dist/` |
| `npm run preview` | Prévisualiser le build |

---

## 📁 Structure du projet

```
praxis-agency/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Logo.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Process.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CTA.tsx
│   │   └── Contact.tsx
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎨 Personnalisation

| Élément | Fichier |
|---------|---------|
| Couleurs / thème | `src/index.css` (`:root` et `.dark`) |
| Textes & contenu | Fichiers dans `src/sections/` |
| Logo | `src/components/Logo.tsx` |
| Email / Téléphone | `src/sections/Contact.tsx` + `Footer.tsx` |
| Réseaux sociaux | `src/components/Footer.tsx` |

---

## 🌐 Déploiement

### Vercel (recommandé)
```bash
npx vercel
```
Ou glisse le dossier sur [vercel.com](https://vercel.com)

### Netlify
```bash
npm run build
# Puis drag & drop le dossier dist/
```

### GitHub Pages
```bash
npm run build
# Publier le contenu de dist/
```

---



---

**Praxis Agency** — © 2026  
SMART SOLUTIONS. REAL IMPACT.
