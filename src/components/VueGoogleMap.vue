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
        :key="index"
        v-for="(quest, index) in quests"
        :id="quest.teamId"
        :position="quest.marker"
        :clickable="true"
        :draggable="false"
        @click="getClickedQuest(quest.id)"
        :data-marker="quest.id"
        :icon="{
          url: iconURL,
          scaledSize: {width: 30, height: 30},
        }"
    >
      <BIconTrash />
      <GMapInfoWindow
          :closeclick="true"
          :opened="openedMarkerID === quest.id"
          @closeclick="openMarker(null)"
      >
        <h3> {{ quest.title }} </h3>
      </GMapInfoWindow>

    </GMapMarker>

  </GMapMap>
</template>

<script>
import { getQuestCollection } from "../firebase.js";
import { toggleQuestSidebar, getQuestSidebar,getWatchMapClick, toggleWatchMapClick } from "../global/stateManagement.js";
import { setMapClickedCoords } from "../global/storage.js";
import { computed } from "vue";

export default {
  name: "VueGoogleMap",
  async setup () {
    const quests = await getQuestCollection()
    const watchClick = getWatchMapClick()
    const questSidebar = getQuestSidebar()



    const watchClickClass = computed(() => {
      return watchClick.value ? 'watching' : 'nowatch'
    })

    return { quests, toggleQuestSidebar, questSidebar, watchClick, toggleWatchMapClick, watchClickClass }
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
    openMarker(id) {
      this.openedMarkerID = id
      if (!this.questSidebar) toggleQuestSidebar()
    },
    returnClickedCoords(event) {
      if (this.watchClick){
        setMapClickedCoords(event.latLng.lat(), event.latLng.lng())
        toggleWatchMapClick()
      }
    },
    getClickedQuest(id){
      this.openMarker(id)
      //const associatedQuest = document.querySelector("[data-quest="+ JSON.stringify(id) +"]")
      //associatedQuest.classList.contains("focused") ? associatedQuest.classList.remove("focused") : associatedQuest.classList.add("focused")
    }
  },
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