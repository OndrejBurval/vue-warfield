<template>

  <div @click="removeTeamQuests">
    <slot>
    </slot>
  </div>

</template>

<script>
import { deleteTeamQuests } from "../../firebase";

export default {
  name: "ButtonRemoveTeamQuests",
  props: {
    teamId: {
      type: String,
      default: undefined
    },
  },
  methods: {
    async removeTeamQuests(){
      if (confirm("Opravdu chcete odebrat všechny úkoly?")){
        try {
          await deleteTeamQuests(this.teamId)
          //window.location.reload()
        } catch (e){
          console.error(e)
        }
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