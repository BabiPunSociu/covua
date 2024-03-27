<template>
  <label v-bind:title="tooltip">
    <slot></slot>
    <b v-show="lblRequired">&nbsp;*</b>
  </label>
</template>

<script>
export default {
  name: "NVDLabel",
  props: {
    lblRequired: {
      type: Boolean,
      default: true,
      required: false,
    },
    tooltip: {
      type: String,
      default: "",
      required: false,
    },
  },
};
</script>
<style scoped>
@import url(./label.css);
</style>
