<template>
  <div class="wrapper">

    <div v-for="type in types" :key="type" :class="db_type === type.name.toLocaleLowerCase() ? 'box active' : 'box'">
      <label :for="type"> {{ type.name }} </label>
      <hr>
      <span>
         {{ type.desc }}
      </span>

      <input type="radio" :id="type" :value="type" v-model="picked" :checked="db_type === type.name.toLocaleLowerCase()" />
    </div>


  </div>
</template>

<script>
import { ref, watch } from "vue";
import { updateMapType } from "../../firebase/firestore.js";

export default {
  name: "FormMapType",
  setup(){
    const types = ref([
      {
        name: "Roadmap",
        desc: "default"
      },
      {
        name: "Satellite",
        desc: "photographic map"
      },
      {
        name: "Hybrid",
        desc: "photographic map + roads and city names"
      },
      {
        name: "Terrain",
        desc: "map with mountains, rivers, etc."
      },
    ]);
    const picked = ref()

    watch( () => picked.value, async () => {
      await updateMapType(picked.value.name.toLowerCase())
      window.location.reload()
    });


    return{
      types,
      picked
    }
  },
  props: ["db_type"]
}
</script>

<style lang="scss" scoped>
.wrapper{
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
}

.box{
  background: white;
  position: relative;
  border-radius: 10px;
  height: 120px;
  cursor: pointer;
  padding: 10px;

  label, span{
    pointer-events: none;
  }
  label{
    font-weight: bold;
  }

  hr{
    margin: 2px 0 5px 0;
  }

  input{
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;

  }

  .active{
    border: solid blue 4px;
  }
}

</style>