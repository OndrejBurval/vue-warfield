<template>
  <div @click="removeTeam">
    <slot>
    </slot>
  </div>

</template>

<script>
import { deleteTeam, deleteTeamQuests } from "../../firebase/firestore.js";

export default {
  name: "ButtonRemoveTeam",
  async setup(props){

    const removeTeam = async () => {
      if (confirm("Opravdu chcete odebrat tým ? (Odebere i všechny úkoly)")){
        await deleteTeam(props.teamId)
        await deleteTeamQuests(props.teamId)
      }
    }

    return { removeTeam }
  },
  props: ["teamId"]
}
</script>

<style scoped>
  div{
    cursor: pointer;
  }
</style>