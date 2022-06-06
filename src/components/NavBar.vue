<template>
  <nav class="navbar navbar-dark bg-dark px-5">

    <div class="navbar--left">
      <Profile />
    </div>

    <div class="navbar--right">
      <BIconQuestionDiamond :cursor="'pointer'" :fill="'#ffffff'" @click="toggleQuestSidebar" class="me-3"/>
      <Admin />
    </div>

  </nav>



  <Transition name="slide-right">
    <SideBar v-if="questBar" :title="'Úkoly'" overlay="false" :toggle="toggleQuestSidebar">
      <Suspense>
        <template #default>
          <TheQuestWrapper />
        </template>
        <template #fallback>
          <BIconArrowClockwise class="loading" />
        </template>
      </Suspense>
    </SideBar>
  </Transition>
</template>

<script>
import Admin from "./admin/Admin.vue";
import SideBar from "./utils/SideBar.vue";
import ListQuests from "./list/ListQuests.vue";
import TheQuestWrapper from "./TheQuestWrapper.vue";
import Profile from "./Profile.vue"

import { getQuestSidebar, toggleQuestSidebar } from "../global/stateManagement.js";

export default {
  name: "NavBar",
  setup(){
    const questBar = getQuestSidebar()

    return { questBar, toggleQuestSidebar }
  },
  components: {
    Admin,
    SideBar,
    ListQuests,
    TheQuestWrapper,
    Profile
  }
}
</script>

<style scoped>

</style>