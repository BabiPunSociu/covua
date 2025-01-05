import { defineStore } from "pinia";

/**
 * Tạo store để lưu trữ thông tin người dùng đã đăng nhập.
 * @author NVDung (30-04-2024)
 */
export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      userCode: null,
      name: null,
      avatar: null,
    },
  }),

  getters: {
    /**
     * Hàm get giá trị userCode trong store.
     * @returns {string} Giá trị userCode trong store.
     * @author NVDUNG (01-05-2024)
     */
    getUserCode() {
      return this.user.userCode;
    },

    /**
     * Hàm get giá trị name trong store.
     * @returns {string} Giá trị name trong store.
     * @author NVDUNG (01-05-2024)
     */
    getName() {
      return this.user.name;
    },

    /**
     * Hàm get giá trị Avatar trong store.
     * @returns {string} Giá trị URL ảnh đại diện trong store.
     * @author NVDUNG (01-05-2024)
     */
    getAvatar() {
      return this.user.avatar;
    },
  },
  actions: {
    /**
     * Hàm thực hiện thiết lập thông tin người dùng.
     * @param {{userCode: string, name: string, avatar: string}} info Thông tin người dùng.
     * @author NVDUNG (01-05-2024)
     */
    setUserInfo(info) {
      this.user.userCode = info.userCode;
      this.user.name = info.name;
      this.user.avatar = info.avatar;
    },
  },
});
