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
          :functionHandlePessEnter="btnLoginOnClick"
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
          :functionHandlePessEnter="btnLoginGoogleOnClick"
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
          :functionHandlePessEnter="btnLoginFacebookOnClick"
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
</template>

<script>
import { useLanguageStore } from "@/stores/languagestore";
import { authenUsernamePasswordApiAsync } from "@/api/authentication";
import googleOAuth2 from "@/js/oauth2/googleoauth2";

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
        username: "",
        password: "",
      },

      /**
       * Nhớ mật khẩu.
       */
      isRememberPassword: false,
    };
  },

  created() {
    // Hiện loading
    this.$emitter.emit("showLoading", true);
  },

  mounted() {
    // Ẩn loading
    this.$emitter.emit("showLoading", false);
  },

  methods: {
    /**
     * Cập nhật giá trị username
     * @param newVal Giá trị username mới
     * @author NVDung (15-05-2024)
     */
    usernameChanged(newVal) {
      this.formLogin.username = newVal;
    },

    /**
     * Cập nhật giá trị password
     * @param newVal Giá trị password mới
     * @author NVDung (15-05-2024)
     */
    passwordChanged(newVal) {
      this.formLogin.password = newVal;
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
     * Hàm xử lý button Login click
     * @author NVDung (17-04-2024)
     */
    async btnLoginOnClick() {
      try {
        // Hiện loading
        this.$emitter.emit("showLoading", true);

        // Validate input

        // Call api
        let reponse = await authenUsernamePasswordApiAsync(
          this.formLogin.username,
          this.formLogin.password
        );

        console.log("reponse: ", reponse);

        this.$emitter.emit("showLoading", false);
      } catch (error) {}
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
  },
};
</script>

<style lang="scss" scoped>
@import url(./login.scss);
</style>
