<template>

  <div class="overview">
    <section>
      <router-link to="/">
        <div class="box">
          <BIconHouse />
          <h2>
            Hlavní stránka
          </h2>
        </div>
      </router-link>


      <div class="box" @click="teamsToggle">
        <BIconPeople />
        <h2>
          Týmy
        </h2>
      </div>

    </section>


    <div @click="toggleMapSettings" :class="mapSettingsToggle ? 'toggler active' : 'toggler'">
      <h2>Nastavení mapy</h2>
      <BIconCaretDownFill />
      <hr>
    </div>

    <section v-if="mapSettingsToggle">
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
        <div class="overlay" @click="toggleType"></div>
        <BIconMap />
        <h2>
          Typ mapy
        </h2>
        <span v-if="typeToggle">
          <FormMapType :db_type="mapSettings.data().type" />
        </span>
      </div>

      <div class="box">
        <div class="overlay" @click="toggleZoom"></div>
        <BIconZoomIn />
        <h2>
          Přiblížení mapy
        </h2>
        <span>
          <FormMapZoom v-if="zoomToggle" :db-zoom="mapSettings.data().zoom"/>
        </span>
      </div>
    </section>






  </div>

</template>

<script>
import { getMapSettings } from "../../firebase/firestore.js";
import { ref, computed } from "vue";

import FormMapZoom from "../forms/FormMapZoom.vue";
import FormMapType from "../forms/FormMapType.vue";
import VueGoogleMap from "../VueGoogleMap.vue";


export default {
  name: "AdminOverview",
  async setup(){
    const mapSettings = await getMapSettings()
    const zoomToggle = ref(false)
    const typeToggle = ref(false)
    const mapSettingsToggle = ref(false)

    const toggleMapSettings = () => mapSettingsToggle.value = !mapSettingsToggle.value
    const toggleZoom = () => zoomToggle.value = !zoomToggle.value
    const toggleType = () => typeToggle.value = !typeToggle.value


    return {
      mapSettingsToggle,
      mapSettings,
      zoomToggle,
      typeToggle,
      toggleMapSettings,
      toggleZoom,
      toggleType
    }
  },
  props: ["lokaceToggle", "teamsToggle"],
  components: {
    FormMapZoom,
    FormMapType,
    VueGoogleMap
  }
}


</script>

<style lang="scss" scoped>

  section{
    display: grid;
    grid-auto-rows: minmax(200px, max-content);
    gap: 20px;
    margin-block: 40px;

    @media (min-width: 768px){
      grid-template-columns: repeat(3 ,1fr);
    }
  }


  .overlay{
    content: "";
    position: absolute;
    background: lightcoral;
    inset: 0;
    z-index: 10;
    opacity: 0;
  }

  .box{
    display: grid;
    place-items: center;

    &:hover{
      box-shadow: #bebebe 0 0 20px;
    }

    a &{
      height: 100% !important;
    }

    span{
      width: 100%;
      text-align: center;
      font-weight: 400;
      color: #2a2f34;
      position: relative;
      z-index: 9999;
    }
  }

  .toggler{
    cursor: pointer;
    transition: .3s;
    display: grid;
    grid-template-columns: repeat(2, auto);
    width: 100%;

    hr{
      grid-column: 1 / 3;
    }

    svg{
      place-self: end;
    }

    &.active{
      color: #d33e3e;

      svg{
        transform: rotate(180deg);
      }
    }
  }


</style>