import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser, getIdTokenResult } from "firebase/auth";
import { ref, computed } from "vue";
import { auth } from "./firebase.js";

const user = ref()
user.value = auth.currentUser


export const createUser = (email, password) => {
    const warfieldEmail = email + "@warfield.cz"

    createUserWithEmailAndPassword(auth, warfieldEmail, password)
        .then((data) => {
            console.log(data.user)
            //window.location.replace("/");
        })
        .catch((error) => {
            console.log(error.message)
        })
}

export const logOut = () => {
    signOut(auth)
        .then(() => {
            window.location.replace("/");
        })
        .catch((e) => {
            console.log(e)
        })
}

export const logIn = (email, password) => {
    const warfieldEmail = email + "@warfield.cz"

    signInWithEmailAndPassword(auth, warfieldEmail, password)
        .then(() => {
           //window.location.replace("/");
        })
        .catch((error) => {
            console.log(error.message)
        })
}


onAuthStateChanged(auth, (loggedUser) => {
    if(loggedUser) {
        getIdTokenResult(loggedUser, true)
            .then(idTokenResult => {
                loggedUser.admin = idTokenResult.claims.admin
                user.value = loggedUser
            })
    }
})

export const testUser = () => {
    onAuthStateChanged(auth, (loggedUser) => {
        if(loggedUser) {
            getIdTokenResult(loggedUser)
                .then(idTokenResult => {
                    loggedUser.admin = idTokenResult.claims.admin
                })
            return loggedUser
        } else {
            return undefined
        }
    })
}

export const getUser = () => user
