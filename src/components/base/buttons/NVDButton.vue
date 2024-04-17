<template>
  <!-- Ngoài ra, có thể thêm class: .m-btn-secondary -->
  <button
    class="m-btn flex"
    :class="{
      'outline-white': isOutlineWhite,
      'flex-center': textAlignCenter && !hasIcon,
    }"
    :tabindex="tabIndex"
    @keydown.enter="buttonPressEnter($event, functionHandlePessEnter)"
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

    /**
     * Hàm được thực thi khi nhấn Enter, thường là hàm xử lý onClick.
     */
    functionHandlePessEnter: {
      type: Function,
      default: () => {},
      required: false,
    },

    /**
     * Hiển thị text-align: center.
     */
    textAlignCenter: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  methods: {
    /**
     * Hàm xử lý sự kiện button nhấm Enter.
     * @param {Event} event Đối tượng Event.
     * @param {Function} propFunctionHandleClick Hàm xử lý Click được truyền qua prop.
     * @author NVDUNG (17-04-2024)
     */
    buttonPressEnter(event, propFunctionHandleClick) {
      try {
        // Thực thi hàm
        propFunctionHandleClick();

        // Chặn hành vi mặc định của phím Enter.
        event.preventDefault();
      } catch (error) {
        console.error("Lỗi khi thực thi hàm buttonPressEnter");
        console.error(error);
      }
    },
  },
};
</script>
