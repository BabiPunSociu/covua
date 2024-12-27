<template>
  <div class="background flex flex-center">
    <div class="login-container scroller">
      <!-- Tiêu đề Forgot Password? -->
      <h1 class="block-user-select">{{}}</h1>
      <!-- Email nhận OTP và password mới -->
      <div class="email">
        <m-text-field
          ref="inputEmail"
          lblTooltip="Email"
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
    </div>
  </div>
</template>

<script>
// Store pinia
import { useLanguageStore } from "@/stores/languagestore";

// Local storage

// APIs
import { authenUsernamePasswordApiAsync } from "@/api/authentication";

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

      email: "",
    };
  },

  methods: {
    emailChanged(value) {
      this.email = value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(./forgot-password.scss);
</style>
