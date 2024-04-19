<template>
  <header class="header">
    <div class="header-left">
      <!-- Icon three stripes -->
      <div
        class="header-icon mi mi-24 mi-three-stripes"
        @click="toggleSidebar"
      ></div>
      <!-- <div
        class="header-branch"
        title="CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC"
      >
        <div class="con-ms-tooltip">
          <div class="msTooltipParent"></div>
          <div class="header-branch-name">
            CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC
          </div>
        </div>
        <a class="flex items-center">
          <div
            class="header-icon mi mi-24 mi-chevron-right header-branch-icon"
          ></div>
        </a>
      </div> -->
      <!-- TextField search -->
      <m-text-field
        ref="textFieldSearch"
        class="m-textfield-icon-action"
        :haveLabel="false"
        :placeholderTextField="
          this.$resource['vi-VN'].textField.textSearchOnNVDChess
        "
        @iconActionClick="btnSearchClick"
        @inputOnChange="textFieldOnChange"
      ></m-text-field>
    </div>
    <div class="header-right">
      <div class="notify">
        <div
          class="con-ms-tooltip header-menu-icon header-menu-icon-notify"
        ></div>
        <div class="msTooltipParent"></div>
        <div class="tooltip-content">
          <div class="pointer header-icon">
            <div class="wrap-notify header-menu-icon-simple">
              <div class="mi mi-24 mi-bell__nav wiggle"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="account-info">
        <a>
          <div class="ms-button-text">
            <div class="user-ava">
              <div class="mi mi-32 mi-user-avatar avatar">
                <img src="" alt="" />
              </div>
            </div>
          </div>
          <div class="user-name">
            <div class="pr-6 display-user">Nguyễn Văn Mạnh</div>
          </div>
          <div class="mi mi-14 mi-chev-ron-down header-branch-icon"></div>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {};
  },

  methods: {
    /**
     * Hàm thực hiện ẩn / hiện component sidebar.
     * @returns {void}
     * @author NVDung (19-04-2024)
     */
    toggleSidebar() {
      this.$emit("toggleSidebar");
    },

    /**
     * Hàm xử lý sự kiện khi người dùng click vào icon search trên input.
     * @returns {void}
     * @author NVDung (19-04-2024)
     */
    btnSearchClick() {
      alert("Search icon clicked!");
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(./the-header.scss);
</style>
