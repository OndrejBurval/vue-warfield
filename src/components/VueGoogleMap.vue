<template>
  <GMapMap
      :center="{ lat: centerCoords.lat, lng: centerCoords.lng }"
      :zoom="mapZoom"
      :options="options"
      class="map"
      :class="watchClickClass"
      @click="returnClickedCoords"
  >
    <GMapMarker
        v-for="quest in quests"
        title="tooot"
        :id="quest.id"
        :clickable="false"
        :position="quest.marker"
        @click="passQuestId(quest.id)"
        :icon="{
          url: iconURL,
          scaledSize: {width: iconSize, height: iconSize},
          labelOrigin: {x: 16, y: -10}
        }"
     />

  </GMapMap>
</template>

<script>
import { getQuestCollection } from "../firebase.js";
import { toggleQuestSidebar, getQuestSidebar,getWatchMapClick, toggleWatchMapClick } from "../global/stateManagement.js";
import { setMapClickedCoords, setSelectedQuest, getMapCenterCoords, getMapZoom } from "../global/storage.js";
import { computed, ref } from "vue";

export default {
  name: "VueGoogleMap",
  async setup () {
    const quests = await getQuestCollection()
    const watchClick = getWatchMapClick()
    const questSidebar = getQuestSidebar()
    const markerFocused = ref(false);
    const centerCoords = getMapCenterCoords()
    const mapZoom = getMapZoom()

    const passQuestId = (id) => {
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
      setSelectedQuest, iconSize, markerFocused, passQuestId, centerCoords, mapZoom
    }
  },
  data() {
    return {
      openedMarkerID: null,
      options: {
        mapId: "c8dda2d6001c33e7",
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      },
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