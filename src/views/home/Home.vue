<template>
  <h1 v-for="i in 100" :key="i">Test page home</h1>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="scss" scoped>
@import url(./home.scss);
</style>
