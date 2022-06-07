<template>
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
    Odebrat {{ user }}
    <input type="text" placeholder="user" v-model="user" />
    <button type="submit" @click.prevent="remove"> Odebrat </button>
    <button type="submit" @click.prevent="getUser"> Get current user </button>
  </div>

  <div>
    Vytvořit admina
    <input type="text" placeholder="email" v-model="adminEmail" />
    <button type="submit" @click.prevent="createAdmin"> Přidat status </button>
  </div>

</template>

<script setup>
import { createUser } from "../firebase/auth.js";
import { onMounted, ref} from "vue";
import { deleteUser, getAuth } from "firebase/auth";
import { addAdminRole } from "../firebase/firebase.js";

const email = ref()
const password = ref()
const adminEmail = ref()

const auth = getAuth()
const user = ref()
user.value = auth.currentUser

const create = () => {
  createUser(email.value, password.value)
}

const createAdmin = () => {
  addAdminRole({ email: adminEmail.value })
      .then(result => {
        console.log(result)
      })
}

const remove = async () => {
  await deleteUser(user.value)
      .then(() => {
        console.log("Deleted")
      })
      .catch((e) => {
        console.log(e)
      })
}

onMounted(() => {
  user.value = auth.currentUser
  console.log(user.value)
})

const getUser = () => {
  user.value = auth.currentUser
}

</script>

<style scoped>

</style>