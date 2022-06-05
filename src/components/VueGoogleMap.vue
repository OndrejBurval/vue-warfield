<template>
  <GMapMap
      :center="{ lat: centerCoords.lat, lng: centerCoords.lng }"
      :zoom="mapZoom"
      :options="options"
      class="map"
      :class="watchClickClass"
      map-type-id="terrain"
      @click="returnClickedCoords"
  >

      <GMapMarker
          v-for="(quest, index) in quests"
          :key="index"
          :position="quest.marker"
          :clickable="true"
          :draggable="false"
          :zoomOnClick="true"
          @click="passQuestIdToStorage(quest.id)"
          :icon="{
            url: quest.iconPath,
            scaledSize: {width: iconSize, height: iconSize},
            labelOrigin: {x: 50, y: 50}
          }"
      >
        <GMapInfoWindow
            @click="openMarker(null)"
            :opened="openedMarkerID === quest.id"
        >
          <div>
            <h3>
              {{ quest.order }}. {{ quest.title }}
              {{ quest.color }}
            </h3>
            <p>
              {{ quest.desc }}
            </p>
          </div>
        </GMapInfoWindow>
      </GMapMarker>
    <!--
    :icon="{
      url: iconURL,
      scaledSize: {width: iconSize, height: iconSize},
      labelOrigin: {x: 16, y: -10}
    }"
     !-->

    <g-map-polygon :paths="paths"></g-map-polygon>

  </GMapMap>
</template>

<script>
import { getQuestCollection } from "../firebase/firestore.js";
import { toggleQuestSidebar, getQuestSidebar,getWatchMapClick, toggleWatchMapClick } from "../global/stateManagement.js";
import { setMapClickedCoords, setSelectedQuest, getMapCenterCoords, getMapZoom } from "../global/storage.js";
import { computed, ref } from "vue";

const home = { lat: 49.93716915792965, lng: 15.688771198236168 }
const kruhak = { lat: 49.946833391071756, lng: 15.685028885943728 }
const test = { lat: 49.94216535454903, lng: 15.676689140289623 }

export default {
  name: "VueGoogleMap",
  async setup () {
    // STORAGE
    const centerCoords = getMapCenterCoords()

    // STATE MANAGEMENT
    const watchClick = getWatchMapClick()
    const questSidebar = getQuestSidebar()

    // SETINGS
    const mapZoom = getMapZoom()
    const iconSize = ref(38)
    const options = ref({
      mapId: "c8dda2d6001c33e7",
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    })

    // VARIABLES
    const quests = await getQuestCollection()
    const openedMarkerID = ref(null)


    const openMarker = (val) => {
      openedMarkerID.value = val
    }

    const returnClickedCoords = (event) => {
      if (watchClick.value){
        setMapClickedCoords(event.latLng.lat(), event.latLng.lng())
        toggleWatchMapClick()
      }
    }

    const passQuestIdToStorage = (id) => {
      openMarker(id)

      if (questSidebar.value) {
        setSelectedQuest(id)
      } else{
        toggleQuestSidebar()
        setTimeout(() => {
          setSelectedQuest(id)
        }, 1100);
      }
    }


    // Pokud sledujeme click tak změní index aby bylo na vrchu
    const watchClickClass = computed(() => {
      return watchClick.value ? 'watching' : 'nowatch'
    })

    return {
      quests,
      options,
      iconSize,
      centerCoords,
      mapZoom,
      openedMarkerID,
      watchClickClass,
      returnClickedCoords,
      openMarker,
      passQuestIdToStorage
    }
  },
  data() {
    return {
      paths: [home, test, kruhak],
      iconURL: 'src/assets/icons/warning.svg'
    }
  }
}
</script>

<style lang="scss" scoped>
.map{
  position: fixed;
  z-index: -1;
  inset: 0;
}


.selected{
  transform: scale(2);
  display: none !important;
}

.watching{
  z-index: 99999999;
}

</style>