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
import TheSideBar from "../../components/layout/thesidebar/TheSideBar.vue";
import TheHeader from "../../components/layout/theheader/TheHeader.vue";
import TheMainContent from "../../components/layout/themaincontent/TheMainContent.vue";

export default {
  name: "Home",
  components: {
    TheSideBar,
    TheHeader,
    TheMainContent,
  },
};
</script>

<style lang="scss" scoped>
@import url(./home.scss);
</style>
