<template>
  <GMapMap
      :center="{ lat: centerCoords.lat, lng: centerCoords.lng }"
      :zoom="mapZoom"
      :options="options"
      class="map"
      :class="watchClickClass"
      :map-type-id="mapType"
      @click="returnClickedCoords"
  >

    <section v-for="(quest, index) in quests">

      <GMapMarker
          v-if="quest.teamId == userData.id || user.admin"
          :key="index"
          :position="quest.marker"
          :clickable="true"
          :draggable="false"
          title="marker"
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
              <span class="badge bg-black" :data-status="quest.status"> {{ displayStatus(quest.status) }} </span>
            </h3>
            <p>
              {{ quest.desc }}
            </p>
          </div>
        </GMapInfoWindow>
      </GMapMarker>

    </section>

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
import { getQuestCollection, getTeamQuestCollection } from "../firebase/firestore.js";
import { toggleQuestSidebar, getQuestSidebar,getWatchMapClick, toggleWatchMapClick } from "../global/stateManagement.js";
import { setMapClickedCoords, setSelectedQuest, getMapCenterCoords, getMapZoom, getMapType } from "../global/storage.js";
import { getUser, getUserData } from "../firebase/auth.js";
import { computed, ref, onMounted } from "vue";

const home = { lat: 49.93716915792965, lng: 15.688771198236168 }
const kruhak = { lat: 49.946833391071756, lng: 15.685028885943728 }
const test = { lat: 49.94216535454903, lng: 15.676689140289623 }

export default {
  name: "VueGoogleMap",
  async setup () {

    onMounted(() => {
      setTimeout( () => {
        const markers = document.querySelectorAll("[title='marker']")
        console.log(markers)

        markers.forEach(marker => {
          marker.addEventListener("click", () => {
            const activeMarker = document.querySelectorAll(".activeMarker")
            console.log(activeMarker)
            if (activeMarker) {
              activeMarker.forEach(e => {
                e.classList.remove("activeMarker")
                e.style.background = "rgba(52, 168, 83, 0)"
              })
            }

            if (marker.classList.contains("activeMarker")){
              marker.classList.remove("activeMarker")
              marker.style.background = "rgba(52, 168, 83, 0)"

            } else{
              marker.classList.add("activeMarker")
              marker.style.background = "rgba(52, 168, 83, 0.5)"
            }

          })
          marker.style.borderRadius = "50%"
        })
      }, 1500 )
    })

    // STORAGE
    const centerCoords = getMapCenterCoords()

    // STATE MANAGEMENT
    const watchClick = getWatchMapClick()
    const questSidebar = getQuestSidebar()
    const user = getUser()
    const userData = getUserData()

    // SETINGS
    const mapZoom = getMapZoom()
    const mapType = getMapType()
    const iconSize = ref(38)
    const options = ref({
      //mapId: "c8dda2d6001c33e7",
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    })

    // VARIABLES
    const quests = await getQuestCollection()
    const openedMarkerID = ref()


    const openMarker = (val) => {
      openedMarkerID.value = val
    }

    const returnClickedCoords = (event) => {
      if (watchClick.value){
        setMapClickedCoords(event.latLng.lat(), event.latLng.lng())
        toggleWatchMapClick()
      }
    }

    const displayStatus = (status) => {
      switch (status){
        case 0:
          return "Neutrální";
        case 1:
          return "Čekající";
        case 2:
          return "Aktivní";
        case 3:
          return "Dokončený";
        case 4:
          return "Selhal";
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
      user,
      userData,
      quests,
      options,
      iconSize,
      centerCoords,
      mapZoom,
      mapType,
      openedMarkerID,
      watchClickClass,
      returnClickedCoords,
      openMarker,
      passQuestIdToStorage,
      displayStatus
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
  //position: fixed;
  z-index: 0;
  //inset: 0;
}


.selected{
  transform: scale(2);
  display: none !important;
}

.watching{
  z-index: 99999999 !important;
  position: fixed !important;
  inset: 0 !important;
  margin: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  cursor: crosshair !important;
  overflow: hidden !important;
  opacity: 1 !important;
}

[data-status="0"]{ background: #565656 !important; } // Neutrální
[data-status="1"]{ background: #ef9c1e !important; } // Čekající
[data-status="2"]{ background: #299cc9 !important; } // Aktivní
[data-status="3"]{ background: #1dbb31 !important; } // Dokončený
[data-status="4"]{ background: #e73f3f !important; } // Selhal

</style>