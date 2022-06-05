<template>
  <h2>
    Vytvořit účet
  </h2>

  <input type="text" placeholder="email" v-model="email" />
  <input type="password" placeholder="heslo" v-model="password" />

  <button type="submit" @click.prevent="create"> Vytvořit </button>
</template>

<script setup>
import { createUser } from "../firebase/auth.js";
import { ref } from "vue";

const email = ref()
const password = ref()

const create = () => {
  createUser(email.value, password.value)
}

</script>

<style scoped>

</style>