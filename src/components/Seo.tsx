import { useEffect } from 'react'
import { CONFIG } from '../config'
import { AGENCY } from '../data/content'

/** JSON-LD Organization + WebSite pour Google */
export function Seo() {
  useEffect(() => {
    const scriptId = 'praxis-jsonld'
    let el = document.getElementById(scriptId)
    if (!el) {
      el = document.createElement('script')
      el.id = scriptId
      el.setAttribute('type', 'application/ld+json')
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: AGENCY.fullName,
          url: CONFIG.siteUrl,
          logo: `${CONFIG.siteUrl}/favicon.svg`,
          email: AGENCY.email,
          telephone: AGENCY.phone,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Alger',
            addressCountry: 'DZ',
          },
          sameAs: [AGENCY.instagram, AGENCY.facebook, AGENCY.linkedin].filter(Boolean),
          description: AGENCY.description,
        },
        {
          '@type': 'WebSite',
          name: AGENCY.name,
          url: CONFIG.siteUrl,
          description: AGENCY.slogan,
          inLanguage: 'fr-DZ',
        },
      ],
    })
  }, [])

  useEffect(() => {
    if (!CONFIG.gaId) return
    const s1 = document.createElement('script')
    s1.async = true
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.gaId}`
    document.head.appendChild(s1)
    const s2 = document.createElement('script')
    s2.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${CONFIG.gaId}');
    `
    document.head.appendChild(s2)
  }, [])

  return null
}
