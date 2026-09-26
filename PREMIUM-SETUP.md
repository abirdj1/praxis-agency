# Configuration Premium — Praxis

Checklist pour un site **production / premium**.

---

## 1. Formulaire → vrais emails (Formspree)

1. Crée un compte gratuit : [formspree.io](https://formspree.io)
2. New form → copie l’ID (ex. `xpwkgabc`)
3. Crée un fichier `.env` à la racine :

```env
VITE_FORMSPREE_ID=xpwkgabc
VITE_WHATSAPP=213550123456
VITE_SITE_URL=https://praxisagency.dz
VITE_GA_ID=
```

4. Relance `npm run dev` ou redéploie

Les messages du formulaire arrivent sur ton email.

---

## 2. WhatsApp

Dans `.env` :

```env
VITE_WHATSAPP=213550123456
```

= indicatif pays + numéro **sans** `+` ni espaces.  
Le bouton vert en bas à droite ouvre WhatsApp avec un message prérempli.

---

## 3. Google Analytics (optionnel)

```env
VITE_GA_ID=G-XXXXXXXXXX
```

---

## 4. Déploiement Vercel (recommandé)

```bash
npm install -g vercel
cd praxis-agency
vercel
```

Ajoute les variables d’environnement dans le dashboard Vercel  
(Settings → Environment Variables) : mêmes clés que `.env`.

Branchez ensuite ton domaine `praxisagency.dz`.

---

## 5. Mot de passe Admin

Fichier : `src/pages/Admin.tsx`  
Ligne : `ADMIN_PASSWORD = 'praxis2026'` → change-le.

---

## 6. Contenu

1. Ouvre `/#admin`
2. Ajoute projets (liens, démo, vidéo, image)
3. Ajoute témoignages (photo / logo)
4. Export JSON de sauvegarde

---

## 7. Pages légales

Déjà intégrées :
- `/#mentions` — Mentions légales
- `/#confidentialite` — Confidentialité  

Liens dans le footer. Adapte le texte si besoin dans `src/pages/Legal.tsx`.

---

## 8. SEO déjà en place

- Meta description, Open Graph, Twitter cards  
- `robots.txt` + `sitemap.xml`  
- JSON-LD Organization (Google)  
- Canonical URL  

Après déploiement, soumets le sitemap dans [Google Search Console](https://search.google.com/search-console).

---

## 9. Checklist go-live

- [ ] `.env` / variables Vercel configurées  
- [ ] Formspree testé (message reçu)  
- [ ] WhatsApp ouvre le bon numéro  
- [ ] Mot de passe admin changé  
- [ ] Au moins 2–3 vrais projets + 1 témoignage  
- [ ] Domaine + HTTPS  
- [ ] Export JSON de secours  

---

## Niveau atteint

| Fonction | Statut |
|----------|--------|
| Design premium dark/light | ✅ |
| Admin CMS + médias | ✅ |
| Formulaire email réel | ✅ (avec Formspree ID) |
| WhatsApp flottant | ✅ |
| SEO + sitemap + schema.org | ✅ |
| Pages légales | ✅ |
| Analytics optionnel | ✅ |
| Déploiement prêt | ✅ |

**Optionnel plus tard :** Sanity (CMS multi-appareils), blog, AR/EN.
