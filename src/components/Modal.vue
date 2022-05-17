<template>
    <section class="modal">
      <div class="overlay" @click="$emit('closeModal')"></div>
      <div class="content">
        <slot></slot>
      </div>
    </section>
</template>

<script>
export default {
  name: "Modal"
}
</script>

<style lang="scss" scoped>
  .modal{
    position: fixed;
    inset: 0;
    z-index: 10;
    display: grid;
    place-items: center;
  }

  .overlay{
    position: absolute;
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
  }
</style>