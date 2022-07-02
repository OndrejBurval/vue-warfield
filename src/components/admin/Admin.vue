<template >
    <div class="nav-link" @click="sidebarToggle" >
      <BIconGear :fill="'#ffffff'" />
      <span>
        Rychlé nastavení
      </span>
    </div>

    <div class="nav-link">
      <router-link to="/game-settings">
        <BIconWrenchAdjustableCircle :fill="'#ffffff'" />
        <span>
         Nastavení
        </span>
      </router-link>
    </div>

  <Teleport to="body">
    <Transition name="slide-right">
        <SideBar v-if="sidebar" :title="'Admin module'" :overlay="false" :toggle="sidebarToggle">
          <Suspense>
            <ListTeams />
          </Suspense>
        </SideBar>
      </Transition>
  </Teleport>

</template>

<script>
import FormQuest from "../forms/FormQuest.vue";
import Modal from "../utils/Modal.vue";
import SideBar from "../utils/SideBar.vue";
import ListTeams from "../list/ListTeams.vue";
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
  }
}
</script>

<style scoped>
  svg{
    cursor: pointer;
  }
</style>