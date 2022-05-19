<script setup>
  import NavBar from "./components/NavBar.vue";
  import VueGoogleMap from "./components/VueGoogleMap.vue";
  import ButtonTeam from "./components/buttons/ButtonFormTeam.vue";

</script>

<template>
  <NavBar />

  <Suspense>
    <VueGoogleMap />
  </Suspense>
</template>

<style lang="scss">
@import './assets/base.css';
@import "./assets/transitions.css";
@import "./assets/keyframes.css";



</style>
