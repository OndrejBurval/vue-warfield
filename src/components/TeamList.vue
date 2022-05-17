<template>
  <div v-for="team in teams" class="dropdown" >
    <button class="btn btn-primary dropdown-toggle w-100 my-1" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
      <span class="badge" :style="'background: ' + team.color + ' !important; color: ' + team.color+ ';'"> . </span>

      {{ team.name }}
    </button>
    <ul class="dropdown-menu dropdown-menu-dark w-100" aria-labelledby="dropdownMenuButton">
      <li>
        <a class="dropdown-item" @click="openQuestEditor(team.name, team.id)"> Přidat úkol </a>
      </li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
  </div>



  <Teleport to="body">
    <Transition name="fade">
      <Modal v-if="edit" @closeModal="edit = !edit">
        <QuestForm :teamName="teamName" :teamId="teamId" />
      </Modal>
    </Transition>
  </Teleport>


</template>

<script>
import { getTeamsCollection } from "../firebase.js";
import QuestForm from "./QuestForm.vue";
import Modal from "./Modal.vue";

export default {
  name: "TeamList",
  async setup () {
    const teams = await getTeamsCollection()

    return { teams }
  },
  data() {
    return {
      edit: false,
      teamName: undefined,
      teamId: undefined
    }
  },
  components: {
    QuestForm,
    Modal
  },
  methods: {
    openQuestEditor(teamName, teamId) {
      this.edit = !this.edit
      this.teamName = teamName
      this.teamId = teamId
    }
  },
}
</script>

<style scoped>


</style>