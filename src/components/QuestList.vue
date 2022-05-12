<template>
<div>
  <button @click="addDocument()"> ADD </button>
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

<style scoped>

</style>