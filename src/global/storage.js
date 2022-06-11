import { ref } from "vue";
import {getMapSettings} from "../firebase/firestore.js";

const mapSettingsDoc = await getMapSettings()


const mapClickedCoords = ref({ lat: 0, lng: 0 })
export const getMapClickedCoords = () => {
    const clickedCoords = mapClickedCoords;
    resetMapClickedCoords();
    return clickedCoords
}
export const setMapClickedCoords = (lat, lng) => mapClickedCoords.value = { lat: lat, lng: lng }
const resetMapClickedCoords = () => mapClickedCoords.value = { lat: 0, lng: 0 }


const selectedQuest = ref()
export const getSelectedQuest = () => selectedQuest
export const setSelectedQuest = (id) => {
    selectedQuest.value = id
}


const mapCenterDefaultCoords = { lat: mapSettingsDoc.data().center._lat, lng: mapSettingsDoc.data().center._long }
const mapCenterCoords = ref(mapCenterDefaultCoords)
export const resetMapCenterCoords = () => mapCenterCoords.value = mapCenterDefaultCoords
export const getMapCenterCoords = () => mapCenterCoords
export const setMapCenterCoords = (lat, lng) => mapCenterCoords.value = { lat: lat, lng: lng }


const mapZoom = ref(mapSettingsDoc.data().zoom)
export const resetMapZoom = () => resetMapZoom.value = 13
export const getMapZoom = () => mapZoom
export const setMapZoom = (value) => mapZoom.value === value ? mapZoom.value = value : mapZoom.value = value //swapuje hodnoty, aby se procnul zoom mapy


const mapType = ref(mapSettingsDoc.data().type)
export const getMapType = () => mapType
export const setMapType = (type) => mapType.value = type

const selectedIcon = ref("./src/assets/map-icons/caret-down-fill.svg")
export const getSelectedIcon = () => selectedIcon
export const setSelectedIcon = (path) => selectedIcon.value = path