<template>
  <div class="container-dialog">
    <div class="dialog-background"></div>
    <div class="dialog-container">
      <header class="dialog-header">
        <div class="dialog-title">
          <slot name="title">{{ this.inputDialog.title }}</slot>
        </div>
        <!-- Nút close -->
        <div class="mi mi-24 mi-close" @click="closeDialog"></div>
      </header>
      <main class="dialog-content flex flex-space-between">
        <div class="dialog-icon">
          <div class="mi mi-24" :class="inputDialog.iconClass"></div>
        </div>
        <div class="dialog-description flex-align-center">
          <slot name="dialog-description">
            <p v-html="inputDialog.content"></p
          ></slot>
        </div>
      </main>
      <footer
        class="dialog-footer flex flex-space-between flex-right"
        style="padding: 0"
      >
        <!-- button 3 -->
        <m-button
          tabindex="1002"
          class="m-btn-secondary"
          v-if="inputDialog.totalButtons >= 3"
          :functionHandlePessEnter="btnSecond2Click"
          @click="btnSecond2Click"
          @keydown="tabFocusAround($event, 3)"
          ><slot name="btn-second-text_2">{{
            this.inputDialog.buttonSecondary2Text
          }}</slot></m-button
        >

        <!-- button 2 -->
        <m-button
          tabindex="1001"
          class="m-btn-secondary"
          v-if="inputDialog.totalButtons >= 2"
          :functionHandlePessEnter="btnSecond1Click"
          @click="btnSecond1Click"
          @keydown="tabFocusAround($event, 2)"
          ><slot name="btn-second-text_1">{{
            this.inputDialog.buttonSecondary1Text
          }}</slot></m-button
        >

        <!-- button 1 -->
        <m-button
          ref="primaryButton"
          tabindex="1000"
          @click="btnPrimaryClick"
          :functionHandlePessEnter="btnPrimaryClick"
          ><slot name="btn-continue-text">{{
            this.inputDialog.buttonPrimaryText
          }}</slot></m-button
        >
      </footer>
    </div>
  </div>
</template>
<script>
// import class dialog.
import dialog from "../../../js/dialog.js";

export default {
  name: "NVDDialog",
  emits: [
    "closeDialog",
    "dialogButton1Click",
    "dialogButton2Click",
    "dialogButton3Click",
  ],
  props: {
    /**
     * Đối tượng cung cấp dữ liệu cho component dialog.
     * Kiểu dữ liệu: class dialog.
     */
    inputDialog: {
      type: dialog,
      default: new dialog(
        "title",
        "content",
        "iconClass",
        3,
        "buttonPrimaryText",
        "buttonSecondary1Text",
        "buttonSecondary2Text"
      ),
      required: true,
    },
  },
  mounted() {
    // Set focus primary button
    this.focusPrimaryButton();
  },
  methods: {
    /* ========== Đóng dialog ======== */
    /**
     * Phát sự kiện đóng dialog
     * @returns {void}
     * @author NVDung (18-04-2024)
     */
    closeDialog() {
      // Phát sự kiện đóng dialog
      this.$emitter.emit("closeDialog");
    },

    /* ========== Button Primary click ======== */
    /**
     * Phát sự kiện xác nhận tiếp tục hành động
     * @returns {void}
     * @author NVDung (18-04-2024)
     */
    btnPrimaryClick() {
      // Phát sự kiện xác nhận tiếp tục hành động
      this.$emitter.emit("dialogButton1Click");
      console.log("dialogButton1Click");
      // Đóng dialog
      this.closeDialog();
    },

    /**
     * Phát sự kiện button 2 click
     * @returns {void}
     * @author NVDung (18-04-2024)
     */
    btnSecond1Click() {
      this.$emitter.emit("dialogButton2Click");
      console.log("dialogButton2Click");
      // Đóng dialog
      this.closeDialog();
    },

    /**
     * Phát sự kiện button 3 click
     * @returns {void}
     * @author NVDung (18-04-2024)
     */
    btnSecond2Click() {
      this.$emitter.emit("dialogButton3Click");
      console.log("dialogButton3Click");
      // Đóng dialog
      this.closeDialog();
    },
    /* ========== Focus primary button ======== */

    focusPrimaryButton() {
      var buttonPrimaryEmlement = this.$refs.primaryButton.$refs.myButton;
      if (buttonPrimaryEmlement) {
        buttonPrimaryEmlement.focus();
      }
    },
    /* ========== Tabindex around ======== */

    /**
     *
     * @param {event} event Sự kiện
     * @param {number} index Số thứ tự của nút bấm thực hiện sự kiện
     */
    tabFocusAround(event, index) {
      if (event.key == "Tab") {
        if (
          // Nút 2 và tổng 2 nút bấm => focus lại nút 1
          (index === 2 && this.inputDialog.totalButtons === 2) ||
          // Nút 3 và tổng 3 nút bấm => focus lại nút 1
          (index === 3 && this.inputDialog.totalButtons >= 3)
        ) {
          // focus nút primary
          this.focusPrimaryButton();

          // Ngăn chặn hành vi mặc định của phím tab
          event.preventDefault();
        }
      }
    },
  },
};
</script>
<style scoped>
@import url(./dialog.scss);
</style>
