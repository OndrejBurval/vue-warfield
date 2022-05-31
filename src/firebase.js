import { initializeApp } from "firebase/app";
import { getFirestore,collection,getDocs, addDoc,doc, deleteDoc, query, where, orderBy, serverTimestamp, updateDoc, getDoc, onSnapshot } from 'firebase/firestore'
import { ref, onUnmounted } from "vue";

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

const teamCollection = collection(db,"teams")
const questCollection = collection(db, "quest")





export const filterTeamCollection = async (teamArray) => {
    const questSnapshot = await getDocs(query(teamCollection));
    const data = []
    questSnapshot.forEach(e => {
        teamArray.forEach(team => {
            if (team === e.id) data.push({ id: e.id, ...e.data() })
        })
    })
    return data
}

export const addQuest = async (questTitle, questDesc, teamId, questStatus,marker) => {
    const questSnapshot = await getDocs(query(questCollection, where("teamId", "==", teamId)));
    let orderId = 1
    questSnapshot.forEach(e => {
        if (e.data().order >= orderId) orderId = e.data().order + 1
    })

    await addDoc(questCollection, {
        order: orderId,
        title: questTitle,
        desc: questDesc,
        teamId: teamId,
        marker: marker,
        status: parseInt(questStatus),
        created: serverTimestamp()
    });
}

export const updateQuest = async ( questId, questTitle, questDesc, status, marker ) => {
    const docRef = doc(db, "quest", questId)
    await updateDoc(docRef, {
        title: questTitle,
        desc: questDesc,
        status: parseInt(status),
        marker: marker
    })
}

const updateQuestOrders = async ( teamId, oldOrder, newOrder ) => {
    const questSnapshot = await getDocs(query(questCollection, where("teamId", "==", teamId)));

    questSnapshot.forEach(e => {
        console.log(e.data())
        if (e.data().order === oldOrder) updateOrder(e.id, newOrder)
        if (e.data().order === newOrder) updateOrder(e.id, oldOrder)
    })
}

export const moveQuestOrderUp = async ( teamId, order ) => {
    let newOrder = order - 1;
    updateQuestOrders( teamId, order, newOrder )
}

export const moveQuestOrderDown = async ( teamId, order ) => {
    let newOrder = order + 1;
    updateQuestOrders( teamId, order, newOrder )
}

export const updateQuestStatus = async ( questId, status ) => {
    const docRef = doc(db, "quest", questId)
    await updateDoc(docRef, {
        status: parseInt(status)
    })
}

export const deleteQuest = async ( questId ) => {
    const docRef = doc(db, "quest", questId)
    const docData = await getDoc(docRef);

    await deleteDoc(docRef);
    await reAlignQuestOrder(docData.data().teamId)
}


export const addTeam = async (teamName, teamColor) => {
    await addDoc(teamCollection, {
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
    const questSnapshot = await getDocs(query(questCollection, where("teamId","==", teamId)));
    questSnapshot.forEach(e => {
        deleteDoc(e.ref)
    })
}

export const deleteAllQuests = async () => {
    const questSnapshot = await getDocs(query(questCollection));
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
    const questSnapshot = await getDocs(query(questCollection, where("teamId", "==", team)));
    let orderId = 1
    questSnapshot.forEach((e, index) => {
        if (e.data().order !== (index + 1)) updateOrder(e.id, orderId)
        orderId++;
    })
}


// LIVE DATA
const snapshotLoop = (query) => {
    const liveData = ref([])
    const unsubscribe = onSnapshot(query, (snapshot) => {
        liveData.value = []
        snapshot.forEach((e) => {
            liveData.value.push({ id: e.id, ...e.data() })
        })
    })
    onUnmounted(unsubscribe)
    return liveData
}

export const getTeamsCollection = async () => {
    const q = query(teamCollection, orderBy("created", "asc"))
    return snapshotLoop(q)
}

export const getTeamQuestCollection = async (teamId) => {
    const q = query(questCollection, where("teamId","==", teamId), orderBy("order"))
    return snapshotLoop(q)
}

export const getQuestCollection = async () => {
    const q = query(questCollection, orderBy("order", "asc"))
    return snapshotLoop(q)
}

