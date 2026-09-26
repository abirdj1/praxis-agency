# Guide client — Gérer le site Praxis (sans code)

Le site fonctionne comme un vrai site d’agence :  
**tu n’ouvres pas de fichiers de code.**  
Tu gères projets, témoignages et infos depuis un **espace Admin** protégé par mot de passe.

---

## 1. Accéder à l’Admin

1. Ouvre le site (ex. `https://ton-domaine.com` ou en local `http://localhost:5173`)
2. En bas à **gauche**, clique sur le petit lien **Admin**  
   **ou** ajoute `#admin` à l’URL :  
   `https://ton-domaine.com/#admin`
3. Entre le mot de passe :

```
praxis2026
```

*(À changer avant la livraison — voir section 6)*

---

## 2. Ajouter un projet (Portfolio)

1. Onglet **Projets**
2. Remplis le formulaire :
   - **Catégorie** : IA / Web / Data
   - **Tag** : petit label (ex. « Site vitrine », « Chatbot »)
   - **Titre** : nom du projet
   - **Description** : 2–4 phrases pour le client
   - **Indicateurs** : ex. Année = 2025, Type = Web
3. Clique **Ajouter le projet**
4. Le projet apparaît **tout de suite** sur le site (section Portfolio)

Pour **supprimer** un projet : bouton corbeille à côté de la carte.

---

## 3. Ajouter un témoignage (avis client)

1. Onglet **Témoignages**
2. Remplis :
   - **Initiales** : 2 lettres (ex. AM)
   - **Nom** : Amine M.
   - **Rôle** : Dirigeant, PME retail
   - **Texte** : la citation du client
3. Clique **Ajouter**
4. Le témoignage s’affiche **immédiatement** sur le site

---

## 4. Stats qui changent automatiquement

Onglet **Stats** :

- **Mode auto (recommandé)** : activé par défaut  
  - Nombre de projets → « X+ Projets livrés »  
  - Nombre de témoignages → estimation satisfaction  
  - Impact estimé selon le portfolio  

Dès que tu ajoutes ou supprimes un projet / témoignage, **les chiffres du Hero se mettent à jour tout seuls**.

- **Mode manuel** : désactive l’auto et saisis tes propres chiffres (ex. 50+, 99%, +120%).

---

## 5. Infos de l’agence (contact, réseaux)

Onglet **Agence** :

- Email, téléphone, adresse  
- Liens Instagram, Facebook, LinkedIn  
- Slogan, description  

Tout se met à jour dans le **footer** et la page **Contact**.

---

## 6. Sécurité — changer le mot de passe

Avant de livrer le site au client final, change le mot de passe dans le code :

**Fichier :** `src/pages/Admin.tsx`  
**Ligne :** `const ADMIN_PASSWORD = 'praxis2026'`

Remplace par un mot de passe fort, par exemple : `Praxis@Alger2026!`

---

## 7. Sauvegarder / restaurer le contenu

Les données sont enregistrées dans le **navigateur** (localStorage) de la machine qui utilise l’Admin.

| Action | Bouton | Utilité |
|--------|--------|---------|
| **Export** | En haut de l’Admin | Télécharge un fichier `.json` de secours |
| **Import** | En haut de l’Admin | Restaure un fichier `.json` exporté |

**Bonnes pratiques :**
- Après chaque session d’ajout de projets → clique **Export** et garde le fichier
- Si tu changes d’ordinateur → **Import** du dernier JSON
- Pour un site en production multi-appareils, voir section 8 (CMS cloud)

---

## 8. Pour un site 100 % pro (plusieurs PC / équipe)

L’Admin actuel suffit pour démarrer et livrer.  
Pour que **plusieurs personnes** gèrent le contenu depuis n’importe où (comme Sanity / WordPress) :

| Solution | Niveau | Description |
|----------|--------|-------------|
| **Sanity.io** (recommandé) | Pro | Éditeur en ligne gratuit, le site lit les données en live |
| **Payload CMS** | Avancé | CMS intégré au code, auto-hébergé |
| **Supabase** | Moyen | Base de données + formulaire admin |

Si tu veux qu’on branche **Sanity** (interface cloud pour le client, stats auto, pas de localStorage), dis-le et on l’intègre.

---

## Résumé pour le client de l’agence

```
1. Aller sur le site → #admin
2. Mot de passe : praxis2026 (à changer)
3. Onglet Projets → ajouter / supprimer
4. Onglet Témoignages → ajouter / supprimer
5. Stats = auto (se mettent à jour seules)
6. Export JSON de temps en temps (sauvegarde)
7. Retour au site → tout est à jour
```

Aucune ligne de code à toucher.
