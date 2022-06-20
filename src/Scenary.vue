<template>
  <section v-if="!user.admin">
    <h2>
      {{userData.name}}
    </h2>
    <p>
      {{userData.scenary}}
    </p>
  </section>

  <section v-else>

    <div class="accordion" id="teamScenaryList">
      <div class="accordion-item" v-for="team in teamCollection" :key="team.id">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="edit ? '' : `#${team.id}`">
            {{ team.name }}
          </button>
        </h2>
        <div :id="team.id" class="accordion-collapse collapse" data-bs-parent="#teamScenaryList">
          <div class="accordion-body d-flex flex-column">

            <p v-if="!edit">
              {{ team.scenary }}
            </p>
            <textarea v-if="edit" required v-model="scenaryText" class="form-control" placeholder="Scénář"></textarea>


            <button class="btn btn-primary mb-2 mt-4 w-25" @click.prevent="submit(team.id, team.scenary)"> {{ buttonText }} </button>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { getUser, getUserData } from "./firebase/auth.js";
import { getTeamsCollection, updateTeamScenary } from "./firebase/firestore.js";
import { ref, computed, onUnmounted } from "vue";

  const user = getUser()
  const userData = getUserData()

  const scenaryText = ref()

  const edit = ref(false)

  const teamCollection = user.admin ? "No admin rights" : await getTeamsCollection()

  const submit = async (teamID, text) => {
    if ( edit.value ) {
      await updateTeamScenary(teamID, scenaryText.value)
    } else{
      scenaryText.value = text
    }
    edit.value = !edit.value
  }

  const buttonText = computed(() => {
    return edit.value ? "Uložit změnu" : "Upravit"
  })

  onUnmounted(() => {
    edit.value = false
  })

</script>

<style scoped>

section{
  width: min(90vw, 800px);
}

</style>