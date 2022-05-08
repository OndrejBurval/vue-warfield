<template>
  <section>
    <div class="overlay" @click="$emit('stopEdit', false)" ></div>
    <form @submit="alert()">
      <div class="form-group">
        <label for="quest_title"> Quest title</label>
        <input v-model="title" class="form-control" type="text" id="quest_title" placeholder="Title...">
      </div>
      <div class="form-group">
        <label for="quest_desc"> Quest title</label>
        <textarea v-model="desc" class="form-control" id="quest_desc" placeholder="Popis..."></textarea>
      </div>

      <div class="form-row">
        <button class="btn btn-secondary col-md-12"> Add marker </button>
        <div class="col-md-6">
          <label for="lat_input"> Lat: </label>
          <input class="form-control" type="text" id="lat_input" placeholder="lat...">
        </div>
        <div class="col-md-6">
          <label for="lng_input"> Lat: </label>
          <input class="form-control" type="text" id="lng_input" placeholder="lng...">
        </div>
      </div>

      <button type="submit" class="btn btn-primary w-100"> Save </button>
    </form>
  </section>
</template>

<script>
export default {
  name: "QuestEditor",
  data() {
    return {
      title: "",
      desc: ""
    }
  },
  methods: {
    alert() {
      alert(`${this.title} : ${this.desc}`)
    }
  },
}
</script>

<style lang="scss" scoped>
  section{
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
  }

  .overlay{
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
  }

  form{
    padding: 50px;
    position: absolute;
    width: min(98vw, 700px);
    height: min-content;
    background: white;
    border-radius: 20px;
    z-index: 10;
    resize: both;
  }

  .row, .form-group, .form-row{
    margin-bottom: 30px;
  }

</style>