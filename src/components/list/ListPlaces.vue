<template>
  <section class="container py-4">
    <h2> Lokace : {{ mapSettings.data().placeName }} </h2>
    <hr>

    <form class="box-wrapper">
      <div v-for="place in places" :key="place.id" :class="place.id === mapSettings.data().placeID ? 'box active' : 'box'">
        <div class="content" v-if="updatePlaceID !== place.id">
          <label :for="place.id">
            {{ place.name }}
            <BIconPencil class="action" @click="updateToggleOn(place.id)" />
            <BIconTrash class="action" @click="deleteLocation(place.id)" v-if="place.id !== mapSettings.data().placeID" />
            <span>Lat: {{ place.coords._lat }} </span>
            <span>Lng: {{ place.coords._long }} </span>
          </label>

          <input type="radio" :id="place.id" :value="place.id" @click="check" v-model="picked" :checked="mapSettings.data().placeID === place.id" />
        </div>

        <div v-if="updateFormToggle && updatePlaceID === place.id" class="p-3 cursor-default box-content">
          <BIconXCircle  @click="updateToggleOff" class="exit" />
          <FormLocation :toggle-form="updateToggleOff" :active="place.id === mapSettings.data().placeID" :update="true" :name="place.name" :placeID="place.id" :lat="place.coords._lat" :long="place.coords._long" />
        </div>
      </div>

      <div class="box d-flex flex-column justify-content-center align-items-center cursor-default" >
        <div v-if="!addFormToggle" @click="addToggle" class="box-content">
          <h3>
            Přidat lokaci
          </h3>
          <BIconPlusCircle />
        </div>

        <div v-if="addFormToggle" class="p-3 cursor-default box-content">
          <BIconXCircle  @click="addToggle" class="exit" />
          <FormLocation :toggle-form="addToggle" />
        </div>
      </div>

    </form>
  </section>
</template>

<script setup>
import { getPlacesCollection, getMapSettings, updateMapLocation, deleteLocation } from "../../firebase/firestore.js";
import { ref, watch } from "vue";

import FormLocation from "../forms/FormLocation.vue";

const places = await getPlacesCollection()
const mapSettings = await getMapSettings()

const picked = ref()
const addFormToggle = ref(false)
const updateFormToggle = ref(false)

const updatePlaceID = ref()

const checked = ref(false)


const check = () => {
  checked.value = !checked.value
}

const addToggle = () => {
  addFormToggle.value = !addFormToggle.value
}


const updateToggleOn = (id) => {
  updatePlaceID.value = id
  updateFormToggle.value = true
}

const updateToggleOff = () => {
  updatePlaceID.value = null
  updateFormToggle.value = false
}

watch( () => picked.value, async () => {
  await updateMapLocation(picked.value)
  window.location.reload()
});

</script>

<style lang="scss" scoped>
  .box{
    height: auto;
    aspect-ratio: 1;



    &:hover{
      box-shadow: #bebebe 0 0 20px;
    }

    &, *{
      cursor: pointer;
    }

    &-wrapper{
      display: grid;
      grid-auto-rows: minmax(200px, max-content);
      gap: 20px;
      margin-block: 40px;

      @media (min-width: 768px){
        grid-template-columns: repeat(3 ,1fr);
      }
    }

    &-content{
      display: grid;
      place-items: center;
    }



    input, label{
      position: absolute;
    }

    label{
      padding: 25px;
      font-weight: bold;
      font-size: 1.5rem;
      text-align: right;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;

      span{
        font-size: 1rem;
        font-weight: 300;
      }
    }

    input{
      opacity: 0;
      inset: 0 !important;
      width: 100%;
      height: 100%;
    }
  }

  .cursor-default{
    cursor: auto !important;
  }

  .exit{
    place-self: start end;
    margin-bottom: 10px;
  }

  .action{
    position: relative;
    z-index: 99;
    width: 30px;
    height: 30px;
  }

</style>