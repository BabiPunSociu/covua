<template>
  <div class="container flex flex-center">
    <div class="content content-1 flex flex-column scroller" v-if="step === 1">
      <header class="flex flex-column">
        <h1 class="block-user-select">
          {{ this.$resource["vi-VN"].resourcesRegister.step1.textLable }}
        </h1>
        <img
          src="../../assets/images/chessboard/pawn-on-board.svg"
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
            this.$resource["vi-VN"].resourcesRegister.step1.textSignUp
          }}</m-button
        >

        <!-- Dải ngăn cách -->
        <div class="seperate-area flex">
          <hr />
          <span class="block-user-select">{{
            this.$resource["vi-VN"].resourcesRegister.step1.textOr
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
              this.$resource["vi-VN"].resourcesRegister.step1.textGoogle
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
              this.$resource["vi-VN"].resourcesRegister.step1.textFacebook
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
            this.$resource["vi-VN"].resourcesRegister.step1.textLogin
          }}</router-link
        >
      </footer>
    </div>
    <div class="content content-2 flex flex-column" v-if="step === 2">
      <header class="flex flex-column">
        <h1 class="block-user-select">
          {{ this.$resource["vi-VN"].resourcesRegister.step2.textLable }}
        </h1>
        <p class="block-user-select">
          {{
            this.$resource["vi-VN"].resourcesRegister.step2.textLableDescription
          }}
        </p>
      </header>
      <main class="flex flex-column scroller">
        <!-- Skills Level -->
        <!-- Lưu ý: item.value chạy từ 0. -->
        <a
          v-for="item in this.$resource['vi-VN'].resourcesRegister.step2
            .skillLevels"
          :key="item.value"
          :ref="'skillLevel' + item.value"
          :tabindex="item.value + 1"
          class="flex flex-space-between block-user-select"
          :class="{ 'item-selected': item.value === skillLevelSelected }"
          @click="skillLevelSelectedChanged(item.value)"
          @keydown.enter="skillLevelSelectedChanged(item.value)"
        >
          <div class="flex">
            <span class="text">{{ item.text }}</span>
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
            this.$resource["vi-VN"].resourcesRegister.step2.textContinue
          }}</m-button
        >
      </footer>
    </div>
    <div class="content content-3" v-if="step === 3">
      <header class="flex flex-column">
        <h1>{{ this.$resource["vi-VN"].resourcesRegister.step3.textLable }}</h1>
        <p>
          {{
            this.$resource["vi-VN"].resourcesRegister.step3.textLableDescription
          }}
        </p>
      </header>
      <main class="flex flex-column">
        <!-- Username -->
        <div class="username">
          <m-text-field
            ref="inputUsername"
            :lblTooltip="
              this.$resource['vi-VN'].resourcesRegister.step3.textUsername
            "
            :haveLabel="true"
            :isTextWhite="true"
            inputType="text"
            :tabIndex="1"
            :isAutoFocused="true"
            @inputOnChange="usernameChanged"
          >
            <template v-slot:lbl-content>{{
              this.$resource["vi-VN"].resourcesRegister.step3.textUsername
            }}</template>
          </m-text-field>
        </div>

        <!-- Password -->
        <div class="password">
          <m-text-field
            :lblTooltip="
              this.$resource['vi-VN'].resourcesRegister.step3.textPassword
            "
            :haveLabel="true"
            :isTextWhite="true"
            inputType="password"
            :tabIndex="2"
            :isAutoFocused="false"
            @inputOnChange="passwordChanged"
          >
            <template v-slot:lbl-content>{{
              this.$resource["vi-VN"].resourcesRegister.step3.textPassword
            }}</template>
          </m-text-field>
        </div>

        <!-- Confirm Password -->
        <div class="confirm-password">
          <m-text-field
            :lblTooltip="
              this.$resource['vi-VN'].resourcesRegister.step3
                .textConfirmPassword
            "
            :haveLabel="true"
            :isTextWhite="true"
            inputType="password"
            :tabIndex="3"
            :isAutoFocused="false"
            @inputOnChange="confirmPasswordChanged"
          >
            <template v-slot:lbl-content>{{
              this.$resource["vi-VN"].resourcesRegister.step3
                .textConfirmPassword
            }}</template>
          </m-text-field>
        </div>

        <!-- Email -->
        <div class="email">
          <m-text-field
            :lblTooltip="
              this.$resource['vi-VN'].resourcesRegister.step3.textEmail
            "
            :haveLabel="true"
            :isTextWhite="true"
            inputType="email"
            :tabIndex="4"
            :isAutoFocused="false"
            @inputOnChange="emailChanged"
          >
            <template v-slot:lbl-content>{{
              this.$resource["vi-VN"].resourcesRegister.step3.textEmail
            }}</template>
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
          @click="submitOnClick"
          >{{
            this.$resource["vi-VN"].resourcesRegister.step3.textContinue
          }}</m-button
        >
      </footer>
    </div>

    <!-- Back to forward step -->
    <a
      class="btn-back"
      tabindex="6"
      v-if="step > 1"
      @click="goBackToPreviousStep"
      @keydown="btnBackKeyDown"
    >
      <!-- Icon arrow left -->
      <div class="icon-arrow-left" title="Back"></div>
    </a>
  </div>
</template>

<script>
export default {
  name: "Register",

  data() {
    return {
      step: 1,
      skillLevelSelected: 0,
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
          // Nếu ở bước 3 => Focus Input Username
          else if (newStep == 3) {
            this.focusInputUsername();
          }
        }, 300);
      } catch (error) {
        console.error("Lỗi khi thực thi watch step");
        console.error(error);
      }
    },
  },
  mounted() {
    // Focus button sign up
    this.focusButtonSignUp();
  },
  methods: {
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
    btnGoogleClick() {},

    /**
     * Hàm thực hiện đăng kí Account mới thông qua Facebook.
     * @author NVDung (16-04-2024)
     */
    btnFacebookClick() {},

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
     * Hàm xử lý thay đổi username.
     * @author NVDung (16-04-2024)
     */
    usernameChanged() {},

    /**
     * Hàm xử lý thay đổi password.
     * @author NVDung (16-04-2024)
     */
    passwordChanged() {},

    /**
     * Hàm xử lý thay đổi confirm password.
     * @author NVDung (16-04-2024)
     */
    confirmPasswordChanged() {},

    /**
     * Hàm xử lý thay đổi email.
     * @author NVDung (16-04-2024)
     */
    emailChanged() {},

    /**
     * Hàm thực hiện focus Input Username.
     * @author NVDung (16-04-2024)
     */
    focusInputUsername() {
      this.$refs.inputUsername.autoFocusInput();
    },

    /**
     * Hàm thực hiện submit đăng kí.
     * @author NVDung (16-04-2024)
     */
    submitOnClick() {
      alert("Submit onClick");
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
            // Thực hiện focus Input Username.
            this.focusInputUsername();
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
