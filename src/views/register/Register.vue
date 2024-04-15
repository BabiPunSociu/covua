<template>
  <div class="container flex flex-center">
    <div class="content" v-if="step === 1">
      <header class="flex flex-column">
        <h1>Create your NVDChess account</h1>
        <img
          src="../../assets/images/chessboard/pawn-on-board.svg"
          alt="Hinh anh quan co"
        />
      </header>
      <main>
        <m-button>Sign Up</m-button>
        
        <m-button
          class="m-btn-google"
          :hasIcon="true"
          classIcon="mi-google"
          style="width: 100%"
          >continue with Google</m-button
        >
        <m-button
          class="m-btn-facebook"
          :hasIcon="true"
          classIcon="mi-facebook"
          style="width: 100%"
          >Continue with Facebook</m-button
        >
      </main>
      <router-link to="/login" class="link-login">Log in</router-link>
    </div>
    <div class="content" v-if="step === 2">
      <header>Create an account to get started.</header>
      <main></main>
      <footer></footer>
    </div>
    <div class="content" v-if="step === 3">
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
