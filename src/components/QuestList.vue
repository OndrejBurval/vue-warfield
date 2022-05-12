<template>
<div>
  <button @click="getDocuments()"> ADD </button>
  <h2> Quest list {{ firebaseArray[0] }} </h2>
  <ul>
    <li v-for="(quest, index) in questArray">
      <Quest :id="index + 1" :title="quest.title" :desc="quest.desc" />
    </li>
  </ul>
</div>
</template>

<script>
import Quest from "./Quest.vue";
import {db} from "../firebase.js";
import {addDoc, collection, getDocs} from "firebase/firestore";

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
      ],
      moje: "",
      firebaseArray: []
    }
  },
  methods: {
    async addDocument() {
      await addDoc(collection(db, "quest"), {
            first: "Alan",
            middle: "Mathison",
            last: "Turing",
            born: 1912
        });
    },
    async getDocuments() {
      const getData = collection(db, "quest")
      const result = await getDocs(getData)
      result.forEach(e => {
        this.firebaseArray.push(e.data())
      })
    }
  },
  mounted() {
    this.getDocuments()
  }
}
</script>

<style scoped>

</style>