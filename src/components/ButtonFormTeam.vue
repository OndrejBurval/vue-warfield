<template>

  <div @click="modalToggle" style="cursor: pointer">
    <slot>
    </slot>
  </div>


  <!-- Team Modal -->
  <Teleport to="body">
    <Transition name="fade">
      <Modal v-if="teamModal" @closeModal="modalToggle">
        <FormTeam :update="updateTeam" :team-name="teamName" :team-id="teamId" />
      </Modal>
    </Transition>
  </Teleport>
</template>

<script>
import Modal from "./Modal.vue";
import FormTeam from "./FormTeam.vue";


export default {
  name: "ButtonTeam",
  data() {
    return {
      teamModal: false,
      updateTeam: false
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
    },
    update: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    modalToggle() {
      if (this.update) this.updateTeam = !this.updateTeam
      this.teamModal = !this.teamModal
    }
  },
  components: {
    Modal,
    FormTeam
  },

}
</script>

<style scoped>

</style>