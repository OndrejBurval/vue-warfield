<template>
    <form @submit.prevent="submitQuest()">
      <h2> {{ teamName + ' - ' }} {{ update ? `Upravit (id: ${doc_id})` : "Přidat úkol" }}  </h2>
      <span class="badge bg-dark"> {{ teamId }}</span>

      <div class="form-group">
        <label for="quest_title"> Název úkolu </label>
        <input  required v-model="title" class="form-control" type="text" id="quest_title" placeholder="Title...">
      </div>
      <div class="form-group">
        <label for="quest_desc"> Popis úkolu </label>
        <textarea required v-model="desc" class="form-control" id="quest_desc" placeholder="Popis..."></textarea>
      </div>

      <div class="form-row">
        <button class="btn btn-secondary col-md-12"> Přidat marker </button>
        <div class="col-md-6">
          <label for="lat_input"> Lat: </label>
          <input class="form-control" type="text" id="lat_input" placeholder="lat...">
        </div>
        <div class="col-md-6">
          <label for="lng_input"> Lat: </label>
          <input class="form-control" type="text" id="lng_input" placeholder="lng...">
        </div>
      </div>

      <button type="submit" class="btn btn-primary w-100"> {{ update ? "Uložit" : "Přidat" }} </button>
    </form>
</template>

<script>
import { addQuest, updateQuest } from "../firebase";

export default {
  name: "QuestEditor",
  props: {
    teamName: {
      type: String,
      default: undefined
    },
    teamId: {
      type: String,
      default: undefined
    },
    update: {
      type: Boolean,
      default: false
    },
    doc_id: {
      type: String,
      default: undefined
    },
    title: {
      type: String,
      default: ""
    },
    desc: {
      type: String,
      default: ""
    },
  },
  methods: {
    async submitQuest() {
      if (this.update){
        await updateQuest(this.doc_id, this.title, this.desc)
        window.location.reload()
      } else{
        await addQuest(this.title, this.desc, this.teamId)
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