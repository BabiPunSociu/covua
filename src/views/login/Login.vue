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
          :isAutoFocused="true"
          @inputOnChange="usernameChanged"
        >
          <template v-slot:lbl-content>{{
            this.$resource["vi-VN"].resourcesLogin.textUsername
          }}</template>
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
          :isAutoFocused="false"
          @inputOnChange="passwordChanged"
        >
          <template v-slot:lbl-content>{{
            this.$resource["vi-VN"].resourcesLogin.textPassword
          }}</template>
        </m-text-field>
      </div>

      <div class="password-option flex flex-space-between">
        <m-checkbox
          :isTextWhite="true"
          :value="isRememberPassword"
          :tabIndex="4"
          @checkboxChangeValue="checkboxChangeValue"
          >{{
            this.$resource["vi-VN"].resourcesLogin.textRememberMe
          }}</m-checkbox
        >
        <router-link
          to="/forgot-password"
          class="forgot-password"
          tabindex="5"
          >{{
            this.$resource["vi-VN"].resourcesLogin.textForgotPassword
          }}</router-link
        >
      </div>

      <div class="btn-login flex flex-center">
        <!-- Button Log in -->
        <m-button
          :tabIndex="3"
          :isOutlineWhite="true"
          :textAlignCenter="true"
          :functionHandlePessEnter="btnLoginOnClick"
          @click="btnLoginOnClick"
          >{{ this.$resource["vi-VN"].resourcesLogin.textLogin }}</m-button
        >
      </div>

      <div class="seperate-area flex">
        <hr />
        <span class="block-user-select">{{
          this.$resource["vi-VN"].resourcesLogin.textOr
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
            this.$resource["vi-VN"].resourcesLogin.textLoginGoogle
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
            this.$resource["vi-VN"].resourcesLogin.textLoginFacebook
          }}</m-button
        >
      </div>

      <router-link
        to="/register"
        class="register"
        tabindex="8"
        @keydown="tabFocusAround"
        >{{ this.$resource["vi-VN"].resourcesLogin.textRegister }}</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
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

    /**
     * Hàm xử lý button Login Google click
     * @author NVDung (17-04-2024)
     */
    btnLoginGoogleOnClick() {
      alert("Login with Google on click");
    },

    /**
     * Hàm xử lý button Login Facebook click
     * @author NVDung (17-04-2024)
     */
    btnLoginFacebookOnClick() {
      alert("Login with Facebook on click");
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(./login.scss);
</style>
