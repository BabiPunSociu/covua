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
          this.$resource.resourcesTextField.textSearchOnNVDChess['vi-VN']
        "
        @iconActionClick="btnSearchClick"
        @inputOnChange="textFieldOnChange"
      ></m-text-field>
    </div>
    <div class="header-right flex">
      <!-- Thông báo -->
      <notification></notification>

      <!-- Light mode / Dark mode -->
      <m-switch-light-dark></m-switch-light-dark>

      <a class="account-info">
        <!-- Hiện thị avatar -->
        <div class="user-ava mi mi-32 mi-user-avatar avatar icon-resize">
          <img src="" alt="" />
        </div>
        <!-- Tên người dùng -->
        <div class="user-name">
          <div class="pr-6 display-user">Vũ Thu Hiền</div>
        </div>
        <!-- Icon dropdown -->
        <div class="mi mi-14 mi-chev-ron-down header-branch-icon"></div>
      </a>
    </div>
  </header>
</template>

<script>
import NVDNotification from "@/components/base/notification/NVDNotification.vue";
import NVDSwitchLightDark from "@/components/base/switchlightdark/NVDSwitchLightDark.vue";
export default {
  name: "TheHeader",
  components: {
    notification: NVDNotification,
    "m-switch-light-dark": NVDSwitchLightDark,
  },
  data() {
    return {
      /**
       * Đối tượng chứa thông tin về textFieldSearch.
       */
      textFieldSearch: {
        /**
         * Giá trị value của input.
         */
        value: "",
      },
    };
  },

  methods: {
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
