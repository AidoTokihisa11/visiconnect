import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './tolgeeSetup';
import { TolgeeProvider } from "@tolgee/react";
import tolgee from './tolgeeSetup';
import { ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.trim();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <TolgeeProvider tolgee={tolgee} fallback="Chargement...">
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <App />
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </TolgeeProvider>
  </React.StrictMode>
);