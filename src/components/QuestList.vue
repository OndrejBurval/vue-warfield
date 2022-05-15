<template>
<div class="list">
  <h2> Quest list </h2>
  <ul>
    <li v-for="quest in dataArray">
      <Quest :id="quest.id" :title="quest.title" :desc="quest.desc" />
    </li>
  </ul>

</div>
</template>

<script>
import Quest from "./Quest.vue";

import { getQuestCollection } from "../firebase.js";

export default {
  name: "QuestList",

  async setup(){//
    const dataArray = await getQuestCollection()
    return { dataArray }
  },
  components: {
    Quest,
  }
}
</script>

<style lang="scss" scoped>

  @keyframes color-change {
    0% {
      background: #19dcea;
    }
    100% {
      background: #b22cff;
    }
  }

  ul{
    margin: 0;
    padding: 0;
    list-style: none;

  }

  .list{
    width: min(95vw, 800px);
    margin-inline: auto;
  }

</style>