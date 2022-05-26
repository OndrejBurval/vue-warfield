import { ref } from "vue";

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
