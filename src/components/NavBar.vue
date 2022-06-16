<template>
  <nav class="navbar navbar-dark bg-dark px-5">

    <div class="navbar--left">
      <Profile />
    </div>

    <div class="navbar--right" v-if="user">
      <div class="nav-link">
        <BIconInfoSquare :cursor="'pointer'" :fill="'#ffffff'" />
        <span>
          Scénář
        </span>
      </div>
      <div class="nav-link" @click="toggleQuestSidebar">
        <BIconJournalText :cursor="'pointer'" :fill="'#ffffff'"  />
        <span>
          Úkoly
        </span>
      </div>
      <Admin v-if="user.admin" />
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
import { getUser } from "../firebase/auth.js";

export default {
  name: "NavBar",
  setup(){
    const user = getUser()

    const questBar = getQuestSidebar()

    return { user, questBar, toggleQuestSidebar }
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

<style lang="scss" scoped>
.navbar{
  height: 100px;
}

 .navbar--right{
   display: grid;
   grid-auto-columns: 1fr;
   grid-auto-flow: column;
 }
</style>