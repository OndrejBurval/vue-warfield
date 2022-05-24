<template>


  <form @submit.prevent="submitQuest()" v-if="!watchClick">
      <h2> {{ status.title }}  </h2>

      <div class="form-group">
        <label for="quest_title"> Název úkolu </label>
        <input  required v-model="title" class="form-control" type="text" id="quest_title" placeholder="Title...">
      </div>
      <div class="form-group">
        <label for="quest_desc"> Popis úkolu </label>
        <textarea required v-model="desc" class="form-control" id="quest_desc" placeholder="Popis..."></textarea>
      </div>

      <div class="form-row form-coords">
        <div class="btn btn-secondary w-100 mb-3" @click.prevent="toggleWatchMapClick()">
          <BIconPinMap  />
        </div>
        <div class="d-flex justify-content-between">
          <div class="col-md-6">
            <label for="lat_input"> Lat: </label>
            <input class="form-control" v-model="markerCoords.lat" type="number" step="any" id="lat_input" placeholder="lat...">
          </div>
          <div class="col-md-6">
            <label for="lng_input"> Lat: </label>
            <input class="form-control" v-model="markerCoords.lng" type="number" step="any" id="lng_input" placeholder="lng...">
          </div>
        </div>

      </div>

      <button type="submit" class="btn btn-primary w-100"> {{ status.button}} </button>
  </form>

</template>

<script>
import { addQuest, updateQuest } from "../firebase";
import { ref, computed } from "vue";
import { toggleWatchMapClick, getWatchMapClick } from "../global/stateManagement.js";
import { getMapClickedCoords, resetMapClickedCoords } from "../global/storage.js";

import VueGoogleMap from "./VueGoogleMap.vue";

export default {
  name: "QuestEditor",
  setup(props){
    const watchClick = getWatchMapClick();

    const coords = getMapClickedCoords()
    const markerCoords = computed(() => ({
      lat: coords.value.lat,
      lng: coords.value.lng
    }))

    const status = computed(() => ({
      title: props.update ? "Upravit" : props.teamName + " - Přidat úkol",
      button: props.update ? "Uložit" : "Přidat"
    }))

    return { markerCoords, watchClick, toggleWatchMapClick, status }
  },
  components: {
    VueGoogleMap,
  },
  props: ["teamId", "teamName", "update", "doc_id", "title", "desc", "passedLat", "passedLng"],
  methods: {
    async submitQuest() {
      if (this.update){
        await updateQuest(this.doc_id, this.title, this.desc)
        resetMapClickedCoords()
        window.location.reload()
      } else{
        await addQuest(this.title, this.desc, this.teamId, this.markerCoords)
        resetMapClickedCoords()
        window.location.reload()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  form{
    width: min(98vw, 700px);
    height: min-content;
    resize: both;
  }


  .row, .form-group, .form-row{
    margin-bottom: 30px;
  }
</style>