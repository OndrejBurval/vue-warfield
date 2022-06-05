<template>
  <div class="d-flex align-items-center flex-column text-light me-4" v-if="user">
    <div class="profileImg">

    </div>
    {{ userName }}
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getUser, getIsLoggedIn } from "../firebase/auth.js";

const user = getUser()


const userName = computed(()=> {
  const splited = user.value.email.split("@")
  return splited[0]
})

</script>

<style scoped>
  h2{
    font-size: 1rem;
  }
  .profileImg{
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: lightblue;
  }
</style>