import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { firebaseConfig } from '../config/firebaseConfig';

// Inisialisasi Firebase App dengan proyek catatankeuangan-c7a98
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Provider Google Auth
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

/**
 * Login Cepat dengan Akun Google ke Firebase catatankeuangan-c7a98
 */
export async function signInWithGoogleFirebase(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

/**
 * Logout dari Firebase
 */
export async function signOutFirebase(): Promise<void> {
  await signOut(auth);
}

/**
 * Listener status autentikasi Firebase
 */
export function subscribeToAuthChanges(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
