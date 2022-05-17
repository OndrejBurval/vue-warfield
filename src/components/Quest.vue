<template>
  <Transition name="slide-fade">
    <div v-if="!removed" class="wrapper" :data-quest="id">
      {{ team.name }}

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
          <BIconGear class="hover-rotate" @click="edit = !edit" />
          <BIconTrash @click="removeQuest" />
        </div>
      </div>
    </div>
  </Transition>


  <Transition name="fade">
    <Modal v-if="edit" @closeModal="edit = !edit">
      <FormQuest :update="true" :doc_id="id" :title="title" :desc="desc" />
    </Modal>
  </Transition>
</template>

<script>
// Components
import FormQuest from "./FormQuest.vue";
import Modal from "./Modal.vue";

// Functions
import { deleteQuest, getTeam } from "../firebase.js";


export default {
  name: "Quest",
  async setup(props){
    const team = await getTeam(props.teamId)
    return { deleteQuest, team }
  },
  data() {
    return {
      edit: false,
      removed: false,
      testId: this.testId
    }
  },
  props: {
    id: {
      type: String,
      default: 0
    },
    teamId: {
      type: String,
      default: undefined
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
    FormQuest,
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
    cursor: pointer;
  }

  .grid{
    display: grid;
    grid-template-columns: auto min-content;
  }
</style>