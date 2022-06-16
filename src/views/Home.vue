<template>
  <NavBar />


  <div class="main-content">
    <Suspense>
      <VueGoogleMap />
    </Suspense>

  </div>

</template>

<script setup>
import NavBar from "../components/NavBar.vue";
import VueGoogleMap from "../components/VueGoogleMap.vue";


</script>

<style lang="scss" scoped>
.main-content{
  display: grid;
  min-height: calc(100vh - 100px);
}

</style>