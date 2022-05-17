<script setup>
  import NavBar from "./components/NavBar.vue";
  import ListQuest from "./components/ListQuests.vue";
  import VueGoogleMap from "./components/VueGoogleMap.vue";

</script>

<template>
  <NavBar />

  <VueGoogleMap />

  <Suspense>
    <template #default>
      <ListQuest />
    </template>
    <template #fallback>
      Loading ...
    </template>
  </Suspense>
</template>

<style lang="scss">
@import './assets/base.css';
@import "./assets/transitions.css";



</style>
