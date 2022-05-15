<script setup>
  import Admin from "./components/Admin.vue";
  import QuestList from "./components/QuestList.vue";

</script>

<template>

  <Suspense>
    <template #default>
      <QuestList />
    </template>
    <template #fallback>
      Loading ...
    </template>
  </Suspense>
  <Admin />
</template>

<style lang="scss">
@import './assets/base.css';
@import "./assets/transitions.css";



</style>
