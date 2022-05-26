<template>
  <Transition name="slide-fade">
    <div class="wrapper" :class="questFocused" :data-quest="data_id" :data-focused="focused">

      <div class="grid">
        <div class="grid-item" @click="questClicked">
          <h2>
            {{ data_index }}. {{ data_title }} <span class="badge bg-secondary" :data-status="data_status" > {{ questStatus }} </span>
          </h2>
          <p>
            {{ data_desc }}
          </p>
          <span v-if="lat && lng"> Lat: {{ data_lat }}, Lng: {{ data_lng }}  </span>
        </div>
        <div class="grid-item utils">
          <ButtonEditQuestStatus :quest-id="data_id">
            <BIconFlag />
          </ButtonEditQuestStatus>
          <BIconGear class="hover-rotate" @click="toggleModal" />
          <BIconTrash @click="removeQuest" />
        </div>
      </div>
    </div>
  </Transition>


    <Modal v-if="edit" :toggle="toggleModal">
      <FormQuest update="true" :doc_id="id" :title="title" :desc="desc" :passed-lat="lat" :passed-lng="lng" :passed-status="status" />
    </Modal>
</template>


<script>
// Components
import FormQuest from "./forms/FormQuest.vue";
import Modal from "./utils/Modal.vue";
import ButtonEditQuestStatus from "./buttons/ButtonEditQuestStatus.vue"

// Functions
import { deleteQuest, getTeam } from "../firebase.js";
import { getSelectedQuest,setSelectedQuest } from "../global/storage.js";
import { ref, computed, watch, toRefs } from "vue";


export default {
  name: "Quest",
  async setup(props){
    const edit = ref();
    const focused = ref(false);
    const selectedQuest = ref(getSelectedQuest())

    const {
      id: data_id,
      title: data_title,
      desc: data_desc,
      index: data_index,
      lat: data_lat,
      lng: data_lng,
      status: data_status,
    } = toRefs(props)


    const toggleModal = () => {
      edit.value = !edit.value
    }

    const removeQuest = () => {
      deleteQuest(props.id)
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

    const questStatus = computed(() => {
      switch (props.status){
        case 0:
          return "Neutrální";
        case 1:
          return "Čekající";
        case 2:
          return "Aktivní";
        case 3:
          return "Dokončený";
        case 4:
          return "Selhal";
      }
    })

    watch(() => selectedQuest.value, (newValue) => {
      newValue === props.id ? focused.value = true : focused.value = false
    });

    return {
      questFocused, edit, focused, selectedQuest,
      questClicked, removeQuest, toggleModal, questStatus,
      data_id, data_title, data_desc, data_index, data_lat, data_lng, data_status
    }
  },
  props: ["id", "title", "desc", "index", "lat", "lng", "status"],
  components: {
    FormQuest,
    Modal,
    ButtonEditQuestStatus
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

  [data-status="0"]{ background: #565656 !important; } // Neutrální
  [data-status="1"]{ background: #ef9c1e !important; } // Čekající
  [data-status="2"]{ background: #299cc9 !important; } // Aktivní
  [data-status="3"]{ background: #1dbb31 !important; } // Dokončený
  [data-status="4"]{ background: #e73f3f !important; } // Selhal


</style>