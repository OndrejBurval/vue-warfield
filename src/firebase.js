import { initializeApp } from "firebase/app";
import { getFirestore,collection,getDocs, addDoc,doc, deleteDoc, query, where, orderBy, serverTimestamp, updateDoc, onSnapshot, getDoc } from 'firebase/firestore'
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

export const getTeamQuestCollection = async (teamId) => {
    const questSnapshot = await getDocs(query(collection(db, "quest"), where("teamId","==", teamId)), orderBy("created", "asc"));
    const data = []
    questSnapshot.forEach(e => {
        data.push({ id: e.id, ...e.data() })
    })
    return data
}

export const addQuest = async (questTitle, questDesc, teamId) => {
    await addDoc(collection(db, "quest"), {
        title: questTitle,
        desc: questDesc,
        teamId: teamId,
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


export const getTeam = async (id) => {
    const docRef = doc(db, "teams", id);
    const document = await getDoc(docRef);
    return document.data()
}

export const addTeam = async (teamName, teamColor) => {
    await addDoc(collection(db, "teams"), {
        name: teamName,
        color: teamColor,
        created: serverTimestamp()
    });
}

export const updateTeam = async ( teamId, teamName, teamColor ) => {
    const docRef = doc(db, "teams", teamId)
    await updateDoc(docRef, {
        name: teamName,
        color: teamColor
    })
}

export const deleteTeam = async ( teamId ) => {
    await deleteDoc(doc(db, "teams", teamId));
}

export const deleteTeamQuests = async (teamId) => {
    console.log("Delete")
    const questSnapshot = await getDocs(query(collection(db, "quest"), where("teamId","==", teamId)));
    questSnapshot.forEach(e => {
        deleteDoc(e.ref)
    })
}
