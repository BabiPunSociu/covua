<template>
  <div class="notification">
    <!-- Nút quả chuông -->
    <div class="button-notification">
      <!-- Icon quả chuông -->
      <div
        class="mi mi-24 mi-bell icon-resize"
        :class="{ 'notification-button-active': showNotificationContent }"
        @click="buttonNotificationClick"
      >
        <!-- Hiển thị số lượng thông báo -->
        <span
          class="notification-count block-user-select"
          v-if="buttonNotification.notificationCount"
        >
          {{ buttonNotification.notificationCount }}
        </span>
      </div>
    </div>

    <!-- Thông tin thông báo -->
    <div
      v-if="showNotificationContent"
      class="notification-content flex flex-column"
    >
      <!-- Header -->
      <div class="notification-content-header">
        <div class="row flex flex-space-between">
          <!-- Tiêu đề -->
          <h2 class="notification-content-title block-user-select">
            {{ this.$resource.resourcesNotification.textNotification[languageStore.getLanguage] }}
          </h2>
          <!-- Các chức năng khác -->
          <div class="option-function">
            <div class="mi mi-24 mi-ellipsis icon-resize"></div>
          </div>
        </div>
        <div class="row group-option-filter flex">
          <m-button
            :class="{
              'm-btn-secondary':
                'All' != notificationContent.OptionFilterSelected,
            }"
            @click="FilterByAllClick"
            :textAlignCenter="true"
          >
            {{ this.$resource.resourcesNotification.textAll[languageStore.getLanguage] }}
          </m-button>
          <m-button
            :class="{
              'm-btn-secondary':
                'Unread' != notificationContent.OptionFilterSelected,
            }"
            @click="FilterByUnreadClick"
            :textAlignCenter="true"
          >
            {{ this.$resource.resourcesNotification.textUnRead[languageStore.getLanguage] }}
          </m-button>
        </div>
      </div>
      <!-- Danh sách nội dung thông báo -->
      <div
        class="notification-content-list flex flex-column scroller scroller-y"
      >
        <!-- notification-item -->
        <div
          class="notification-item"
          v-for="i in notificationContent.listNotificationContent"
          :key="i"
        >
          <router-link to="">{{ i }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLanguageStore } from "@/stores/languagestore.js";

export default {
  name: "NVDNotification",

  data() {
    return {
      /**
       * Đối tượng chứa store giá trị ngôn ngữ.
       */
      languageStore: useLanguageStore(),

      /**
       * Ẩn / hiện dropdownlist notificationContent
       */
      showNotificationContent: false,

      /**
       * Đối tượng chứa thông tin về buttonNotification
       */
      buttonNotification: {
        /**
         * Số lượng thông báo.
         */
        notificationCount: 12,
      },

      /**
       * Đối tượng chứa thông tin về notificationContent
       */
      notificationContent: {
        /**
         * Chế độ hiển thị thông báo đang chọn.
         */
        OptionFilterSelected: "All", // All || Unread

        /**
         * Danh sách thông báo.
         */
        listNotificationContent: Array(30) // Tảo mảng 30 item
          .fill(0) // fill giá trị 0 cho 30 item
          .map((x, i) => i + 1), // map giá trị cho các item = index + 1
      },
    };
  },

  methods: {
    /**
     * Hàm thực hiện click buttonNotification
     * @author NVDUNG (21-04-2024)
     */
    buttonNotificationClick() {
      // Thực hiện toggle hiện thị danh sách nội dung thông báo
      this.toggleShowNotificationContent();

      // Cập nhật số lượng thông báo
      this.updateNotificationCountZero();
    },
    /**
     * Hàm thực hiện toggle hiển thị danh sách nội dung thông báo.
     * @author NVDUNG (21-04-2024)
     */
    toggleShowNotificationContent() {
      this.showNotificationContent = !this.showNotificationContent;
    },

    /**
     * Hàm thực hiện đặt số lượng thông báo = 0
     * @author NVDUNG (23-04-2024)
     */
    updateNotificationCountZero() {
      this.buttonNotification.notificationCount = 0;
    },

    /**
     * Hàm thực hiện click chọn button All.
     * @author NVDUNG (23-04-2024)
     */
    FilterByAllClick() {
      // Cập nhật chế độ lọc
      this.notificationContent.OptionFilterSelected = "All";

      // Gọi API
    },

    /**
     * Hàm thực hiện click chọn button Unread.
     * @author NVDUNG (23-04-2024)
     */
    FilterByUnreadClick() {
      // Cập nhật chế độ lọc
      this.notificationContent.OptionFilterSelected = "Unread";

      // Gọi API
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(./notification.scss);
</style>
