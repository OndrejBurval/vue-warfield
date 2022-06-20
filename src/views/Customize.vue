<template>
  <section class="container">
    <h2> Přizpůsobení vzhledu </h2>



    <section>
      <h3> Vyjíždení úkolů </h3>
      <div class="inputs phoneSVGS">
        <div class="option">
          <PhoneBottom :class="pickedQuestBar === 'bottom' ? 'selectedIcon' : ''" />
          <label for="questBarBottom"> Ze spodní části </label>
          <input id="questBarBottom" type="radio" value="bottom" v-model="pickedQuestBar" />
        </div>
        <div class="option">
          <PhoneLeft :class="pickedQuestBar === 'left' ? 'selectedIcon' : ''" />
          <label for="questBarLeft"> Z levé části </label>
          <input id="questBarLeft" type="radio" value="left" v-model="pickedQuestBar" />
        </div>
        <div class="option">
          <PhoneRight :class="pickedQuestBar === 'right' ? 'selectedIcon' : ''" />
          <label for="questBarRight"> Z pravé části </label>
          <input id="questBarRight" type="radio" value="right" v-model="pickedQuestBar" />
        </div>
        <div class="option">
          <PhoneOverlay :class="pickedQuestBar === 'overlay' ? 'selectedIcon' : ''" />
          <label for="questBarOverlay"> Překrytí </label>
          <input id="questBarOverlay" type="radio" value="overlay" v-model="pickedQuestBar" />
        </div>
      </div>
    </section>

    <hr>

    <section>
      <h3> Poloha navigace </h3>

      <div class="inputs">
        <div class="option">
          <PhoneBottom :class="pickedNavBar === 'bottom' ? 'selectedIcon' : ''"  />
          <label for="navBarBottom"> Spodní část </label>
          <input id="navBarBottom" type="radio" value="bottom" v-model="pickedNavBar" />
        </div>
        <div class="option">
          <PhoneTop :class="pickedNavBar === 'top' ? 'selectedIcon' : ''"  />
          <label for="navBarTop"> Horní část </label>
          <input id="navBarTop" type="radio" value="top" v-model="pickedNavBar" />
        </div>
      </div>
    </section>

    <hr>

    <div class="buttons">
      <button class="btn btn-warning" @click.prevent="submit"> Uložit nastavení </button>
      <button class="btn btn-danger" @click.prevent="reset"> Resetovat nastavení </button>

      <router-link to="/">
        <button class="btn btn-primary"> Zpět na úvodní stránku </button>
      </router-link>
    </div>
  </section>

</template>

<script setup>
import PhoneLeft from "../assets/icons/PhoneLeft.vue";
import PhoneRight from "../assets/icons/PhoneRight.vue";
import PhoneTop from "../assets/icons/PhoneTop.vue";
import PhoneBottom from "../assets/icons/PhoneBottom.vue";
import PhoneOverlay from "../assets/icons/PhoneOverlay.vue";
import { ref } from "vue";

    const pickedQuestBar = ref(localStorage.getItem("questBar") ? localStorage.getItem("questBar") : "bottom")
    const pickedNavBar = ref(localStorage.getItem("navBar") ? localStorage.getItem("navBar") : "bottom")

    const reset = () => {
      localStorage.removeItem("questBar")
      localStorage.removeItem("navBar")
      window.location.reload()
    }
    const submit = () => {
      pickedQuestBar.value === "bottom" ? localStorage.removeItem("questBar") : localStorage.setItem("questBar", pickedQuestBar.value)
      pickedNavBar.value === "bottom" ? localStorage.removeItem("navBar") : localStorage.setItem("navBar", pickedNavBar.value)
      window.location.replace("/")
    }


</script>

<style lang="scss" scoped>

.inputs{
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 50px;

}

.option{
  display: grid;
  place-items: center;
  position: relative;

  label{
    margin-top: 10px;
  }


  input{
    position: absolute;
    inset: 0;
    width: 70%;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  svg{
    width: 300px;
  }
}

h2, h3{
  margin-bottom: 30px;
}

section{
  margin-bottom: 80px;
}

.buttons{
  display: grid;
  grid-auto-flow: row;
  row-gap: 10px;

  a button{
    margin-top: 30px;
    width: 100%;
  }
}


</style>