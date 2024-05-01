<template>
  <div class="language">
    <a
      class="language-button"
      :title="languageTitleCurrent"
      @click="toggleShowComboboxLanguage"
    >
      <!-- Icon -->
      <div class="mi mi-24 icon-resize mi-language-world"></div>
    </a>
    <div class="language-list" v-if="isShowLanguageList">
      <m-combobox
        :valueInputCombobox="languageTitleCurrent"
        :haveLabel="false"
        :dataDropdownlist="languageTitleList"
        :comboboxRequired="false"
        :dropup="false"
        :tabIndexInput="1"
        :tabIndexButton="2"
        :isErrorInput="false"
        :isInputReadOnly="false"
        @comboboxChangeValue="changeLanguage"
      >
        <!-- Label -->
        <template #lbl-content>
          {{
            this.$resource.resourcesLanguage.textLabelLanguage[
              languageStore.getLanguage
            ]
          }}
        </template>
      </m-combobox>
    </div>
  </div>
</template>

<script>
import { useLanguageStore } from "@/stores/languagestore.js";

export default {
  name: "NVDLanguage",
  inject: ["toastSuccessNoButtonUndo"],
  data() {
    return {
      /**
       * Đối tượng chứa store giá trị ngôn ngữ.
       */
      languageStore: useLanguageStore(),

      /**
       * Cờ hiển thị danh sách ngôn ngữ.
       */
      isShowLanguageList: false,

      /**
       * Danh sách ngôn ngữ.
       */
      languageTitleList: ["English", "Tiếng Việt"],

      /**
       * Danh sách mã ngôn ngữ tương ứng.
       */
      languageCodeList: ["en-US", "vi-VN"],
    };
  },

  computed: {
    /**
     * Ngôn ngữ hiện tại.
     */
    languageTitleCurrent() {
      // Lấy giá trị index của ngôn ngữ trong languageTitleList
      let index = this.getIndexCodeLanguage(this.languageStore.getLanguage);

      // Lấy giá trị ngôn ngữ trong languageTitleList
      let languageTitle = this.languageTitleList[index];

      if (this.languageTitleList.includes(languageTitle)) {
        return languageTitle;
      }
      return "English";
    },
  },

  methods: {
    /**
     * Hàm thực hiện cập nhật giá trị ngôn ngữ cho store khi combobox thay đổi giá trị.
     * @param {string} value Giá trị ngôn ngữ mới: "English", "Tiếng Việt"
     * @author NVDUNG (28-04-2024)
     */
    changeLanguage(value) {
      try {
        // Tìm vị trí index của ngôn ngữ trong danh sách ngôn ngữ
        let index = this.getIndexTitleLanguage(value);

        // Giá trị mã ngôn ngữ.
        let languageCode = this.languageCodeList[index];

        if (this.languageCodeList.includes(languageCode)) {
          // Thực hiện thay đổi giá trị ngôn ngữ cho store
          this.languageStore.setLanguage(languageCode);

          // Hiển thị toast message thông báo thay đổi ngôn ngữ thành công.
          this.toastSuccessNoButtonUndo(
            this.$resource.resourcesToast.message.languageSwitchSuccessful[
              languageCode
            ]
          );

          // Thực hiện ẩn combobox ngôn ngữ
          this.toggleShowComboboxLanguage();
        }
      } catch (error) {
        console.error("Lỗi khi thay đổi ngôn ngữ ở combox");
        console.error(error);
      }
    },

    /**
     * Hàm lấy vị trí index của ngôn ngữ trong languageTitleList.
     * @param {string} stringLanguage Giá trị ngôn ngữ: "English", "Tiếng Việt"
     * @author NVDUNG (28-04-2024)
     */
    getIndexTitleLanguage(stringLanguage) {
      try {
        let index = this.languageTitleList.indexOf(stringLanguage);

        if (index == -1) {
          throw "Không tìm thấy index";
        }

        return index;
      } catch (error) {
        console.error("Lỗi khi tìm index ngôn ngữ");
        console.error(error);
      }
    },

    /**
     * Hàm lấy giá trị index của ngôn ngữ trong languageCodeList.
     * @param {string} stringCode Giá trị ngôn ngữ hiện tại từ store.
     */
    getIndexCodeLanguage(stringCode) {
      try {
        let index = this.languageCodeList.indexOf(stringCode);

        if (index == -1) {
          throw "Không tìm thấy index";
        }

        return index;
      } catch (error) {
        console.error("Lỗi khi tìm index ngôn ngữ");
        console.error(error);
      }
    },

    /**
     * Hàm thực hiện toggle hiển thị combobox ngôn ngữ.
     * @author NVDUNG (29-04-2024)
     */
    toggleShowComboboxLanguage() {
      this.isShowLanguageList = !this.isShowLanguageList;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(./language.scss);
</style>
