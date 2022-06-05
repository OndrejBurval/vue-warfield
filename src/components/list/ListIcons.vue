<template>
  <div class="wrapper">
    <div class="wrapper--inner">
      <div class="svg-wrapper" @click="select" data-path="./src/assets/map-icons/alarm.svg">
        <BIconAlarm  />
      </div>
      <div class="svg-wrapper" @click="select" data-path="./src/assets/map-icons/arrow-down.svg" >
        <BIconArrowDown />
      </div>
      <div class="svg-wrapper" @click="select" data-path="./src/assets/map-icons/award.svg" >
        <BIconAward />
      </div>
      <div class="svg-wrapper" @click="select" data-path="./src/assets/map-icons/briefcase.svg" >
        <BIconBriefcase />
      </div>
      <div class="svg-wrapper" @click="select" data-path="./src/assets/map-icons/caret-down-fill.svg" >
        <BIconCaretDownFill />
      </div>
      <div class="svg-wrapper" @click="select" data-path="./src/assets/map-icons/exclamation-octagon.svg">
        <BIconExclamationOctagon />
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { getSelectedIcon, setSelectedIcon } from "../../global/storage.js";

const selected = getSelectedIcon()

const select = (e) => {
  setSelectedIcon(e.target.getAttribute("data-path"))
}
</script>

<style lang="scss" scoped>
.wrapper{
  // background: white;
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

.svg-wrapper{
  background: orange;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: .1s;

  &:hover{
    transform: scale(1.2);
  }
}

svg{
  pointer-events: none;
}


</style>