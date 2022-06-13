<template>
  <label for="zoom_range" class="form-label"> {{ mapZoom }}</label>
  <input type="range" class="form-range zoom-input" min="1" max="21" step="1" id="zoom_range" v-model="mapZoom">
  <button class="btn btn-primary" @click.prevent="zoomSubmit" :class="buttonVisible"> Uložit změnu </button>
</template>

<script>
import { updateMapZoom } from "../../firebase/firestore.js";
import { ref, computed } from "vue";


export default {
  name: "FormMapZoom",
  setup(props){
    const mapZoom = ref(props.dbZoom)

    const buttonVisible = computed(() => {
      return parseInt(props.dbZoom) === parseInt(mapZoom.value) ? 'hidden' : ''
    })

    const zoomSubmit = async () => {
      await updateMapZoom(parseInt(mapZoom.value))
      window.location.reload()
    }

    return{
      mapZoom,
      buttonVisible,
      zoomSubmit
    }
  },
  props: ["dbZoom"]
}
</script>

<style lang="scss" scoped>
.hidden{
  opacity: 0.3;
  pointer-events: none;
}

.zoom-input{
  position: relative;

  &::before, &::after{
    font-weight: 600;
    font-size: 1.2rem;
    margin-top: -5px;
    line-height: 0;
    padding-inline: 5px;
  }

  &::before{
    content: "-";
  }
  &::after{
    content: "+";
  }
}
</style>