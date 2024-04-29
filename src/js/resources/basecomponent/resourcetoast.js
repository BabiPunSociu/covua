/**
 * Đối tượng cung cấp resources cho Toast message.
 */
const resourcesToast = {
  /**
   * Đối tượng loại Toast message.
   */
  toastType: {
    success: "success",
    error: "error",
    warning: "warning",
    info: "info",
  },

  /**
   * Đối tượng tiêu đề.
   */
  title: {
    success: {
      "en-US": "Success!",
      "vi-VN": "Thành công!",
    },
    error: {
      "en-US": "Error!",
      "vi-VN": "Lỗi!",
    },
    warning: {
      "en-US": "Warning!",
      "vi-VN": "Cảnh báo!",
    },
    info: {
      "en-US": "Infomation!",
      "vi-VN": "Infomation!",
    },
  },
  /**
   * Đối tượng nội dung thông báo.
   */
  message: {
    /**
     * Chuyển đổi ngôn ngữ thành công.
     */
    languageSwitchSuccessful: {
      "en-US": "Switched to English",
      "vi-VN": "Đã chuyển sang tiếng Việt",
    },
  },
};

export default resourcesToast;
