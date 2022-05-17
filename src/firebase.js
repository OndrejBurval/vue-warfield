import { initializeApp } from "firebase/app";
import { getFirestore,collection,getDocs, addDoc,doc, deleteDoc, query, where, orderBy, serverTimestamp, updateDoc, onSnapshot } from 'firebase/firestore'
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
export const db = getFirestore(firebaseApp);



export const getQuestCollection = async () => {
    const questSnapshot = await getDocs(query(collection(db, "quest"), orderBy("created", "asc")));
    const data = []
    questSnapshot.forEach(e => {
        data.push({ id: e.id, ...e.data() })
    })
    return data
}

export const addQuest = async (questTitle, questDesc, team) => {
    await addDoc(collection(db, "quest"), {
        title: questTitle,
        desc: questDesc,
        team: team,
        created: serverTimestamp()
    });
}

export const updateQuest = async ( questId, questTitle, questDesc ) => {
    const docRef = doc(db, "quest", questId)
    await updateDoc(docRef, {
        title: questTitle,
        desc: questDesc
    })
}

export const deleteQuest = async ( questId ) => {
    await deleteDoc(doc(db, "quest", questId));
}


export const getTeamsCollection = async () => {
    const questSnapshot = await getDocs(query(collection(db, "teams"), orderBy("created", "asc")));
    const data = []
    questSnapshot.forEach(e => {
        data.push({ id: e.id, ...e.data() })
    })
    return data
}