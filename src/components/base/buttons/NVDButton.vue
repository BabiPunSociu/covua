<template>
  <!-- Ngoài ra, có thể thêm class: 
    .m-btn-secondary || 
    .m-btn-facebook || 
    .m-btn-google 
  -->

  <!-- Bình thường là button -->
  <button
    v-if="!isRouterLink"
    class="m-btn flex block-user-select"
    :class="{
      'outline-white': isOutlineWhite,
      'flex-center': textAlignCenter && !hasIcon,
    }"
    :tabindex="tabIndex"
    @keydown.enter="buttonPressEnter($event, functionHandlePressEnter)"
    ref="myButton"
  >
    <!-- Hiển thị icon (nếu có) -->
    <div :class="classIcon" class="mi mi-16 icon-resize" v-if="hasIcon"></div>
    <slot></slot>
  </button>

  <!-- Dùng router-link -->
  <router-link
    v-else
    :to="to"
    class="m-btn router-link flex"
    :class="{
      'outline-white': isOutlineWhite,
      'flex-center': textAlignCenter && !hasIcon,
    }"
    :tabindex="tabIndex"
    @keydown.enter="linkPressEnter"
    ref="myButton"
  >
    <!-- Hiển thị icon (nếu có) -->
    <div :class="classIcon" class="mi mi-16 icon-resize" v-if="hasIcon"></div>
    <slot></slot>
  </router-link>
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
    functionHandlePressEnter: {
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

    /**
     * Dùng router-link thay vì button?
     */
    isRouterLink: {
      type: Boolean,
      default: false,
      required: false,
    },

    /**
     * Địa chỉ khi dùng router-link.
     */
    to: {
      type: String,
      default: "",
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

    /**
     * Hàm xử lý sự kiện router-link nhấm Enter.
     * @author NVDUNG (29-04-2024)
     */
    linkPressEnter() {
      /**
       * Kiểm tra giá trị prop 'to' để chuyển hướng.
       * - to="" -> Trang hiện tại. (không chuyển hướng).
       * - to="/" -> Trang chủ. (Chuyển hướng).
       */
      if (this.to.length > 0) {
        // Thực hiện chuyển hướng
        this.$router.push(this.to);
      }
    },
  },
};
</script>
