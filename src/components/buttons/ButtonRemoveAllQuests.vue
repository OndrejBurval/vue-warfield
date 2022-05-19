<template>
  <div @click="removeAllQuests">
    <slot>
    </slot>
  </div>
</template>

<script>
import { deleteAllQuests } from "../../firebase.js";

export default {
  name: "ButtonRemoveAllQuests",
  methods: {
    async removeAllQuests() {
      if(confirm("Opravdu chcete odebrat úplně všechny úkoly ? ")){
        deleteAllQuests()
      }
    }
  },
}
</script>

<style scoped>
  div{
    cursor: pointer;
  }
</style>