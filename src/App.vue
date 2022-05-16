<script setup>
  import Admin from "./components/Admin.vue";
  import QuestList from "./components/QuestList.vue";
  import GoogleMap from "./components/GoogleMap.vue";
  import VueGoogleMap from "./components/VueGoogleMap.vue";

</script>

<template>

  <VueGoogleMap />

  <Suspense>
    <template #default>
      <QuestList />
    </template>
    <template #fallback>
      Loading ...
    </template>
  </Suspense>
  <Admin />
</template>

<style lang="scss">
@import './assets/base.css';
@import "./assets/transitions.css";



</style>
