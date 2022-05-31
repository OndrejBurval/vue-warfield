<template>
  <GMapMap
      :center="{ lat: centerCoords.lat, lng: centerCoords.lng }"
      :zoom="mapZoom"
      :options="options"
      class="map"
      :class="watchClickClass"
      map-type-id="terrain"
      @click="returnClickedCoords"
      ref="myMapRef"
  >

      <GMapMarker
          v-for="(quest, index) in quests"
          :key="index"
          :position="quest.marker"
          @click="passQuestId(quest.id)"
          :clickable="true"
          :draggable="false"
          :zoomOnClick="true"
      >
        <GMapInfoWindow
            @click="openMarker(null)"
            :opened="openedMarkerID === quest.id"
        >
          <div >
            <span class="badge w-100" :style="'background:'+ quest.color + ';'"> {{ quest.teamId }} </span>
            <h3>{{ quest.order + ". " + quest.title }}  </h3>

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
import { getQuestCollection } from "../firebase.js";
import { toggleQuestSidebar, getQuestSidebar,getWatchMapClick, toggleWatchMapClick } from "../global/stateManagement.js";
import { setMapClickedCoords, setSelectedQuest, getMapCenterCoords, getMapZoom } from "../global/storage.js";
import { computed, ref } from "vue";

const home = { lat: 49.93716915792965, lng: 15.688771198236168 }
const kruhak = { lat: 49.946833391071756, lng: 15.685028885943728 }
const test = { lat: 49.94216535454903, lng: 15.676689140289623 }

export default {
  name: "VueGoogleMap",
  async setup () {
    const quests = await getQuestCollection()
    const watchClick = getWatchMapClick()
    const questSidebar = getQuestSidebar()
    const markerFocused = ref(false);
    const centerCoords = getMapCenterCoords()
    const mapZoom = getMapZoom()
    const openedMarkerID = ref(null)


    const openMarker = (val) => {
      openedMarkerID.value = val
    }

    const passQuestId = (id) => {
      openMarker(id)

      toggleFocus()

      if (questSidebar.value) {
        setSelectedQuest(id)
      } else{
        toggleQuestSidebar()
        setTimeout(() => {
          setSelectedQuest(id)
        }, 1100);
      }
    }

    const toggleFocus = () => {
      markerFocused.value = !markerFocused.value
    }

    const watchClickClass = computed(() => {
      return watchClick.value ? 'watching' : 'nowatch'
    })

    const iconSize = computed(() => {
      return markerFocused.value ? 40 : 30
    })

    return {
      quests, toggleQuestSidebar, questSidebar, watchClick, toggleWatchMapClick, watchClickClass,
      setSelectedQuest, iconSize, markerFocused, passQuestId, centerCoords, mapZoom, openedMarkerID,
      openMarker
    }
  },
  data() {
    return {
      options: {
        mapId: "c8dda2d6001c33e7",
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      },
      markerArray: [
        {
          position: home
        },
        {
          position: kruhak
        }
      ],
      paths: [home, test, kruhak],
      coords: null,
      iconURL: 'src/assets/icons/warning.svg'
    }
  },
  methods: {
    returnClickedCoords(event) {

      if (this.watchClick){
        setMapClickedCoords(event.latLng.lat(), event.latLng.lng())
        toggleWatchMapClick()
      }
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