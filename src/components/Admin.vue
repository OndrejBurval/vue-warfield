<template>
  <IconSettings :width="40" :height="40" @click="sidebarToggle" />

  <Transition name="slide-right">
    <SideBar v-if="sidebar" :title="'Admin module'" @closeSidebar="sidebarToggle">

      <h3> Team list </h3>
      <hr>
      <Suspense>
        <TeamList />
      </Suspense>
    </SideBar>
  </Transition>
</template>

<script>
import QuestForm from "./QuestForm.vue";
import Modal from "./Modal.vue";
import SideBar from "./SideBar.vue";
import IconSettings from "../icons/IconSettings.vue";
import TeamList from "./TeamList.vue";

export default {
  name: "Admin",
  data() {
    return {
      sidebar: false,
      edit: false
    }
  },
  components: {
    QuestForm,
    Modal,
    SideBar,
    IconSettings,
    TeamList
  },
  methods: {
    sidebarToggle() {
      this.sidebar = !this.sidebar
    }
  },
}
</script>

<style scoped>

svg{
  position: fixed;
  inset: 10px 10px auto auto;
  cursor: pointer;
}

</style>