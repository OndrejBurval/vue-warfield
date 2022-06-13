<template>
  <div class="wrapper">
    <nav class="navbar navbar-dark bg-dark px-5">

      <router-link to="/">
        <div class="link">
          <BIconHouse />
          Hlavní stránka
        </div>
      </router-link>


      <div class="link"  @click="toggleOffAll" :class="!location ? 'active' : ''">
        <BIconWrenchAdjustableCircle />
        Přehled nastavení
      </div>

      <div class="link" @click="locationToggle" :class="location ? 'active' : ''">
        <BIconGeo />
        Lokace
      </div>


      <div class="link">
        <BIconMap />

          Typ mapy
      </div>

    </nav>

    <div class="content">
      <Suspense>
        <AdminOverview v-if="!showOverview" :lokace-toggle="locationToggle" />
      </Suspense>
      <Suspense>
        <ListPlaces v-if="location" />
      </Suspense>

    </div>


  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import ListPlaces from "../components/list/ListPlaces.vue";
import AdminOverview from "../components/admin/AdminOverview.vue";


const location = ref(false)


const locationToggle = () => {
  location.value = !location.value
}

const toggleOffAll = () => {
  location.value = false
}

const showOverview = computed(() => {
  return !!location.value
})



</script>

<style lang="scss" scoped>

  a{
    cursor: pointer;
  }

  svg, path{
    transition: 0 !important;
  }

  .link{
    cursor: pointer;
    display: grid;
    place-items: center;
    color: white;


    &:hover{
      color: #d33e3e !important;
    }
  }

  .active{
    color: #d33e3e !important;
  }


</style>