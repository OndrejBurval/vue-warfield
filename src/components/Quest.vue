<template>
  <div class="wrapper" :data-quest="id">
    <div class="grid">
      <div class="grid-item">
        <h2>
          {{ title }}
        </h2>
        <p>
          {{ desc }}
        </p>
      </div>
      <div class="grid-item utils">
        <IconSettings @click="edit = !edit" />
        <IconBin @click="deleteQuest()" />
      </div>
    </div>

  </div>


  <TheQuestEditorModal v-if="edit" :edit="edit" :update="true" :title="title" :desc="desc" @stopEdit="swapEdit()" />


</template>

<script>
// Assets
import IconBin from "../icons/IconBin.vue";
import IconSettings from "../icons/IconSettings.vue";
import TheQuestEditorModal from "./TheQuestEditorModal.vue";


//
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.js";


export default {
  name: "Quest",
  data() {
    return {
      edit: false
    }
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: "Title"
    },
    desc: {
      type: String,
      default: "Desc"
    }
  },
  components: {
    IconBin,
    IconSettings,
    TheQuestEditorModal
  },
  methods: {
    async deleteQuest() {
          await deleteDoc(doc(db, "quest", this.id));
          window.location.reload()
    },
    swapEdit() {
      this.edit = !this.edit
    }
  }
}
</script>

<style lang="scss" scoped>


  .wrapper{
    margin-bottom: 10px;
    background-color: #74EBD5;
    background-image: linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%);
    border-radius: 15px;
    padding: 10px 20px;
  }

  .utils{
    padding: 10px;
    place-items: center;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
  }

  svg{
    width: 24px;
    height: auto;
    aspect-ratio: 1;
    cursor: pointer;
  }

  .grid{
    display: grid;
    grid-template-columns: auto min-content;
  }
</style>