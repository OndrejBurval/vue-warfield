<template>
  <form @submit.prevent="submit">
    <h2> {{ status.title }}  </h2>

    <input required v-model="teamName" class="form-control" type="text" placeholder="Název...">

    <color-picker class="full" v-model:pureColor="pureColor" v-model:gradientColor="gradientColor"/>


    <button type="submit" class="btn btn-primary w-100"> {{ status.button }} </button>
  </form>
</template>

<script>
import { addTeam, updateTeam } from "../../firebase.js";
import { ref, computed } from "vue";
import { ColorInputWithoutInstance } from "tinycolor2";

export default {
  name: "TeamAddForm",
  setup (props){
    const pureColor = ref<ColorInputWithoutInstance>("");
    const gradientColor = ref("linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)");

    const status = computed(() => ({
      title: props.update ? "Upravit" : "Přidat Tým",
      button: props.update ? "Uložit" : "Přidat"
    }))

    return { pureColor, gradientColor, status }
  },
  props: ["update", "teamName", "teamId"],
  methods: {
    async submit() {
      try {
        if (!this.pureColor){
          alert("Vyber barvu")
          return
        }
        if (this.update){
          await updateTeam(this.teamId, this.teamName, this.pureColor)
          window.location.reload()
        } else{
          await addTeam(this.teamName, this.pureColor)
          window.location.reload()
        }
      } catch (e){
        console.error(e)
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