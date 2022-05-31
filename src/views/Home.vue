<template>
  <NavBar />

  <!-- <IconsList /> -->

  <Suspense>
    <VueGoogleMap />
  </Suspense>
</template>

<script setup>
import NavBar from "../components/NavBar.vue";
import VueGoogleMap from "../components/VueGoogleMap.vue";
import IconsList from "../components/utils/IconsList.vue";

</script>

<style scoped>

</style>