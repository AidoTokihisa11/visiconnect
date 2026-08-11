import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConvexReactClient } from 'convex/react';
import { ClerkProvider, useAuth } from '@clerk/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { HelmetProvider } from 'react-helmet-async';

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL || import.meta.env.VITE_PUBLIC_CONVEX_URL;
const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.trim();

const root = ReactDOM.createRoot(document.getElementById('root'));

if (!CONVEX_URL || !CLERK_KEY) {
  root.render(
    <div style={{ padding: '50px', fontFamily: 'system-ui, sans-serif', textAlign: 'center' }}>
      <h1 style={{ color: '#ef4444' }}>Configuration requise ⚠️</h1>
      <p>
        Votre application as été déployée mais il manque des variables d'environnement sur Vercel.
      </p>
      <p>
        Veuillez ajouter <b>VITE_CONVEX_URL</b> et <b>VITE_CLERK_PUBLISHABLE_KEY</b> dans Vercel
        (Settings &gt; Environment Variables) puis refaire un déploiement.
      </p>
    </div>
  );
} else {
  const convex = new ConvexReactClient(CONVEX_URL);
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <ClerkProvider publishableKey={CLERK_KEY}>
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <App />
          </ConvexProviderWithClerk>
        </ClerkProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
}
