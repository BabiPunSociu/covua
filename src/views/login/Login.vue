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
            {{ this.$resource.resourcesLogin.textUsername["vi-VN"] }}
          </template>
          <!-- Text hiển thị khi validate -->
          <template v-slot:warning>
            {{ this.$resource.resourcesLogin.textWarningUsername["vi-VN"] }}
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
            {{ this.$resource.resourcesLogin.textPassword["vi-VN"] }}
          </template>
          <!-- Text hiển thị khi validate -->
          <template v-slot:warning>
            {{ this.$resource.resourcesLogin.textWarningPassword["vi-VN"] }}
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
            this.$resource.resourcesLogin.textRememberMe["vi-VN"]
          }}</m-checkbox
        >
        <router-link
          to="/forgot-password"
          class="forgot-password"
          tabindex="5"
          >{{
            this.$resource.resourcesLogin.textForgotPassword["vi-VN"]
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
          >{{ this.$resource.resourcesLogin.textLogin["vi-VN"] }}</m-button
        >
      </div>

      <div class="seperate-area flex">
        <hr />
        <span class="block-user-select">{{
          this.$resource.resourcesLogin.textOr["vi-VN"]
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
            this.$resource.resourcesLogin.textLoginGoogle["vi-VN"]
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
            this.$resource.resourcesLogin.textLoginFacebook["vi-VN"]
          }}</m-button
        >
      </div>

      <router-link
        to="/register"
        class="register"
        tabindex="8"
        @keydown="tabFocusAround"
        >{{ this.$resource.resourcesLogin.textRegister["vi-VN"] }}</router-link
      >
    </div>
  </div>
</template>

<script>
import googleOAuth2 from "@/js/oauth2/googleoauth2.js";

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
      username: "",
      password: "",
      isRememberPassword: false,
    };
  },

  methods: {
    usernameChanged() {},

    passwordChanged() {},

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
    btnLoginOnClick() {
      alert("Login on click");
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
