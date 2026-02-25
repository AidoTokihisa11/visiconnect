import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app;
let auth;
let googleProvider;
let githubProvider;

try {
  // Only initialize if we have config
  if (firebaseConfig.apiKey) {
      if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApp();
      }
      auth = getAuth(app);
      googleProvider = new GoogleAuthProvider();
      githubProvider = new GithubAuthProvider();
  } else {
      console.warn("Firebase config is missing from environment variables.");
      // Provide dummy objects to prevent import errors in components
      auth = { currentUser: null }; 
      googleProvider = {};
      githubProvider = {};
  }
} catch (error) {
    console.warn("Firebase initialization failed:", error);
    auth = { currentUser: null };
    googleProvider = {};
    githubProvider = {};
}

export { auth, googleProvider, githubProvider };
export default app;