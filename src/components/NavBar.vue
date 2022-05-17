<template>
  <nav class="navbar d-flex justify-content-end px-4 navbar-dark bg-dark">

    <Admin />
  </nav>
</template>

<script>
import Admin from "./Admin.vue";

export default {
  name: "NavBar",
  components: {
    Admin,
  },
}
</script>

<style scoped>

</style>