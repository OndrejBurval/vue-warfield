<template>
  <Transition name="slide-fade">
    <div v-if="!removed" class="wrapper" ref="reference" :class="focused" @click="getClickedQuest" :data-quest="id">
      <div class="grid">
        <div class="grid-item">
          <h2>
            {{ index }}. {{ title }}
          </h2>
          <p>
            {{ desc }}
          </p>
          <span v-if="lat && lng"> Lat: {{lat}}, Lng: {{ lng }}  </span>
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
import { ref } from "vue";

export default {
  name: "Quest",
  async setup(props){
    const edit = ref();
    const removed = ref();
    const focused = ref();

    const team = await getTeam(props.teamId)

    const removeQuest = () => {
      deleteQuest(props.id)
      removed.value = true
    }

    const getClickedQuest = () => {
      focused.value === false ? focused.value = "focused" : focused.value = false
      const associatedMarker = document.querySelector("[data-marker="+ JSON.stringify(props.id) +"]")
      associatedMarker.classList.add("selected")
    }

    return { getClickedQuest, removeQuest, team, edit, removed, focused }
  },
  props: ["id", "teamId", "title", "desc", "index", "lat", "lng"],
  components: {
    FormQuest,
    Modal
  }
}
</script>

<style lang="scss" scoped>

  .wrapper{
    margin-bottom: 10px;
    background-image: linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%);
    border-radius: 15px;
    padding: 10px 20px;
    cursor: pointer;
    transition: .3s;

    &:hover{
      box-shadow: rgba(0, 0, 0, 0.2) 0 0 10px;
    }
  }

  .utils{
    padding: 10px;
    place-items: center;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
  }

  .focused{
    transform: scale(1.025);
    background: orange;
  }

  svg{
    cursor: pointer;
  }

  .grid{
    display: grid;
    grid-template-columns: auto min-content;
  }
</style>