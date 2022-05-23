<template>

  <div @click="modalToggle">
    <slot>
    </slot>
  </div>


  <!-- Team Modal -->
  <Modal v-if="teamModal" :toggle="modalToggle">
    <FormTeam :update="updateTeam" :team-name="teamName" :team-id="teamId" />
  </Modal>


</template>

<script>
import Modal from "../Modal.vue";
import FormTeam from "../FormTeam.vue";

import {ref} from "vue";


export default {
  name: "ButtonTeam",
  setup(props){
    const teamModal = ref();
    const updateTeam = ref();

    const modalToggle = () => {
      if (props.update) updateTeam.value = !updateTeam.value
      teamModal.value = !teamModal.value
    }

    return { teamModal, updateTeam, modalToggle }
  },
  props: ["teamId", "teamName", "update"],
  components: {
    Modal,
    FormTeam
  }
}
</script>

<style scoped>
  div{
    cursor: pointer;
  }

</style>