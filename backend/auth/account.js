import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";

export async function createAccount(phone, password) {
    let email = phoneNumberToEmail(phone);
    password = pinToPass(password);
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

function pinToPass(pin) {
    return "abc" + pin;
}