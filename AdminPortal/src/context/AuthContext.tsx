import { initializeApp } from '@firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

import firebaseConfig from '../../firebase-config.json';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { FirebaseError } from '@firebase/util';
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';

const AUTH_COOKIE = 'lak-admin-user';
export type AuthState = {
  user: User | null;
  error: Error | null;
  clearError: () => void;
  login: (email: string, password: string) => Promise<User | Error>;
  logout: () => Promise<void>;
};

const init: AuthState = {
  user: null,
  error: null,
  clearError: () => undefined,
  login: () => {
    return new Promise<User | Error>(() => new Error());
  },
  logout: () => {
    return new Promise<void>(() => undefined);
  },
};

export const AuthContext = createContext<AuthState>(init);

interface Props {
  children: React.ReactNode;
}
export const authCookieSet = (): boolean => {
  return hasCookie(AUTH_COOKIE);
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      if (user === null) {
        const userCookie = getCookie(AUTH_COOKIE) as string;
        const user = JSON.parse(userCookie) as User;
        setUser(user);
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const clearError = () => {
    setError(null);
  };

  const setFirebaseError = (e: FirebaseError): Error => {
    // We map firebase errors to more useful errors for us to display to the user.
    if (e.code === 'auth/wrong-password') {
      setError(new Error('Password is incorrect'));
      return new Error('Password is incorrect');
    } else if (e.code === 'auth/user-not-found') {
      setError(new Error('User does not exist'));
      return new Error('User does not exist');
    } else if (e.code === 'auth/invalid-email') {
      setError(new Error('Invalid email provided'));
      return new Error('Invalid email provided');
    } else if (e.code === 'auth/invalid-password') {
      setError(new Error('Password must be more than 6 characters in length'));
      return new Error('Password must be more than 6 characters in length');
    } else if (e.code === 'auth/email-already-in-use') {
      setError(new Error('This user already has an account. Please log in'));
      return new Error('This user already has an account. Please log in');
    } else {
      setError(new Error(e.message));
      return new Error(e.message);
    }
  };

  const app = useMemo(() => {
    return initializeApp(firebaseConfig);
  }, []);

  const login = async (
    userEmail: string,
    userPassword: string
  ): Promise<User | Error> => {
    try {
      clearError();
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      setUser(userCredential.user);
      setCookie(AUTH_COOKIE, JSON.stringify(userCredential.user));
      return userCredential.user;
    } catch (e) {
      setUser(null);
      if (e instanceof FirebaseError) {
        return setFirebaseError(e);
      } else {
        setError(e as Error);
        return e as Error;
      }
    }
  };

  const logout = async (): Promise<void> => {
    try {
      clearError();
      const auth = getAuth(app);
      await signOut(auth);
      setUser(null);
      deleteCookie(AUTH_COOKIE);
    } catch (e) {
      setError(e as Error);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        clearError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
