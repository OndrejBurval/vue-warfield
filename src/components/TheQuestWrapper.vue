<template>
  <AdminFilterPanel />

  <Suspense>

    <template #default>

      <div v-for="team in teamsCollection">
        <h3>
          <span class="badge" :style="'background: ' + team.color + ' !important; color: ' + team.color+ ';'"> . </span>
          {{ team.name }}
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
    AdminFilterPanel
  },
}
</script>

<style lang="scss" scoped>



</style>