<template>
  <div class="container">
    <RouterView></RouterView>
  </div>
</template>

<script>
import TheSideBar from "./components/layout/thesidebar/TheSideBar.vue";
import TheHeader from "./components/layout/theheader/TheHeader.vue";
import TheMainContent from "./components/layout/themaincontent/TheMainContent.vue";
export default {
  name: "App",
  components: {
    TheSideBar,
    TheHeader,
    TheMainContent,
  },
};
</script>

<style lang="scss" scoped></style>
