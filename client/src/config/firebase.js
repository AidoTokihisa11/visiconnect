// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  // Remplacez par vos vraies clés Firebase
  apiKey: "AIzaSyBvOyisuRiQKlfTpuwMrMrVWRL6FChvFAo",
  authDomain: "visio-project-demo.firebaseapp.com", 
  projectId: "visio-project-demo",
  storageBucket: "visio-project-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Configuration des providers
googleProvider.addScope('email');
googleProvider.addScope('profile');

githubProvider.addScope('user:email');
githubProvider.addScope('read:user');

export default app;