/**
 * Đối tượng cung cấp resources cho Dialog.
 */
const resourcesDialog = {
  /**
   * Đối tượng chứa các class hiển thị icon.
   */
  iconClass: {
    success: "mi-success",
    error: "mi-error",
    warning: "mi-warning",
    info: "mi-info",
  },

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
      "vi-VN": "Thông tin!",
    },
  },
  message: {
    network: {
      offline: {
        "en-US": "You are OFFLINE!",
        "vi-VN": "Mất kết nối mạng!",
      },
      badConnection: {
        "en-US": "Bad connection!",
        "vi-VN": "Kết nối không tốt!",
      },

      averageConnection: {
        "en-US": "Average connection!",
        "vi-VN": "Kết nối tạm được!",
      },

      goodConnection: {
        "en-US": "Good connection!",
        "vi-VN": "Kết nối tốt!",
      },

      veryGoodConnection: {
        "en-US": "Very good connection!",
        "vi-VN": "Kết nối rất tốt!",
      },
    },
  },
};

export default resourcesDialog;
