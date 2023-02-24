import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut, updatePassword, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import crypto from "crypto";
import {initAdmin} from "../index.js"

/**
 * Creates a new account with the given phone number and PIN (password). 
 * @returns The user if the account creation was successful, or an error.
 */
export async function createAccount(phone, password) {
    let email = phoneNumberToEmail(phone);
    password = pinToPass(password);
    const auth = getAuth();
    return await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            userCredential.user.phoneNumber = phone;
            return userCredential.user;
        })
        .catch((error) => {
            return {
               errorCode: error.code,
               errorMessage: error.message
            };
        });
}

/**
 * Attempts to sign in the user with the given phone number and PIN (password).
 * @returns The user if the sign in was successful, or an error.
 */
export async function signIn(phone, password) {
    let email = phoneNumberToEmail(phone);
    password = pinToPass(password);
    console.log(password);
    const auth = getAuth();
    return await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((error) => {
            return {
                errorCode: error.code,
                errorMessage: error.message
            };
        });
}

/**
 * Logs out of the current user.
 * @returns If the user was successfully logged out.
 */
export async function logOut() {
    const auth = getAuth();
    return await signOut(auth)
        .then(() => {
            return true;
        })
        .catch((error) => {
            return {
                errorCode: error.code,
                errorMessage: error.message
            };
        });
}

/**
 * Changes the current user's password to a password with the given PIN
 * @returns If the password was successfully changed.
 */
export async function changePassword(pin) {
    const auth = getAuth();
    let user = auth.currentUser;
    if (!user)
        return false;
    let pass = pinToPass(pin);
    return await updatePassword(user, pass).then(() => {
        return true;
    }, (error) => {
        return {
            errorCode: error.code,
            errorMessage: error.message
        };
    });
}

/**
 * Converts a phone number to an email to be used as a username for Firebase.
 */
function phoneNumberToEmail(phone) {
    phone = phone + "";
    return "a" + phone.replace(/\D/g,'') + "@gmail.com";
}

function encrypt(text) {
    let key = crypto.createCipher('aes-128-cbc', "Laakta");
    let str = key.update(text, 'utf8', 'hex');
    return str + key.final('hex');
}

function decrypt(crypt) {
    let key = crypto.createDecipher('aes-128-cbc', "Laakta");
    let str = key.update(crypt, 'utf8', 'hex');
    return str + key.final('hex');
}

/**
 * Converts our PIN to a valid firebase password.
 */
function pinToPass(pin) {
    pin = "abc" + pin;
    return encrypt(pin);
}

/**
 * Verifies user through Recaptcha, feeds into sendOTP
 * @param phone Phone number to send one time password to
 * @param buttonID HTML/JS ID of the button for Recaptcha
 */
function verifyRecaptchaForOTP(phone, buttonID) {
    const auth = getAuth();
    return window.recaptchaVerifier = new RecaptchaVerifier(buttonID, {
        'size': 'invisible',
        'callback': () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            return sendOTP(phone);
        }
    }, auth);
}

/**
 * Sends a one-time-password to the given phone number to sign in with.
 * @param phone Phone number to send the one-time-password to 
 * @returns If the SMS process finishes with no errors.
 */
export async function sendOTP(phone) {
    const auth = getAuth();
    const adminAuth = initAdmin().auth();
    // Allows for recaptcha bypassing
    auth.settings.appVerificationDisabledForTesting = true;
    return await signInWithPhoneNumber(adminAuth, phone)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            return true;
            // ...
        }).catch((error) => {
            // Error; SMS not sent
            // ...
            console.log(error);
            return false;
        });
}

/**
 * Attempts to sign in the user with the inputted one-time-password.
 * @param code The one-time-password given to the user
 * @returns If the user signed in successfully.
 */
export async function confirmOTP(code) {
    return await confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        // ...
        return true;
    }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        return false;
    });
}