<template>
  <!-- Ngoài ra, có thể thêm class: .m-btn-secondary -->
  <button
    class="m-btn flex"
    :class="{ 'outline-white': isOutlineWhite }"
    :tabindex="tabIndex"
    ref="myButton"
  >
    <!-- Hiển thị icon (nếu có) -->
    <div :class="classIcon" class="mi mi-16" v-if="hasIcon"></div>
    <slot></slot>
  </button>
</template>
<style scoped>
@import url(./button.scss);
</style>
<script>
export default {
  name: "NVDButton",
  props: {
    /**
     * Có kèm icon không?
     */
    hasIcon: {
      type: Boolean,
      default: false,
      required: false,
    },

    /**
     * Class icon kèm theo
     */
    classIcon: {
      type: String,
      default: "",
      required: false,
    },

    /**
     * Truyen gia tri tabIndex cho button
     * Mac dinh: 1
     */
    tabIndex: {
      type: Number,
      default: 1,
      required: false,
    },

    /**
     * Hiển thị outline màu trắng khi focus
     * Mặc định: false
     */
    isOutlineWhite: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};
</script>
