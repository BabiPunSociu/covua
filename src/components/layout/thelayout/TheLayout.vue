<template>
  <div class="container flex">
    <TheSideBar v-if="isShowSidebar"></TheSideBar>
    <div class="main">
      <TheHeader @toggleSidebar="toggleSidebar"></TheHeader>
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

  data() {
    return {
      /**
       * Hiển thị sidebar?
       */
      isShowSidebar: true,
    };
  },

  methods: {
    /**
     * Hàm thực hiện toggle sidebar.
     * @returns {void}
     * @author NVDung (19-04-2024)
     */
    toggleSidebar() {
      this.isShowSidebar = !this.isShowSidebar;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(./the-layout.scss);
</style>
