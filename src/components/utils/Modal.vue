<template>
  <Teleport to="body">
      <section class="modal">
        <div class="overlay" @click="toggle"></div>
        <div class="content">
          <slot></slot>
        </div>
      </section>
  </Teleport>
</template>

<script>
export default {
  name: "Modal",
  props: ["toggle"]
}
</script>

<style lang="scss" scoped>
  .modal{
    position: fixed;
    min-width: 100vw;
    min-height: 100vh;
    height: 100%;
    z-index: 10;
    display: grid;
    place-items: center;
  }

  .overlay{
    position: fixed;
    height: 100%;
    width: 100%;
    inset: 0;

    background: black;
    opacity: .5;
    z-index: 11;
  }

  .content{
    position: relative;
    z-index: 12;
    background: white;
    padding: 40px 30px;
    border-radius: 20px;


    height: min-content;
    max-height: 90vh;
    overflow: auto;
  }
</style>