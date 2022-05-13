<template>
  <div :data-quest="id">
    <div class="grid">
      <div class="grid-item">
        <h2>
          {{ title }}
        </h2>
        <p>
          {{ desc }}
        </p>
      </div>
      <div class="grid-item utils">
        <IconSettings />
        <IconBin />
      </div>
    </div>

  </div>

</template>

<script>
import IconBin from "../icons/IconBin.vue";
import IconSettings from "../icons/IconSettings.vue";

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
  components: {
    IconBin,
    IconSettings
  },
}
</script>

<style lang="scss" scoped>

  .utils{
    padding: 10px;
    place-items: center;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
  }

  svg{
    width: 24px;
    height: auto;
    aspect-ratio: 1;
  }

  .grid{
    display: grid;
    grid-template-columns: auto min-content;
  }
</style>