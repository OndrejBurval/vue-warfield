<template>
  <section>
    <div class="overlay" @click="$emit('closeSidebar')"></div>
    <div class="content">
      <h2> {{ title }}</h2>
      <hr>
      <slot></slot>
    </div>
  </section>
</template>

<script>
import IconSettings from "../icons/IconSettings.vue";

export default {
  name: "SideBar",
  props: {
    title: {
      type: String,
      default: "Sidebar"
    }
  },
  components: {
    IconSettings,
  },
}
</script>

<style scoped>

  svg{
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  section{
    position: fixed;
    inset: 0;
    z-index: 10;
    display: grid;
    place-items: start end;
  }

  .overlay{
    position: absolute;
    inset: 0;
    background: black;
    opacity: .5;
    z-index: 11;
    translate: none !important;
    width: 200%;
    left: -100%;
  }

  .content{
    position: relative;
    z-index: 12;
    background: white;
    padding: 40px 30px;
    border-radius: 20px 0 0 20px;
    height: 100vh;
    min-width: 300px;
  }

  h2{
    width: 100%;
    text-align: center;
  }

</style>