<template>
  <nav class="navbar navbar-dark bg-dark px-5">

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
import { ref } from "vue";

export default {
  name: "NavBar",
  setup(){
    const user = getUser()
    const scenaryModal = ref(false)

    const questBar = getQuestSidebar()

    const modalToggle = () => scenaryModal.value = !scenaryModal.value

    return { user, questBar, scenaryModal, toggleQuestSidebar, modalToggle }
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