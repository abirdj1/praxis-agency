import { AGENCY } from '../data/content'

type LegalType = 'mentions' | 'confidentialite'

export function Legal({ type, onClose }: { type: LegalType; onClose: () => void }) {
  const isMentions = type === 'mentions'

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-3xl mx-auto px-5 py-16">
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-[var(--primary)] hover:underline mb-8"
        >
          ← Retour au site
        </button>

        <h1 className="font-display text-3xl font-bold mb-2">
          {isMentions ? 'Mentions légales' : 'Politique de confidentialité'}
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-10">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-DZ')}
        </p>

        <div className="prose prose-sm max-w-none space-y-6 text-[var(--text-muted)] leading-relaxed">
          {isMentions ? (
            <>
              <section>
                <h2 className="font-display text-lg font-bold text-[var(--text)] mb-2">
                  1. Éditeur du site
                </h2>
                <p>
                  Le site <strong className="text-[var(--text)]">{AGENCY.website}</strong> est édité
                  par <strong className="text-[var(--text)]">{AGENCY.fullName}</strong>.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Email : {AGENCY.email}</li>
                  <li>Téléphone : {AGENCY.phoneDisplay}</li>
                  <li>Adresse : {AGENCY.location}</li>
                </ul>
              </section>
              <section>
                <h2 className="font-display text-lg font-bold text-[var(--text)] mb-2">
                  2. Hébergement
                </h2>
                <p>
                  Le site peut être hébergé par un prestataire cloud (ex. Vercel, Netlify ou
                  équivalent). Les coordonnées de l’hébergeur seront précisées selon le
                  déploiement final.
                </p>
              </section>
              <section>
                <h2 className="font-display text-lg font-bold text-[var(--text)] mb-2">
                  3. Propriété intellectuelle
                </h2>
                <p>
                  L’ensemble des contenus (textes, logos, design, code) présents sur ce site
                  est protégé. Toute reproduction non autorisée est interdite.
                </p>
              </section>
              <section>
                <h2 className="font-display text-lg font-bold text-[var(--text)] mb-2">
                  4. Responsabilité
                </h2>
                <p>
                  {AGENCY.name} s’efforce d’assurer l’exactitude des informations. Toutefois,
                  des erreurs ou omissions peuvent survenir. L’utilisateur reste responsable de
                  l’usage qu’il fait des informations fournies.
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="font-display text-lg font-bold text-[var(--text)] mb-2">
                  1. Données collectées
                </h2>
                <p>
                  Via le formulaire de contact, nous pouvons collecter : nom, adresse e-mail,
                  sujet et message. Ces données servent uniquement à répondre à votre demande.
                </p>
              </section>
              <section>
                <h2 className="font-display text-lg font-bold text-[var(--text)] mb-2">
                  2. Finalité
                </h2>
                <p>
                  Traitement des demandes commerciales, support et suivi de projet. Aucune
                  revente de données à des tiers.
                </p>
              </section>
              <section>
                <h2 className="font-display text-lg font-bold text-[var(--text)] mb-2">
                  3. Conservation
                </h2>
                <p>
                  Les messages sont conservés le temps nécessaire au traitement de la demande,
                  puis archivés ou supprimés selon les besoins légitimes de l’agence.
                </p>
              </section>
              <section>
                <h2 className="font-display text-lg font-bold text-[var(--text)] mb-2">
                  4. Cookies & mesure d’audience
                </h2>
                <p>
                  Le site peut utiliser des cookies techniques (thème, session admin) et, le
                  cas échéant, un outil d’analytics (ex. Google Analytics) pour comprendre
                  l’usage du site. Vous pouvez désactiver les cookies dans votre navigateur.
                </p>
              </section>
              <section>
                <h2 className="font-display text-lg font-bold text-[var(--text)] mb-2">
                  5. Vos droits
                </h2>
                <p>
                  Pour toute question relative à vos données, contactez-nous à{' '}
                  <a href={`mailto:${AGENCY.email}`} className="text-[var(--primary)] underline">
                    {AGENCY.email}
                  </a>
                  .
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
