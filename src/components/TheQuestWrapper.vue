<template>

  <div class="adminFilter">
    <Suspense>
      <AdminFilterPanel />
    </Suspense>
  </div>

  <div class="close">
    <BIconXLg @click="toggleQuestSidebar" />
  </div>

  <Suspense>
    <template #default>
      <div v-if="teamsCollection.length > 0" v-for="team in teamsCollection" :id="team.id" class="teamContainer">
        <section class="teamContent" v-if="team.id === userData.id || user.admin">

          <h3>
            <span class="badge" :style="{background: team.color, color: team.color }"> . </span>
            {{ team.name }}
          </h3>

          <div class="utils" v-if="user.admin">
            <Popper hover arrow content="Upravit tým">
              <ButtonFormTeam update="true" :team-id="team.id" :team-name="team.name" :team-scenary="team.scenary">
                <BIconPencil />
              </ButtonFormTeam>
            </Popper>

            <Popper hover arrow content="Odebrat tým">
              <ButtonRemoveTeam :team-id="team.id" :team-email="team.userName">
                <BIconTrash />
              </ButtonRemoveTeam>
            </Popper>
          </div>

          <ListQuests :filterTeam="team.id"  />

          <AdminSmallPanel :teamName="team.name" :teamId="team.id" />
          <hr>

        </section>
      </div>

      <div v-else class="d-flex align-items-center flex-column">
        <h3 class="text-center opacity-50 my-4" >
          Aktuálně nejsou žádné týmy
        </h3>
        <ButtonFormTeam v-if="user.admin">
          <Popper hover arrow content="Přidat tým">
            <BIconPlusCircle />
          </Popper>
        </ButtonFormTeam>
      </div>

    </template>
    <template #fallback>
      <BIconArrowClockwise class="loading" />
    </template>
  </Suspense>
</template>

<script>
import ListQuests from "./list/ListQuests.vue";
import AdminSmallPanel from "./admin/AdminSmallPanel.vue";
import AdminFilterPanel from "./admin/AdminFilterPanel.vue";
import ButtonFormTeam from "./buttons/ButtonFormTeam.vue";
import ButtonRemoveTeam from "./buttons/ButtonRemoveTeam.vue";
import { getTeamsCollection } from "../firebase/firestore.js";
import { getUser, getUserData } from "../firebase/auth.js";
import { toggleQuestSidebar } from "../global/stateManagement.js";
import { ref } from "vue";

export default {
  name: "TheQuestWrapper",
  async setup (){
    const user = getUser()
    const userData = getUserData()

    const addModal = ref()
    const teamName = ref()
    const teamId = ref()

    const teamsCollection = await getTeamsCollection()


    return { user, userData, teamsCollection, addModal, teamName, teamId, toggleQuestSidebar }
  },
  components: {
    ListQuests,
    AdminSmallPanel,
    AdminFilterPanel,
    ButtonFormTeam,
    ButtonRemoveTeam
  },
}
</script>

<style lang="scss" scoped>

.adminFilter{
  width: 100vw;
  margin-left: 50%;
  transform: translateX(-50%);
}

.close{
  display: grid;
  width: 100%;
  place-items: end;

  svg{
    cursor: pointer;
  }
}


</style>