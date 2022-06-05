<template>

  <h2>
    Login
  </h2>

  <input type="text" placeholder="email" v-model="email" />
  <input type="password" placeholder="heslo" v-model="password" />

  <div v-if="errMsg"> {{ errMsg }}</div>

  <button type="submit" @click.prevent="login"> Přihlásit </button>
  <button type="submit" @click.prevent="logOut"> Odhlásit </button>

</template>

<script setup>
import { ref } from "vue";
import { logOut, logIn, getIsLoggedIn } from "../firebase/auth.js";

const logged = getIsLoggedIn()

const email = ref()
const password = ref()
const errMsg = ref()




const login = () => {
  logIn(email.value, password.value)
}


</script>

<style scoped>

</style>