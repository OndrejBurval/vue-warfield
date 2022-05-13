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
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";

export default {
  name: "QuestList",

  async setup(){//
    const questSnapshot = await getDocs(collection(db, "quest"));
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



    li{
      margin-bottom: 10px;
      background: #D31027;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #EA384D, #D31027);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #EA384D, #D31027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }
  }

  .list{
    width: min(95vw, 800px);
    margin-inline: auto;
  }

</style>