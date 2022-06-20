<template>
  <div class="wrapper">
    <div class="overlay" @click="toggleFunc"></div>
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

<script>
import {
  getSelectedIcon,
  setSelectedIcon,
} from "../../global/storage.js";





export default {
  name: "ListIcons",
  setup(props){

    const selected = getSelectedIcon()

    const select = (e) => {
      setSelectedIcon(e.target.getAttribute("data-path"))
      props.toggleFunc()
    }

    return{
      selected,
      select
    }
  },
  props: ["toggleFunc"]

}

</script>

<style lang="scss" scoped>
.overlay{
  background: rgba(0, 0, 0, 0.75);
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  inset: 0;
}

.wrapper{
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
  inset: 0;

  display: grid;
  place-items: center;


  &--inner{
    background: #ffffff;
    display: grid;
    gap: 20px;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    padding: 30px;
    border-radius: 20px;
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