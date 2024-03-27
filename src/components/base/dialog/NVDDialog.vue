<template>
  <div class="container-dialog">
    <div class="dialog-background"></div>
    <div class="dialog-container">
      <div class="dialog-header">
        <div class="dialog-title">
          <slot name="title">{{ this.inputDialog.title }}</slot>
        </div>
        <!-- Nút close -->
        <div class="mi mi-24 mi-close" @click="closeDialog"></div>
      </div>
      <div class="dialog-content flex-row">
        <div class="dialog-icon">
          <div class="mi mi-24" :class="inputDialog.iconClass"></div>
        </div>
        <div class="dialog-description flex-align-center">
          <slot name="dialog-description">
            <p v-html="inputDialog.content"></p
          ></slot>
        </div>
      </div>
      <div class="dialog-footer flex-row flex-right" style="padding: 0">
        <!-- button 3 -->
        <m-button
          tabindex="1002"
          class="m-btn-secondary"
          v-if="inputDialog.totalButtons >= 3"
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
          @click="btnSecond1Click"
          @keydown="tabFocusAround($event, 2)"
          ><slot name="btn-second-text_1">{{
            this.inputDialog.buttonSecondary1Text
          }}</slot></m-button
        >

        <!-- button 1 -->
        <m-button ref="primaryButton" tabindex="1000" @click="btnPrimaryClick"
          ><slot name="btn-continue-text">{{
            this.inputDialog.buttonPrimaryText
          }}</slot></m-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NVDDialog",
  emits: [
    "closeDialog",
    "dialogButton1Click",
    "dialogButton2Click",
    "dialogButton3Click",
  ],
  props: {
    inputDialog: {
      type: Object,
      default: {
        title: "",
        content: "",
        iconClass: "mi-warning" /* mi-success, mi-warning, mi-info, mi-error */,
        totalButtons: 3 /* 1, 2, 3 */,
        buttonPrimaryText: "" /*this.$resource["vi-VN"].button.textButtonYes*/,
        buttonSecondary1Text:
          "" /*this.$resource["vi-VN"].button.textButtonNo*/,
        buttonSecondary2Text:
          "" /*this.$resource["vi-VN"].button.textButtonCancel*/,
      },
      required: false,
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
     * Author: NVDUNG (20/08/2023)
     */
    closeDialog() {
      // Phát sự kiện đóng dialog
      this.$emitter.emit("closeDialog");
    },

    /* ========== Nút bấm click ======== */
    /**
     * Phát sự kiện xác nhận tiếp tục hành động'
     * Author: NVDUNG (20/08/2023)
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
     * Author: NVDUNG (20/08/2023)
     */
    btnSecond1Click() {
      this.$emitter.emit("dialogButton2Click");
      console.log("dialogButton2Click");
      // Đóng dialog
      this.closeDialog();
    },

    /**
     * Phát sự kiện button 3 click
     * Author: NVDUNG (20/08/2023)
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
        // Nút 2 và tổng 2 nút bấm => focus lại nút 1
        // Nút 3 và tổng 3 nút bấm => focus lại nút 1
        if (
          (index === 2 && this.inputDialog.totalButtons === 2) ||
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
@import url(./dialog.css);
</style>
