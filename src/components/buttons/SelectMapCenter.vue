<template>

  <p>Active: {{ selected }}</p>
  <select class="form-select" v-model="selected">

    <option v-for="place in places" :key="place.id">
      {{ place.name }}
    </option>

  </select>
    <div >
    </div>

</template>

<script setup>
import { getPlacesCollection } from "../../firebase/firestore.js";
import { ref } from "vue";

    const places = await getPlacesCollection()
    const selected = ref();

</script>

<style scoped>

</style>