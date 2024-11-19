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
          <img src="" alt="" />
        </div>
        <!-- Tên người dùng -->
        <div class="user-name" v-if="infoUser.isLogined">
          <div class="pr-6 display-user">Nguyễn Văn Dũng</div>
        </div>
        <!-- Icon dropdown -->
        <div
          v-if="infoUser.isLogined"
          class="mi mi-14 mi-chev-ron-down header-branch-icon"
        ></div>
      </a>
    </div>
  </header>
</template>

<script>
import { useLanguageStore } from "@/stores/languagestore.js";

import NVDNotification from "@/components/base/notification/NVDNotification.vue";
import NVDLanguage from "@/components/base/language/NVDLanguage.vue";
import NVDSwitchLightDark from "@/components/base/switchlightdark/NVDSwitchLightDark.vue";
import tokenLocalStorage from "@/js/localstorage/tokenLocalStorage";

import { getUserByIdAsync } from "@/api/user";

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
       * Đối tượng chứa thông tin về textFieldSearch.
       */
      textFieldSearch: {
        /**
         * Giá trị value của input.
         */
        value: "",
      },

      /**
       * Thông tin người dùng.
       */
      infoUser: {
        /**
         * Đã đăng nhập chưa?
         */
        isLogined: false,

        /**
         * Tên người dùng.
         */
        userName: null,
      },
    };
  },

  mounted() {
    // Load thông tin người dùng
    this.loadInfoUser();
  },

  methods: {
    btnAccountInfoClick() {
      if (this.infoUser.isLogined) {
        // Chuyển hướng đến trang tài khoản người dùng
        this.$router.push({ name: "ProfileRouter" });
      } else {
        // Chuyển hướng đến trang đăng nhập
        this.$router.push({ name: "LoginRouter" });
      }
    },

    async loadInfoUser() {
      // Lấy giá trị Token trong local storage
      let jwt = tokenLocalStorage.getToken();

      if (!jwt) return;

      try {
        // Hiện loading
        this.$emitter.emit("showLoading", true);

        // Thực hiện gọi API để lấy thông tin User
        let response = await getUserByIdAsync();

        // Lưu thông tin User vào UserStore Pinia

        console.log("response: ", response);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng");
        console.error(error);
      } finally {
        // Tắt loading
        this.$emitter.emit("showLoading", false);
      }
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
