<template>
  <m-dialog
    ref="dialog"
    :inputDialog="dialogProperty"
    :isDialogOTP="true"
    @dialogButton1Click="dialogButton1ClickHandler"
    @dialogButton2Click="dialogButton2ClickHandler"
  >
    <template #title>
      <div class="dialog-title">
        {{ this.$resource.resourcesDialogOtp.title[languageStore.getLanguage] }}
      </div>
    </template>
    <template #dialog-description>
      <div>
        {{
          this.$resource.resourcesDialogOtp.message.sentOTP[
            languageStore.getLanguage
          ]
        }}
        <span v-if="email">{{ ": " + email }}</span>
      </div>
      <div class="otp-container">
        <input
          v-for="index in [...Array(6).keys()]"
          :key="index"
          type="text"
          :ref="'input-' + index"
          :tabindex="index + 100"
          class="input-code"
          v-model="otp[index]"
          @input="inputChangeHandler(index, $event)"
        />
      </div>
    </template>

    <!-- button 1 -->
    <template #btn-continue-text>
      Confirm ({{ (time / 60).toFixed(0).toString().padStart(2, "0") }} :
      {{ (time % 60).toFixed(0).toString().padStart(2, "0") }})
    </template>

    <!-- button 2 -->
    <template #btn-second-text_1>Resend OTP</template>
  </m-dialog>
</template>

<script>
import { useLanguageStore } from "@/stores/languagestore";

export default {
  name: "NVDDialogOTP",
  emits: [
    "dialogOtpButtonConfirmClick",
    "dialogOtpButtonResendOTPClick",
    "closeDialogOtp",
  ],
  data() {
    return {
      /**
       * Đối tượng chứa store giá trị ngôn ngữ.
       */
      languageStore: useLanguageStore(),

      /**
       * Thông tin input dialog.
       */
      dialogProperty: new this.$dialog(
        this.keyDialogOtp, // Key
        null, // Title -- Không cần điền vì đã điền các v-slot ở trên rồi...
        null, // Content
        null, // Class icons
        2, // Total button
        null, // Text của nút chính
        null, // Text của nút phụ 1.
        null // Text của nút phụ 2.
      ),

      /**
       * Giá trị OTP.
       */
      otp: Array(6).fill(""),

      /**
       * Thời gian sống của OTP.
       */
      time: this.inputTime,
    };
  },
  props: {
    /**
     * Key để phân biệt các Dialog.
     */
    keyDialogOtp: {
      type: String,
      required: false,
      default: "dialogOTP",
    },
    /**
     * Thời gian còn hạn của OTP.
     */
    inputTime: {
      type: Number,
      required: false,
      default: 5 * 60, // 5 minutes
    },

    /**
     * Địa chỉ email đã gửi OTP.
     */
    email: {
      type: String,
      default: "",
      required: false,
    },
  },
  created() {
    /**
     * Tạo lắng nghe sự kiện Dialog dialogButton1Click.
     */
    this.$emitter.on("dialogButton1Click", this.dialogButton1ClickHandler);

    /**
     * Tạo lắng nghe sự kiện Dialog dialogButton2Click.
     */
    this.$emitter.on("dialogButton2Click", this.dialogButton2ClickHandler);

    /**
     * Tạo lắng nghe sự kiện closeDialog.
     */
    this.$emitter.on("closeDialog", this.closeDialogOtpHandler);
  },
  mounted() {
    this.$refs["input-0"][0].focus();

    setInterval(() => {
      if (this.time > 0) {
        this.time = this.time - 1;
      }
    }, 1000);
  },
  beforeUnmount() {
    // Hủy lắng nghe sự kiện
    this.$emitter.off("dialogButton1Click");
    // Hủy lắng nghe sự kiện dialogButton2Click
    this.$emitter.off("dialogButton2Click");
    // Hủy lắng nghe sự kiện closeDialog
    this.$emitter.off("closeDialog");
  },
  watch: {
    /**
     * Theo dõi giá trị time để thực hiện Disable button Confirm.
     * @param newValue Giá trị time mới.
     * @author NVDung (22-11-2024)
     */
    time(newValue) {
      // console.log(`time: ${newValue}`);
      // console.log(this.$refs.dialog.$refs.primaryButton.$refs.myButton);

      this.$refs.dialog.$refs.primaryButton.$refs.myButton.disabled =
        newValue === 0;
    },
  },
  methods: {
    /**
     * Hàm thực hiện xử lý khi input thay đổi
     * - Validate input.
     * - Focus input kế tiếp.
     * @param index index of the input
     * @param event Event object
     */
    inputChangeHandler(index, event) {
      // Lấy giá trị trong input
      var inputValue = this.otp[index].trim() ?? "";
      // console.log(inputValue);

      if (inputValue.length && !isNaN(inputValue)) {
        // Lưu thông tin
        // this.otp[index] = inputValue;
        if (index < 5) {
          // Focus vào input tiep theo
          // console.log(this.$refs[`input-${index + 1}`]);
          this.$refs[`input-${index + 1}`][0].focus();
        } else {
          // Focus vào button primary
          // console.log(this.$refs.dialog.$refs.primaryButton.$refs.myButton);
          this.$refs.dialog.$refs.primaryButton.$refs.myButton.focus();
        }
      } else {
        // Clear input đã nhập để nhập lại.
        this.otp[index] = "";
        // Focus input hiện tại.
        this.$refs[`input-${index}`][0].focus();
      }
    },

    /**
     * Thực hiện gửi OTP đến Component cha.
     * @param {string} keyDialog Key để phân biệt các Dialog khác nhau.
     * @author NVDung (22-11-2024)
     */
    dialogButton1ClickHandler(keyDialog) {
      // Kiểm tra key dialog
      if (this.dialogProperty.keyDialog === keyDialog) {
        let otp = this.otp.join("").trim();
        console.log(`Event dialogButton1Click: OTP = ${otp}`);

        if (otp) {
          // Thực hiện Gửi OTP đến Component cha để xử lý tiếp.
          this.$emit("dialogOtpButtonConfirmClick", this.otp.join(""));
        }
      }
    },

    /**
     * Thực hiện gửi yêu cầu resend OTP đến Component cha.
     * @param {string} keyDialog Key để phân biệt các Dialog khác nhau.
     * @author NVDung (22-11-2024)
     */
    dialogButton2ClickHandler(keyDialog) {
      // Kiểm tra key dialog
      if (this.dialogProperty.keyDialog === keyDialog) {
        console.log(`Event dialogButton2Click: Thực hiện resend OTP`);

        // Thực hiện 'Key dialog' đến Component cha để xử lý tiếp.
        this.$emit("dialogOtpButtonResendOTPClick", keyDialog);
      }
    },

    closeDialogOtpHandler(keyDialog) {
      // Kiểm tra key dialog
      if (this.dialogProperty.keyDialog === keyDialog) {
        // Thực hiện emit đến component cha
        this.$emit("closeDialogOtp", keyDialog);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(./dialog-otp.scss);
</style>
