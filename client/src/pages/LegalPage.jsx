import React from 'react';
import styled from 'styled-components';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import SEO from '../components/SEO';

const Page = styled.main`
  min-height: 100vh;
  background: #ffffff;
  color: #0f172a;
`;

const Container = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 4rem 1.5rem 6rem;
`;

const H1 = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
`;

const Lead = styled.p`
  color: #64748b;
  margin: 0 0 3rem;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.75rem;
    color: #0f172a;
  }

  p,
  li {
    color: #334155;
    line-height: 1.65;
  }

  ul {
    padding-left: 1.25rem;
    margin: 0.5rem 0;
  }

  a {
    color: #2563eb;
    text-decoration: underline;
  }
`;

export default function LegalPage() {
  return (
    <>
      <SEO
        title="Mentions légales"
        description="Mentions légales de VisioConnect : éditeur, hébergeur, contact et informations légales."
        path="/legal"
      />
      <HeaderClean />
      <Page id="main-content">
        <Container>
          <H1>Mentions légales</H1>
          <Lead>Dernière mise à jour&nbsp;: {new Date().toLocaleDateString('fr-FR')}.</Lead>

          <Section>
            <h2>Éditeur du site</h2>
            <p>
              VisioConnect est un projet indépendant édité par&nbsp;: <strong>Théo Garces</strong>.
              <br />
              Contact&nbsp;:{' '}
              <a href="mailto:theo.garces.aido@gmail.com">theo.garces.aido@gmail.com</a>
            </p>
          </Section>

          <Section>
            <h2>Directeur de la publication</h2>
            <p>Théo Garces.</p>
          </Section>

          <Section>
            <h2>Hébergement</h2>
            <p>
              Le site est hébergé par <strong>Vercel Inc.</strong>
              <br />
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
              <br />
              Site&nbsp;:{' '}
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                https://vercel.com
              </a>
            </p>
          </Section>

          <Section>
            <h2>Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu (textes, graphismes, logos, code source) est protégé par le
              droit d'auteur. Toute reproduction, représentation ou diffusion sans autorisation
              écrite est interdite.
            </p>
          </Section>

          <Section>
            <h2>Données personnelles</h2>
            <p>
              La politique de traitement des données personnelles est décrite dans notre{' '}
              <a href="/privacy">Politique de confidentialité</a>. Vous pouvez exercer vos droits
              (accès, rectification, suppression, portabilité, opposition) en écrivant à l'adresse
              indiquée ci-dessus.
            </p>
          </Section>

          <Section>
            <h2>Cookies</h2>
            <p>
              L'usage des cookies est détaillé sur la page <a href="/cookies">Cookies</a>. Vous
              pouvez modifier vos préférences à tout moment via le bandeau de consentement.
            </p>
          </Section>

          <Section>
            <h2>Signalement de contenu ou de faille de sécurité</h2>
            <p>
              Pour tout signalement de contenu illicite ou de vulnérabilité, contactez-nous à
              l'adresse ci-dessus avec l'objet <em>« Signalement »</em>.
            </p>
          </Section>

          <Section>
            <h2>Droit applicable</h2>
            <p>
              Les présentes mentions sont soumises au droit français. Tout litige relatif à leur
              interprétation ou exécution relève de la compétence des tribunaux français.
            </p>
          </Section>
        </Container>
      </Page>
      <FooterClean />
    </>
  );
}
