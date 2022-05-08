<template>
<div>
  <h2> Quest list </h2>
  <ul>
    <li v-for="(quest, index) in questArray">
      <Quest :id="index + 1" :title="quest.title" :desc="quest.desc" />
    </li>
  </ul>
</div>
</template>

<script>
import Quest from "./Quest.vue";


export default {
  name: "QuestList",
  components: {
    Quest,
  },
  data() {
    return {
      questArray: [
        {
          title: "Quest title",
          desc: "Quest desc "
        },
        {
          title: "Quest title 2",
          desc: "Quest desc 2 "
        },
        {
          title: "Quest title 3",
          desc: "Quest desc 3 "
        }
      ]
    }
  },
}
</script>

<style scoped>

</style>