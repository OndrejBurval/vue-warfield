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

import { db } from "../firebase.js";
import { addDoc, collection, getDocs, serverTimestamp, query, orderBy } from "firebase/firestore";

export default {
  name: "QuestList",

  async setup(){//
    const questSnapshot = await getDocs(query(collection(db, "quest"), orderBy("created", "asc")));
    const dataArray = []
    questSnapshot.forEach(e => {
      dataArray.push({ id: e.id, ...e.data() })
    })
    return { dataArray }
  },
  components: {
    Quest,
  },
  methods: {
    async addDocument() {
      await addDoc(collection(db, "quest"), {
            title: "Button added quest",
            desc: "Button desc",
            created: serverTimestamp()
        });
      window.location.reload()
    }
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