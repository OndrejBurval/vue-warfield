<template>
  <div @click="removeTeam">
    <slot>
    </slot>
  </div>

</template>

<script>
import { deleteTeam, deleteTeamQuests } from "../../firebase/firestore.js";
import { removeUserByEmail } from "../../firebase/firebase.js";

export default {
  name: "ButtonRemoveTeam",
  async setup(props){

    const removeTeam = async () => {
      if (confirm("Opravdu chcete odebrat tým ? (Odebere i všechny úkoly)")){
        removeUserByEmail({ email: props.teamEmail })
            .then(result => {
              console.log(result)
            })
        await deleteTeamQuests(props.teamId)
        await deleteTeam(props.teamId)
      }
    }

    return { removeTeam }
  },
  props: ["teamId", "teamEmail"]
}
</script>

<style scoped>
  div{
    cursor: pointer;
  }
</style>