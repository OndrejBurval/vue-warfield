<template>
<div class="list">

  <ul v-if="dataArray.length > 0">
    <li v-for="quest in dataArray" :key="quest.id">
      <Suspense>
          <Quest
              :id="quest.id"
              :title="quest.title"
              :desc="quest.desc"
              :index="quest.order"
              :lat="quest.marker.lat"
              :lng="quest.marker.lng"
              :status="quest.status"
              :team-id="quest.teamId"
              :list-length="dataArray.length"
          />
      </Suspense>
    </li>
  </ul>
  <h3 class="text-center opacity-50 my-4" v-else>
    Aktuálně nejsou žádné úkoly
  </h3>

</div>
</template>

<script>
import Quest from "../Quest.vue";

import { getQuestCollection, getTeamQuestCollection } from "../../firebase/firestore.js";
import { ref } from "vue";

export default {
  name: "ListQuest",

  async setup(props){

    if (props.filterTeam !== undefined){
      const dataArray = ref(await getTeamQuestCollection(props.filterTeam))
      return { dataArray }
    } else{
      const dataArray = ref(await getQuestCollection())
      return { dataArray }
    }
  },
  props: ["filterTeam"],
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