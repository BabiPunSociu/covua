<template>
  <div
    class="m-form-checkbox"
    :class="{
      checked: value,
      unchecked: !value,
    }"
  >
    <label v-if="hasLabel" :class="{ 'text-white': isTextWhite }"
      ><slot></slot
    ></label>
    <div class="checkbox-container">
      <span class="checkbox-background mi mi-24"
        ><input
          type="checkbox"
          :tabindex="tabIndex"
          :checked="value"
          @change="handleChange"
        />
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "NVDCheckbox",
  props: {
    /**
     * Có nhãn dán không?
     */
    hasLabel: {
      type: Boolean,
      default: true,
      required: false,
    },

    /**
     * Hiển thị chữ màu trắng?
     * Mặc định: false - hiện thị chữ màu đen.
     */
    isTextWhite: {
      type: Boolean,
      default: false,
      required: false,
    },

    /**
     * Giá trị ban đầu của checkbox
     */
    value: {
      type: Boolean,
      default: false,
      required: false,
    },

    /**
     * Tạo giá trị tabIndex
     * Mặc định: 1
     */
    tabIndex: {
      type: Number,
      default: 1,
      required: false,
    },
  },
  methods: {
    /**
     * Hàm xử lý sự kiện thay đổi giá trị của checkbox
     * Author: NVDUNG (27/03/2024)
     */
    handleChange(event) {
      try {
        // Cập nhật dữ liệu cho component cha
        this.$emit("checkboxChangeValue", event.target.checked);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
@import url(./checkbox.css);
</style>
