<template>

  <h2>
    Týmy

    <Popper hover arrow content="Přidat tým">
      <ButtonFormTeam>
        <BIconPlusCircle />
      </ButtonFormTeam>
    </Popper>
  </h2>

  <hr>

  <div class="wrapper">
    <div v-for="team in teams" :key="team.id" class="box" >
      <span class="badge" :style="{ background: team.color, color: team.color }"> . </span>
      {{ team.name }}


      <div class="actions">
        <button class="btn btn-primary" @click.prevent="addQuest(team.name, team.id)" > Přidat úkol </button>
        <ButtonRemoveTeamQuests class="btn btn-primary" :team-id="team.id">
            Odebrat úkoly
        </ButtonRemoveTeamQuests>
        <ButtonFormTeam class="btn btn-primary" update="true" :team-name="team.name" :team-id="team.id">
            Upravit
        </ButtonFormTeam>
        <ButtonRemoveTeam class="btn btn-primary" :team-id="team.id" :team-email="team.userName">
            Odebrat
        </ButtonRemoveTeam>
      </div>
    </div>
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
  name: "ListTeamsBoxes",
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

*{
  z-index: 1;
}

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


.wrapper{
  display: grid;
  grid-template-columns: repeat(3 ,1fr);
  grid-auto-rows: min-content;
  gap: 20px;
  margin-block: 40px;
}


</style>