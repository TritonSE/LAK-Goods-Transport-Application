import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";

export async function createAccount(phone, password) {
    let email = phoneNumberToEmail(phone);
    password = pinToPass(password);
    console.log(password);
    const auth = getAuth();
    return await createUserWithEmailAndPassword(auth, email, password)
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

// npm install crypto
import crypto from "crypto";
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