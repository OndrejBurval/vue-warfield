<template >
  <div v-if="user && user.admin">
    <BIconGear class="hover-rotate me-3" :fill="'#ffffff'" @click="sidebarToggle" />
    <router-link to="/map-editor">
      <BIconMap :fill="'#ffffff'" />
    </router-link>

    <Transition name="slide-right">
      <SideBar v-if="sidebar" :title="'Admin module'" :overlay="false" :toggle="sidebarToggle">
        <Suspense>
          <ListTeams />
        </Suspense>
  
        <ListMapSettings />

      </SideBar>
    </Transition>
  </div>
</template>

<script>
import FormQuest from "../forms/FormQuest.vue";
import Modal from "../utils/Modal.vue";
import SideBar from "../utils/SideBar.vue";
import ListTeams from "../list/ListTeams.vue";
import ListMapSettings from "../list/ListMapSettings.vue";
import { ref } from "vue";
import { getUser } from "../../firebase/auth.js";

export default {
  name: "Admin",
  setup(){
    const user = getUser()
    const sidebar = ref(false)

    const sidebarToggle = () => {
      sidebar.value = !sidebar.value
    }

    return { user, sidebar, sidebarToggle }
  },
  components: {
    FormQuest,
    Modal,
    SideBar,
    ListTeams,
    ListMapSettings
  }
}
</script>

<style scoped>
  svg{
    cursor: pointer;
  }
</style>