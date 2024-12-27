<template>
  <!-- Loading -->
  <div class="container-loading" v-if="!isLoadingControl">
    <div class="m-loading-background"></div>
    <div class="m-loading--content">
      <div class="loading">
        <div class="background"></div>
        <div class="corner"></div>
      </div>
    </div>
  </div>

  <!-- Loading Control NO background -->
  <div class="loading" :class="{ 'loading-control': isLoadingControl }" v-else>
    <div class="background"></div>
    <div class="corner"></div>
  </div>
</template>
<script>
export default {
  name: "NVDLoading",
  props: {
    isLoadingControl: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};
</script>
<style scoped>
@import url(./loading.scss);
</style>
