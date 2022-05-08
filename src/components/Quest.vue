<template>
  <div :data-quest="id">
    <h2>
      {{ id }}. {{ title }}

    </h2>
    <p>
      {{ desc }}
    </p>
  </div>

</template>

<script>
export default {
  name: "Quest",
  props: {
    id: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: "Title"
    },
    desc: {
      type: String,
      default: "Desc"
    },

  },
}
</script>

<style scoped>
  div{
    background: lightblue;
  }
</style>