<template>

  <div @click="modalToggle">
    <slot>
    </slot>
  </div>


  <!-- Team Modal -->
  <Modal v-if="teamModal" :toggle="modalToggle">
    <FormTeam :toggle="modalToggle" :update="updateTeam" :team-name="teamName" :team-id="teamId" :scenary="teamScenary" />
  </Modal>


</template>

<script>
import Modal from "../utils/Modal.vue";
import FormTeam from "../forms/FormTeam.vue";

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
  props: ["teamId", "teamName", "update", "teamScenary"],
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