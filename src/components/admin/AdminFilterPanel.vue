<template>
  <section class="d-flex flex-wrap justify-content-center" v-if="user && user.admin">
    <Popper class="ms-0" hover arrow content="Filtr">
      <div @click="filter = !filter">
        <BIconFunnel :cursor="'pointer'" :fill="'#ffffff' " />
      </div>
    </Popper>

    <Popper class="ms-0" hover arrow content="Přidat tým">
      <ButtonFormTeam>
        <BIconPlusCircle :fill="'#ffffff'" />
      </ButtonFormTeam>
    </Popper>

    <Popper class="ms-0" hover arrow content="Odebrat úplně všechny úkoly">
      <ButtonRemoveAllQuests>
        <BIconTrash :fill="'#ffffff' " />
      </ButtonRemoveAllQuests>
    </Popper>




      <div v-if="filter" class="filter-options d-flex flex-wrap">
        <div v-for="team in teams" :key="team.id" class="me-3 badge" style="background: #8495a6;">
          <div class="badge me-1" :style="'background: ' + team.color + ';'">
            <input type="checkbox" :id="team.name" :value="team.id" v-model="filteredTeams" >
          </div>
          <label :for="team.name"> {{ team.name }}</label>

        </div>
      </div>
  </section>

</template>

<script>
import ButtonRemoveAllQuests from "../buttons/ButtonRemoveAllQuests.vue";
import ButtonFormTeam from "../buttons/ButtonFormTeam.vue";
import { getTeamsCollection, } from "../../firebase/firestore.js";
import { getUser } from "../../firebase/auth.js";
import { ref } from "vue";

export default {
  name: "AdminFilterPanel",
  async setup() {
    const user = getUser()
    const filter = ref();
    const filteredTeams = ref([]);

    const teams = await getTeamsCollection()
    return { user, teams, filter, filteredTeams }
  },
  watch: {
    filteredTeams(newValue, oldValue) {
      oldValue.forEach((value) => {
        document.querySelector(`#${value}`).classList.remove("d-none")
      })
      newValue.forEach((value) => {
        document.querySelector(`#${value}`).classList.add("d-none")
      })

    }
  },
  components: {
    ButtonRemoveAllQuests,
    ButtonFormTeam
  }
}
</script>

<style lang="scss" scoped>

  section{
    background: #48515a;
    padding-block: 10px;
    margin-bottom: 20px;
    transition: .3s;

  }

  .filter-options{
    width: 100%;
    background: #667380;
    padding: 10px 20px;
    margin-bottom: -10px;
    margin-top: 10px;
  }

  .filter-options{
    color: white;
  }

</style>