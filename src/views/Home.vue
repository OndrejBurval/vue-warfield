<template>
  <NavBar />


  <Suspense>
    <VueGoogleMap />
  </Suspense>
</template>

<script setup>
import NavBar from "../components/NavBar.vue";
import VueGoogleMap from "../components/VueGoogleMap.vue";


</script>

<style scoped>

</style>