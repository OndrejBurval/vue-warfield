<template>
  <section class="panel">
    <div class="panel-inner">

      <Popper hover arrow content="Přidat úkol">
        <BIconPlusCircle :cursor="'pointer'" @click="addModalToggle(teamName, teamId)"/>
      </Popper>

      <Popper class="ms-0" hover arrow content="Odebere všechny úkoly">
        <BIconTrash :cursor="'pointer'" @click="removeTeamQuests(teamId)" />
      </Popper>

    </div>
  </section>

  <!-- Quest Modal -->
  <Teleport to="body">
    <Transition name="fade">
      <Modal v-if="addModal" @closeModal="addModalToggle">
        <FormQuest :teamName="teamName" :teamId="teamId" />
      </Modal>
    </Transition>
  </Teleport>
</template>

<script>
import { deleteTeamQuests } from "../firebase";
import Modal from "./Modal.vue";
import FormQuest from "./FormQuest.vue";

export default {
  name: "AdminSmallPanel",
  data() {
    return {
      addModal: false,
    }
  },
  props: {
    teamName: {
      type: String,
      default: undefined
    },
    teamId: {
      type: String,
      default: undefined
    }
  },
  methods: {
    addModalToggle(teamName, teamId) {
      this.addModal = !this.addModal
      this.teamName = teamName
      this.teamId = teamId
    },
    async removeTeamQuests(teamId){
      if (confirm("Opravdu chcete všechny úkoly?")){
        await deleteTeamQuests(teamId)
        window.location.reload()
      }
    }
  },
  components: {
    Modal,
    FormQuest
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