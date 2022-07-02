<template>
  <NavBar />

  <div :class="questBarOpened" :data-questBar="questBarSettings">

    <div class="content--map">
      <Suspense>
        <VueGoogleMap />
      </Suspense>
    </div>


    <Transition name="fade">
      <div class="content--main" v-if="questBar">
        <Suspense>
          <template #default>
            <section class="container">
              <TheQuestWrapper />
            </section>
          </template>
          <template #fallback>
            <BIconArrowClockwise class="loading" />
          </template>
        </Suspense>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import NavBar from "../components/NavBar.vue";
import VueGoogleMap from "../components/VueGoogleMap.vue";
import TheQuestWrapper from "../components/TheQuestWrapper.vue";
import { getQuestSidebar, toggleQuestSidebar } from "../global/stateManagement.js";
import { computed } from "vue";

const questBar = getQuestSidebar()

const questBarOpened = computed(() => questBar.value ? 'main opened ' : 'main ')

const questBarSettings = computed(() => localStorage.getItem("questBar"))


</script>

<style lang="scss" scoped>


</style>