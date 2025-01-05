<template>
  <header class="header">
    <div class="header-left flex">
      <!-- Icon three stripes -->
      <div
        class="header-icon mi mi-24 mi-three-stripes icon-resize"
        @click="toggleSidebar"
      ></div>

      <!-- TextField search -->
      <m-text-field
        ref="textFieldSearch"
        class="m-textfield-icon-action"
        :haveLabel="false"
        :placeholderTextField="
          this.$resource.resourcesTextField.textSearchOnNVDChess[
            languageStore.getLanguage
          ]
        "
        @iconActionClick="btnSearchClick"
        @inputOnChange="textFieldOnChange"
      ></m-text-field>
    </div>
    <div class="header-right flex">
      <!-- Thông báo -->
      <notification></notification>

      <!-- Language -->
      <m-language></m-language>

      <!-- Light mode / Dark mode -->
      <m-switch-light-dark></m-switch-light-dark>

      <a class="account-info" @click="btnAccountInfoClick">
        <!-- Hiện thị avatar -->
        <div class="user-ava mi mi-32 mi-user-avatar avatar icon-resize">
          <img v-if="avatar" :src="avatar" alt="Ảnh đại diện người dùng" />
        </div>
        <!-- Tên người dùng -->
        <div class="user-name" v-if="userStore.getName">
          <div class="pr-6 display-user">{{ userStore.getName }}</div>
        </div>
        <!-- Icon dropdown -->
        <div
          v-if="userStore.getName"
          class="mi mi-14 mi-chev-ron-down header-branch-icon"
        ></div>
      </a>
    </div>
  </header>
</template>

<script>
// Store pinia
import { useLanguageStore } from "@/stores/languagestore.js";
import { useUserStore } from "@/stores/userstore.js";

// Local storage
import userIdLocalStorage from "@/js/localstorage/userIdLocalStorage";
import lastURLLocalStorage from "@/js/localstorage/lastUrlLocalStorage";
import tokenLocalStorage from "@/js/localstorage/tokenLocalStorage";
import { audioLocalStorage } from "@/js/localstorage/audioLocalStorage";

// Components
import NVDNotification from "@/components/base/notification/NVDNotification.vue";
import NVDLanguage from "@/components/base/language/NVDLanguage.vue";
import NVDSwitchLightDark from "@/components/base/switchlightdark/NVDSwitchLightDark.vue";

// APIs
import { getUserByIdAsync } from "@/api/user";
import { getImageByIdAsync } from "@/api/image";
import { getAudiosAsync } from "@/api/audio.js";

export default {
  name: "TheHeader",
  components: {
    notification: NVDNotification,
    "m-language": NVDLanguage,
    "m-switch-light-dark": NVDSwitchLightDark,
  },
  data() {
    return {
      /**
       * Đối tượng chứa store giá trị ngôn ngữ.
       */
      languageStore: useLanguageStore(),

      /**
       * Đối tượng chứa store thông tin User.
       */
      userStore: useUserStore(),

      /**
       * Đối tượng chứa thông tin về textFieldSearch.
       */
      textFieldSearch: {
        /**
         * Giá trị value của input.
         */
        value: "",
      },

      /**
       * Url avatar người dùng.
       */
      avatar: null,
    };
  },

  mounted() {
    // Load thông tin người dùng
    this.loadInfoUser();

    // Lấy danh sách audio từ API
    this.loadAudioAsync();
  },

  methods: {
    /* ========================== Audio ========================== */
    /**
     * Hàm lấy danh sách audio từ API
     * @author NVDung (30-12-2024)
     */
    async loadAudioAsync() {
      // Lấy giá trị Token trong local storage
      let jwt = tokenLocalStorage.getToken();

      if (!jwt?.accessToken) {
        // Lưu URL hiện tại vào local storage
        lastURLLocalStorage.setLastUrl({
          name: this.$route.name,
          params: this.$route.params,
        });

        // Điều hướng đến trang login.
        this.$router.push({ name: "LoginRouter" });
        return;
      }

      let callAPIAgain = false;
      do {
        try {
          // Hiện loading
          this.$emitter.emit("showLoading", true);

          // Thực hiện gọi API để lấy thông tin Audio
          let response = await getAudiosAsync();

          console.log("response audio: ", response);

          // Tạo Object Audio = { "description": "url" }
          let objAudio = response.data.reduce((record, audio) => {
            record[audio.description] = audio.url;
            return record;
          }, {});

          // console.table("objAudio: ", objAudio);

          // Lưu thông tin audio vào local storage
          audioLocalStorage.setListAudio(objAudio);

          // Dừng vòng lặp nếu gọi API thành công.
          callAPIAgain = false;
        } catch (error) {
          console.error("Lỗi khi lấy thông tin người chơi 1");
          console.error(error);

          if (error.message === "GoToLogin") {
            // Lưu URL hiện tại vào local storage
            lastURLLocalStorage.setLastUrl({
              name: this.$route.name,
              params: this.$route.params,
            });

            // Điều hướng đến trang login.
            this.$router.push({ name: "LoginRouter" });
          } else {
            // Điều khiển vòng lặp, thực hiện gọi lại API khi refresh token.
            callAPIAgain = error.message === "CallApiAgain";
          }
        } finally {
          // Tắt loading
          this.$emitter.emit("showLoading", false);
        }
      } while (callAPIAgain);
    },
    /* ======================== END Audio ======================== */

    btnAccountInfoClick() {
      // Kiểm tra người dùng đã đăng nhập chưa?
      if (this.userStore.getName) {
        let userCode = this.userStore.getUserCode;

        // Chuyển hướng đến trang tài khoản người dùng
        this.$router.push({
          name: "ProfileRouter",
          params: { userCode: userCode },
        });
      } else {
        // Lưu URL hiện tại vào local storage
        lastURLLocalStorage.setLastUrl({
          name: this.$route.name,
          params: this.$route.params,
        });

        // Chuyển hướng đến trang đăng nhập
        this.$router.push({ name: "LoginRouter" });
      }
    },

    async loadInfoUser() {
      // Lấy giá trị Token trong local storage
      let jwt = tokenLocalStorage.getToken();

      if (!jwt?.accessToken) {
        // Lưu URL hiện tại vào local storage
        lastURLLocalStorage.setLastUrl({
          name: this.$route.name,
          params: this.$route.params,
        });

        // Điều hướng đến trang login.
        this.$router.push({ name: "LoginRouter" });
        return;
      }

      let callAPIAgain = false;
      do {
        try {
          // Hiện loading
          this.$emitter.emit("showLoading", true);

          let userId = userIdLocalStorage.getUserId();

          // Thực hiện gọi API để lấy thông tin User
          let response = await getUserByIdAsync(userId);

          console.log("response: ", response);

          // Cập nhật thông tin user vào user store
          let username =
            response.data.fullName.trim() ||
            `${response.data.firstName} ${response.data.lastName}`.trim();

          // Lấy ảnh đại diện của người dùng
          let avatarId = response.data.avatar;

          // Thực hiện gọi API để lấy ảnh đại diện của người dùng
          let responseImage = await getImageByIdAsync(avatarId);
          console.log("responseImage: ", responseImage);

          // Cập nhật ảnh đại diện vào avatar
          this.avatar = responseImage.data.url;

          // Lưu thông tin User vào UserStore Pinia
          this.userStore.setUserInfo({
            userCode: response.data.userCode,
            name: username,
            avatar: this.avatar,
          });

          // Dừng vòng lặp nếu gọi API thành công.
          callAPIAgain = false;
        } catch (error) {
          console.error("Lỗi khi lấy thông tin người dùng");
          console.error(error);

          if (error.message === "GoToLogin") {
            // Lưu URL hiện tại vào local storage
            lastURLLocalStorage.setLastUrl({
              name: this.$route.name,
              params: this.$route.params,
            });

            // Điều hướng đến trang login.
            this.$router.push({ name: "LoginRouter" });
          } else {
            // Điều khiển vòng lặp, thực hiện gọi lại API khi refresh token.
            callAPIAgain = error.message === "CallApiAgain";
          }
        } finally {
          // Tắt loading
          this.$emitter.emit("showLoading", false);
        }
      } while (callAPIAgain);
    },

    /**
     * Hàm thực hiện ẩn / hiện component sidebar.
     * @returns {void}
     * @author NVDung (19-04-2024)
     */
    toggleSidebar() {
      // Phát sự kiện toggle hiển thị sidebar menu.
      this.$emitter.emit("toggleShowSidebar");
    },

    /**
     * Hàm xử lý sự kiện khi người dùng click vào icon search trên input.
     * @returns {void}
     * @author NVDung (19-04-2024)
     */
    btnSearchClick() {
      alert("Search icon clicked!");
    },

    /**
     * Hàm thực hiện nhận dữ liệu input thay đổi
     * @param {string} newValue Giá trị mới thay đổi từ input.
     * @author NVDung (19-04-2024)
     */
    textFieldOnChange(newValue) {
      this.textFieldSearch.value = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(./the-header.scss);
</style>
