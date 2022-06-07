<template>
  <section class="panel" v-if="user && user.admin">
    <div class="panel-inner">

      <Popper hover arrow content="Přidat úkol">
        <BIconPlusCircle :cursor="'pointer'" @click="toggleModal(teamName, teamId)"/>
      </Popper>

      <Popper class="ms-0" hover arrow content="Odebere všechny úkoly">
        <ButtonRemoveTeamQuests :team-id="teamId" >
          <BIconTrash />
        </ButtonRemoveTeamQuests>
      </Popper>

    </div>
  </section>

  <!-- Quest Modal -->
  <Teleport to="body" v-if="user && user.admin">
      <Modal v-if="addModal" :toggle="toggleModal">
        <FormQuest :toggle="toggleModal" :teamName="teamName" :teamId="teamId" />
      </Modal>
  </Teleport>
</template>

<script>
import Modal from "../utils/Modal.vue";
import FormQuest from "../forms/FormQuest.vue";
import ButtonRemoveTeamQuests from "../buttons/ButtonRemoveTeamQuests.vue";
import { getUser } from "../../firebase/auth.js";
import { ref } from "vue";

export default {
  name: "AdminSmallPanel",
  setup(){
    const user = getUser()
    const addModal = ref(false)

    const toggleModal = () => {
      addModal.value = !addModal.value
    }

    return { user, addModal, toggleModal }
  },
  props: ["teamId", "teamName"],
  components: {
    Modal,
    FormQuest,
    ButtonRemoveTeamQuests
  },
}
</script>

<style lang="scss" scoped>
  .panel{
    position: relative;
    display: flex;
    place-items: center;
    justify-content: center;

  &-inner{
    background: white;
    padding-inline: 10px;
  }

  &::before{
     position: absolute;
     z-index: -1;
     content: "";
     width: 100%;
     height: 1px;
     background: #c8c9ca;
     top: 50%;
     transform: translateY(-50%);
     left: 0;
     opacity: .7;
   }
  }
</style>