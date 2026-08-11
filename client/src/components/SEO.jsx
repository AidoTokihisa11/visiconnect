import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://www.visioconnect.pro').replace(
  /\/$/,
  ''
);
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;
const DEFAULT_TITLE = 'VisioConnect — Visioconférence sécurisée';
const DEFAULT_DESC =
  'VisioConnect : plateforme de visioconférence sécurisée P2P, chiffrement de bout en bout, tableau blanc collaboratif et enregistrements.';

export default function SEO({
  title,
  description = DEFAULT_DESC,
  path = typeof window !== 'undefined' ? window.location.pathname : '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  keywords,
  jsonLd,
}) {
  const fullTitle = title ? `${title} · VisioConnect` : DEFAULT_TITLE;
  const canonical = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}

      <meta property="og:site_name" content="VisioConnect" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="fr_FR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
