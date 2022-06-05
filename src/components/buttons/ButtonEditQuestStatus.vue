<template>


  <div class="dropdown">
    <div class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown">
      <slot />
    </div>
    <ul class="dropdown-menu">
      <li v-for="(status, index) in statusArray"><a class="dropdown-item" @click.prevent="updateQuestStatus(questId, index)"> {{ status }}</a> </li>
    </ul>
  </div>



</template>

<script>
import { ref } from "vue";
import { updateQuestStatus } from "../../firebase/firestore.js";

export default {
  name: "ButtonEditQuestStatus",
  setup(){
    const statusArray = ref(["Neutrální", "Čekající", "Aktivní", "Dokončeno", "Selhalo"])


    return { statusArray, updateQuestStatus }
  },
  props: ["questId"]
}
</script>

<style scoped>
  div{
    cursor: pointer;
  }

</style>