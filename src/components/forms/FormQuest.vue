<template>
  <h2 class="header" :style="{ background: team.color }"> {{ status.title }} </h2>

  <form @submit.prevent="submitQuest()" v-if="!watchClick" class="form-modal">

    <div class="form-group questFormHeader">
      <div class="icon">
          <img :src="selectedIcon" alt="Vybraná ikonka" @click.prevent="iconsToggle">
          <ListIcons class="icon-list" :toggle-func="iconsToggle"  v-if="iconSelectToggle" />
      </div>
      <div class="title">
        <label for="quest_title"> Název úkolu </label>
        <input  required v-model="title" class="form-control" type="text" id="quest_title" placeholder="Title...">
      </div>
      <div class="status">
        <label for="quest_desc"> Stav úkolu </label>
        <select class="form-select" v-model="questStatus">
          <option value="0" selected> Neutrální </option>
          <option value="1"> Čekající</option>
          <option value="2"> Aktivní </option>
          <option value="3"> Dokončený</option>
          <option value="4"> Selhal </option>
        </select>
      </div>

    </div>

    <hr>

    <div class="form-group">
      <label for="quest_desc"> Popis úkolu </label>
      <textarea required v-model="desc" class="form-control" id="quest_desc" placeholder="Popis..."></textarea>
    </div>

    <hr>

    <div class="form-row form-coords">
      <button class="btn btn-secondary" @click.prevent="toggleWatchMapClick()">
        Vybrat souřadnice
      </button>
      <div class="d-flex form-row">
        <label for="lat_input"> Lat: </label>
        <input class="form-control" v-model="markerCoords.lat" type="number" step="any" id="lat_input" placeholder="lat...">
      </div>
      <div class="d-flex form-row">
        <label for="lng_input"> Lat: </label>
        <input class="form-control" v-model="markerCoords.lng" type="number" step="any" id="lng_input" placeholder="lng...">
      </div>

    </div>

    <hr>

    <button type="submit" class="btn btn-primary w-100"> {{ status.button}} </button>
  </form>

</template>

<script>
import { computed, ref } from "vue";

// DATABASE
import { addQuest, updateQuest, getTeamByID } from "../../firebase/firestore.js";

// STORAGE
import { getMapClickedCoords, getSelectedIcon } from "../../global/storage.js";

// STATE MANAGEMENT
import { toggleWatchMapClick, getWatchMapClick } from "../../global/stateManagement.js";

// COMPONENTS
import VueGoogleMap from "../VueGoogleMap.vue";
import Modal from "../utils/Modal.vue"
import ListIcons from "../list/ListIcons.vue"




export default {
  name: "QuestEditor",
  async setup(props){
    const iconSelectToggle = ref(false)
    const selectedIcon = getSelectedIcon()

    const team = await getTeamByID(props.teamId)

    const watchClick = getWatchMapClick();
    const questStatus = ref(props.passedStatus ? props.passedStatus : 0);

    const coords = getMapClickedCoords()
    const markerCoords = computed(() => ({
      lat: coords.value.lat !== 0 ? coords.value.lat : props.passedLat,
      lng: coords.value.lng !== 0 ? coords.value.lng : props.passedLng
    }))

    const status = computed(() => ({
      title: props.update ? "Upravit" : "Přidat úkol",
      button: props.update ? "Uložit" : "Přidat"
    }))


    const iconsToggle = () => iconSelectToggle.value = !iconSelectToggle.value

    return {
      team,
      iconSelectToggle,
      selectedIcon,
      markerCoords,
      watchClick,
      status,
      questStatus,
      toggleWatchMapClick,
      iconsToggle
    }
  },
  components: {
    VueGoogleMap,
    ListIcons,
    Modal
  },
  props: ["toggle", "teamId", "update", "doc_id", "title", "desc", "passedLat", "passedLng", "passedStatus"],
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
  .row, .form-group, .form-row{
    margin-block: 50px;
  }

  .form-modal{
    padding-inline: 15px;
  }



  .header{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px 45px;
  }


  .questFormHeader{
    display: grid;
    gap: 20px;

    @media (min-width: 768px){
      grid-template-columns: 100px 6fr 2fr;
    }


    .icon{
      display: grid;
      place-items: end center;
      cursor: pointer;

      img{
        height: 100%;
        transition: .25s;

        &:hover{
          transform: scale(1.1);
        }
      }
    }
  }

  #quest_desc{
    min-height: 150px;
  }

  .form-coords{
    display: grid;
    gap: 20px;
    margin: 0 !important;

    @media (min-width: 768px){
      grid-auto-flow: column;
      grid-template-columns: 1fr 1fr 1fr;
    }


    div{
      margin: 0 !important;
    }

    label{
      display: grid;
      place-items: center;
      padding-right: 5px;
    }

  }


</style>