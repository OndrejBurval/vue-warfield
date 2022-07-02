<template>
  <Transition :name="animation">
    <nav v-if="!questBar" class="navbar navbar-dark bg-dark px-md-5" :data-navbar="navBarSettings">

      <div class="navbar--left">
        <Profile />
      </div>

      <div class="navbar--right" v-if="user">

        <div class="nav-link" @click="modalToggle">
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
  </Transition>

  <Modal v-if="scenaryModal" :toggle="modalToggle">
    <Scenary />
  </Modal>
</template>

<script>
import Admin from "./admin/Admin.vue";
import SideBar from "./utils/SideBar.vue";
import ListQuests from "./list/ListQuests.vue";
import TheQuestWrapper from "./TheQuestWrapper.vue";
import Modal from "./utils/Modal.vue"
import Scenary from "../Scenary.vue";
import Profile from "./Profile.vue"

import { getQuestSidebar, toggleQuestSidebar } from "../global/stateManagement.js";
import { getUser } from "../firebase/auth.js";
import { ref, computed } from "vue";

export default {
  name: "NavBar",
  setup(){
    const user = getUser()
    const scenaryModal = ref(false)


    const questBar = getQuestSidebar()

    const modalToggle = () => scenaryModal.value = !scenaryModal.value

    const navBarSettings = computed(() => localStorage.getItem("navBar"))

    const animation = computed(() => navBarSettings.value === "top" ? "slide-top" : "slide-down")


    return { user, questBar, scenaryModal, toggleQuestSidebar, modalToggle, animation, navBarSettings }
  },
  components: {
    Admin,
    SideBar,
    ListQuests,
    TheQuestWrapper,
    Profile,
    Modal,
    Scenary
  }
}
</script>

<style lang="scss" scoped>


</style>