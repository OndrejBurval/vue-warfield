<template>
  <h3>
    Team list
    <Popper hover arrow content="Přidat tým">
      <ButtonFormTeam>
        <BIconPlusCircle />
      </ButtonFormTeam>
    </Popper>
  </h3>
  <hr>

  <div v-for="team in teams" class="dropdown" >
    <button class="text-start btn btn-primary dropdown-toggle w-100 my-1" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
      <span class="badge" :style="'background: ' + team.color + ' !important; color: ' + team.color+ ';'"> . </span>
      {{ team.name }}
    </button>
    <ul class="dropdown-menu dropdown-menu-dark w-100" aria-labelledby="dropdownMenuButton">
      <li>
        <a class="dropdown-item" @click="addQuest(team.name, team.id)"> Přidat úkol </a>
      </li>
      <li>
        <ButtonRemoveTeamQuests :team-id="team.id">
          <a class="dropdown-item">
            Odebrat úkoly
          </a>
        </ButtonRemoveTeamQuests>
      </li>
      <li>
        <ButtonFormTeam update :team-name="team.name" :team-id="team.id">
          <a class="dropdown-item">
            Upravit
          </a>
        </ButtonFormTeam>
      </li>
      <li>
        <ButtonRemoveTeam :team-id="team.id">
          <a class="dropdown-item">
            Odebrat
          </a>
        </ButtonRemoveTeam>
      </li>
    </ul>
  </div>



  <!-- Quest Modal -->
  <Teleport to="body">
    <Transition name="fade">
      <Modal v-if="edit" @closeModal="edit = !edit">
        <FormQuest :teamName="teamName" :teamId="teamId" />
      </Modal>
    </Transition>
  </Teleport>

</template>

<script>
import { getTeamsCollection } from "../firebase.js";

import Modal from "./Modal.vue";
import FormQuest from "./FormQuest.vue";
import FormTeam from "./FormTeam.vue";
import ButtonFormTeam from "./buttons/ButtonFormTeam.vue";
import ButtonRemoveTeamQuests from "./buttons/ButtonRemoveTeamQuests.vue";
import ButtonRemoveTeam from "./buttons/ButtonRemoveTeam.vue";

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
    Modal,
    ButtonFormTeam,
    ButtonRemoveTeamQuests,
    ButtonRemoveTeam
  },
  methods: {
    setTeamInfo(teamName,teamId){
      this.teamName = teamName
      this.teamId = teamId
    },
    addQuest(teamName, teamId) {
      this.edit = !this.edit
      this.setTeamInfo(teamName, teamId)
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