<template>
  <form @submit.prevent="submit">
    <h2> {{ status.title }} </h2>

    <input required v-model="teamName" class="form-control" type="text" placeholder="Název...">

    <color-picker class="ed" useType="pure" v-model:pureColor="color" />


    <label for="scenary_textarea"> Scénář </label>
    <textarea required v-model="scenary" class="form-control" id="scenary_textarea" placeholder="Text..."></textarea>



    <button type="submit" class="btn btn-primary w-100"> {{ status.button }} </button>
  </form>
</template>

<script>
import { addTeam, updateTeam } from "../../firebase/firestore.js";
import { createUser } from "../../firebase/auth.js";
import {ref, computed, onMounted} from "vue";

export default {
  name: "TeamAddForm",
  setup (props){
    const color = ref();

    const status = computed(() => ({
      title: props.update ? "Upravit" : "Přidat Tým",
      button: props.update ? "Uložit" : "Přidat"
    }))

    onMounted(() => {
      const tst = document.querySelector(".vc-color-wrap")
      tst.style.width = "100%"
    })

    return { status, color }
  },
  props: ["toggle", "update", "teamName", "teamId", "scenary"],
  methods: {
    async submit() {
      if (this.update){
        await updateTeam(this.teamId, this.teamName, this.color, this.scenary)
        this.toggle()
      } else{
        const userName = this.teamName.replaceAll(" ", "-").toLocaleLowerCase();
        const password = "123456"
        await createUser(userName, password)
        await addTeam(this.teamName, this.color, userName + "@warfield.cz", this.scenary)
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