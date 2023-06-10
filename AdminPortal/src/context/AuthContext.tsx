import { initializeApp } from '@firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  deleteUser,
  updateProfile,
} from 'firebase/auth';

import * as admin from 'firebase-admin';

import firebaseConfig from '../../firebase-config.json';
import React, { createContext, useMemo, useState } from 'react';
import { FirebaseError } from '@firebase/util';

export type AuthState = {
  user: User | null;
  error: Error | null;
  clearError: () => void;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<User | null>;
  removeUser: () => {};
};

const init: AuthState = {
  user: null,
  error: null,
  clearError: () => undefined,
  login: () => {
    return new Promise<User | null>(() => null);
  },
  logout: () => {
    return new Promise<void>(() => undefined);
  },
  signup: () => {
    return new Promise<User | null>(() => undefined);
  },
  removeUser: () => {
    return new Promise<User | null>(() => null);
  },
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
    if (e.code === 'auth/wrong-password')
      setError(new Error('Password is incorrect'));
    else if (e.code === 'auth/user-not-found')
      setError(new Error('User does not exist'));
    else if (e.code === 'auth/invalid-email')
      setError(new Error('Invalid email provided'));
    else if (e.code === 'auth/invalid-password')
      setError(new Error('Password must be more than 6 characters in length'));
    else if (e.code === 'auth/email-already-in-use')
      setError(new Error('This user already has an account. Please log in'));
    else setError(new Error(e.message));
  };

  const app = useMemo(() => {
    return initializeApp(firebaseConfig);
  }, []);

  const login = async (
    userEmail: string,
    userPassword: string
  ): Promise<User | null> => {
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      setUser(userCredential.user);
      return userCredential.user;
    } catch (e) {
      if (e instanceof FirebaseError) {
        setFirebaseError(e);
      } else {
        setError(e as Error);
      }
      setUser(null);
      return null;
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
    userEmail: string,
    userPassword: string
  ): Promise<User | null> => {
    try {
      // First, let's try to save the user credentials in Firebase.
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      const user = userCredential.user;
      setUser(user);
      updateProfile(user, {
        displayName: firstName + ' ' + lastName,
      });
      return userCredential.user;
    } catch (e) {
      if (e instanceof FirebaseError) {
        setFirebaseError(e);
      } else {
        setError(e as Error);
      }
      setUser(null);
      return null;
    }
  };

  const removeUser = async () => {
    try {
      if (user) {
        deleteUser(user);
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        setFirebaseError(e);
      } else {
        setError(e as Error);
      }
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, error, clearError, login, logout, signup, removeUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
