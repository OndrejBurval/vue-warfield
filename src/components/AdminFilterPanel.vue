<template>
  <section class="d-flex justify-content-center">

    <Popper class="ms-0" hover arrow content="Filtr">
      <BIconFunnel :cursor="'pointer'" :fill="'#ffffff' " />
    </Popper>

  </section>
</template>

<script>
export default {
  name: "AdminFilterPanel"
}
</script>

<style lang="scss" scoped>

  section{
    background: #48515a;
    padding-block: 10px;
    margin-bottom: 20px;
  }

</style>