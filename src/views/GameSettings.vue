<template>
  <div class="wrapper">
    <nav class="navbar bg-dark">

      <router-link to="/">
        <div class="link">
          <BIconHouse />
          Hlavní stránka
        </div>
      </router-link>


      <div class="link"  @click="toggleOffAll" :class="!location && !teams ? 'active' : ''">
        <BIconWrenchAdjustableCircle />
        Přehled
      </div>

      <div class="link"  @click="teamsToggle" :class="teams ? 'active' : ''">
        <BIconPeople />
        Týmy
      </div>

      <div class="link" @click="locationToggle" :class="location ? 'active' : ''">
        <BIconGeo />
        Lokace
      </div>
    </nav>

    <div class="content container">

      <VueGoogleMap class="map" />

      <Suspense>
        <template #default>
          <AdminOverview v-if="!showOverview && !teams" :lokace-toggle="locationToggle" :teams-toggle="teamsToggle" />
        </template>
        <template #fallback>
          <BIconArrowClockwise class="loading" />
        </template>
      </Suspense>

      <Suspense>
        <ListPlaces v-if="location" />
      </Suspense>

      <Suspense>
        <ListTeamsBoxes v-if="teams" />
      </Suspense>
    </div>


  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import ListPlaces from "../components/list/ListPlaces.vue";
import ListTeamsBoxes from "../components/list/ListTeamsBoxes.vue";
import AdminOverview from "../components/admin/AdminOverview.vue";
import VueGoogleMap from "../components/VueGoogleMap.vue";


const location = ref(false)
const teams = ref(false)


const locationToggle = () => {
  toggleOffAll()
  location.value = !location.value
}
const teamsToggle = () => {
  toggleOffAll()
  teams.value = !teams.value
}

const toggleOffAll = () => {
  location.value = false
  teams.value = false
}

const showOverview = computed(() => {
  return !!location.value
})



</script>

<style lang="scss" scoped>

  .navbar{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

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
    text-align: center;


    &:hover{
      color: #d33e3e !important;
    }
  }

  .active{
    color: #d33e3e !important;
  }

  .map{
    height: 200px;
    margin-block: 20px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: #efefef 0 0 50px;
    opacity: .7;
    transition: .3s;

    position: relative;
    z-index: 5;

    &:hover{
      opacity: 1;
    }
  }


</style>