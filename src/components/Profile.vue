<template>
  <div class="profileWrapper text-light me-4" @click="toggleContent = !toggleContent">
      <div class="profileImg">
        <BIconPersonFill v-if="user" />
        <BIconPerson v-else />
      </div>

      <div class="profileName" v-if="user">
        {{ userName }}
      </div>
      <div class="login" v-else>
        <router-link to="/login">
          Přihlásit
        </router-link>
      </div>


      <div class="toggleContent" v-if="toggleContent && user">
        <a @click.prevent="logOut"> Odhlásit </a>
      </div>

  </div>


</template>

<script setup>
import { ref, computed } from "vue";
import { getUser, logOut } from "../firebase/auth.js";

const user = getUser()
const toggleContent = ref(false)

const userName = computed(()=> {
  const splited = user.value.email.split("@")
  return splited[0]
})

</script>

<style lang="scss" scoped>
  h2{
    font-size: 1rem;
  }

  .profileWrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    cursor: pointer;
  }

  .toggleContent{
    position: absolute;
    top: 100%;
    background: white;
    border-radius: 5px;
    color: #2a2f34;
    padding: 5px 10px;



  }

  a{
    color: white;
    transition: .2s;
    &:hover{
      text-decoration: underline !important;
    }
  }

  svg:hover{
    &, *{
      fill: white !important;
    }

  }
</style>