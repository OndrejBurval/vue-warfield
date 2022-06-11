<template>
  <div class="wrapper">
    <nav class="navbar navbar-dark bg-dark px-5">

      <router-link to="/">
        <div class="link">
          <BIconHouse />

              Hlavní stránka
        </div>
      </router-link>


      <div class="link"  @click="toggleOffAll" :class="!lokace ? 'active' : ''">
        <BIconWrenchAdjustableCircle />
        Přehled nastavení
      </div>

      <div class="link" @click="lokaceToggle" :class="lokace ? 'active' : ''">
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
        <ListPlaces v-if="lokace" />
      </Suspense>

      <div class="overview container" v-if="!lokace">

        <router-link to="/">
          <div class="box">
            <BIconHouse />

              <h2>
                Hlavní stránka
              </h2>
          </div>
        </router-link>

        <div class="box" @click="lokaceToggle">
          <BIconGeo />

          <h2>
            Lokace
          </h2>
          <span>
            {{ mapSettings.data().placeName }}
          </span>
        </div>
        <div class="box">
          <BIconMap />
          <h2>
            Typ mapy
          </h2>
          <span>
            {{ mapSettings.data().type }}
          </span>
        </div>
      </div>

    </div>


  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { getMapSettings } from "../firebase/firestore.js";

import ListPlaces from "../components/list/ListPlaces.vue";

const lokace = ref(false)
const mapSettings = await getMapSettings()


const lokaceToggle = () => {
  lokace.value = !lokace.value
}

const toggleOffAll = () => {
  lokace.value = false
}



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

  .overview{
    display: grid;
    grid-template-columns: repeat(3 ,1fr);
    grid-auto-rows: min-content;
    gap: 20px;
    margin-block: 40px;
  }

  .box{
    width: 100%;
    position: relative;
    min-height: 150px;
    background: #e4f1f1;
    border-radius: 15px;
    box-shadow: #efefef 0 0 10px;
    cursor: pointer;
    transition: .3s;
    padding: 20px;
    display: grid;
    place-items: center;

    &:hover{
      box-shadow: #bebebe 0 0 20px;
    }
  }
</style>