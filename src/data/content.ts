/**
 * ============================================================
 *  PRAXIS AGENCY — Contenu du site (données réelles)
 * ============================================================
 *  Modifie CE FICHIER pour mettre à jour :
 *  - Infos de contact
 *  - Projets (portfolio)
 *  - Témoignages
 *  - Stats, services, etc.
 *
 *  Après modification → sauvegarde → le site se met à jour
 *  (en mode dev : rechargement auto)
 * ============================================================
 */

export const AGENCY = {
  name: 'Praxis',
  fullName: 'Praxis AI & Digital Solution Agency',
  tagline: 'Innovate. Automate. Elevate.',
  slogan: 'SMART SOLUTIONS. REAL IMPACT.',
  description:
    'Agence algérienne spécialisée en intelligence artificielle, développement web & data. Nous aidons les entreprises, startups et porteurs de projets à croître grâce à des solutions digitales intelligentes.',
  email: 'praxisagencydz@gmail.com',
  phone: '+213 663 31 80 66', // ← remplace par ton vrai numéro
  phoneDisplay: '+213 663 31 80 66',
  location: 'Alger, Algérie',
  locationDetail: 'Rencontres physiques & virtuelles · Hub International',
  hours: 'Dimanche – Jeudi : 09:00 – 18:00',
  hoursDetail: 'Astreinte 24/7 pour les contrats Enterprise',
  instagram: 'https://www.instagram.com/praxisagency.dz?stkn=MjlqZHZmN3IwdnBw',
  facebook: 'https://www.facebook.com/share/1M9NT9rtMz/', // ← à compléter si tu as une page
  linkedin: '', // ← à compléter
  website: 'https://praxisagency.dz',
}

/** Stats affichées dans le Hero */
export const STATS = [
  // Remplace par tes vrais chiffres
  {
    value: '—',
    label: 'Projets livrés',
    sub: 'À compléter',
  },
  {
    value: '—',
    label: 'Clients satisfaits',
    sub: 'À compléter',
  },
  {
    value: '—',
    label: 'Croissance moyenne',
    sub: 'À compléter',
  },
]

/** Services proposés */
export const SERVICES = [
  {
    id: 'ai',
    title: 'AI & Automation',
    description:
      "Automatisez vos tâches répétitives grâce à l'IA. Chatbots intelligents, agents autonomes, intégration de LLMs sur-mesure et workflows automatisés pour gagner du temps et de l'efficacité.",
  },
  {
    id: 'web',
    title: 'Web & Software Development',
    description:
      'Sites vitrines, applications web, e-commerce et logiciels sur mesure. Architectures modernes, performances élevées, design professionnel et évolutif.',
  },
  {
    id: 'data',
    title: 'Data & Business Intelligence',
    description:
      'Tableaux de bord en temps réel, analyses prédictives et pipelines de données. Transformez vos données en décisions stratégiques claires et actionnables.',
  },
]

/** Public cible */
export const AUDIENCE = [
  'Commerçants',
  'Entrepreneurs',
  'Startups',
  'Étudiants',
  'Freelancers',
  'Porteurs de projets',
]

/** Processus de travail */
export const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Découverte',
    desc: 'Analyse de vos besoins, objectifs business et contraintes techniques. Brief clair et roadmap partagée.',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Maquettes UI/UX, prototypes interactifs et validation avec vous avant le développement.',
  },
  {
    num: '03',
    title: 'Développement',
    desc: 'Code propre, sécurisé et moderne. Intégration IA si besoin. Tests réguliers et livraisons itératives.',
  },
  {
    num: '04',
    title: 'Déploiement',
    desc: 'Mise en ligne, formation, documentation et support. Suivi post-lancement inclus.',
  },
]

/**
 * ============================================================
 *  PORTFOLIO — Ajoute / modifie tes vrais projets ici
 * ============================================================
 *  category: 'ia' | 'web' | 'data'
 *  metrics: 2 indicateurs clés (optionnel)
 */
export const PROJECTS = [
  // ============================================================
  //  Ajoute tes vrais projets ici.
  //  Exemple :
  //  {
  //    id: 1,
  //    category: 'web' as const,  // 'ia' | 'web' | 'data'
  //    tag: 'Site vitrine',
  //    title: 'Nom du projet',
  //    description: 'Description du projet et du résultat pour le client.',
  //    metrics: [
  //      { label: 'Année', value: '2025' },
  //      { label: 'Type', value: 'Web' },
  //    ],
  //  },
  // ============================================================
]

/**
 * ============================================================
 *  TÉMOIGNAGES — Ajoute les vrais retours clients ici
 * ============================================================
 *  initials: 2 lettres (ex: "AM")
 *  name: prénom + initiale
 *  role: poste + entreprise
 *  text: citation du client
 */
export const TESTIMONIALS = [
  // ============================================================
  //  Ajoute tes vrais témoignages clients ici.
  //  Exemple :
  //  {
  //    initials: 'AM',
  //    name: 'Amine M.',
  //    role: 'Dirigeant, PME',
  //    text: 'Phrase réelle du client sur le résultat du projet.',
  //  },
  // ============================================================
]

/** Filtres portfolio */
export const PORTFOLIO_FILTERS = [
  { id: 'all' as const, label: 'Tous' },
  { id: 'ia' as const, label: 'IA' },
  { id: 'web' as const, label: 'Web' },
  { id: 'data' as const, label: 'Data' },
]
