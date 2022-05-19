<template>
  <div @click="removeTeam">
    <slot>
    </slot>
  </div>

</template>

<script>
import { deleteTeam, deleteTeamQuests } from "../../firebase";

export default {
  name: "ButtonRemoveTeam",
  props: {
    teamId: {
      type: String,
      default: undefined
    }
  },
  methods: {
    async removeTeam(){
      if (confirm("Opravdu chcete odebrat tým ? (Odebere i všechny úkoly)")){
        await deleteTeam(this.teamId)
        await deleteTeamQuests(this.teamId)
      }
    }
  }
}
</script>

<style scoped>
  div{
    cursor: pointer;
  }
</style>