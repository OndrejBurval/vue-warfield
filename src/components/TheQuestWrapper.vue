<template>

  <div class="adminFilter">
    <Suspense>
      <AdminFilterPanel />
    </Suspense>
  </div>

  <Suspense>

    <template #default>

      <div v-for="team in teamsCollection" :id="team.id" class="teamContainer">
        <h3>
          <span class="badge" :style="'background: ' + team.color + ' !important; color: ' + team.color+ ';'"> . </span>
          {{ team.name }}

          <Popper hover arrow content="Upravit tým">
            <ButtonFormTeam update :team-id="team.id" :team-name="team.name">
              <BIconPencil />
            </ButtonFormTeam>
          </Popper>

          <Popper hover arrow content="Odebrat tým">
            <ButtonRemoveTeam :team-id="team.id">
              <BIconTrash />
            </ButtonRemoveTeam>
          </Popper>

        </h3>

        <ListQuests :filterTeam="team.id"  />

        <Suspense>
          <AdminSmallPanel :teamName="team.name" :teamId="team.id" />
        </Suspense>

        <hr>
      </div>
    </template>
    <template #fallback>
      <BIconArrowClockwise class="loading" />
    </template>
  </Suspense>
</template>

<script>
import ListQuests from "./ListQuests.vue";
import AdminSmallPanel from "./AdminSmallPanel.vue";
import AdminFilterPanel from "./AdminFilterPanel.vue";
import ButtonFormTeam from "./buttons/ButtonFormTeam.vue";
import ButtonRemoveTeam from "./buttons/ButtonRemoveTeam.vue";
import { getTeamsCollection } from "../firebase.js";
import {ref} from "vue";

export default {
  name: "TheQuestWrapper",
  async setup (){
    const addModal = ref()
    const teamName = ref()
    const teamId = ref()

    const teamsCollection = await getTeamsCollection()

    return { teamsCollection, addModal, teamName, teamId }
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