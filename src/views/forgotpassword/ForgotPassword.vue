<template>
  <div class="background flex flex-center">
    <div class="forgot-password-container scroller">
      <header>
        <!-- Tiêu đề Forgot Password? -->
        <h1 class="block-user-select">
          {{
            this.$resource.resourcesForgotPassword.textLable[
              languageStore.getLanguage
            ]
          }}
        </h1>
      </header>

      <main>
        <!-- Email nhận OTP và password mới -->
        <div class="email">
          <m-text-field
            ref="inputEmail"
            :lblTooltip="
              this.$resource.resourcesForgotPassword.textEmail[
                languageStore.getLanguage
              ]
            "
            :haveLabel="true"
            :isTextWhite="true"
            inputType="email"
            :tabIndex="1"
            :validateFunctions="[
              this.$validator.required,
              this.$validator.minLength,
              this.$validator.maxLength,
            ]"
            :minLength="5"
            :maxLength="255"
            :isAutoFocused="true"
            @inputOnChange="emailChanged"
          >
            <!-- Text hiển thị tiêu đề -->
            <template v-slot:lbl-content>
              {{
                this.$resource.resourcesForgotPassword.textEmail[
                  languageStore.getLanguage
                ]
              }}
            </template>
            <!-- Text hiển thị khi validate -->
            <template v-slot:warning>
              {{
                this.$resource.resourcesForgotPassword.textWarningEmail[
                  languageStore.getLanguage
                ]
              }}
            </template>
          </m-text-field>
        </div>

        <!-- Nút submit -->
        <div class="btn-submit flex flex-center">
          <m-button
            style="width: 100%"
            :tabIndex="3"
            :isOutlineWhite="true"
            :textAlignCenter="true"
            :functionHandlePressEnter="btnSubmitOnClick"
            @click="btnSubmitOnClick"
            >{{
              this.$resource.resourcesForgotPassword.textSubmit[
                languageStore.getLanguage
              ]
            }}
          </m-button>
        </div>

        <div class="seperate-area flex">
          <hr />
          <span class="block-user-select">{{
            this.$resource.resourcesForgotPassword.textOr[
              languageStore.getLanguage
            ]
          }}</span>
          <hr />
        </div>

        <div class="oauth2 flex flex-column">
          <!-- Login with Google -->
          <m-button
            class="m-btn-google"
            :hasIcon="true"
            classIcon="mi-google"
            style="width: 100%"
            :tabIndex="6"
            :isOutlineWhite="true"
            :functionHandlePressEnter="btnLoginGoogleOnClick"
            @click="btnLoginGoogleOnClick"
            >{{
              this.$resource.resourcesForgotPassword.textGoogle[
                languageStore.getLanguage
              ]
            }}
          </m-button>

          <!-- Login with Facebook -->
          <m-button
            class="m-btn-facebook"
            :hasIcon="true"
            classIcon="mi-facebook"
            style="width: 100%"
            :tabIndex="7"
            :isOutlineWhite="true"
            :functionHandlePressEnter="btnLoginFacebookOnClick"
            @click="btnLoginFacebookOnClick"
            >{{
              this.$resource.resourcesForgotPassword.textFacebook[
                languageStore.getLanguage
              ]
            }}
          </m-button>
        </div>
      </main>

      <footer>
        <router-link
          to="/login"
          class="login-link"
          tabindex="8"
          @keydown="tabFocusAround"
          >{{
            this.$resource.resourcesForgotPassword.textLogin[
              languageStore.getLanguage
            ]
          }}
        </router-link>
      </footer>
    </div>
  </div>

  <m-dialog-otp
    v-if="dialogOtpData.isShowDialogOTP"
    :keyDialogOtp="dialogOtpData.keyDialog"
    :email="formData.email.value"
    @dialogOtpButtonConfirmClick="handleDialogOtpButtonConfirmClick"
    @dialogOtpButtonResendOTPClick="handleDialogOtpButtonResendOTPClick"
    @closeDialogOtp="handleCloseDialog"
  >
  </m-dialog-otp>
</template>

<script>
// Store pinia
import { useLanguageStore } from "@/stores/languagestore";

// Local storage

// APIs
import {
  forgotPasswordSentOtpAsync,
  forgotPasswordCheckOtpAsync,
} from "@/api/account";

export default {
  name: "ForgotPassword",

  inject: [
    "toastSuccessNoButtonUndo",
    "toastWarningNoButtonUndo",
    "showDialogError",
    "showDialogWarningOneButton",
    "showDialogWarningTwoButtons",
    "showDialogInfoThreeButtons",
    "handleAPIError",
  ],

  data() {
    return {
      /**
       * Đối tượng chứa store giá trị ngôn ngữ.
       */
      languageStore: useLanguageStore(),

      /**
       * Email đã đăng kí tài khoản.
       */
      email: "",

      /**
       * Dữ liệu về dialog OTP
       */
      dialogOtpData: {
        /**
         * Toggle hiển thị dialog OTP
         */
        isShowDialogOTP: false,

        /**
         * Key để phân biệt các Dialog khác nhau.
         */
        keyDialog: "dialogOtpConfirmForgotPassword",

        /**
         * Giá trị OTP
         */
        otp: "",
      },
    };
  },

  mounted() {
    // Focus vào input email
    this.forcusInputEmail();
  },

  methods: {
    /**
     * Cập nhật giá trị Email.
     * @param value Giá trị Email mới
     * @author NVDung (27-12-2024)
     */
    emailChanged(value) {
      this.email = value;
    },

    /**
     * Thực hiện Submit dữ liệu, thực hiện yêu cầu forgor password.
     */
    async btnSubmitOnClick() {
      try {
        // Hiển thị loading
        this.$emitter.emit("showLoading", true);

        // Thực hiện validate input
        let errorMessage = this.validateEmail(this.email.trim());

        if (errorMessage) {
          // Hiển thị thông báo lỗi.
          this.showDialogError("form forgot password", errorMessage);
          return;
        }

        // Thực hiện gọi API
        let response = await forgotPasswordSentOtpAsync(this.email);

        console.log(`Response forgot password:`, response);

        // Hiển thị dialog OTP
        this.dialogOtpData.isShowDialogOTP = true;
      } catch (error) {
        console.log(error);
        // Hiển thị thông báo.
        if (error.useDialog) {
          this.showDialogError("DialogErrorAPI", error.data ?? error.message);
        } else {
          this.toastWarningNoButtonUndo(error.message);
        }
      } finally {
        this.$emitter.emit("showLoading", false);
      }
    },

    validateEmail(mail) {
      // Regular expression to match a valid email format
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      let isEmail = emailRegex.test(mail);

      if (isEmail) {
        return "";
      } else {
        return this.$resource.resourcesForgotPassword.textWarningEmail[
          this.languageStore.getLanguage
        ];
      }
    },

    btnLoginGoogleOnClick() {},

    btnLoginFacebookOnClick() {},

    /**
     * Xử lý phím tab vòng tròn.
     * @param {Event} event Đối tượng sự kiện
     * @author NVDung (28-12-2024)
     */
    tabFocusAround(event) {
      // Kiểm tra phím Tab
      if (event.key == "Tab") {
        // Focus vào input email
        this.forcusInputEmail();

        // Ngăn chặn sự kiện mặc định của trình duyệt
        event.preventDefault();
      }
    },

    /**
     * Thực hiện focus input email.
     */
    forcusInputEmail() {
      this.$refs.inputEmail.autoFocusInput();
    },

    /* ============= START - Event listener dialog OTP ============= */
    /**
     * Xử lý khi click vào nút Confirm trên dialog OTP.
     * @param otp Giá trị OTP nhập vào từ người dùng
     */
    async handleDialogOtpButtonConfirmClick(otp) {
      try {
        // Hiển thị loading
        this.$emitter.emit("showLoading", true);

        // Thực hiện validate input OTP
        let errorMessage = this.validateOtp(otp);

        if (errorMessage) {
          // Hiển thị thông báo lỗi.
          this.showDialogError("form forgot password otp", errorMessage);
          return;
        }

        let userId = userIdLocalStorage.getUserId();

        // Thực hiện gọi API
        let response = await confirmRegisterAcconuntAsync(userId, otp);

        console.log(`Response confirm register:`, response);

        // Lấy thông tin JWT
        let { accessToken, refreshToken } = response.data;

        // Lưu JWT vào local storage
        tokenLocalStorage.setToken({ accessToken, refreshToken });

        // Chuyển đến trang chủ.
        this.$router.push({ name: "HomeRouter", params: {} });
      } catch (error) {
        console.log(error);
        // Hiển thị thông báo.
        if (error.useDialog) {
          this.showDialogError("DialogErrorAPI", error.data ?? error.message);
        } else {
          this.toastWarningNoButtonUndo(error.message);
        }

        // Tắt & bật DialogOtp để reset data.
        this.dialogOtpData.isShowDialogOTP = false;
        this.dialogOtpData.isShowDialogOTP = true;
      } finally {
        this.$emitter.emit("showLoading", false);
      }
    },

    /**
     * Thực hiện validate input OTP
     * @param otp Mã OTP
     * @author NVDung (28-12-2024)
     * @return {string} errorMessage - Nội dung thông báo lỗi.
     */
    validateOtp(otp) {
      let errorMessage = "";

      return errorMessage;
    },

    /**
     * Xử lý khi click vào nút Resend OTP trên dialog OTP.
     */
    handleDialogOtpButtonResendOTPClick() {},

    /**
     * Thực hiện đóng dialog otp.
     * @param keyDialog Giá trị keyDialog
     * @author NVDung (28-12-2024)
     */
    handleCloseDialog(keyDialog) {
      // Ẩn dialog OTP
      this.dialogOtpData.isShowDialogOTP = false;
    },
    /* ============= END - Event listener dialog OTP ============= */
  },
};
</script>

<style lang="scss" scoped>
@import url(./forgot-password.scss);
</style>
