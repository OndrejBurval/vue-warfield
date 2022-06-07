<template>

  <div class="adminFilter">
    <Suspense>
      <AdminFilterPanel />
    </Suspense>
  </div>

  <Suspense>

    <template #default>

      <div v-if="teamsCollection.length > 0" v-for="team in teamsCollection" :id="team.id" class="teamContainer">
        <h3>
          <span class="badge" :style="'background: ' + team.color + ' !important; color: ' + team.color+ ';'"> . </span>
          {{ team.name }}
        </h3>
        <div class="utils" v-if="user && user.admin">
          <Popper hover arrow content="Upravit tým">
            <ButtonFormTeam update="true" :team-id="team.id" :team-name="team.name">
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

        <Suspense>
          <AdminSmallPanel :teamName="team.name" :teamId="team.id" />
        </Suspense>

        <hr>
      </div>

      <div v-else class="d-flex align-items-center flex-column">
        <h3 class="text-center opacity-50 my-4" >
          Aktuálně nejsou žádné týmy
        </h3>
        <ButtonFormTeam v-if="user && user.admin">
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
import { getUser } from "../firebase/auth.js";
import { ref } from "vue";

export default {
  name: "TheQuestWrapper",
  async setup (){
    const user = getUser()
    const addModal = ref()
    const teamName = ref()
    const teamId = ref()

    const teamsCollection = await getTeamsCollection()

    return { user, teamsCollection, addModal, teamName, teamId }
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
  width: calc(100% + 60px);
  margin-left: -30px;
  margin-top: -15px;
  margin-bottom: 40px;
}


</style>