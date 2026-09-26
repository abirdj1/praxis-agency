/**
 * Configuration premium du site.
 * Remplis ces valeurs avant la mise en production.
 */

export const CONFIG = {
  /** Formspree : crée un formulaire sur https://formspree.io → colle l’ID ici (ex: xxxxxx) */
  formspreeId: import.meta.env.VITE_FORMSPREE_ID || '',

  /**
   * WhatsApp business (numéro international sans + ni espaces)
   * Ex. Algérie : 213550123456
   */
  whatsappNumber: import.meta.env.VITE_WHATSAPP || '213550123456',

  /** Message prérempli WhatsApp */
  whatsappMessage: 'Bonjour Praxis, je souhaite discuter d’un projet.',

  /**
   * Google Analytics 4 — ID du type G-XXXXXXXX
   * Laisse vide pour désactiver
   */
  gaId: import.meta.env.VITE_GA_ID || '',

  /** URL publique du site (SEO, sitemap, Open Graph) */
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://praxisagency.dz',
}

export function whatsappLink() {
  const text = encodeURIComponent(CONFIG.whatsappMessage)
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`
}
