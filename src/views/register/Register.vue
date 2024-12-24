<template>
  <div class="container flex flex-center">
    <!-- Chọn phương thức đăng kí tài khoản người dùng -->
    <section
      class="content content-1 flex flex-column scroller"
      v-if="step === 1"
    >
      <header class="flex flex-column">
        <h1 class="block-user-select">
          {{
            this.$resource.resourcesRegister.step1.textLable[
              languageStore.getLanguage
            ]
          }}
        </h1>
        <img
          loading="lazy"
          :src="this.$resource.resourcesImage.chessboard.pawnOnBoard"
          alt="Hinh anh quan co"
          class="block-user-select"
        />
      </header>
      <main class="flex flex-column">
        <!-- Button đăng kí -->
        <m-button
          ref="btnSignup"
          class="btn-signup"
          style="width: 100%"
          autofocus="true"
          :tabindex="1"
          :isOutlineWhite="true"
          :textAlignCenter="true"
          :functionHandlePessEnter="nextStep"
          @click="nextStep"
          >{{
            this.$resource.resourcesRegister.step1.textSignUp[
              languageStore.getLanguage
            ]
          }}</m-button
        >

        <!-- Dải ngăn cách -->
        <div class="seperate-area flex">
          <hr />
          <span class="block-user-select">{{
            this.$resource.resourcesRegister.step1.textOr[
              languageStore.getLanguage
            ]
          }}</span>
          <hr />
        </div>

        <div class="oauth2 flex flex-column">
          <!-- Button login google -->
          <m-button
            class="m-btn-google"
            :hasIcon="true"
            classIcon="mi-google"
            style="width: 100%"
            :tabIndex="2"
            :isOutlineWhite="true"
            :functionHandlePessEnter="btnGoogleClick"
            @click="btnGoogleClick"
            >{{
              this.$resource.resourcesRegister.step1.textGoogle[
                languageStore.getLanguage
              ]
            }}</m-button
          >
          <!-- Button login facebook -->
          <m-button
            class="m-btn-facebook"
            :hasIcon="true"
            classIcon="mi-facebook"
            style="width: 100%"
            :tabIndex="3"
            :isOutlineWhite="true"
            :functionHandlePessEnter="btnFacebookClick"
            @click="btnFacebookClick"
            >{{
              this.$resource.resourcesRegister.step1.textFacebook[
                languageStore.getLanguage
              ]
            }}</m-button
          >
        </div>
      </main>
      <footer>
        <router-link
          to="/login"
          class="link-login"
          tabindex="4"
          @keydown="step1TabIndexAround"
          >{{
            this.$resource.resourcesRegister.step1.textLogin[
              languageStore.getLanguage
            ]
          }}</router-link
        >
      </footer>
    </section>

    <!-- Chọn trình độ hiện tại -->
    <section class="content content-2 flex flex-column" v-if="step === 2">
      <header class="flex flex-column">
        <h1 class="block-user-select">
          {{
            this.$resource.resourcesRegister.step2.textLable[
              languageStore.getLanguage
            ]
          }}
        </h1>
        <p class="block-user-select">
          {{
            this.$resource.resourcesRegister.step2.textLableDescription[
              languageStore.getLanguage
            ]
          }}
        </p>
      </header>
      <main class="flex flex-column scroller">
        <!-- Skills Level -->
        <!-- Lưu ý: item.value chạy từ 0. -->
        <a
          v-for="item in this.$resource.resourcesRegister.step2.skillLevels"
          :key="item.value"
          :ref="'skillLevel' + item.value"
          :tabindex="item.value + 1"
          class="flex flex-space-between block-user-select"
          :class="{ 'item-selected': item.value === skillLevelSelected }"
          @click="skillLevelSelectedChanged(item.value)"
          @keydown.enter="skillLevelSelectedChanged(item.value)"
        >
          <div class="flex">
            <span class="text">{{ item.text[languageStore.getLanguage] }}</span>
            <!-- Icon selected -->
            <span
              class="mi mi-tick icon-selected"
              v-if="item.value === skillLevelSelected"
            ></span>
          </div>
          <!-- Icon chessman -->
          <div :class="item.classIcon" class="icon-chess-level"></div>
        </a>
      </main>
      <footer class="flex flex-center">
        <m-button
          style="width: 90%"
          :tabIndex="5"
          :isOutlineWhite="true"
          :textAlignCenter="true"
          :functionHandlePessEnter="nextStep"
          @click="nextStep"
          >{{
            this.$resource.resourcesRegister.step2.textContinue[
              languageStore.getLanguage
            ]
          }}</m-button
        >
      </footer>
    </section>

    <!-- Nhập thống tin để đăng kí -->
    <section class="content content-3" v-if="step === 3">
      <header class="flex flex-column">
        <h1>
          {{
            this.$resource.resourcesRegister.step3.textLable[
              languageStore.getLanguage
            ]
          }}
        </h1>
        <p>
          {{
            this.$resource.resourcesRegister.step3.textLableDescription[
              languageStore.getLanguage
            ]
          }}
        </p>
      </header>
      <main class="flex flex-column">
        <!-- First name -->
        <div class="first-name">
          <m-text-field
            ref="inputFirstName"
            :lblTooltip="
              this.$resource.resourcesRegister.step3.textFirstname['vi-VN']
            "
            :haveLabel="true"
            :isTextWhite="true"
            inputType="text"
            :tabIndex="1"
            :validateFunctions="[this.$validator.maxLength]"
            :maxLength="255"
            :isAutoFocused="true"
            @inputOnChange="firstNameChanged"
          >
            <!-- Text hiển thị tiêu đề -->
            <template v-slot:lbl-content>
              {{
                this.$resource.resourcesRegister.step3.textFirstname[
                  languageStore.getLanguage
                ]
              }}
            </template>
            <!-- Text hiển thị khi validate -->
            <template v-slot:warning>
              {{
                this.$resource.resourcesRegister.step3.textWarningFirstname[
                  languageStore.getLanguage
                ]
              }}
            </template>
          </m-text-field>
        </div>

        <!-- Last name -->
        <div class="last-name">
          <m-text-field
            :lblTooltip="
              this.$resource.resourcesRegister.step3.textLastname['vi-VN']
            "
            :haveLabel="true"
            :isTextWhite="true"
            inputType="text"
            :tabIndex="1"
            :validateFunctions="[
              this.$validator.required,
              this.$validator.minLength,
              this.$validator.maxLength,
            ]"
            :minLength="1"
            :maxLength="255"
            :isAutoFocused="true"
            @inputOnChange="lastNameChanged"
          >
            <!-- Text hiển thị tiêu đề -->
            <template v-slot:lbl-content>
              {{
                this.$resource.resourcesRegister.step3.textLastname[
                  languageStore.getLanguage
                ]
              }}
            </template>
            <!-- Text hiển thị khi validate -->
            <template v-slot:warning>
              {{
                this.$resource.resourcesRegister.step3.textWarningLastname[
                  languageStore.getLanguage
                ]
              }}
            </template>
          </m-text-field>
        </div>

        <!-- Username -->
        <div class="username">
          <m-text-field
            :lblTooltip="
              this.$resource.resourcesRegister.step3.textUsername['vi-VN']
            "
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
                this.$resource.resourcesRegister.step3.textUsername[
                  languageStore.getLanguage
                ]
              }}
            </template>
            <!-- Text hiển thị khi validate -->
            <template v-slot:warning>
              {{
                this.$resource.resourcesRegister.step3.textWarningUsername[
                  languageStore.getLanguage
                ]
              }}
            </template>
          </m-text-field>
        </div>

        <!-- Password -->
        <div class="password">
          <m-text-field
            :lblTooltip="
              this.$resource.resourcesRegister.step3.textPassword['vi-VN']
            "
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
                this.$resource.resourcesRegister.step3.textPassword[
                  languageStore.getLanguage
                ]
              }}
            </template>
            <!-- Text hiển thị khi validate -->
            <template v-slot:warning>
              {{
                this.$resource.resourcesRegister.step3.textWarningPassword[
                  languageStore.getLanguage
                ]
              }}
            </template>
          </m-text-field>
        </div>

        <!-- Confirm Password -->
        <div class="confirm-password">
          <m-text-field
            :lblTooltip="
              this.$resource.resourcesRegister.step3.textConfirmPassword[
                'vi-VN'
              ]
            "
            :haveLabel="true"
            :isTextWhite="true"
            inputType="password"
            :tabIndex="3"
            :validateFunctions="[
              this.$validator.required,
              this.$validator.minLength,
              this.$validator.maxLength,
            ]"
            :minLength="6"
            :maxLength="255"
            :isAutoFocused="false"
            @inputOnChange="confirmPasswordChanged"
          >
            <!-- Text hiển thị tiêu đề -->
            <template v-slot:lbl-content>
              {{
                this.$resource.resourcesRegister.step3.textConfirmPassword[
                  languageStore.getLanguage
                ]
              }}
            </template>
            <!-- Text hiển thị khi validate -->
            <template v-slot:warning>
              {{
                this.$resource.resourcesRegister.step3
                  .textWarningConfirmPassword[languageStore.getLanguage]
              }}
            </template>
          </m-text-field>
        </div>

        <!-- Email -->
        <div class="email">
          <m-text-field
            :lblTooltip="
              this.$resource.resourcesRegister.step3.textEmail['vi-VN']
            "
            :haveLabel="true"
            :isTextWhite="true"
            inputType="email"
            :tabIndex="4"
            :validateFunctions="[
              this.$validator.required,
              this.$validator.minLength,
              this.$validator.maxLength,
              this.$validator.email,
            ]"
            :minLength="5"
            :maxLength="255"
            :isAutoFocused="false"
            @inputOnChange="emailChanged"
          >
            <!-- Text hiển thị tiêu đề -->
            <template v-slot:lbl-content>
              {{
                this.$resource.resourcesRegister.step3.textEmail[
                  languageStore.getLanguage
                ]
              }}
            </template>
            <!-- Text hiển thị khi validate -->
            <template v-slot:warning>
              {{
                this.$resource.resourcesRegister.step3.textWarningEmail[
                  languageStore.getLanguage
                ]
              }}
            </template>
          </m-text-field>
        </div>
      </main>
      <footer class="flex flex-center">
        <m-button
          style="width: 90%"
          :tabIndex="5"
          :isOutlineWhite="true"
          :textAlignCenter="true"
          :functionHandlePessEnter="submitOnClick"
          @keydown.enter="submitOnClick"
          @click="submitOnClick"
          >{{
            this.$resource.resourcesRegister.step3.textContinue[
              languageStore.getLanguage
            ]
          }}
        </m-button>
      </footer>
    </section>

    <!-- Back to forward step -->
    <a
      class="btn-back"
      tabindex="6"
      v-if="step > 1"
      @click="goBackToPreviousStep"
      @keydown="btnBackKeyDown"
    >
      <!-- Icon arrow left -->
      <div class="mi mi-16 mi-arrow-left icon-resize" title="Back"></div>
    </a>
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
import { useLanguageStore } from "@/stores/languagestore";
import { getLevelsAsync } from "@/api/level";
import {
  registerAccountAsync,
  confirmRegisterAcconuntAsync,
} from "@/api/authentication";
import userIdLocalStorage from "@/js/localstorage/userIdLocalStorage";
import tokenLocalStorage from "@/js/localstorage/tokenLocalStorage";

export default {
  name: "Register",
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
       * Danh sách LevelId
       */
      levelIds: [],

      /**
       * Bước thực hiện: 1 -> 3.
       */
      step: 1,

      /**
       * Giá trị cấp độ kỹ năng được chọn trong bước 2.
       */
      skillLevelSelected: 0,

      /**
       * Dữ liệu trong form.
       */
      formData: {
        firstName: {
          /**
           * Giá trị FirstName.
           */
          value: "",
          /**
           * Giá trị FirstName có hợp lệ không?
           */
          isValid: true,
        },
        lastName: {
          /**
           * Giá trị LastName.
           */
          value: "",
          /**
           * Giá trị LastName có hợp lệ không?
           */
          isValid: true,
        },
        /**
         * Dữ liệu Username.
         */
        username: {
          /**
           * Giá trị Username.
           */
          value: "",
          /**
           * Giá trị Username có hợp lệ không?
           */
          isValid: true,
        },
        /**
         * Dữ liệu Password.
         */
        password: {
          /**
           * Giá trị Password.
           */
          value: "",
          /**
           * Giá trị Password có hợp lệ không?
           */
          isValid: true,
        },
        /**
         * Dữ liệu ConfirmPassword.
         */
        confirmPassword: {
          /**
           * Giá trị ConfirmPassword.
           */
          value: "",
          /**
           * Giá trị ConfirmPassword có hợp lệ không?
           */
          isValid: true,
        },
        /**
         * Dữ liệu Email.
         */
        email: {
          /**
           * Giá trị Email.
           */
          value: "",
          /**
           * Giá trị Email có hợp lệ không?
           */
          isValid: true,
        },
      },

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
  watch: {
    /**
     *
     * @param {Number} newStep Giá trị step mới.
     * @author NVDung (16-04-2024)
     */
    step(newStep) {
      try {
        var timer;
        // Clear timer cũ (nếu có).
        clearTimeout(timer);
        // Set timeout delay 300ms để render trước khi focus.
        timer = setTimeout(() => {
          // Nếu quay về bước 1 => Focus button sign up
          if (newStep == 1) {
            this.focusButtonSignUp();
          }
          // Nếu quay về bước 2 => Focus first skill level
          else if (newStep == 2) {
            this.focusFirstSkillLevel();
          }
          // Nếu ở bước 3 => Focus Input FirstName
          else if (newStep == 3) {
            this.focusInputFirstName();
          }
        }, 300);
      } catch (error) {
        console.error("Lỗi khi thực thi watch step");
        console.error(error);
      }
    },
  },
  async mounted() {
    // Focus button sign up
    this.focusButtonSignUp();

    // Load API LevelId
    await this.loadAPILevelId();
  },
  methods: {
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

    /**
     * Load API Get LevelIds to list levelIds
     * @author NVDung (23-10-2024)
     */
    async loadAPILevelId() {
      // Hiện loading
      this.$emitter.emit("showLoading", true);
      try {
        let response = await getLevelsAsync();

        this.levelIds = response.data.map((level) => level.levelId);
        console.table(`Danh sách LevelId`, this.levelIds);
      } catch (error) {
        console.error("loadAPILevelId() in register.js", error);
      } finally {
        // Tắt loading
        this.$emitter.emit("showLoading", false);
      }
    },

    /* ========== CÁC HÀM XỬ LÝ Ở BƯỚC 1 ========== */
    /**
     * Hàm xử lý sự kiện click button Sign up
     * @author NVDung (16-04-2024)
     */
    nextStep() {
      this.step += 1;
    },

    /**
     * Hàm thực hiện đăng kí Account mới thông qua Google.
     * @author NVDung (16-04-2024)
     */
    btnGoogleClick() {
      // Giả sử rằng hiển thị toast message success
      this.toastSuccessNoButtonUndo("Đăng kí account thành công với Google.");

      setTimeout(() => {
        this.toastWarningNoButtonUndo("Đăng kí account thất bại với Google.");
      }, 3000);
    },

    /**
     * Hàm thực hiện đăng kí Account mới thông qua Facebook.
     * @author NVDung (16-04-2024)
     */
    btnFacebookClick() {
      // Giả sử rằng hiện thị dialog warning 1 button
      this.showDialogWarningOneButton("Canh bao facebook sai thong tin.");
    },

    /**
     * Hàm thực hiện focus về button Đăng kí khi bấm phím Tab.
     * @param {Event} event Đối tượng sự kiện.
     * @author NVDung (16-04-2024)
     */
    step1TabIndexAround(event) {
      // Kiểm tra phím Tab
      if (event.key == "Tab") {
        // Thực hiện focus về button Đăng kí
        this.focusButtonSignUp();

        // Chặn hành vi mặc định của phím Tab
        event.preventDefault();
      }
    },

    /**
     * Thực hiện focus button Sign Up.
     * @author NVDung (16-04-2024)
     */
    focusButtonSignUp() {
      this.$refs.btnSignup.$refs.myButton.focus();
    },

    /* ========== CÁC HÀM XỬ LÝ Ở BƯỚC 2 ========== */
    /**
     * Hàm xử lý thay đổi skill level.
     * @param {Number} newValue Giá trị skill level mới
     * @author NVDung (16-04-2024)
     */
    skillLevelSelectedChanged(newValue) {
      this.skillLevelSelected = newValue;
    },

    /**
     * Hàm thực hiện focus first skill level.
     * @author NVDung (16-04-2024)
     */
    focusFirstSkillLevel() {
      this.$refs.skillLevel0[0].focus();
    },
    /* ========== CÁC HÀM XỬ LÝ Ở BƯỚC 3 ========== */

    /**
     * Hàm xử lý thay đổi firstName.
     * @author NVDung (04-11-2024)
     */
    firstNameChanged(newValue) {
      this.formData.firstName.value = newValue;
    },
    /**
     * Hàm xử lý thay đổi lastName.
     * @author NVDung (04-11-2024)
     */
    lastNameChanged(newValue) {
      this.formData.lastName.value = newValue;
    },
    /**
     * Hàm xử lý thay đổi username.
     * @author NVDung (16-04-2024)
     */
    usernameChanged(newValue) {
      this.formData.username.value = newValue;
    },

    /**
     * Hàm xử lý thay đổi password.
     * @author NVDung (16-04-2024)
     */
    passwordChanged(newValue) {
      this.formData.password.value = newValue;
    },

    /**
     * Hàm xử lý thay đổi confirm password.
     * @author NVDung (16-04-2024)
     */
    confirmPasswordChanged(newValue) {
      this.formData.confirmPassword.value = newValue;
    },

    /**
     * Hàm xử lý thay đổi email.
     * @author NVDung (16-04-2024)
     */
    emailChanged(newValue) {
      this.formData.email.value = newValue;
    },

    /**
     * Hàm thực hiện focus Input Username.
     * @author NVDung (16-04-2024)
     */
    focusInputFirstName() {
      this.$refs.inputFirstName.autoFocusInput();
    },

    /**
     * Hàm thực hiện submit đăng kí.
     * @author NVDung (16-04-2024)
     */
    async submitOnClick() {
      // Hiện loading
      this.$emitter.emit("showLoading", true);

      // ========== Kiểm tra validate input ========== //
      let errorMessage = this.checkValidateInput();

      // Nếu errorMessage không rỗng => Thực hiện hiển thị thông báo lỗi.
      if (errorMessage) {
        // Hiện thông báo lỗi
        this.showDialogError("form register", errorMessage);
        return;
      }
      // ======== Kiểm tra validate nghiệp vụ ======== //
      // Kiểm tra password và confirm password không trùng khớp.
      if (this.formData.password.value != this.formData.confirmPassword.value) {
        let msg =
          this.$resource.resourcesRegister.step3.textWarningPasswordNotMatch[
            this.languageStore.getLanguage
          ];
        // Hiện thông báo lỗi
        this.showDialogError("form register", msg);
        return;
      }

      let levelId = this.levelIds[this.skillLevelSelected];
      console.log(`LevelId: ${levelId}`);

      // Thực hiện gọi API đăng kí
      try {
        let response = await registerAccountAsync(
          this.formData.firstName.value,
          this.formData.lastName.value,
          this.formData.username.value,
          this.formData.password.value,
          this.formData.email.value,
          levelId
        );

        console.log(`Response register:`, response);

        let userId = response.data;

        if (userId) {
          // Hiển thị dialog OTP để xác nhận email.
          this.dialogOtpData.isShowDialogOTP = true;

          // Lưu userId vào localStorage
          userIdLocalStorage.setUserId(userId);
        }
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

    /**
     * Hàm kiểm tra validate input.
     * - Đánh dấu các input không hợp lệ.
     * @returns {String} errorMessage - Nội dung thông báo lỗi.
     * @author NVDung (18-04-2024)
     */
    checkValidateInput() {
      /**
       * Nội dung thông điệp lỗi (Nếu có).
       */
      let errorMessage = ``;

      // ========== KIỂM TRA VALIDATE INPUT USERNAME ========== //
      if (
        // Kiểm tra Required
        !this.$validator.required(this.formData.username.value) ||
        // Kiểm tra min-length
        !this.$validator.minLength(this.formData.username.value, 5) ||
        // Kiểm tra max-length
        !this.$validator.maxLength(this.formData.username.value, 255)
      ) {
        // Đánh dấu invalid
        this.formData.username.isValid = false;

        // Thêm thông điệp lỗi để hiển thị thông báo
        errorMessage +=
          this.$resource.resourcesRegister.step3.textWarningUsername[
            this.languageStore.getLanguage
          ] + `<br/>`;
      }

      // ========== KIỂM TRA VALIDATE INPUT PASSWORD ========== //
      if (
        // Kiểm tra Required
        !this.$validator.required(this.formData.password.value) ||
        // Kiểm tra min-length
        !this.$validator.minLength(this.formData.password.value, 6) ||
        // Kiểm tra max-length
        !this.$validator.maxLength(this.formData.password.value, 255)
      ) {
        // Đánh dấu invalid
        this.formData.password.isValid = false;

        // Thêm thông điệp lỗi để hiển thị thông báo
        errorMessage +=
          this.$resource.resourcesRegister.step3.textWarningPassword[
            this.languageStore.getLanguage
          ] + `<br/>`;
      }

      // ========== KIỂM TRA VALIDATE INPUT CONFIRM PASSWORD ========== //
      if (
        // Kiểm tra Required
        !this.$validator.required(this.formData.confirmPassword.value) ||
        // Kiểm tra min-length
        !this.$validator.minLength(this.formData.confirmPassword.value, 6) ||
        // Kiểm tra max-length
        !this.$validator.maxLength(this.formData.confirmPassword.value, 255)
      ) {
        // Đánh dấu invalid
        this.formData.confirmPassword.isValid = false;

        // Thêm thông điệp lỗi để hiển thị thông báo
        errorMessage +=
          this.$resource.resourcesRegister.step3.textWarningConfirmPassword[
            this.languageStore.getLanguage
          ] + `<br/>`;
      }

      // ========== KIỂM TRA VALIDATE INPUT EMAIL ========== //
      if (
        // Kiểm tra Required
        !this.$validator.required(this.formData.email.value) ||
        // Kiểm tra min-length
        !this.$validator.minLength(this.formData.email.value, 6) ||
        // Kiểm tra max-length
        !this.$validator.maxLength(this.formData.email.value, 255) ||
        // Kiểm tra định dạng email
        !this.$validator.email(this.formData.email.value)
      ) {
        // Đánh dấu invalid
        this.formData.email.isValid = false;

        // Thêm thông điệp lỗi để hiển thị thông báo
        errorMessage +=
          this.$resource.resourcesRegister.step3.textWarningEmail[
            this.languageStore.getLanguage
          ] + `<br/>`;
      }

      // Xóa '<br/>' ở cuối cùng
      if (errorMessage.length > 0) {
        errorMessage = errorMessage.slice(0, -5);
      }

      console.log(errorMessage);

      return errorMessage;
    },

    /* ========== HÀM XỬ LÝ BACK Ở BƯỚC 2+3 ========== */
    /**
     * Hàm thực hiện back về step trước.
     * @author NVDung (16-04-2024)
     */
    goBackToPreviousStep() {
      this.step -= 1;
    },

    /**
     * Hàm thực hiện xử lý btnBack KeyDown.
     * @param {Event} event Đối tượng sự kiện.
     * @author NVDung (16-04-2024)
     */
    btnBackKeyDown(event) {
      // Kiểm tra phím Tab
      switch (event.key) {
        /**
         * Bấm Tab => Focus Around.
         */
        case "Tab":
          // Nếu đang ở bước 2
          if (this.step == 2) {
            // Thực hiện focus first skill level.
            this.focusFirstSkillLevel();
          }
          // Nếu đang ở bước 3
          else if (this.step == 3) {
            // Thực hiện focus First name.
            this.focusInputFirstName();
          }
          break;
        /**
         * Bấm Enter => Xử lý theo Click.
         */
        case "Enter":
          this.goBackToPreviousStep();
        default:
          break;
      }

      // Chặn hành vi mặc định của phím Tab.
      event.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(./register.scss);
</style>
