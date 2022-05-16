<template>
  <section>
    <!--
    <div>
       Lat: {{ currPos.lat.toFixed(2) }}, Lng: {{ currPos.lng.toFixed(2) }}
    </div>
    -->

    <div ref="mapDiv" style="width: 100%; height: 100vh;" />
  </section>
</template>

<script>
/* eslint-disable no-undef */
import { useGeolocation } from "../useGeolocation.js";
import {computed, onMounted, onUnmounted, ref} from "vue";
import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_MAPS_API_KEY = "AIzaSyAaNCpTWH00VcHh2gTKM3-7ny8aYGxk8g4"



export default {
  name: "GoogleMap",
  setup() {

    const { coords } = useGeolocation()
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude
    }))
    const home = { lat: 49.93, lng: 15.68 };

    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: "weekly"
    })
    const mapDiv = ref(null)
    let map = ref(null)
    onMounted(async () => {
      await loader.load()
      map.value = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 13
      })

      const marker = new google.maps.Marker({
        position: home,
        map: map,
      });
    })

    return { currPos, mapDiv }
  }
}
</script>

<style lang="scss" scoped>
  section{
    position: fixed;
    inset: 0;
    z-index: -1;
  }
</style>