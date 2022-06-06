<template>

  <section>
    <div class="inner">
      <div class="not-logged" v-if="!user" >
        <h2>
          Login
        </h2>

        <div class="form-group d-flex flex-column">
          <input class="form-control my-2" type="text" placeholder="email" v-model="email" />
          <input class="form-control my-2" type="password" placeholder="heslo" v-model="password" />
        </div>



        <button type="submit" class="btn btn-primary w-100 my-4" @click.prevent="login"> Přihlásit </button>
      </div>

      <div class="logged" v-if="user">
        <h2>
          Aktuálně je přihlášen: {{ user.email }}
        </h2>

        <button type="submit" class="btn btn-primary w-100 my-2" @click.prevent="logOut" > Odhlásit </button>
        <router-link to="/">
          <button type="submit" class="btn btn-primary w-100 my-2" > Homepage </button>
        </router-link>
      </div>
    </div>

  </section>


</template>

<script setup>
import { ref } from "vue";
import { logOut, logIn, getUser } from "../firebase/auth.js";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const user = getUser()

const email = ref()
const password = ref()


const login = () => {
  logIn(email.value, password.value)
}


</script>

<style scoped>

  section{

    min-height: 100vh;
    display: grid;
    place-items: center;
  }

  .inner{
    background: #cccccc;
    padding: 20px;
    border-radius: 20px;
  }

</style>