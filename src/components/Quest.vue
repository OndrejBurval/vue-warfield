<template>
  <Transition name="slide-fade">
    <div v-if="!removed" class="wrapper" :class="questFocused" @click="questClicked" :data-quest="id" :data-focused="clicked">

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
          <BIconGear class="hover-rotate" @click="toggleModal" />
          <BIconTrash @click="removeQuest" />
        </div>
      </div>
    </div>
  </Transition>


    <Modal v-if="edit" :toggle="toggleModal">
      <FormQuest update="true" :doc_id="id" :title="title" :desc="desc" :passed-lat="lat" :passed-lng="lng" />
    </Modal>
</template>

<script>
// Components
import FormQuest from "./forms/FormQuest.vue";
import Modal from "./utils/Modal.vue";

// Functions
import { deleteQuest, getTeam } from "../firebase.js";
import { getSelectedQuest,setSelectedQuest } from "../global/storage.js";
import { getQuestSidebar } from "../global/stateManagement.js";
import { ref, computed, watch } from "vue";


export default {
  name: "Quest",
  async setup(props){
    const edit = ref();
    const removed = ref();
    const focused = ref(false);
    const selectedQuest = ref(getSelectedQuest())
    const sidebar = getQuestSidebar()

    const team = await getTeam(props.teamId)

    const toggleModal = () => {
      edit.value = !edit.value
    }

    const removeQuest = () => {
      deleteQuest(props.id)
      removed.value = true
    }

    const questClicked = () => {
      if (focused.value){
        setSelectedQuest(undefined)
      } else{
        setSelectedQuest(props.id)
      }
    }

    const questFocused = computed(() => {
      return focused.value ? 'focused' : 'default'
    })

    watch(() => selectedQuest.value, (newValue) => {
      newValue === props.id ? focused.value = true : focused.value = false
    });

    return { questFocused,team, edit, removed, clicked: focused, selectedQuest, questClicked, removeQuest, toggleModal }
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