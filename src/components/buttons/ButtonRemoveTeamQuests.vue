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
  async setup(props) {

    const removeTeamQuests = async () => {
      if (confirm("Opravdu chcete odebrat všechny úkoly?")){
        await deleteTeamQuests(props.teamId)
        //window.location.reload()
      }
    }

    return { removeTeamQuests }
  },
  props: ["teamId"]
}
</script>

<style scoped>
  div{
    cursor: pointer;
  }
</style>