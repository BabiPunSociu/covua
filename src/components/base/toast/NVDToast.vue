<template>
  <div class="toast-block">
    <div class="toast" :class="'toast-' + typeToast">
      <div :class="'mi mi-24 mi-' + typeToast"></div>
      <div class="toast-text">
        <!-- Title -->
        <span class="toast-title">{{ title }}</span>
        <!-- Description -->
        <span class="toast-message">{{ message }}</span>
      </div>
      <!-- Nút hoàn tác không bắt buộc -->
      <a v-if="showButtonUndo" class="toast-button">Hoàn tác</a>
      <div @click="closeToast" class="toast-close mi mi-24 mi-close"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NVDToast",
  data() {
    return {};
  },
  props: {
    /**
     * Kiểu toast message: success, error, warning, info
     */
    typeToast: {
      type: String,
      required: true,
    },

    /**
     * Hiển thị nút hoàn tác?
     * Mặc định: true.
     */
    showButtonUndo: {
      type: Boolean,
      default: true,
      required: false,
    },

    /**
     * Tiêu đề toast message.
     */
    title: {
      type: String,
      required: true,
    },

    /**
     * Nội dung thông điệp.
     */
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    /**
     * Phát sự kiện đóng Toast Message đến component cha
     * @author: NVDUNG (18-04-2024)
     */
    closeToast() {
      this.$emit("closeToast");
    },
  },
  mounted() {
    /**
     * Phát sự kiện đóng Toast Message đến component cha sau 5 giây
     */
    setTimeout(this.closeToast, 5000);
  },
};
</script>
<style scoped>
@import url(./toast.scss);
</style>
