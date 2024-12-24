<template>
  <div class="background flex flex-center">
    <div class="login-container scroller">
      <!-- Username -->
      <div class="username">
        <m-text-field
          ref="inputUsername"
          lblTooltip="Username"
          :haveLabel="true"
          :isTextWhite="true"
          inputType="text"
          :tabIndex="1"
          :validateFunctions="[
            this.$validator.required,
            this.$validator.minLength,
            this.$validator.maxLength,
          ]"
          :minLength="5"
          :maxLength="255"
          :isAutoFocused="true"
          @inputOnChange="usernameChanged"
        >
          <!-- Text hiển thị tiêu đề -->
          <template v-slot:lbl-content>
            {{
              this.$resource.resourcesLogin.textUsername[
                languageStore.getLanguage
              ]
            }}
          </template>
          <!-- Text hiển thị khi validate -->
          <template v-slot:warning>
            {{
              this.$resource.resourcesLogin.textWarningUsername[
                languageStore.getLanguage
              ]
            }}
          </template>
        </m-text-field>
      </div>
      <!-- Password -->
      <div class="password">
        <m-text-field
          ref="inputPassword"
          lblTooltip="Password"
          :haveLabel="true"
          :isTextWhite="true"
          inputType="password"
          :tabIndex="2"
          :validateFunctions="[
            this.$validator.required,
            this.$validator.minLength,
            this.$validator.maxLength,
          ]"
          :minLength="6"
          :maxLength="255"
          :isAutoFocused="false"
          @inputOnChange="passwordChanged"
        >
          <!-- Text hiển thị tiêu đề -->
          <template v-slot:lbl-content>
            {{
              this.$resource.resourcesLogin.textPassword[
                languageStore.getLanguage
              ]
            }}
          </template>
          <!-- Text hiển thị khi validate -->
          <template v-slot:warning>
            {{
              this.$resource.resourcesLogin.textWarningPassword[
                languageStore.getLanguage
              ]
            }}
          </template>
        </m-text-field>
      </div>

      <div class="password-option flex flex-space-between">
        <m-checkbox
          :isTextWhite="true"
          :value="isRememberPassword"
          :tabIndex="4"
          @checkboxChangeValue="checkboxChangeValue"
          >{{
            this.$resource.resourcesLogin.textRememberMe[
              languageStore.getLanguage
            ]
          }}</m-checkbox
        >
        <router-link
          to="/forgot-password"
          class="forgot-password"
          tabindex="5"
          >{{
            this.$resource.resourcesLogin.textForgotPassword[
              languageStore.getLanguage
            ]
          }}</router-link
        >
      </div>

      <!-- Button Log in -->
      <div class="btn-login flex flex-center">
        <m-button
          style="width: 100%"
          :tabIndex="3"
          :isOutlineWhite="true"
          :textAlignCenter="true"
          :functionHandlePressEnter="btnLoginOnClick"
          @click="btnLoginOnClick"
          >{{
            this.$resource.resourcesLogin.textLogin[languageStore.getLanguage]
          }}</m-button
        >
      </div>

      <div class="seperate-area flex">
        <hr />
        <span class="block-user-select">{{
          this.$resource.resourcesLogin.textOr[languageStore.getLanguage]
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
            this.$resource.resourcesLogin.textLoginGoogle[
              languageStore.getLanguage
            ]
          }}</m-button
        >

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
            this.$resource.resourcesLogin.textLoginFacebook[
              languageStore.getLanguage
            ]
          }}</m-button
        >
      </div>

      <router-link
        to="/register"
        class="register"
        tabindex="8"
        @keydown="tabFocusAround"
        >{{
          this.$resource.resourcesLogin.textRegister[languageStore.getLanguage]
        }}</router-link
      >
    </div>
  </div>

  <m-dialog-otp
    v-if="dialogOtpData.isShowDialogOTP"
    :keyDialogOtp="dialogOtpData.keyDialog"
    @dialogOtpButtonConfirmClick="handleDialogOtpButtonConfirmClick"
    @dialogOtpButtonResendOTPClick="handleDialogOtpButtonResendOTPClick"
    @closeDialogOtp="handleCloseDialog"
  ></m-dialog-otp>
</template>

<script>
import { useLanguageStore } from "@/stores/languagestore";
import { authenUsernamePasswordApiAsync } from "@/api/authentication";
import googleOAuth2 from "@/js/oauth2/googleoauth2";
import userIdLocalStorage from "@/js/localstorage/userIdLocalStorage";
import tokenLocalStorage from "@/js/localstorage/tokenLocalStorage";
import lastURLLocalStorage from "@/js/localstorage/lastUrlLocalStorage";

export default {
  name: "Login",
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
       * Dữ liệu về form login.
       */
      formLogin: {
        username: {
          value: "",
          isValid: true,
        },
        password: {
          value: "",
          isValid: true,
        },
      },

      /**
       * Nhớ mật khẩu.
       */
      isRememberPassword: false,

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
        keyDialog: "dialogOtpConfirmEmail",

        /**
         * Giá trị OTP
         */
        otp: "",
      },
    };
  },

  created() {
    // Hiện loading
    this.$emitter.emit("showLoading", true);

    /* ============= START - Event listener dialog ============= */
    this.$emitter.on("dialogButton1Click", this.dialogButton1Click);
    /* =============  END  - Event listener dialog ============= */
  },

  mounted() {
    // Ẩn loading
    this.$emitter.emit("showLoading", false);
  },

  beforeUnmount() {
    /* ============= START - HỦY Event listener dialog ============= */
    this.$emitter.on("dialogButton1Click", this.dialogButton1Click);
    /* =============  END  - HỦY Event listener dialog ============= */
  },

  methods: {
    /**
     * Cập nhật giá trị username
     * @param newVal Giá trị username mới
     * @author NVDung (15-05-2024)
     */
    usernameChanged(newVal) {
      this.formLogin.username.value = newVal;
    },

    /**
     * Cập nhật giá trị password
     * @param newVal Giá trị password mới
     * @author NVDung (15-05-2024)
     */
    passwordChanged(newVal) {
      this.formLogin.password.value = newVal;
    },

    /**
     * Hàm cập nhật giá trị checkbox Remember me.
     * @param {boolean} newVal Giá trị mới của checkbox
     * @author NVDung (17-04-2024)
     */
    checkboxChangeValue(newVal) {
      this.isRememberPassword = newVal;
    },

    /**
     * Thực hiện focus input Username
     * @param {Event} event Đối tượng sự kiện
     * @author NVDung (17-04-2024)
     */
    tabFocusAround(event) {
      // Kiểm tra phím Tab
      if (event.key == "Tab") {
        // Thực hiện focus input Username
        this.$refs.inputUsername.autoFocusInput();
        // Chặn hành vi mặc định của phím tab
        event.preventDefault();
      }
    },

    /**
     * Hàm kiểm tra validate input.
     * @returns {String} errorMessage - Nội dung thông báo lỗi.
     * @author NVDung (18-04-2024)
     */
    checkValidateInput() {
      try {
        /**
         * Nội dung thông điệp lỗi (Nếu có).
         */
        let errorMessage = ``;

        // ========== KIỂM TRA VALIDATE INPUT USERNAME ========== //
        this.formLogin.username.isValid = true;
        if (
          // Kiểm tra Required
          !this.$validator.required(this.formLogin.username.value) ||
          // Kiểm tra min-length
          !this.$validator.minLength(this.formLogin.username.value, 5) ||
          // Kiểm tra max-length
          !this.$validator.maxLength(this.formLogin.username.value, 255)
        ) {
          // Đánh dấu invalid
          this.formLogin.username.isValid = false;

          // Thêm thông điệp lỗi để hiển thị thông báo
          errorMessage +=
            this.$resource.resourcesLogin.textWarningUsername[
              this.languageStore.getLanguage
            ] + `<br/>`;
        }

        // ========== KIỂM TRA VALIDATE INPUT PASSWORD ========== //
        this.formLogin.password.isValid = true;
        if (
          // Kiểm tra Required
          !this.$validator.required(this.formLogin.password.value) ||
          // Kiểm tra min-length
          !this.$validator.minLength(this.formLogin.password.value, 6) ||
          // Kiểm tra max-length
          !this.$validator.maxLength(this.formLogin.password.value, 255)
        ) {
          // Đánh dấu invalid
          this.formLogin.password.isValid = false;

          // Thêm thông điệp lỗi để hiển thị thông báo
          errorMessage +=
            this.$resource.resourcesLogin.textWarningPassword[
              this.languageStore.getLanguage
            ] + `<br/>`;
        }

        // Xóa '<br/>' ở cuối cùng
        if (errorMessage.length > 0) {
          errorMessage = errorMessage.slice(0, -5);
        }

        // console.log(errorMessage);

        return errorMessage;
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * Hàm xử lý button Login click
     * @author NVDung (17-04-2024)
     */
    async btnLoginOnClick() {
      try {
        // Hiện loading
        this.$emitter.emit("showLoading", true);

        // Validate input
        let errorMessage = this.checkValidateInput();
        if (errorMessage) {
          // Hiện thông báo với key = "dialogErrorLogin"
          this.showDialogWarningOneButton("dialogErrorLogin", errorMessage);
          return;
        }

        // Call api
        let response = await authenUsernamePasswordApiAsync(
          this.formLogin.username.value,
          this.formLogin.password.value
        );

        console.log("reponse: ", response);

        // Lấy UserId
        let { userId } = response.data;

        // Lưu UserId vào local storage
        userIdLocalStorage.setUserId(userId);

        // Nếu Enable 2FA -> Bật Dialog OTP
        if (response.data.twoFactor) {
          // Hiển thị dialog OTP để xác nhận email.
          this.dialogOtpData.isShowDialogOTP = true;
        } else {
          // Lấy token.
          let token = response.data.token;

          // Lưu token vào local storage
          tokenLocalStorage.setToken(token);

          // ===== Chuyển hướng đến trang trước đó hoặc HOME ===== //
          let { name, params } = lastURLLocalStorage.getLastUrl();

          this.$router.push({ name: name, params: params });
        }
      } catch (error) {
        console.log(error);
        // Nếu cần dùng dialog để hiện thông báo.
        if (error.useDialog) {
          this.handleAPIError(error);
        } else {
          // Hiện toast để thông báo.
          this.toastWarningNoButtonUndo(error.message);
        }
      } finally {
        this.$emitter.emit("showLoading", false);
      }
    },

    /* ========== START - Login with Google ========== */
    /**
     * Hàm xử lý button Login Google click
     * @author NVDung (17-04-2024)
     */
    async btnLoginGoogleOnClick() {
      await googleOAuth2.signIn();
    },

    /* ========== END - Login with Google ========== */

    /* ========== START - Login with Facebook ========== */
    /**
     * Hàm xử lý button Login Facebook click
     * @author NVDung (17-04-2024)
     */
    async btnLoginFacebookOnClick() {
      alert("Login with Facebook on click");
    },
    /* ========== END - Login with Google ========== */

    /* ============= START - Event listener dialog ============= */
    /**
     * Xử lý sự kiện button 1 của dialog click
     * @param keyDialog Key dialog được gửi về từ sự kiện click.
     * @author NVDung (17-05-2024)
     */
    dialogButton1Click(keyDialog) {
      console.log("dialogButton1Click: ", keyDialog);
      switch (keyDialog) {
        // Thông báo được tạo từ validate input.
        case "dialogErrorLogin":
          // Thực hiện focus first input error
          if (this.formLogin.username.isValid == false) {
            this.$refs.inputUsername.autoFocusInput();
          } else {
            this.$refs.inputPassword.autoFocusInput();
          }
          break;

        // Thông báo do call API lỗi
        case "CallApiError":
          // Thực hiện focus input Username
          this.$refs.inputUsername.autoFocusInput();
          break;

        default:
          // Không thực hiện gì cả, vì không đúng keyDialog.
          break;
      }
    },
    /* =============  END  - Event listener dialog ============= */

    /* ============= START - Event listener dialog OTP ============= */

    /**
     * Thực hiện đóng dialog otp.
     * @param keyDialog Giá trị keyDialog
     * @author NVDung (23-11-2024)
     */
    handleCloseDialog(keyDialog) {
      this.dialogOtpData.isShowDialogOTP = false;
    },

    /**
     * Thực hiện gọi API xác thực OTP để xác thực email
     * @param otp Mã OTP
     * @author NVDung (23-11-2024)
     */
    async handleDialogOtpButtonConfirmClick(otp) {
      console.log(`otp: ${otp}`);

      try {
        // Hiển thị loading
        this.$emitter.emit("showLoading", true);

        // Thực hiện validate input OTP
        let errorMessage = this.validateOtp(otp);

        if (errorMessage) {
          // Hiển thị thông báo lỗi.
          this.showDialogError("form register otp", errorMessage);
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
     * @author NVDung (23-11-2024)
     * @return {string} errorMessage - Nội dung thông báo lỗi.
     */
    validateOtp(otp) {
      let errorMessage = "";

      return errorMessage;
    },

    /**
     * Thực hiện gọi API gửi lại OTP mới đến mail cho người dùng
     * @param keyDialogOtp Key dialog OTP
     * @author NVDung (23-11-2024)
     */
    handleDialogOtpButtonResendOTPClick(keyDialogOtp) {
      console.log("Resend OTP");
    },
    /* =============  END  - Event listener dialog OTP ============= */
  },
};
</script>

<style lang="scss" scoped>
@import url(./login.scss);
</style>
