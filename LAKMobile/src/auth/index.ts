import firebaseConfig from './firebase-config.json';
import { initializeApp } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut, updatePassword, User } from "firebase/auth";

import * as crypto from "expo-crypto";
import { createNewUser } from '../api';


const initFirebase = () => {
    const app = initializeApp(firebaseConfig);
    return app;
}

/**
 * Converts a phone number to an email to be used as a username for Firebase.
 */
function phoneNumberToEmail(phone: string) {
    phone = phone + "";
    return "a" + phone.replace(/\D/g,'') + "@gmail.com";
}

async function encrypt(text: string) {
    const key = await crypto.digestStringAsync(crypto.CryptoDigestAlgorithm.SHA256, text);
    return key
}

/**
 * Converts our PIN to a valid firebase password.
 */
async function pinToPass(pin: string) {
    pin = "abc" + pin;
    return await encrypt(pin);
}

/**
 * Creates a new account with the given phone number and PIN (password). 
 * @returns The user if the account creation was successful, or an error.
 */
export async function createAccount(firstName: string, lastName: string, phone: string, location: string, pin: string): Promise<User | null> {
    try {
        // First, let's try to save the user credentials in Firebase.
        const app = initFirebase();
        const email = phoneNumberToEmail(phone);
        const password = await pinToPass(pin);
        const auth = getAuth(app);
        const userCredential =  await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Next, we make a call to save this user in our Mongo backend.
        createNewUser({
            userId: user.uid,
            firstName,
            lastName,
            phone,
            location
        });
        return user;
    } catch (e) {
        // TODO: Throw specific errors (email in use, invalid fields, etc.)
        console.error(e);
        return null;
    }
}

/**
 * Attempts to sign in the user with the given phone number and PIN (password).
 * @returns The user if the sign in was successful, or an error.
 */
export async function signIn(phone: string, pin: string): Promise<User | null> {
    try {
        const app = initFirebase();
        const email = phoneNumberToEmail(phone);
        const password = await pinToPass(pin);
        const auth = getAuth(app);
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return userCredential.user;
    } catch (e) {
        console.error(e);
        return null;
    }
}

/**
 * Logs out of the current user.
 * @returns If the user was successfully logged out.
 */
export async function logOut(): Promise<boolean> {
    try {
        const app = initFirebase();
        const auth = getAuth(app);
        await signOut(auth)
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

/**
 * Changes the current user's password to a password with the given PIN
 * @returns If the password was successfully changed.
 */
export async function changePassword(pin: string): Promise<boolean> {
    try {
        const app = initFirebase();
        const auth = getAuth(app);
        let user = auth.currentUser;
        if (!user) {
            return false;
        }
        let pass = await pinToPass(pin);
        await updatePassword(user, pass)
        return true;
    } catch (e) {
        console.error(e);
        return false;
    } 
}

// /**
//  * Verifies user through Recaptcha, feeds into sendOTP
//  * @param phone Phone number to send one time password to
//  * @param buttonID HTML/JS ID of the button for Recaptcha
//  */
// function verifyRecaptchaForOTP(phone, buttonID) {
//     const auth = getAuth();
//     return window.recaptchaVerifier = new RecaptchaVerifier(buttonID, {
//         'size': 'invisible',
//         'callback': () => {
//             // reCAPTCHA solved, allow signInWithPhoneNumber.
//             return sendOTP(phone);
//         }
//     }, auth);
// }

// /**
//  * Sends a one-time-password to the given phone number to sign in with.
//  * @param phone Phone number to send the one-time-password to 
//  * @returns If the SMS process finishes with no errors.
//  */
// export async function sendOTP(phone) {
//     const auth = getAuth();
//     const adminAuth = initAdmin().auth();
//     // Allows for recaptcha bypassing
//     auth.settings.appVerificationDisabledForTesting = true;
//     return await signInWithPhoneNumber(adminAuth, phone)
//         .then((confirmationResult) => {
//             // SMS sent. Prompt user to type the code from the message, then sign the
//             // user in with confirmationResult.confirm(code).
//             window.confirmationResult = confirmationResult;
//             return true;
//             // ...
//         }).catch((error) => {
//             // Error; SMS not sent
//             // ...
//             console.log(error);
//             return false;
//         });
// }

// /**
//  * Attempts to sign in the user with the inputted one-time-password.
//  * @param code The one-time-password given to the user
//  * @returns If the user signed in successfully.
//  */
// export async function confirmOTP(code) {
//     return await confirmationResult.confirm(code).then((result) => {
//         // User signed in successfully.
//         // ...
//         return true;
//     }).catch((error) => {
//         // User couldn't sign in (bad verification code?)
//         // ...
//         return false;
//     });
// }