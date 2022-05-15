<template>
  <Transition name="slide-fade">
    <div v-if="!removed" class="wrapper" :data-quest="id">
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
          <IconBin @click="removeQuest" />
        </div>
      </div>
    </div>
  </Transition>


  <Transition name="fade">
    <Modal v-if="edit" @closeModal="edit = !edit">
      <QuestForm :update="true" :doc_id="id" :title="title" :desc="desc" />
    </Modal>
  </Transition>
</template>

<script>
// Assets
import IconBin from "../icons/IconBin.vue";
import IconSettings from "../icons/IconSettings.vue";

// Components
import QuestForm from "./QuestForm.vue";
import Modal from "./Modal.vue";

// Functions
import { deleteQuest } from "../firebase.js";


export default {
  name: "Quest",
  setup(){
    return { deleteQuest }
  },
  data() {
    return {
      edit: false,
      removed: false
    }
  },
  props: {
    id: {
      type: String,
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
    QuestForm,
    Modal
  },
  methods: {
    removeQuest() {
      deleteQuest(this.id)
      this.removed = true
    }
  },
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