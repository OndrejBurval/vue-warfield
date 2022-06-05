<template>
  <form @submit.prevent="submit">
    <h2> {{ status.title }} <span class="badge" :style="{background: color, color: color}"> color </span> </h2>

    <input required v-model="teamName" class="form-control" type="text" placeholder="Název...">

    <color-picker v-model:pureColor="color" />


    <button type="submit" class="btn btn-primary w-100"> {{ status.button }} </button>
  </form>
</template>

<script>
import { addTeam, updateTeam } from "../../firebase.js";
import { ref, computed } from "vue";

export default {
  name: "TeamAddForm",
  setup (props){
    const color = ref();

    const status = computed(() => ({
      title: props.update ? "Upravit" : "Přidat Tým",
      button: props.update ? "Uložit" : "Přidat"
    }))

    return { status, color }
  },
  props: ["toggle", "update", "teamName", "teamId"],
  methods: {
    async submit() {
      if (this.update){
        await updateTeam(this.teamId, this.teamName)
        this.toggle()
      } else{
        await addTeam(this.teamName, this.color)
        this.toggle()
      }
    }
  }
}
</script>

<style scoped>

  *{
    margin-block: 10px;
  }

</style>