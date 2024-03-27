<template>
  <div class="container">
    <TheHeader></TheHeader>
    <TheMainContent></TheMainContent>
  </div>
</template>

<script>
import TheHeader from "./components/layout/theheader/TheHeader.vue";
import TheMainContent from "./components/layout/themaincontent/TheMainContent.vue";
export default {
  name: "App",
  components: {
    TheHeader,
    TheMainContent,
  },
};
</script>

<style lang="scss" scoped></style>
