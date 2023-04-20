import { initializeApp } from '@firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  signInWithCredential,
  PhoneAuthCredential,
  Auth,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-config.json';
import React, { createContext, useMemo, useState } from 'react';
import * as crypto from 'expo-crypto';
import { FirebaseError } from '@firebase/util';
import { createNewUser } from '../api';

/**
 * Converts a phone number to an email to be used as a username for Firebase.
 */
function phoneNumberToEmail(phone: string) {
  phone = phone + '';
  return 'a' + phone.replace(/\D/g, '') + '@gmail.com';
}

async function encrypt(text: string) {
  const key = await crypto.digestStringAsync(crypto.CryptoDigestAlgorithm.SHA256, text);
  return key;
}

/**
 * Converts our PIN to a valid firebase password.
 */
export async function pinToPass(pin: string) {
  pin = 'abc' + pin;
  return await encrypt(pin);
}

export type AuthState = {
  user: User | null;
  error: Error | null;
  auth: Auth | null;
  clearError: () => void;
  login: (phone: string, pin: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (
    firstName: string,
    lastName: string,
    phone: string,
    location: string,
    pin: string
  ) => Promise<void>;
  signInUserOTP: (credential: PhoneAuthCredential) => Promise<void>;
};

const init: AuthState = {
  user: null,
  auth: null,
  error: null,
  clearError: () => undefined,
  login: () => {
    return new Promise<void>(() => undefined);
  },
  logout: () => {
    return new Promise<void>(() => undefined);
  },
  signup: () => {
    return new Promise<void>(() => undefined);
  },
  signInUserOTP: () => {
    return new Promise<void>(()=> undefined);
  }
};

export const AuthContext = createContext<AuthState>(init);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const clearError = () => {
    setError(null);
  };

  const setFirebaseError = (e: FirebaseError): void => {
    // We map firebase errors to more useful errors for us to display to the user.
    if (e.code === 'auth/wrong-password') setError(new Error('Password is incorrect'));
    else if (e.code === 'auth/user-not-found') setError(new Error('User does not exist'));
    else if (e.code === 'auth/invalid-email') setError(new Error('Invalid email provided'));
    else if (e.code === 'auth/invalid-password')
      setError(new Error('Password must be more than 6 characters in length'));
    else if (e.code === 'auth/email-already-in-use')
      setError(new Error('This user already has an account. Please log in'));
    else setError(new Error(e.message));
  };

  const app = useMemo(() => {
    return initializeApp(firebaseConfig);
  }, []);

  const auth = useMemo(() => {
    return getAuth(app);
  }, [])

  const login = async (phone: string, pin: string): Promise<void> => {
    try {
      const email = phoneNumberToEmail(phone);
      const password = await pinToPass(pin);
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (e) {
      if (e instanceof FirebaseError) {
        setFirebaseError(e);
      } else {
        setError(e as Error);
      }
      setUser(null);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      setUser(null);
      setError(null);
    } catch (e) {
      setError(e as Error);
      setUser(null);
    }
  };

  const signup = async (
    firstName: string,
    lastName: string,
    phone: string,
    location: string,
    pin: string
  ): Promise<void> => {
    try {
      // First, let's try to save the user credentials in Firebase.
      const email = phoneNumberToEmail(phone);
      const password = await pinToPass(pin);
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Next, we make a call to save this user in our backend.
      await createNewUser({
        userId: user.uid,
        firstName,
        lastName,
        phone,
        location,
      });
      setUser(user);
    } catch (e) {
      if (e instanceof FirebaseError) {
        setFirebaseError(e);
      } else {
        setError(e as Error);
      }
      setUser(null);
    }
  };


  const signInUserOTP = async (credential: PhoneAuthCredential): Promise<void> => {
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithCredential(auth, credential); 
      const user = userCredential.user;
      setUser(user);
      console.log('WITHIN AUTHCONTEXT: user', user);
    } catch (e) {
      console.log('ERROR', e);
      if (e instanceof FirebaseError) {
        setFirebaseError(e);
      } else {
        setError(e as Error);
      }
      setUser(null);
    }
  };


  return (
    <AuthContext.Provider value={{ auth, user, error, clearError, login, logout, signup, signInUserOTP }}>
      {children}
    </AuthContext.Provider>
  );
};
