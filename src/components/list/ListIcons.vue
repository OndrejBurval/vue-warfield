<template>
  <div class="wrapper">
    <div class="overlay" @click="toggleFunc"></div>
    <div class="wrapper--inner">
      <div class="svg-wrapper" @click="select" data-path="https://firebasestorage.googleapis.com/v0/b/vue-warfield.appspot.com/o/map_icons%2Falarm.svg?alt=media&token=9b8ae61e-e525-4564-859a-9f91dc88d931">
        <BIconAlarm  />
      </div>
      <div class="svg-wrapper" @click="select" data-path="https://firebasestorage.googleapis.com/v0/b/vue-warfield.appspot.com/o/map_icons%2Farrow-down.svg?alt=media&token=8b7b2164-5587-411c-bba8-139e5d986aab" >
        <BIconArrowDown />
      </div>
      <div class="svg-wrapper" @click="select" data-path="https://firebasestorage.googleapis.com/v0/b/vue-warfield.appspot.com/o/map_icons%2Faward.svg?alt=media&token=10f39a1c-37a1-41ae-b0e2-b7f0b7f44f06" >
        <BIconAward />
      </div>
      <div class="svg-wrapper" @click="select" data-path="https://firebasestorage.googleapis.com/v0/b/vue-warfield.appspot.com/o/map_icons%2Fbriefcase.svg?alt=media&token=5a0ddc36-49ff-405a-866f-7fec10467a99" >
        <BIconBriefcase />
      </div>
      <div class="svg-wrapper" @click="select" data-path="https://firebasestorage.googleapis.com/v0/b/vue-warfield.appspot.com/o/map_icons%2Fcaret-down-fill.svg?alt=media&token=fae3307c-9cbe-44fa-9afd-b016c9f01172" >
        <BIconCaretDownFill />
      </div>
      <div class="svg-wrapper" @click="select" data-path="https://firebasestorage.googleapis.com/v0/b/vue-warfield.appspot.com/o/map_icons%2Fexclamation-octagon.svg?alt=media&token=7c1fe6d6-d268-4a6b-96b9-4a5b9d959b2c">
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