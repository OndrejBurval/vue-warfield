import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs, onSnapshot, orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where,
    GeoPoint
} from "firebase/firestore";
import { onUnmounted, ref } from "vue";
import { db } from "./firebase.js";

const teamCollection = collection(db,"teams")
const questCollection = collection(db, "quest")
const placesCollection = collection(db, "places")
const mapSettingsCollection = collection(db, "map")





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

export const addQuest = async (questTitle, questDesc, teamId, questStatus, marker, iconPath) => {
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
        iconPath: iconPath,
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
    await updateQuestOrders( teamId, order, newOrder )
}

export const moveQuestOrderDown = async ( teamId, order ) => {
    let newOrder = order + 1;
    await updateQuestOrders( teamId, order, newOrder )
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


export const addTeam = async (teamName, teamColor, userName, teamScenary) => {
    await addDoc(teamCollection, {
        name: teamName,
        color: teamColor,
        userName: userName,
        scenary: teamScenary,
        created: serverTimestamp()
    });
}

export const updateTeam = async ( teamId, teamName, teamColor, teamScenary ) => {
    const docRef = doc(db, "teams", teamId)
    await updateDoc(docRef, {
        name: teamName,
        scenary: teamScenary,
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

export const getMapSettings = async () => {
    const docRef = doc(db, "map", "settings")
    return await getDoc(docRef)
}

export const getPlaceByID = async (placeID) => {
    const docRef = doc(db, "places", placeID)
    return await getDoc(docRef)
}

export const getTeamByID = async (teamID) => {
    const docRef = doc(db, "teams", teamID)
    const data = await getDoc(docRef)
    return data.data()
}

export const updateMapLocation = async ( placeID ) => {
    const place = await getPlaceByID(placeID)
    const docRef = doc(db, "map", "settings")
    await updateDoc(docRef, {
        placeID: placeID,
        placeName: place.data().name,
        center: new GeoPoint(place.data().coords._lat, place.data().coords._long)
    })
}

export const updateMapZoom = async ( zoomValue ) => {
    const docRef = doc(db, "map", "settings")
    await updateDoc(docRef, {
        zoom: zoomValue
    })
}

export const updateMapType = async ( mapType ) => {
    const docRef = doc(db, "map", "settings")
    await updateDoc(docRef, {
        type: mapType
    })
}

export const deleteLocation = async ( locationID ) => {
    await deleteDoc(doc(db, "places", locationID));
}


export const addPlace = async (placeName, lat, long) => {
    await addDoc(placesCollection, {
        name: placeName,
        coords: new GeoPoint(lat, long),
        created: serverTimestamp()
    });
}

export const updatePlace = async ( placeID, placeName, lat, long ) => {
    const docRef = doc(db, "places", placeID)
    await updateDoc(docRef, {
        name: placeName,
        coords: new GeoPoint(lat, long)
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

export const updateTeamScenary = async ( teamID, teamScenary ) => {
    const docRef = doc(db, "teams", teamID)
    await updateDoc(docRef, {
        scenary: teamScenary
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

export const getPlacesCollection = async () => {
    const q = query(placesCollection, orderBy("created", "asc"))
    return snapshotLoop(q)
}


export const getTeamByEmail = async (email) => {
    const questSnapshot = await getDocs(query(teamCollection, where("userName","==", email)));
    let data = []
    questSnapshot.forEach(e => {
            data = ({ id: e.id, ...e.data() })
    })
    return data
}
