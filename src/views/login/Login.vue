<template>
  <div class="background flex flex-center">
    <div class="login-container">
      <!-- Username -->
      <div class="username">
        <m-text-field
          lblTooltip="Username"
          :haveLabel="true"
          :isTextWhite="true"
          inputType="text"
          :tabIndex="1"
          :isAutoFocused="true"
          @inputOnChange="usernameChanged"
        >
          <template v-slot:lbl-content>Username</template>
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
          <template v-slot:lbl-content>Password</template>
        </m-text-field>
      </div>

      <div class="password-option flex flex-space-between">
        <m-checkbox
          :isTextWhite="true"
          :value="isRememberPassword"
          @checkboxChangeValue="checkboxChangeValue"
          >Remember me</m-checkbox
        >
        <router-link to="/forgot-password" class="forgot-password"
          >Forgot Password?</router-link
        >
      </div>

      <div class="btn-login flex flex-center"><m-button>Log In</m-button></div>

      <div class="seperate-area flex">
        <hr />
        <span>OR</span>
        <hr />
      </div>

      <div class="oauth2 flex">
        <m-button>Log in with Google</m-button>
        <m-button>Log in with Facebook</m-button>
      </div>

      <router-link to="/register" class="register"
        >New? Sign up - and start playing chess!</router-link
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

    checkboxChangeValue(newVal) {
      this.isRememberPassword = newVal;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(./login.scss);
</style>
