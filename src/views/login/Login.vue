<template>
  <div class="background">
    <div class="login-container">
      <!-- Username -->
      <m-text-field
        lblTooltip="Username"
        :haveLabel="true"
        inputType="text"
        :tabIndex="1"
        :isAutoFocused="true"
        @inputOnChange="usernameChanged"
      >
        <template v-slot:lbl-content>Username</template>
      </m-text-field>
      <!-- Password -->
      <m-text-field
        lblTooltip="Password"
        :haveLabel="true"
        inputType="password"
        :tabIndex="2"
        :isAutoFocused="false"
        @inputOnChange="passwordChanged"
      >
        <template v-slot:lbl-content>Password</template>
      </m-text-field>

      <div class="password-option flex">
        <m-checkbox @checkboxChangeValue="checkboxChangeValue"
          >Remember me</m-checkbox
        >
        <router-link to="/forgot-password">Forgot Password?</router-link>
      </div>

      <m-button>Log In</m-button>

      <div class="seperate-area flex">
        <hr />
        <span>OR</span>
        <hr />
      </div>

      <div class="oauth2">
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
    };
  },

  methods: {
    usernameChanged() {},

    passwordChanged() {},

    checkboxChangeValue() {},
  },
};
</script>

<style lang="scss" scoped>
@import url(./login.scss);
</style>
