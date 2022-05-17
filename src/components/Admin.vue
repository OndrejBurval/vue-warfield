<template>

  <BIconGear class="hover-rotate" :fill="'#ffffff'" @click="sidebarToggle" />

  <Transition name="slide-right">
    <SideBar v-if="sidebar" :title="'Admin module'" :overlay="false" @closeSidebar="sidebarToggle">
      <Suspense>
        <ListTeams />
      </Suspense>
    </SideBar>
  </Transition>
</template>

<script>
import FormQuest from "./FormQuest.vue";
import Modal from "./Modal.vue";
import SideBar from "./SideBar.vue";
import ListTeams from "./ListTeams.vue";

export default {
  name: "Admin",
  data() {
    return {
      sidebar: false,
      edit: false
    }
  },
  components: {
    FormQuest,
    Modal,
    SideBar,
    ListTeams
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
  cursor: pointer;
}

</style>