<template>

  <GMapMap
      :center="{ lat: currPos.lat, lng: currPos.lng }"
      :zoom="13"
      :options="options"
      class="map"
  >
    <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m"
        :clickable="true"
        :draggable="true"
    />
  </GMapMap>
</template>

<script>
import { useGeolocation } from "../useGeolocation.js";
import { computed } from "vue";

export default {
  name: "VueGoogleMap",
  setup () {
    const { coords } = useGeolocation()
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude
    }))

    return { currPos }
  },
  data() {
    return {
      options: {
       // mapId: "c8dda2d6001c33e7",
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      },
      markers: [
        {
          lat: 49.93, lng: 15.68
        },
        {
          lat: 49.94591816864361, lng: 15.668190985067698
        }
      ]
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
</style>