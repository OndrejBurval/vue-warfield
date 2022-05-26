<template>


  <div class="dropdown">
    <div class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown">
      <slot />
    </div>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li v-for="(status, index) in statusArray"><a class="dropdown-item" @click.prevent="updateStatus(questId, index)"> {{ status }}</a> </li>
    </ul>
  </div>



</template>

<script>
import { ref } from "vue";
import { updateQuestStatus as updateStatus } from "../../firebase.js";

export default {
  name: "ButtonEditQuestStatus",
  setup(){
    const statusArray = ref(["Neutrální", "Čekající", "Aktivní", "Dokončeno", "Selhalo"])


    return { statusArray, updateStatus }
  },
  props: ["questId"]
}
</script>

<style scoped>
  div{
    cursor: pointer;
  }

</style>