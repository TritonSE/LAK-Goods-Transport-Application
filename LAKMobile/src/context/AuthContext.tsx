import { initializeApp } from '@firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
  PhoneAuthProvider,
  ApplicationVerifier,
  signInWithCredential,
  linkWithCredential,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
  updatePassword,
} from 'firebase/auth';

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
async function pinToPass(pin: string) {
  pin = 'abc' + pin;
  return await encrypt(pin);
}

export function getFirebaseConfig() {
  return {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };
}

const firebaseConfig = getFirebaseConfig();

export type AuthState = {
  user: User | null;
  error: Error | null;
  clearError: () => void;
  login: (phone: string, pin: string) => Promise<User | null>;
  logout: () => Promise<void>;
  doesUserExist: (phone: string) => Promise<boolean>;
  registerUser: (
    firstName: string,
    lastName: string,
    phone: string,
    location: string,
    pin: string
  ) => Promise<User | null>;
  sendSMSCode: (phone: string, recaptcha: ApplicationVerifier, mode: string) => Promise<string>;
  verifyPhone: (verificationId: string, verificationCode: string) => Promise<boolean>;
  updatePIN: (newPassword: string) => Promise<boolean>;
};

const init: AuthState = {
  user: null,
  error: null,
  clearError: () => undefined,
  login: () => new Promise<User | null>(() => null),
  logout: () => new Promise<void>(() => undefined),
  doesUserExist: () => new Promise<boolean>(() => false),
  registerUser: () => new Promise<User | null>(() => undefined),
  sendSMSCode: () => new Promise<string>(() => ''),
  verifyPhone: () => new Promise<boolean>(() => false),
  updatePIN: () => new Promise<boolean>(() => false),
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

  const setFirebaseError = (e: FirebaseError | Error): void => {
    if (e instanceof FirebaseError) {
      // We map firebase errors to more useful errors for us to display to the user.
      if (e.code === 'auth/wrong-password') setError(new Error('Password is incorrect'));
      else if (e.code === 'auth/user-not-found') setError(new Error('User does not exist'));
      else if (e.code === 'auth/invalid-email') setError(new Error('Invalid email provided'));
      else if (e.code === 'auth/invalid-password')
        setError(new Error('Password must be more than 6 characters in length'));
      else if (e.code === 'auth/email-already-in-use')
        setError(new Error('This user already has an account. Please log in'));
      else if (e.code === 'auth/invalid-verification-id')
        setError(new Error('Invalid verification code.'));
      else setError(new Error(e.message));
    } else {
      setError(e);
      return;
    }
  };

  const app = useMemo(() => {
    return initializeApp(firebaseConfig);
  }, []);

  const login = async (phone: string, pin: string): Promise<User | null> => {
    try {
      const email = phoneNumberToEmail(phone);
      const password = await pinToPass(pin);
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (e) {
      setFirebaseError(e as FirebaseError | Error);
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
      setFirebaseError(e as FirebaseError | Error);
      setUser(null);
    }
  };

  /**
   * @returns If the phone number already exists as an account.
   */
  const doesUserExist = async (phone: string): Promise<boolean> => {
    try {
      const auth = getAuth(app);
      const signInMethods = await fetchSignInMethodsForEmail(auth, phoneNumberToEmail(phone));
      return signInMethods.length !== 0;
    } catch (e) {
      setFirebaseError(e as FirebaseError | Error);
      return false;
    }
  };

  /**
   * Sends an SMS code for to verify the correct phone number.
   * @param phone The phone number (in +.... format)
   * @param recaptcha The recaptchaVerifier set up on the screen.
   * @returns A verificationId to be used with verifyPhone.
   */
  const sendSMSCode = async (
    phone: string,
    recaptcha: ApplicationVerifier,
    mode: string
  ): Promise<string> => {
    try {
      const auth = getAuth(app);

      const userTaken = await doesUserExist(phoneNumberToEmail(phone));

      // if the user is trying to reset their password but no identifier (email) exists in firebase, throw error
      if (mode === 'reset' && !userTaken) {
        setError(new Error('Phone number is not registered!'));
        return '';
      }
      // given the phone number, verify recaptcha was successful (stored in verificationId)
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(phone, recaptcha);
      return verificationId;
    } catch (e) {
      console.error(e);
      setFirebaseError(e as FirebaseError | Error);
      return '';
    }
  };

  /**
   * Verifies an SMS code sent to a phone. On success, signs in the user.
   * @param verificationId Returned from sendSMSCode()
   * @param verificationCode Code inputted by the user.
   * @returns If the phone verification succeeded.
   */
  const verifyPhone = async (
    verificationId: string,
    verificationCode: string
  ): Promise<boolean> => {
    try {
      const auth = getAuth(app);

      // create a new credential given the OTP code and recaptcha verificationId
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);

      // create a new identifier in firebase with the phone number
      const userCredential = await signInWithCredential(auth, credential);

      // set the user to the newly signed in user credential
      setUser(userCredential.user);
      return true;
    } catch (e) {
      console.error(e);
      setFirebaseError(e as FirebaseError | Error);
      return false;
    }
  };

  /**
   * After the phone number is verified via verifyPhone, we create a PIN sign in for the user
   * from their sign-up form data. This is called an EmailAuthProvider since PhoneAuth doesn't allow
   * for password sign ins.
   * @returns The user after the accounts are successfully linked, or null.
   */
  const registerUser = async (
    firstName: string,
    lastName: string,
    phone: string,
    location: string,
    pin: string
  ): Promise<User | null> => {
    // if the user is signed in and verified via their phone, their identifier should be created
    // in firebase and be attached to auth.currentUser
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      // Return false if the user isn't currently signed in (verified via phone).
      return null;
    }
    try {
      // Create a new email credential given the user's email and password
      const email = phoneNumberToEmail(phone);
      const password = await pinToPass(pin);
      const credential = await EmailAuthProvider.credential(email, password);

      // reload to refresh the user token
      // then link the newly created email identifier with the existing phone number identifier within Firebase
      await user.reload();

      const combinedCredential = await linkWithCredential(user, credential);

      const updatedUser = combinedCredential.user;

      // Next, we make a call to save this user in our backend.
      await createNewUser({
        userId: updatedUser.uid,
        firstName,
        lastName,
        phone,
        location,
      });
      setUser(updatedUser);

      return user;
    } catch (e) {
      setFirebaseError(e as FirebaseError | Error);
      setUser(null);
      return null;
    }
  };

  const updatePIN = async (newPin: string): Promise<boolean> => {
    const auth = getAuth(app);
    const newPassword = await pinToPass(newPin);

    const user = auth.currentUser;

    if (!user) {
      return false;
    }
    try {
      await updatePassword(user, newPassword);
      return true;
    } catch (e) {
      setFirebaseError(e as FirebaseError | Error);
      return false;
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
        doesUserExist,
        registerUser,
        sendSMSCode,
        verifyPhone,
        updatePIN,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
