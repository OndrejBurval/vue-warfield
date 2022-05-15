<template>
  <button class="btn btn-primary btn-edit" v-if="!edit" @click="edit = !edit"> Add quest </button>

  <Transition name="fade">
    <Modal v-if="edit" @closeModal="edit = !edit">
      <QuestForm />
    </Modal>
  </Transition>
</template>

<script>
import QuestForm from "./QuestForm.vue";
import Modal from "./Modal.vue";

export default {
  name: "Admin",
  data() {
    return {
      edit: false
    }
  },
  components: {
    QuestForm,
    Modal
  }
}
</script>

<style scoped>
  .btn-edit{
    position: fixed;
    inset: 20px 20px auto auto;
  }
</style>