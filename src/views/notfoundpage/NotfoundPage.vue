<template>
  <div class="background-overlay">
    <div class="notfound-page">
      <div class="notication">404 Notfound.</div>
      <m-button @click="goPreviusPage" :functionHandlePessEnter="goPreviusPage"
        >Quay lại</m-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "NotfoundPage",

  methods: {
    /**
     * Quay lại trang trước đó.
     * @author NVDung (21-04-2024)
     */
    goPreviusPage() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(./notfound-page.scss);
</style>
