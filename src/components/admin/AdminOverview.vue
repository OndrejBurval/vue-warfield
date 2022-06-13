<template>
  <div class="overview container">

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

</template>

<script>
import { getMapSettings } from "../../firebase/firestore.js";


export default {
  name: "AdminOverview",
  async setup(){
    const mapSettings = await getMapSettings()


    return {
      mapSettings
    }
  },
  props: ["lokaceToggle"]
}


</script>

<style lang="scss" scoped>

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
    min-height: 200px;
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