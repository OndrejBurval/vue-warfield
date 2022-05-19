<template>


  <GMapMap
      :center="{ lat: 49.9373139637294, lng: 15.688086035434784 }"
      :zoom="13"
      :options="options"
      class="map"
      :class="classka"
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
import { useGeolocation } from "../useGeolocation.js";
import { getQuestCollection } from "../firebase.js";
import { computed } from "vue";

export default {
  name: "VueGoogleMap",
  async setup () {
    const quests = await getQuestCollection()

    const { coords } = useGeolocation()
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude
    }))

    return { currPos, quests }
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
  props: {
    getClickCoords: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    openMarker(id) {
      this.openedMarkerID = id
    },
    returnClickedCoords(event) {
      if (this.getClickCoords){
        this.coords = {lat: event.latLng.lat(), lng: event.latLng.lng()}
        localStorage.setItem("lat", this.coords.lat)
        localStorage.setItem("lng", this.coords.lng)
      }
    },
    getClickedQuest(id){
      this.openMarker(id)
      const associatedQuest = document.querySelector("[data-quest="+ JSON.stringify(id) +"]")
      associatedQuest.classList.contains("focused") ? associatedQuest.classList.remove("focused") : associatedQuest.classList.add("focused")
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

</style>