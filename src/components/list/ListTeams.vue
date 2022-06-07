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

  <div v-for="team in teams" :key="team.id" class="dropdown" >
    <button class="text-start btn btn-primary dropdown-toggle w-100 my-1" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
      <span class="badge" :style="{ background: team.color, color: team.color }"> . </span>
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
        <ButtonFormTeam update="true" :team-name="team.name" :team-id="team.id">
          <a class="dropdown-item">
            Upravit
          </a>
        </ButtonFormTeam>
      </li>
      <li>

        <ButtonRemoveTeam :team-id="team.id" :team-email="team.userName">
          <a class="dropdown-item">
            Odebrat
          </a>
        </ButtonRemoveTeam>
      </li>
    </ul>
  </div>



  <!-- Quest Modal -->
  <Teleport to="body">
      <Modal v-if="edit" :toggle="toggleModal">
        <FormQuest :toggle="toggleModal" :teamName="teamName" :teamId="teamId" />
      </Modal>
  </Teleport>

</template>

<script>
import { getTeamsCollection } from "../../firebase/firestore.js";
import { ref } from "vue";

import Modal from "../utils/Modal.vue";
import FormQuest from "../forms/FormQuest.vue";
import FormTeam from "../forms/FormTeam.vue";
import ButtonFormTeam from "../buttons/ButtonFormTeam.vue";
import ButtonRemoveTeamQuests from "../buttons/ButtonRemoveTeamQuests.vue";
import ButtonRemoveTeam from "../buttons/ButtonRemoveTeam.vue";

export default {
  name: "ListTeams",
  async setup () {
    const edit = ref();
    const teamModal = ref();
    const updateTeam = ref();
    const teamName = ref();
    const teamId = ref();

    const teams = await getTeamsCollection()

    const toggleModal = () => {
      edit.value = !edit.value
    }

    const addQuest = (selectedTeam, selectedTeamId) => {
      edit.value = !edit.value
      teamName.value = selectedTeam
      teamId.value = selectedTeamId
    }

    return { teams, edit, teamModal, updateTeam, teamName, teamId, addQuest, toggleModal }
  },
  components: {
    FormQuest,
    FormTeam,
    Modal,
    ButtonFormTeam,
    ButtonRemoveTeamQuests,
    ButtonRemoveTeam
  }
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