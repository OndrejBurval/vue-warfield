<template>
  <section>
    <div class="overlay" @click="$emit('closeSidebar')"></div>

    <div class="content">
      <div class="header">
        <h2> {{ title }}</h2>
      </div>

      <slot></slot>
    </div>
  </section>
</template>

<script>

export default {
  name: "SideBar",
  props: {
    title: {
      type: String,
      default: "Sidebar"
    }
  }
}
</script>

<style scoped>

  svg{
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
    padding: 0 30px 40px 30px;
    height: 100vh;
    min-width: 300px;
  }

  h2{
    width: 100%;
    text-align: center;
  }

  .header{
    background: #2a2f34;
    width: calc(100% + 60px);
    margin-left: -30px;
    padding-block: 20px;
    margin-bottom: 15px;
    color: white;
  }

</style>