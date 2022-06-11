<template>
  <section class="container">
    <h2> Lokace : {{ mapSettings.data().placeName }} </h2>
    <hr>

    <form class="box-wrapper">

      <div v-for="place in places" :key="place.id" class="box">
        <label :for="place.id">
          {{ place.name }}
          <span>Lat: {{ place.coords._lat }} </span>
          <span>Lng: {{ place.coords._long }} </span>
        </label>
        <input type="radio" :id="place.id" :value="place.name" @click="check" v-model="picked" :checked="mapSettings.data().placeID === place.id" />
      </div>

      <div class="box d-flex flex-column justify-content-center align-items-center cursor-default" >
        <div v-if="!addFormToggle" @click="addToggle" class="box-content">
          <h3>
            Přidat lokaci
          </h3>
          <BIconPlusCircle />
        </div>

        <div v-else="addFormToggle" class="p-3 cursor-default box-content">
          <BIconXCircle  @click="addToggle" class="exit" />

          <FormLocation />
        </div>
      </div>


    </form>

  </section>
</template>

<script setup>
import { getPlacesCollection, getMapSettings } from "../../firebase/firestore.js";
import { ref } from "vue";
import FormLocation from "../forms/FormLocation.vue";

const places = await getPlacesCollection()
const mapSettings = await getMapSettings()

const picked = ref()
const addFormToggle = ref(false)
const checked = ref(false)


const check = () => {
  checked.value = !checked.value
}

const addToggle = () => {
  addFormToggle.value = !addFormToggle.value
}

</script>

<style lang="scss" scoped>
  .box{
    position: relative;
    width: calc(100% / 4 - 15px);
    height: auto;
    aspect-ratio: 1;
    background: #e4f1f1;
    border-radius: 15px;
    box-shadow: #efefef 0 0 10px;
    cursor: pointer;
    transition: .3s;

    &:hover{
      box-shadow: #bebebe 0 0 20px;
    }

    &, *{
      cursor: pointer;
    }

    &-wrapper{
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      flex-direction: row;
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
      opacity: .5;
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

</style>