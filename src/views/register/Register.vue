<template>
  <div class="container flex flex-center">
    <div class="content content-1 flex flex-column" v-if="step === 1">
      <header class="flex flex-column">
        <h1>Create your NVDChess account</h1>
        <img
          src="../../assets/images/chessboard/pawn-on-board.svg"
          alt="Hinh anh quan co"
        />
      </header>
      <main class="flex flex-column">
        <m-button style="width: 100%">Sign Up</m-button>

        <div class="seperate-area flex">
          <hr />
          <span>OR</span>
          <hr />
        </div>

        <div class="oauth2 flex flex-column">
          <m-button
            class="m-btn-google"
            :hasIcon="true"
            classIcon="mi-google"
            style="width: 100%"
            >Continue with Google</m-button
          >
          <m-button
            class="m-btn-facebook"
            :hasIcon="true"
            classIcon="mi-facebook"
            style="width: 100%"
            >Continue with Facebook</m-button
          >
        </div>
      </main>
      <footer>
        <router-link to="/login" class="link-login">Log in</router-link>
      </footer>
    </div>
    <div class="content content-2" v-if="step === 2">
      <header>Create an account to get started.</header>
      <main></main>
      <footer></footer>
    </div>
    <div class="content content-3" v-if="step === 3">
      <header>Create an account to get started.</header>
      <main></main>
      <footer></footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",

  data() {
    return {
      step: 1,
    };
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
@import url(./register.scss);
</style>
