# Guide d'utilisation — Praxis CMS Admin

## Méthode moderne : panneau Admin

Tu n'as **plus besoin d'éditer le code** pour ajouter des projets ou témoignages.

### Accès

1. Lance le site : `npm run dev`
2. Clique sur **Admin** (bas à gauche) ou ouvre : `http://localhost:5173/#admin`
3. Mot de passe par défaut : **`praxis2026`**

> Change le mot de passe dans `src/pages/Admin.tsx` (constante `ADMIN_PASSWORD`) avant de publier.

---

### Ajouter un projet

1. Onglet **Projets**
2. Remplis : catégorie (IA / Web / Data), titre, description, indicateurs
3. Clique **Enregistrer le projet**
4. Le site se met à jour **immédiatement** (retourne au site pour voir)

### Ajouter un témoignage

1. Onglet **Témoignages**
2. Nom, poste, citation
3. **Enregistrer** → visible tout de suite sur le site

### Stats automatiques

Onglet **Stats** → active **Stats automatiques** :

| Stat | Calcul auto |
|------|-------------|
| Projets livrés | Nombre de projets dans le portfolio |
| Clients satisfaits | Estimé selon le nombre d'avis |
| Impact moyen | Estimé selon le nombre de projets |

Tu peux aussi désactiver l'auto et saisir des chiffres manuels.

### Infos agence

Onglet **Agence** : email, téléphone, Instagram, description, etc.

---

### Sauvegarde

- Tout est sauvé **automatiquement** dans le navigateur (localStorage)
- **Export** : télécharge un fichier JSON de secours
- **Import** : recharge un JSON exporté (autre PC, navigateur, etc.)

---

### Lancer le site

```bash
cd praxis-agency
npm install
npm run dev
```

Ouvre http://localhost:5173  
Admin : http://localhost:5173/#admin

---

### Pour la production (multi-appareils)

Le panneau Admin actuel stocke les données **dans le navigateur**.  
Pour que le contenu soit le même pour tous les visiteurs :

1. **Option simple** : après avoir rempli l'admin, exporte le JSON et envoie-le à un développeur pour le figer dans le code
2. **Option pro** : connecter un CMS cloud (Sanity, Supabase) — on peut l'ajouter plus tard

---

### Mot de passe

Fichier : `src/pages/Admin.tsx`  
Ligne : `const ADMIN_PASSWORD = 'praxis2026'`
