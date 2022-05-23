<template>


  <form :id="idChange" @submit.prevent="submitQuest()" v-if="!getClickedCoords">
      <h2> {{ teamName + ' - ' }} {{ update ? `Upravit (id: ${doc_id})` : "Přidat úkol" }}  </h2>

      <div class="form-group">
        <label for="quest_title"> Název úkolu </label>
        <input  required v-model="title" class="form-control" type="text" id="quest_title" placeholder="Title...">
      </div>
      <div class="form-group">
        <label for="quest_desc"> Popis úkolu </label>
        <textarea required v-model="desc" class="form-control" id="quest_desc" placeholder="Popis..."></textarea>
      </div>

      <div class="form-row form-coords">
        <div class="btn btn-secondary w-100 mb-3">
          <BIconPinMap @click.prevent="getClickedCoords = !getClickedCoords" />
        </div>
        <div class="d-flex justify-content-between">
          <div class="col-md-6">
            <label for="lat_input"> Lat: </label>
            <input class="form-control" v-model="lat" type="number" step="any" id="lat_input" placeholder="lat...">
          </div>
          <div class="col-md-6">
            <label for="lng_input"> Lat: </label>
            <input class="form-control" v-model="lng" type="number" step="any" id="lng_input" placeholder="lng...">
          </div>
        </div>

      </div>

      <button type="submit" class="btn btn-primary w-100"> {{ update ? "Uložit" : "Přidat" }} </button>
  </form>


  <VueGoogleMap get-click-coords v-if="getClickedCoords" @click="loadClickedCoords" />

</template>

<script>
import { addQuest, updateQuest } from "../firebase";
import { ref } from "vue";

import VueGoogleMap from "./VueGoogleMap.vue";

export default {
  name: "QuestEditor",
  setup(){
    const getClickedCoords = ref(null);
    const lng = ref(null)
    const lat = ref(null)

    return { getClickedCoords, lng, lat }
  },
  components: {
    VueGoogleMap,
  },
  props: ["teamId", "teamName", "update", "doc_id", "title", "desc", "passedLat", "passedLng"],
  methods: {
    async submitQuest() {
      if (this.update){
        await updateQuest(this.doc_id, this.title, this.desc)
        window.location.reload()
      } else{
        const marker = {lat: parseFloat(this.lat), lng: parseFloat(this.lng)}
        await addQuest(this.title, this.desc, this.teamId, marker)
        window.location.reload()
      }
    },
    loadClickedCoords(){
      this.lat = localStorage.getItem("lat")
      this.lng = localStorage.getItem("lng")
      localStorage.removeItem("lat")
      localStorage.removeItem("lng")
      this.getClickedCoords = !this.getClickedCoords

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