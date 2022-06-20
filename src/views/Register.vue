<template>

  <p>
    local storage test:
    <button @click.prevent="setLocal"> Set local </button>
    {{ local }}
  </p>
  <h2>
    Vytvořit účet
  </h2>

  <div>
    Vytvořit
    <input type="text" placeholder="email" v-model="email" />
    <input type="password" placeholder="heslo" v-model="password" />
    <button type="submit" @click.prevent="create"> Vytvořit </button>
  </div>

  <div>
    Vytvořit admina
    <input type="text" placeholder="email" v-model="adminEmail" />
    <button type="submit" @click.prevent="createAdmin"> Přidat status </button>
  </div>

  <div>
    Odebrat účet
    <input type="text" placeholder="email" v-model="removeEmail" />
    <button type="submit" @click.prevent="deleteUser"> Odebrat účet </button>
  </div>

</template>

<script setup>
import { createUser } from "../firebase/auth.js";
import { ref} from "vue";
import { getAuth } from "firebase/auth";
import { addAdminRole, removeUserByEmail } from "../firebase/firebase.js";

const local = ref(localStorage.getItem("local"))

const email = ref()
const password = ref()
const adminEmail = ref()
const removeEmail = ref()

const auth = getAuth()
const user = ref()

const create = () => {
  createUser(email.value, password.value)
}

const setLocal = () => {
  localStorage.setItem('local', 'fasfhasf')
}

const createAdmin = () => {
  addAdminRole({ email: adminEmail.value })
      .then(result => {
        console.log(result)
      })
}

const deleteUser = () => {
  removeUserByEmail({ email: removeEmail.value })
      .then(result => {
        console.log(result)
      })
}





</script>

<style scoped>

</style>