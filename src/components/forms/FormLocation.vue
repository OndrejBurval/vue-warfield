<template>
  <form @submit.prevent="submit">

    <input required v-model="locationName" class="form-control" type="text" placeholder="Název...">

    <div class="form-row form-coords">
      <label> Souřadnice </label>
      <div class="d-flex justify-content-between">
        <div class="col-md-6">
          <label for="lat_input"> Lat: </label>
          <input class="form-control" v-model="coords._lat" type="number" step="any" id="lat_input" placeholder="lat...">
        </div>
        <div class="col-md-6">
          <label for="lng_input"> Lat: </label>
          <input class="form-control" v-model="coords._long" type="number" step="any" id="lng_input" placeholder="lng...">
        </div>
      </div>

    </div>

    <button type="submit" class="btn btn-primary w-100"> Přidat </button>
  </form>
</template>

<script>
import { ref } from "vue";
import { addPlace } from "../../firebase/firestore.js";

export default {
  name: "FormLocation",
  setup(){
    const locationName = ref()

    const coords = ref({_lat: 0, _long: 0})

    const submit = async () => {
      await addPlace(locationName.value, coords.value._lat, coords.value._long)
    }

    return {
      locationName,
      coords,
      submit
    }
  }
}
</script>

<style scoped>

</style>