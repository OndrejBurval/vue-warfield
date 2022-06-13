<template>
  <form @submit.prevent="submit">

    <input required v-model="locationName" class="form-control" type="text" placeholder="Název...">

    <div class="form-row form-coords">
      <label> Souřadnice {{ active }} </label>
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

    <button type="submit" class="btn btn-primary w-100"> {{ buttonText }} </button>
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { addPlace, updateMapLocation, updatePlace } from "../../firebase/firestore.js";

export default {
  name: "FormLocation",
  setup(props){
    const locationName = ref(props.name)

    const coords = ref({_lat: props.lat, _long: props.long})

    const submit = async () => {
      if (!props.update){
        await addPlace(locationName.value, coords.value._lat, coords.value._long)
        props.toggleForm()
      } else{
        await updatePlace(props.placeID, locationName.value,coords.value._lat, coords.value._long)
        if (props.active){
          await updateMapLocation(props.placeID)
          window.location.reload()
        } else{
          props.toggleForm()
        }
      }
    }

    const buttonText = computed(() => {
      return props.update ? "Upravit" : "Přidat"
    })

    return {
      locationName,
      coords,
      buttonText,
      submit
    }
  },
  props: ["toggleForm", "update", "name", "placeID","lat", "long", "active"]
}
</script>

<style scoped>

</style>