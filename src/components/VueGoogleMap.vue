<template>


  <GMapMap
      :center="{ lat: 49.9373139637294, lng: 15.688086035434784 }"
      :zoom="13"
      :options="options"
      class="map"
      :class="watchClickClass"
      @click="returnClickedCoords"
  >
    <GMapMarker
        v-for="(quest, index) in quests"
        :id="quest.id"
        :position="quest.marker"
        @click="passQuestId(quest.id)"
        :icon="{
          url: iconURL,
          scaledSize: {width: iconSize, height: iconSize},
        }"
     />

  </GMapMap>
</template>

<script>
import { getQuestCollection } from "../firebase.js";
import { toggleQuestSidebar, getQuestSidebar,getWatchMapClick, toggleWatchMapClick } from "../global/stateManagement.js";
import { setMapClickedCoords, setSelectedQuest } from "../global/storage.js";
import { computed, ref, watch } from "vue";

export default {
  name: "VueGoogleMap",
  async setup () {
    const quests = await getQuestCollection()
    const watchClick = getWatchMapClick()
    const questSidebar = getQuestSidebar()
    const markerFocused = ref(false);

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

    return { quests, toggleQuestSidebar, questSidebar, watchClick, toggleWatchMapClick, watchClickClass, setSelectedQuest, iconSize, markerFocused, passQuestId }
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
      iconURL: 'src/assets/arrow-down.svg'
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