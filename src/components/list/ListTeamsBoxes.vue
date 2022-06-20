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
      <h2 class="teamName">
        <span class="badge" :style="{ background: team.color, color: team.color }"> . </span>

        {{ team.name }}
      </h2>

      <div class="login">
        username: {{ team.userName }}<br>
        password: 123456

        <button class="btn btn-primary w-100 my-3" @click.prevent="loginAsTeam(team.userName)" > Přihlásit se </button>

      </div>


      <div class="actions">
        <button class="btn btn-primary" @click.prevent="addQuest(team.name, team.id)" > Přidat úkol </button>
        <ButtonRemoveTeamQuests class="btn btn-primary" :team-id="team.id">
            Odebrat úkoly
        </ButtonRemoveTeamQuests>
        <ButtonFormTeam class="btn btn-primary" update="true" :team-name="team.name" :team-id="team.id" :team-scenary="team.scenary">
          <button class="btn btn-primary">
            Upravit
          </button>
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
      <FormQuest :toggle="toggleModal" :teamId="teamId" />
    </Modal>
  </Teleport>

</template>

<script>
import { getTeamsCollection } from "../../firebase/firestore.js";
import { logOut, logIn } from "../../firebase/auth.js";
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

    const loginAsTeam = (userName) => {
      const password = "123456"
      localStorage.setItem("loginUser", userName)
      localStorage.setItem("loginPassword", password)
      logOut()
    }

    return { teams, edit, teamModal, updateTeam, teamName, teamId, addQuest, toggleModal, loginAsTeam }
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

.teamName{
  margin-bottom: 0;
  padding-top: 20px;
}

.badge{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}


.actions{
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
}

button{
  width: 100%;
}


.wrapper{
  display: grid;
  grid-auto-rows: minmax(200px, max-content);
  gap: 20px;
  margin-block: 40px;

  @media (min-width: 768px){
    grid-template-columns: repeat(3 ,1fr);
  }
}


</style>