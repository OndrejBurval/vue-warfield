<template>

  <form @submit.prevent="submitQuest()" v-if="!watchClick">
    <h2> {{ status.title }}  </h2>

    <div class="form-group">
      <label for="quest_title"> Název úkolu </label>
      <input  required v-model="title" class="form-control" type="text" id="quest_title" placeholder="Title...">
    </div>

    <hr>

    <div class="form-group">
      <label for="quest_desc"> Popis úkolu </label>
      <textarea required v-model="desc" class="form-control" id="quest_desc" placeholder="Popis..."></textarea>
    </div>

    <hr>

    <div class="form-group">
      <label for="quest_desc"> Stav úkolu </label>
      <select class="form-select" v-model="questStatus">
        <option value="0" selected> Neutrální </option>
        <option value="1"> Čekající</option>
        <option value="2"> Aktivní </option>
        <option value="3"> Dokončený</option>
        <option value="4"> Selhal </option>
      </select>
    </div>

    <hr>

    <div class="form-group d-flex flex-column">
      <label> Ikonka: <img :src="selectedIcon" alt=""> </label>
      <button class="btn btn-secondary" @click.prevent="iconSelectToggle = !iconSelectToggle">
        {{ iconButtonText }}
      </button>

      <ListIcons v-if="iconSelectToggle" />
    </div>

    <hr>

    <div class="form-row form-coords">
      <label> Souřadnice </label>
      <div class="btn btn-secondary w-100 mb-3" @click.prevent="toggleWatchMapClick()">
        Vybrat souřadnice
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

    <hr>

    <button type="submit" class="btn btn-primary w-100"> {{ status.button}} </button>
  </form>

</template>

<script>
import { computed, ref } from "vue";

// DATABASE
import { addQuest, updateQuest } from "../../firebase/firestore.js";

// STORAGE
import { getMapClickedCoords, getSelectedIcon } from "../../global/storage.js";

// STATE MANAGEMENT
import { toggleWatchMapClick, getWatchMapClick, toggleQuestForm } from "../../global/stateManagement.js";

// COMPONENTS
import VueGoogleMap from "../VueGoogleMap.vue";
import ListIcons from "../list/ListIcons.vue"




export default {
  name: "QuestEditor",
  setup(props){
    const iconSelectToggle = ref(false)
    const selectedIcon = getSelectedIcon()

    const watchClick = getWatchMapClick();
    const questStatus = ref(props.passedStatus ? props.passedStatus : 0);

    const coords = getMapClickedCoords()
    const markerCoords = computed(() => ({
      lat: coords.value.lat !== 0 ? coords.value.lat : props.passedLat,
      lng: coords.value.lng !== 0 ? coords.value.lng : props.passedLng
    }))

    const status = computed(() => ({
      title: props.update ? "Upravit" : props.teamName + " - Přidat úkol",
      button: props.update ? "Uložit" : "Přidat"
    }))

    const iconButtonText = computed(() => {
      return iconSelectToggle.value ? "Skrýt ikonky" : "Zobrazit ikonky"
    })

    return {
      iconSelectToggle,
      iconButtonText,
      selectedIcon,
      markerCoords,
      watchClick,
      status,
      questStatus,
      toggleWatchMapClick
    }
  },
  components: {
    VueGoogleMap,
    ListIcons
  },
  props: ["toggle", "teamId", "teamName", "update", "doc_id", "title", "desc", "passedLat", "passedLng", "passedStatus"],
  methods: {
    async submitQuest() {
      if (this.update){
        await updateQuest(this.doc_id, this.title, this.desc, this.questStatus, this.markerCoords)
        this.toggle()
      } else{
        await addQuest(this.title, this.desc, this.teamId, this.questStatus, this.markerCoords, this.selectedIcon)
        this.toggle()
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