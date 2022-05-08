<template>
  <button class="btn btn-primary btn-edit" @click="swapEdit()"> {{ edit ? "Close edit" : "Edit" }} </button>

  <QuestEditor v-if="edit" :edit="edit" @stopEdit="swapEdit()" />
</template>

<script>
import QuestEditor from "./TheQuestEditor.vue";

export default {
  name: "Admin",
  data() {
    return {
      edit: false
    }
  },
  components: {
    QuestEditor
  },
  methods: {
    swapEdit() {
      this.edit = !this.edit
    }
  },
}
</script>

<style scoped>
  .btn-edit{
    position: fixed;
    inset: 20px 20px auto auto;
  }
</style>