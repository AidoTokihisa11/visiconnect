import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  Rocket,
  Video as VideoIcon,
  Zap,
  Settings,
  LifeBuoy,
  Search,
  ExternalLink,
  ChevronRight,
  Mail,
  ArrowUp,
} from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import { useTranslation } from '../hooks/useTranslation';

/* --- DESIGN TOKENS --- */
const COLORS = {
  primary: 'hsl(var(--primary))',
  dark: 'hsl(var(--foreground))',
  text: 'hsl(var(--foreground))',
  lightText: 'hsl(var(--muted-foreground))',
  background: 'hsl(var(--background))',
  card: 'hsl(var(--card))',
  border: 'hsl(var(--border))',
  hoverBg: 'hsl(var(--muted))',
};

/* --- ARTICLE CATALOG ---
   Chaque article vit dans la page (id = ancre).
   CTA optionnel = lien vers la vraie feature.
--- */
const CATEGORIES = [
  {
    id: 'premiers-pas',
    icon: Rocket,
    title: 'Premiers pas',
    articles: [
      {
        slug: 'creer-compte',
        title: 'Créer votre compte',
        summary:
          "Créez un compte VisioConnect en moins d'une minute, sans carte bancaire.",
        steps: [
          "Cliquez sur « S'inscrire » en haut à droite du site.",
          'Entrez votre email et choisissez un mot de passe fort (12 caractères min.).',
          "Confirmez votre email via le lien reçu (vérifiez les spams si besoin).",
          'Vous arrivez directement sur votre tableau de bord.',
        ],
        cta: { label: 'Créer mon compte', to: '/signup' },
      },
      {
        slug: 'configurer-profil',
        title: 'Configurer votre profil',
        summary:
          'Personnalisez votre nom affiché, photo et préférences par défaut (langue, thème).',
        steps: [
          'Allez dans « Mon compte » depuis le menu utilisateur.',
          'Modifiez votre nom, avatar et fuseau horaire.',
          'Choisissez votre langue par défaut et le thème (clair / sombre).',
          'Enregistrez — les changements sont appliqués immédiatement.',
        ],
        cta: { label: 'Ouvrir mon compte', to: '/account' },
      },
      {
        slug: 'premiere-reunion',
        title: 'Lancer votre première réunion',
        summary:
          "Créez une salle en un clic et invitez avec un simple lien — aucune installation requise.",
        steps: [
          'Depuis le tableau de bord, cliquez sur « Nouvelle réunion ».',
          'Une salle est créée avec un lien unique et un ID lisible.',
          'Copiez le lien et envoyez-le par email, Slack ou WhatsApp.',
          'Vos invités rejoignent directement dans le navigateur.',
        ],
        cta: { label: 'Tester une réunion', to: '/demo?join=1' },
      },
      {
        slug: 'inviter-participants',
        title: 'Inviter des participants',
        summary:
          "Trois façons d'inviter : lien direct, invitation par email, ou intégration calendrier.",
        steps: [
          'Dans la salle, cliquez sur le bouton « Inviter » en haut à droite.',
          'Copiez le lien pour le partager où vous voulez.',
          "Ou entrez des adresses email pour envoyer une invitation formatée avec l'heure et le lien.",
          'Pour les réunions récurrentes, planifiez-les depuis le Scheduler.',
        ],
        cta: { label: 'Planifier une réunion', to: '/scheduler' },
      },
    ],
  },
  {
    id: 'pendant-reunion',
    icon: VideoIcon,
    title: 'Pendant la réunion',
    articles: [
      {
        slug: 'partage-ecran',
        title: 'Partager votre écran',
        summary:
          'Partagez tout votre écran, une fenêtre spécifique ou un onglet de navigateur.',
        steps: [
          "Cliquez sur l'icône « Partage d'écran » dans la barre d'outils du bas.",
          'Le navigateur propose : Écran entier / Fenêtre / Onglet Chrome.',
          "Choisissez la source. L'audio de l'onglet peut être partagé aussi (case à cocher).",
          "Cliquez à nouveau sur l'icône pour arrêter le partage.",
        ],
      },
      {
        slug: 'tableau-blanc',
        title: 'Utiliser le tableau blanc',
        summary:
          'Un tableau collaboratif Tldraw intégré : dessin libre, formes, texte, export PNG/PDF.',
        steps: [
          "Dans la salle, ouvrez le panneau « Tableau blanc » depuis la barre d'outils.",
          'Tous les participants peuvent dessiner en temps réel.',
          'Utilisez les outils : crayon, formes, texte, flèches, sticky notes.',
          'Exportez en PNG ou PDF depuis le menu « … » du tableau.',
        ],
      },
      {
        slug: 'enregistrement',
        title: 'Enregistrer la session',
        summary:
          "L'enregistrement capture vidéo, audio et partages d'écran de la réunion.",
        steps: [
          "Le bouton rouge dans la barre d'outils démarre l'enregistrement.",
          'Tous les participants voient un indicateur « REC » — consentement transparent.',
          'Arrêtez à tout moment. Le fichier est traité côté serveur.',
          "Vous recevez le lien de téléchargement par email dans les 5-10 min qui suivent.",
        ],
      },
      {
        slug: 'gerer-participants',
        title: 'Gérer les participants',
        summary:
          "En tant qu'hôte, coupez les micros, retirez ou promouvez un participant en co-animateur.",
        steps: [
          'Ouvrez le panneau « Participants » (icône personnes en haut à droite).',
          "Cliquez sur le menu « … » à côté d'un nom pour ses options.",
          'Actions disponibles : couper le micro, désactiver la caméra, exclure, promouvoir hôte.',
          'Verrouillez la salle depuis les paramètres pour empêcher toute nouvelle entrée.',
        ],
      },
    ],
  },
  {
    id: 'fonctionnalites-avancees',
    icon: Zap,
    title: 'Fonctionnalités avancées',
    articles: [
      {
        slug: 'transcription',
        title: 'Transcription en direct',
        summary:
          'Sous-titres en temps réel et compte-rendu écrit automatique de la réunion.',
        steps: [
          "Activez « Transcription » depuis le menu « … » de la barre d'outils.",
          "Les sous-titres s'affichent en direct au bas de la vidéo.",
          'Le texte est aussi consigné dans un panneau latéral consultable.',
          'En fin de réunion, un compte-rendu automatique est disponible au téléchargement.',
        ],
      },
      {
        slug: 'traduction',
        title: 'Traduction automatique',
        summary:
          'Traduction des sous-titres dans 6 langues (français, anglais, espagnol, allemand, catalan, russe).',
        steps: [
          "Activez d'abord la transcription (voir article précédent).",
          'Ouvrez le menu langue en bas des sous-titres.',
          "Chaque participant peut choisir sa propre langue cible, indépendamment des autres.",
          'La latence de traduction est de 1 à 2 s en moyenne.',
        ],
      },
      {
        slug: 'integrations',
        title: 'Intégrations (Slack, Calendar)',
        summary:
          'Notifications Slack, événements Google/Outlook Calendar, webhooks pour votre stack.',
        steps: [
          'Ouvrez la page Intégrations depuis le menu « Mon compte ».',
          "Cliquez sur l'intégration voulue puis « Connecter ».",
          'Autorisez VisioConnect via OAuth (Slack, Google, Microsoft).',
          "Configurez les déclencheurs (nouvelle réunion, invitation reçue, compte-rendu prêt…).",
        ],
        cta: { label: 'Voir les intégrations', to: '/integrations' },
      },
      {
        slug: 'webinaire',
        title: 'Mode webinaire',
        summary:
          "Idéal pour les événements >50 personnes : audience silencieuse, Q&R modérée.",
        steps: [
          "À la création d'une salle, choisissez « Mode webinaire ».",
          'Définissez les animateurs (ceux qui peuvent parler / partager).',
          "L'audience peut poser des questions écrites via le panneau Q&R.",
          'Les animateurs valident les questions puis y répondent en direct.',
        ],
      },
    ],
  },
  {
    id: 'parametres-compte',
    icon: Settings,
    title: 'Paramètres & Compte',
    articles: [
      {
        slug: 'notifications',
        title: 'Gérer les notifications',
        summary:
          'Choisissez quelles alertes vous recevez par email et à quelle fréquence.',
        steps: [
          'Ouvrez « Mon compte » > onglet « Notifications ».',
          "Cochez / décochez les événements : invitation reçue, compte-rendu prêt, rappel de réunion…",
          'Choisissez la fréquence des résumés (jamais, quotidien, hebdomadaire).',
          'Vos changements sont enregistrés automatiquement.',
        ],
        cta: { label: 'Ouvrir mon compte', to: '/account' },
      },
      {
        slug: 'facturation',
        title: 'Facturation et abonnements',
        summary:
          'Consultez votre plan actuel, changez de formule, téléchargez vos factures.',
        steps: [
          'Allez dans « Mon compte » > onglet « Abonnement ».',
          'Comparez les plans (Free, Pro, Business) et changez à tout moment.',
          'La facturation est mensuelle ou annuelle (économie de 20 %).',
          'Toutes vos factures sont téléchargeables au format PDF.',
        ],
        cta: { label: 'Voir les tarifs', to: '/pricing' },
      },
      {
        slug: 'securite',
        title: 'Sécurité et confidentialité',
        summary:
          'Chiffrement E2E, conformité RGPD, gestion des données personnelles.',
        steps: [
          'Les communications audio/vidéo sont chiffrées de bout en bout (DTLS-SRTP).',
          'Les enregistrements sont chiffrés au repos (AES-256).',
          "Activez l'authentification à 2 facteurs depuis « Mon compte » > « Sécurité ».",
          'Exportez ou supprimez vos données personnelles à tout moment (droits RGPD).',
        ],
        cta: { label: 'Politique de sécurité', to: '/security' },
      },
      {
        slug: 'supprimer-compte',
        title: 'Supprimer mon compte',
        summary:
          'Suppression définitive et irréversible de votre compte et de toutes vos données.',
        steps: [
          'Ouvrez « Mon compte » > onglet « Sécurité ».',
          "Faites défiler jusqu'à la section « Zone de danger ».",
          'Cliquez sur « Supprimer mon compte » et confirmez votre mot de passe.',
          'Vos données sont purgées sous 30 jours (délai légal RGPD).',
        ],
        cta: { label: 'Ouvrir mon compte', to: '/account' },
      },
    ],
  },
  {
    id: 'depannage',
    icon: LifeBuoy,
    title: 'Résolution de problèmes',
    articles: [
      {
        slug: 'audio-video',
        title: 'Problèmes audio / vidéo',
        summary:
          'Micro muet, caméra noire, écho — les résolutions les plus courantes en 4 étapes.',
        steps: [
          "Vérifiez que le navigateur a bien accès à la caméra / au micro (icône cadenas dans la barre d'adresse).",
          "Rechargez l'onglet (Ctrl+R). Puis testez sur webcamtests.com et mictests.com.",
          "Si l'écho persiste, activez la suppression d'écho dans les paramètres audio VisioConnect.",
          "En cas de caméra noire : vérifiez qu'aucune autre application n'utilise déjà la webcam.",
        ],
      },
      {
        slug: 'connexion',
        title: 'Problèmes de connexion',
        summary:
          'Salle qui ne charge pas, participants qui se déconnectent — piste réseau et pare-feu.',
        steps: [
          'Testez votre bande passante (min. requis : 500 kbps up/down par participant).',
          'Vérifiez que les ports UDP 10000-20000 sont ouverts (LiveKit).',
          "Sur un réseau d'entreprise, demandez à l'IT de whitelister *.visioconnect.pro.",
          'En dernier recours : passez sur un partage de connexion mobile pour isoler le problème.',
        ],
      },
      {
        slug: 'navigateurs',
        title: 'Navigateurs supportés',
        summary:
          'VisioConnect fonctionne sur tout navigateur moderne. Recommandé : Chrome / Edge / Brave à jour.',
        steps: [
          'Testés à 100 % : Chrome 120+, Edge 120+, Firefox 121+, Safari 17+, Brave, Opera.',
          'Sur mobile : Safari iOS 17+ et Chrome Android récent.',
          "Internet Explorer n'est pas supporté (obsolète).",
          'Mettez toujours votre navigateur à jour pour bénéficier des correctifs WebRTC.',
        ],
      },
      {
        slug: 'contacter-support',
        title: 'Contacter le support',
        summary:
          "Une question qui reste sans réponse ? Écrivez-nous, on répond sous 24 h ouvrées.",
        steps: [
          "Utilisez le formulaire de contact avec le maximum de détails (navigateur, OS, capture d'écran).",
          'Consultez le statut de la plateforme sur /status en cas de panne suspectée.',
          'Rejoignez la communauté pour poser vos questions aux autres utilisateurs.',
          'Réponse garantie sous 24 h ouvrées (souvent bien plus rapide).',
        ],
        cta: { label: 'Ouvrir un ticket', to: '/contact' },
      },
    ],
  },
];

/* --- LAYOUT --- */
const Page = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
  color: ${COLORS.text};
  display: flex;
  flex-direction: column;
  font-family: 'Inter', system-ui, sans-serif;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
`;

const Main = styled.main`
  flex: 1;
  padding-top: 80px;
`;

const Hero = styled.section`
  background: linear-gradient(135deg, hsl(var(--primary)) 0%, #1d4ed8 100%);
  color: #fff;
  padding: 4rem 1.5rem 3rem;
  text-align: center;

  @media (max-width: 640px) {
    padding: 2.5rem 1rem 2rem;
  }
`;

const HeroInner = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const HeroEyebrow = styled.p`
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.85;
  margin: 0 0 0.5rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;

  @media (max-width: 640px) {
    font-size: 1.9rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0 auto 2rem;
  max-width: 560px;

  @media (max-width: 640px) {
    font-size: 0.98rem;
  }
`;

const SearchWrap = styled.div`
  position: relative;
  max-width: 520px;
  margin: 0 auto;

  svg {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.95rem 1.1rem 0.95rem 3rem;
  border-radius: 999px;
  border: none;
  font-size: 1rem;
  color: ${COLORS.text};
  background: ${COLORS.card};
  box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.25);
  outline: none;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    box-shadow:
      0 10px 30px -12px rgba(0, 0, 0, 0.25),
      0 0 0 3px rgba(255, 255, 255, 0.35);
  }
`;

const Body = styled.section`
  max-width: 1200px;
  margin: 3rem auto 5rem;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 3rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;
    margin: 2rem auto 3rem;
  }
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 100px;
  align-self: start;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  padding-right: 0.5rem;

  @media (max-width: 900px) {
    position: static;
    max-height: none;
    padding-right: 0;
  }
`;

const SidebarGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const SidebarGroupTitle = styled.h4`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${COLORS.lightText};
  margin: 0 0 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${COLORS.primary};
  }
`;

const SidebarLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  color: ${COLORS.lightText};
  font-size: 0.92rem;
  text-decoration: none;
  transition:
    background-color 0.15s,
    color 0.15s;

  &:hover {
    background: ${COLORS.hoverBg};
    color: ${COLORS.primary};
  }

  &.active {
    background: rgba(37, 99, 235, 0.1);
    color: ${COLORS.primary};
    font-weight: 600;
  }
`;

const Content = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const CategoryBlock = styled.section`
  scroll-margin-top: 100px;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid ${COLORS.border};
`;

const CategoryIconWrap = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: rgba(37, 99, 235, 0.1);
  color: ${COLORS.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const CategoryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin: 0;
`;

const Article = styled.article`
  scroll-margin-top: 100px;
  padding: 1.5rem 1.5rem 1.75rem;
  border: 1px solid ${COLORS.border};
  border-radius: 14px;
  background: ${COLORS.card};
  margin-bottom: 1.25rem;
  transition: border-color 0.2s;

  &:target,
  &.highlighted {
    border-color: ${COLORS.primary};
    box-shadow: 0 6px 24px -12px rgba(37, 99, 235, 0.35);
  }
`;

const ArticleTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin: 0 0 0.5rem;
`;

const ArticleSummary = styled.p`
  color: ${COLORS.lightText};
  margin: 0 0 1.1rem;
  line-height: 1.55;
`;

const StepsList = styled.ol`
  padding-left: 1.2rem;
  margin: 0 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  li {
    color: ${COLORS.text};
    line-height: 1.55;
    &::marker {
      color: ${COLORS.primary};
      font-weight: 700;
    }
  }
`;

const ArticleCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1rem;
  background: ${COLORS.primary};
  color: #fff;
  border-radius: 8px;
  font-size: 0.92rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.15s,
    transform 0.15s;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }
`;

const EmptyState = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;
  color: ${COLORS.lightText};
  border: 1px dashed ${COLORS.border};
  border-radius: 14px;
`;

const HelpCta = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 16px;
  background: ${COLORS.card};
  border: 1px solid ${COLORS.border};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: ${COLORS.dark};
  }

  p {
    margin: 0;
    color: ${COLORS.lightText};
    max-width: 460px;
  }
`;

const HelpCtaActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const HelpButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.92rem;
  text-decoration: none;
  transition: all 0.15s;

  ${(p) =>
    p.$variant === 'primary'
      ? `
    background: ${COLORS.primary};
    color: #fff;
    &:hover { background: #1d4ed8; }
  `
      : `
    background: transparent;
    color: ${COLORS.text};
    border: 1px solid ${COLORS.border};
    &:hover { border-color: ${COLORS.primary}; color: ${COLORS.primary}; }
  `}
`;

/* --- COMPONENT --- */
const UserGuidePageNew = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const location = useLocation();
  const [activeSlug, setActiveSlug] = useState(null);
  const articleRefs = useRef({});

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.map((cat) => ({
      ...cat,
      articles: cat.articles.filter((a) => {
        const haystack = (
          a.title +
          ' ' +
          a.summary +
          ' ' +
          a.steps.join(' ')
        ).toLowerCase();
        return haystack.includes(q);
      }),
    })).filter((cat) => cat.articles.length > 0);
  }, [query]);

  useEffect(() => {
    const hash = location.hash?.replace('#', '');
    if (!hash) return;
    const node = articleRefs.current[hash];
    if (node) {
      setTimeout(() => {
        node.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSlug(hash);
      }, 100);
    }
  }, [location.hash]);

  const totalArticles = filteredCategories.reduce(
    (sum, c) => sum + c.articles.length,
    0
  );

  return (
    <Page>
      <HeaderClean />
      <Main>
        <Hero>
          <HeroInner>
            <HeroEyebrow>{t('userGuide.hero.title')}</HeroEyebrow>
            <HeroTitle>Trouvez la réponse à toutes vos questions</HeroTitle>
            <HeroSubtitle>
              {t('userGuide.hero.subtitle')} Guides pas à pas, résolution de
              problèmes et intégrations.
            </HeroSubtitle>
            <SearchWrap>
              <Search size={18} />
              <SearchInput
                type="search"
                placeholder={t('userGuide.search') || 'Rechercher un article…'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Rechercher dans le guide"
              />
            </SearchWrap>
          </HeroInner>
        </Hero>

        <Body>
          <Sidebar>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <SidebarGroup key={cat.id}>
                  <SidebarGroupTitle>
                    <Icon size={14} />
                    {cat.title}
                  </SidebarGroupTitle>
                  {cat.articles.map((a) => (
                    <SidebarLink
                      key={a.slug}
                      href={`#${a.slug}`}
                      className={activeSlug === a.slug ? 'active' : ''}
                      onClick={() => setActiveSlug(a.slug)}
                    >
                      {a.title}
                      <ChevronRight size={14} />
                    </SidebarLink>
                  ))}
                </SidebarGroup>
              );
            })}
          </Sidebar>

          <Content>
            {totalArticles === 0 ? (
              <EmptyState>
                Aucun article ne correspond à « {query} ». Essayez d'autres
                mots-clés ou <Link to="/contact">contactez-nous</Link>.
              </EmptyState>
            ) : (
              filteredCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <CategoryBlock key={cat.id} id={cat.id}>
                    <CategoryHeader>
                      <CategoryIconWrap>
                        <Icon size={22} />
                      </CategoryIconWrap>
                      <CategoryTitle>{cat.title}</CategoryTitle>
                    </CategoryHeader>
                    {cat.articles.map((a) => (
                      <Article
                        key={a.slug}
                        id={a.slug}
                        ref={(el) => (articleRefs.current[a.slug] = el)}
                        className={activeSlug === a.slug ? 'highlighted' : ''}
                      >
                        <ArticleTitle>{a.title}</ArticleTitle>
                        <ArticleSummary>{a.summary}</ArticleSummary>
                        <StepsList>
                          {a.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </StepsList>
                        {a.cta && (
                          <ArticleCTA to={a.cta.to}>
                            {a.cta.label}
                            <ExternalLink size={14} />
                          </ArticleCTA>
                        )}
                      </Article>
                    ))}
                  </CategoryBlock>
                );
              })
            )}

            <HelpCta>
              <h3>Vous ne trouvez pas la réponse ?</h3>
              <p>
                L'équipe support répond à toutes les questions sous 24 h
                ouvrées. La communauté est aussi active pour l'entraide entre
                utilisateurs.
              </p>
              <HelpCtaActions>
                <HelpButton to="/contact" $variant="primary">
                  <Mail size={16} />
                  Contacter le support
                </HelpButton>
                <HelpButton to="/community">Rejoindre la communauté</HelpButton>
                <HelpButton to="/status">
                  <ArrowUp size={16} />
                  Statut plateforme
                </HelpButton>
              </HelpCtaActions>
            </HelpCta>
          </Content>
        </Body>
      </Main>
      <FooterClean />
    </Page>
  );
};

export default UserGuidePageNew;
