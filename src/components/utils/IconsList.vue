<template>
  <div class="wrapper">
    <div class="wrapper--inner">
      <BIconRadioactive @click="select" />
      <BIconAlarm @click="select" />
      <BIconClockHistory @click="select" />
      <BIconExclamationOctagon @click="select" />
      <BIconExclamationTriangle @click="select" />
      <BIconEye @click="select" />
      <BIconFileEarmark @click="select" />
      <BIconFileEarmarkBinary @click="select" />
      <BIconFlag @click="select" />
      <BIconFlagFill @click="select" />
      <BIconGeo @click="select" />
      <BIconGlobe @click="select" />
      <BIconGeoAlt @click="select" />
      <BIconHammer @click="select" />
      <BIconHouse @click="select" />
      <BIconInfoCircle @click="select" />
      <BIconKey @click="select" />
    </div>

    <div class="selected">
      {{ selectedSVG }}

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const selected = ref()

const select = (e) => {
  selected.value = { path: e.target.innerHTML }
}
</script>

<style lang="scss" scoped>
.wrapper{
  background: white;
  padding: 30px;
  display: grid;
  place-items: center;
  width: min-content;
  margin-inline: auto;
  border-radius: 20px;


  &--inner{
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(5, min-content);
  }
}



svg{
}

svg:hover{
  transform: scale(1.2);
  cursor: pointer;
}

</style>