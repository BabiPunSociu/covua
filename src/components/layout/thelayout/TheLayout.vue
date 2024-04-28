<template>
  <div class="container flex">
    <TheSideBar></TheSideBar>
    <div class="main">
      <TheHeader></TheHeader>
      <TheMainContent></TheMainContent>
    </div>
  </div>
</template>

<script>
import TheSideBar from "../thesidebar/TheSideBar.vue";
import TheHeader from "../theheader/TheHeader.vue";
import TheMainContent from "../themaincontent/TheMainContent.vue";

export default {
  name: "TheLayout",
  components: {
    TheSideBar,
    TheHeader,
    TheMainContent,
  },
};
</script>

<style lang="scss" scoped>
@import url(./the-layout.scss);
</style>
