import { defineStore } from "pinia";

/**
 * Tạo store để lưu trữ trạng thái ngôn ngữ.
 * Hàm defineStore() nhận 2 tham số là:
 * - Key để xác định chính xác store => duy nhất.
 * - Đối tượng chứa thông tin về store.
 */
export const useLanguageStore = defineStore("language", {
  /**
   * Thuộc tính Lưu trữ trạng thái.
   */
  state: () => ({
    /**
     * Ngôn ngữ được lưu trữ.
     */
    language: "en-US", // 'vi-VN'
  }),

  /**
   * Thuộc tính lưu trữ các getter.
   */
  getters: {
    /**
     * Hàm get giá trị language trong store.
     * @returns {string} Giá trị ngôn ngữ trong store.
     * @author NVDUNG (28-04-2024)
     */
    getLanguage() {
      return this.language;
    },
  },

  /**
   * Thuộc tính chứa các hàm thực hiện THAY ĐỔI các giá trị trong store.
   */
  actions: {
    /**
     * Hàm thực hiện thay đổi ngôn ngữ hiện tại.
     * @param {string} newValue Giá trị ngôn ngữ mới.
     * @author NVDUNG (28-04-2024)
     */
    setLanguage(newValue) {
      this.language = newValue;
    },

    /*
     * LƯU Ý:
     * - Khi dùng arrow function thì phải truyền tham số 'state',
     * vì khi đó 'this' KHÔNG PHẢI 'state'.
     */
  },
});
