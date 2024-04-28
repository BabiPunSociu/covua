<template>
  <div class="container-maincontent scroller scroller-y">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "TheMainContent",
};
</script>

<style lang="scss" scoped>
@import url(./the-main-content.scss);
</style>
