<template>
  <h3> Team list <BIconPlusCircle @click="addTeam"/> </h3>
  <hr>

  <div v-for="team in teams" class="dropdown" >
    <button class="text-start btn btn-primary dropdown-toggle w-100 my-1" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
      <span class="badge" :style="'background: ' + team.color + ' !important; color: ' + team.color+ ';'"> . </span>
      {{ team.name }}
    </button>
    <ul class="dropdown-menu dropdown-menu-dark w-100" aria-labelledby="dropdownMenuButton">
      <li>
        <a class="dropdown-item" @click="openQuestEditor(team.name, team.id)"> Přidat úkol </a>
      </li>
      <li>
        <a class="dropdown-item" @click="removeTeamQuests(team.id)"> Odebrat úkoly </a>
      </li>
      <li>
        <a class="dropdown-item" @click="editTeam(team.name, team.id)"> Upravit </a>
      </li>
      <li>
        <a class="dropdown-item" @click="removeTeam(team.id)"> Odebrat </a>
      </li>
    </ul>
  </div>



  <Teleport to="body">
    <Transition name="fade">
      <Modal v-if="edit" @closeModal="edit = !edit">
        <FormQuest :teamName="teamName" :teamId="teamId" />
      </Modal>
    </Transition>
  </Teleport>

  <Teleport to="body">
    <Transition name="fade">
      <Modal v-if="teamModal" @closeModal="teamModal = !teamModal; updateTeam = !updateTeam">
        <FormTeam :update="updateTeam" :teamName="teamName" :teamId="teamId" />
      </Modal>
    </Transition>
  </Teleport>


</template>

<script>
import { getTeamsCollection, deleteTeam, deleteTeamQuests } from "../firebase.js";

import Modal from "./Modal.vue";
import FormQuest from "./FormQuest.vue";
import FormTeam from "./FormTeam.vue";

export default {
  name: "ListTeams",
  async setup () {
    const teams = await getTeamsCollection()

    return { teams }
  },
  data() {
    return {
      edit: false,
      teamModal: false,
      updateTeam: false,
      teamName: undefined,
      teamId: undefined
    }
  },
  components: {
    FormQuest,
    FormTeam,
    Modal
  },
  methods: {
    setTeamInfo(teamName,teamId){
      this.teamName = teamName
      this.teamId = teamId
    },
    openQuestEditor(teamName, teamId) {
      this.edit = !this.edit
      this.setTeamInfo(teamName, teamId)
    },
    editTeam(teamName, teamId){
      this.updateTeam = !this.updateTeam
      this.teamModal = !this.teamModal
      this.setTeamInfo(teamName, teamId)
    },
    addTeam(){
      this.teamModal = !this.teamModal
    },
    async removeTeam(teamId){
      console.log(teamId)
      if (confirm("Pravdu chcete odebrat tým ? (Odebere i všechny úkoly)")){
        await deleteTeam(teamId)
        await deleteTeamQuests(teamId)
        window.location.reload()
      }
    },
    async removeTeamQuests(teamId){
      if (confirm("Pravdu chcete všechny úkoly?")){
        await deleteTeamQuests(teamId)
        window.location.reload()
      }
    }

  },
}
</script>

<style lang="scss" scoped>

  svg, a{
    cursor: pointer;
  }

  .dropdown-toggle::after{
    position: absolute;
    right: 20px;
    top: 50%;

  }

  .btn{
    padding-right: 35px !important;
  }


</style>