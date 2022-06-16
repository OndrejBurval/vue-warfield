import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser, getIdTokenResult } from "firebase/auth";
import { ref } from "vue";
import { auth } from "./firebase.js";
import { getTeamByEmail } from "./firestore.js";

const user = ref(auth.currentUser)
const userData = ref({})


export const createUser = (email, password) => {
    const warfieldEmail = email + "@warfield.cz"

    createUserWithEmailAndPassword(auth, warfieldEmail, password)
        .then((data) => {
            console.log(data.user)
            window.location.replace("/");
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
           window.location.replace("/");
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
            .then(async () => {
                if (!loggedUser.admin) userData.value = await getTeamByEmail(loggedUser.email)
                if (loggedUser.admin) userData.value = { name: "Warfield", color: "#ffffff", id: "admin" }
                if (userData.value.length === 0) userData.value = false
            })
    }
})

export const getUser = () => user
export const getUserData = () => userData
