<template>
  <label
    v-bind:title="tooltip"
    class="block-user-select"
    :class="{ 'text-white': isTextWhite }"
  >
    <slot></slot>
    <b v-show="lblRequired">&nbsp;*</b>
  </label>
</template>

<script>
export default {
  name: "NVDLabel",
  props: {
    /**
     * Hiển thị dấu sao Required không?
     * Mặc định: true - hiện thị dấu sao
     */
    lblRequired: {
      type: Boolean,
      default: true,
      required: false,
    },

    /**
     * Nội dung Tooltip
     */
    tooltip: {
      type: String,
      default: "",
      required: false,
    },

    /**
     * Hiển thị label màu trắng?
     * Mặc định: false - màu đen.
     */
    isTextWhite: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};
</script>
<style scoped>
@import url(./label.css);
</style>
