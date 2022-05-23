<template>
  <section class="panel">
    <div class="panel-inner">

      <Popper hover arrow content="Přidat úkol">
        <BIconPlusCircle :cursor="'pointer'" @click="modalToggle(teamName, teamId)"/>
      </Popper>

      <Popper class="ms-0" hover arrow content="Odebere všechny úkoly">
        <ButtonRemoveTeamQuests :team-id="teamId">
          <BIconTrash />
        </ButtonRemoveTeamQuests>
      </Popper>

    </div>
  </section>

  <!-- Quest Modal -->
  <Teleport to="body">
    <Transition name="fade">
      <Modal v-if="addModal" :toggle="modalToggle">
        <FormQuest :teamName="teamName" :teamId="teamId" />
      </Modal>
    </Transition>
  </Teleport>
</template>

<script>
import Modal from "./Modal.vue";
import FormQuest from "./FormQuest.vue";
import ButtonRemoveTeamQuests from "./buttons/ButtonRemoveTeamQuests.vue";
import {ref} from "vue";

export default {
  name: "AdminSmallPanel",
  setup(){
    const addModal = ref()

    const modalToggle = () => {
      addModal.value = !addModal.value
    }

    return { addModal, modalToggle }
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