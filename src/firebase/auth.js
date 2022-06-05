import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";

const auth = getAuth()
const user = ref()
const isLoggedIn = ref()

user ? isLoggedIn.value = true : isLoggedIn.value = false

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
            //window.location.replace("/login");
        })
        .catch((e) => {
            console.log(e)
        })
}

export const logIn = (email, password) => {
    const warfieldEmail = email + "@warfield.cz"

    signInWithEmailAndPassword(auth, warfieldEmail, password)
        .then(() => {
           // window.location.replace("/");
        })
        .catch((error) => {
            console.log(error.message)
        })
}

onAuthStateChanged(auth, (newUser) => {
    if (newUser){
        user.value = newUser
    }
})

export const getUser = () => user
export const getIsLoggedIn = () => isLoggedIn