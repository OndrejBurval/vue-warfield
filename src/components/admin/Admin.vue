<template>

  <BIconGear class="hover-rotate me-3" :fill="'#ffffff'" @click="sidebarToggle" />
  <router-link to="/map-editor">
    <BIconMap :fill="'#ffffff'" />
  </router-link>

  <Transition name="slide-right">
    <SideBar v-if="sidebar" :title="'Admin module'" :overlay="false" :toggle="sidebarToggle">
      <Suspense>
        <ListTeams />
      </Suspense>
    </SideBar>
  </Transition>
</template>

<script>
import FormQuest from "../forms/FormQuest.vue";
import Modal from "../utils/Modal.vue";
import SideBar from "../utils/SideBar.vue";
import ListTeams from "../list/ListTeams.vue";
import {ref} from "vue";

export default {
  name: "Admin",
  setup(){
    const sidebar = ref(false)

    const sidebarToggle = () => {
      sidebar.value = !sidebar.value
    }

    return { sidebar, sidebarToggle }
  },
  components: {
    FormQuest,
    Modal,
    SideBar,
    ListTeams
  }
}
</script>

<style scoped>
  svg{
    cursor: pointer;
  }
</style>