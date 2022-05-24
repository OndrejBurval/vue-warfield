import { ref } from "vue";

const mapClickedCoords = ref({ lat: 0, lng: 0 })

export const getMapClickedCoords = () => mapClickedCoords
export const setMapClickedCoords = (lat, lng) => mapClickedCoords.value = { lat: lat, lng: lng }
export const resetMapClickedCoords = () => mapClickedCoords.value = { lat: 0, lng: 0 }

