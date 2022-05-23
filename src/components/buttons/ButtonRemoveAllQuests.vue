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
  async setup(){
    const removeAllQuests = async () => {
      if(confirm("Opravdu chcete odebrat úplně všechny úkoly ? ")){
        await deleteAllQuests()
      }
    }

    return { removeAllQuests }
  }
}
</script>

<style scoped>
  div{
    cursor: pointer;
  }
</style>