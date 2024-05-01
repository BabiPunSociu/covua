import { defineStore } from "pinia";

/**
 * Tạo store để lưu trữ thông tin người dùng đã đăng nhập.
 * @author NVDung (30-04-2024)
 */
export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      userId: null,
      userCode: null,
      userName: null,
    },
  }),

  getters: {
    /**
     * Hàm get giá trị userId trong store.
     * @returns {string} Giá trị userId trong store.
     * @author NVDUNG (01-05-2024)
     */
    getUserId() {
      return this.user.userId;
    },
  },
  actions: {},
});
