<template>
  <nav class="navbar d-flex justify-content-end px-4 navbar-dark bg-dark">
    <BIconQuestionDiamond :cursor="'pointer'" :fill="'#ffffff'" @click="questBarToggle" class="me-3"/>
    <Admin />
  </nav>



  <Transition name="slide-right">
    <SideBar v-if="questBar" :title="'Úkoly'" @closeSidebar="questBarToggle">
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
import Admin from "./Admin.vue";
import SideBar from "./SideBar.vue";
import ListQuests from "./ListQuests.vue";
import TheQuestWrapper from "./TheQuestWrapper.vue";

import {ref} from "vue";

export default {
  name: "NavBar",
  setup(){
    const questBar = ref()

    const questBarToggle = () => {
      questBar.value = !questBar.value
    }

    return { questBar, questBarToggle }
  },
  components: {
    Admin,
    SideBar,
    ListQuests,
    TheQuestWrapper
  }
}
</script>

<style scoped>

</style>