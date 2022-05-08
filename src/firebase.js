import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, addDoc, doc, deleteDoc, query, where } from 'firebase/firestore'
import { ref, onUnmounted} from "vue";

const firebaseConfig = {
    apiKey: "AIzaSyAN84ywv3l5nlrntQ6KFaHOYJBh2KBXEW0",
    authDomain: "vue-warfield.firebaseapp.com",
    projectId: "vue-warfield",
    storageBucket: "vue-warfield.appspot.com",
    messagingSenderId: "908790075731",
    appId: "1:908790075731:web:caa4e7ecf0efe2bbba51a6"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const questSnapshot = await getDocs(collection(db, "quest"));


// PŘIDÁ JEDEN DOKUMENT
export const addDocument = async () => {
    try {
        await addDoc(collection(db, "quest"), {
            first: "Alan",
            middle: "Mathison",
            last: "Turing",
            born: 1912
        });

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// LOGNE KOLEKCI DOKUMENTŮ
const logFirebaseCollectionData = () =>{
    questSnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data())
    });
}

// ODEBERE JEDEN DOKUMENT
const deleteDocument = async (collection, id) => {
    try {
        await deleteDoc(doc(db, collection, id));
        console.log("Document with ID: ", id, " deleted!");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// JEDEN DOKUMENT
const getDocument = async (collection, id) =>{
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document nalezen:", docSnap.data());
        return docSnap.data()
    } else {
        console.log("Dokument neexistuje");
        return undefined
    }
}
//const mojeData = await getDocument("quest", "test")
//console.log(mojeData.titulek)


// VÍCE DOKUMENTŮ S FILTREM
const getFilteredDocuments = async (coll, param, stringOperator, value) => {
    const q = query(collection(db, coll), where(param, stringOperator, value));
    return await getDocs(q)
}
//const filteredArray = await getFilteredDocuments("quest", "filter", "==", true)
//filteredArray.forEach((element) => {
//    console.log(element.data())
//})