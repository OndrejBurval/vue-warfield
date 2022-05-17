<template>

  <div class="adminFilter">
    <AdminFilterPanel />
  </div>

  <Suspense>

    <template #default>

      <div v-for="team in teamsCollection">
        <h3>
          <span class="badge" :style="'background: ' + team.color + ' !important; color: ' + team.color+ ';'"> . </span>
          {{ team.name }}

          <Popper hover arrow content="Upravit tým">
            <ButtonFormTeam :update="true" :team-id="team.id" :team-name="team.name">
              <BIconPencil />
            </ButtonFormTeam>
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
import ButtonFormTeam from "./ButtonFormTeam.vue";
import { getTeamsCollection } from "../firebase.js";

export default {
  name: "TheQuestWrapper",
  async setup (){
    const teamsCollection = await getTeamsCollection()

    return { teamsCollection }
  },
  data() {
    return {
      addModal: false,
      teamName: "",
      teamId: ""
    }
  },
  components: {
    ListQuests,
    AdminSmallPanel,
    AdminFilterPanel,
    ButtonFormTeam
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