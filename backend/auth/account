import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut, updatePassword, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import crypto from "crypto"; // npm install crypto
import {initAdmin} from "../index.js"

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

function pinToPass(pin) {
    pin = "abc" + pin;
    return encrypt(pin);
}

/**
 * Verifies user through recaptcha, feeds into sendOTP
 * @param phone number to send OTP to
 * @param buttonID HTML/JS ID of the button for recaptcha
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