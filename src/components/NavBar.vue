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

export default {
  name: "NavBar",
  data() {
    return {
      questBar: false
    }
  },
  components: {
    Admin,
    SideBar,
    ListQuests,
    TheQuestWrapper
  },
  methods: {
    questBarToggle() {
      this.questBar = !this.questBar
    }
  },
}
</script>

<style scoped>

</style>