import { initializeApp } from '@firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  signInWithCredential,
  PhoneAuthProvider,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-config.json';
import React, { createContext, useMemo, useState, useRef } from 'react';
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
  sendCode: (phoneNumber: string) => Promise<void>;
  verifyCode: (verificationCode: string) => Promise<void>;
  recaptchaVerifier: any;
  verificationId: string | null;
  otpError: string | null;
};

const init: AuthState = {
  user: null,
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
  sendCode: () => {
    return new Promise<void>(() => undefined);
  },
  verifyCode: () => {
    return new Promise<void>(() => undefined);
  },
  recaptchaVerifier: null,
  verificationId: null,
  otpError: null,
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

  // const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationID] = useState('');

  const recaptchaVerifier = useRef<any>(null);

  const [otpError, setOtpError] = useState('');

  // const signInUserOTP = async (credential: PhoneAuthCredential): Promise<void> => {
  //   try {
  //     const auth = getAuth(app);
  //     const userCredential = await signInWithCredential(auth, credential);
  //     const user = userCredential.user;
  //     setUser(user);
  //     console.log('WITHIN AUTHCONTEXT: user', user);
  //   } catch (e) {
  //     console.log('ERROR', e);
  //     if (e instanceof FirebaseError) {
  //       setFirebaseError(e);
  //     } else {
  //       setError(e as Error);
  //     }
  //     setUser(null);
  //   }
  // };

  // initialize phone provider and get verification id from recaptcha
  const sendCode = async (phoneNumber: string) => {
    try {
      const auth = getAuth(app);
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationID(verificationId);
      setOtpError('');
      console.log('Success : Verification code has been sent to your phone');
    } catch (e) {
      console.log('error in handle send verification', e);
      setOtpError('There was an error with your entered mobile number.');
    }
  };

  // get the otp and verify it
  const verifyCode = async (verificationCode: string) => {
    try {
      const auth = getAuth(app);
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      const userCredential = await signInWithCredential(auth, credential);
      setUser(userCredential.user);
      console.log('successfully signed in with credential');
      console.log('User', userCredential.user);
      setVerificationID('');
    } catch (e) {
      console.log('error in handle verify', e);
      setOtpError('There was an error in validating your OTP.');
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
        signup,
        verifyCode,
        sendCode,
        recaptchaVerifier,
        verificationId,
        otpError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
