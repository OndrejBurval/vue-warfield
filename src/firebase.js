import { initializeApp } from "firebase/app";
import { getFirestore,collection,getDocs, addDoc,doc, deleteDoc, query, where, orderBy, serverTimestamp, updateDoc, getDoc, limit } from 'firebase/firestore'

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
    const questRef = collection(db, "quest");
    const questSnapshot = await getDocs(query(questRef, orderBy("order", "asc")));
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

export const filterTeamCollection = async (teamArray) => {
    const questSnapshot = await getDocs(query(collection(db, "teams")));
    const data = []
    questSnapshot.forEach(e => {
        teamArray.forEach(team => {
            if (team === e.id) data.push({ id: e.id, ...e.data() })
        })
    })
    return data
}

export const addQuest = async (questTitle, questDesc, teamId, marker) => {
    const questSnapshot = await getDocs(query(collection(db, "quest"), where("teamId", "==", teamId)));
    let orderId = 1
    questSnapshot.forEach(e => {
        if (e.data().order >= orderId) orderId = e.data().order + 1
    })

    await addDoc(collection(db, "quest"), {
        order: orderId,
        title: questTitle,
        desc: questDesc,
        teamId: teamId,
        marker: marker,
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
    const docRef = doc(db, "quest", questId)
    const docData = await getDoc(docRef);

    await deleteDoc(docRef);
    await reAlignQuestOrder(docData.data().teamId)
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
    const questSnapshot = await getDocs(query(collection(db, "quest"), where("teamId","==", teamId)));
    questSnapshot.forEach(e => {
        deleteDoc(e.ref)
    })
}

export const deleteAllQuests = async () => {
    const questSnapshot = await getDocs(query(collection(db, "quest")));
    questSnapshot.forEach(e => {
        deleteDoc(e.ref)
    })
}


const updateOrder = async (questId, orderValue) => {
    const docRef = doc(db, "quest", questId)
    await updateDoc(docRef, {
        order: orderValue
    })
}


const reAlignQuestOrder = async (team) => {
    const questSnapshot = await getDocs(query(collection(db, "quest"), where("teamId", "==", team)));
    let orderId = 1
    questSnapshot.forEach((e, index) => {
        if (e.data().order !== (index + 1)) updateOrder(e.id, orderId)
        orderId++;
    })
}
