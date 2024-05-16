/**
 * Đối tượng cung cấp message Lỗi cho ứng dụng.
 */
const errorMessage = {
  /**
   * Thông báo lỗi chung.
   * @param {String} langCode Mã ngôn ngữ.
   * @returns
   * @author NVDung (16-05-2024)
   */
  ErrorText: (langCode) => {
    switch (langCode) {
      case "vi-VN":
        return "Có lỗi xảy ra, vui lòng liên hệ NVDChess để được hỗ trợ.";
      case "en-US":
      default:
        return "Have an error, contact NVDChess to be supported.";
    }
  },

  /**
   * Dữ liệu không hợp lệ 400.
   * @param {String} langCode Mã ngôn ngữ.
   * @returns
   * @author NVDung (16-05-2024)
   */
  DataNotValid: (langCode) => {
    switch (langCode) {
      case "vi-VN":
        return "Dữ liệu không hợp lệ.";

      case "en-US":
      default:
        return "Data is not valid.";
    }
  },

  /**
   * Unauthorized - 401.
   * @param {String} langCode Mã ngôn ngữ.
   * @returns
   * @author NVDung (16-05-2024)
   */
  Unauthorized: (langCode) => {
    switch (langCode) {
      case "vi-VN":
        return "Tài khoản không được ủy quyền.";
      case "en-US":
      default:
        return "UnAuthorization.";
    }
  },

  /**
   * Forbidden - 403.
   * @param {String} langCode Mã ngôn ngữ.
   * @returns
   * @author NVDung (16-05-2024)
   */
  Forbidden: (langCode) => {
    switch (langCode) {
      case "vi-VN":
        return "Tài khoản không có quyền truy cập vào mục này.";
      case "en-US":
      default:
        return "This account does not have permission to access.";
    }
  },

  /**
   * NotFound - 404.
   * @param {String} langCode Mã ngôn ngữ.
   * @returns
   * @author NVDung (16-05-2024)
   */
  NotFound: (langCode) => {
    switch (langCode) {
      case "vi-VN":
        return "Không tìm thấy bất kì bản ghi nào.";
      case "en-US":
      default:
        return "Not found anything about your access.";
    }
  },

  /**
   * MethodNotAllowed - 405.
   * @param {String} langCode Mã ngôn ngữ.
   * @returns
   * @author NVDung (16-05-2024)
   */
  MethodNotAllowed: (langCode) => {
    switch (langCode) {
      case "vi-VN":
        return "Phương thức này đã bị chặn và không còn được sử dụng nữa.";
      case "en-US":
      default:
        return "This method has been disabled and cannot be used.";
    }
  },

  /**
   * ErrorConflict - 409.
   * @param {String} langCode Mã ngôn ngữ.
   * @returns
   * @author NVDung (16-05-2024)
   */
  ErrorConflict: (langCode) => {
    switch (langCode) {
      case "vi-VN":
        return "Yêu cầu không thể hoàn thành vì mâu thuẫn với trạng thái hiện tại.";
      case "en-US":
      default:
        return "The request could not be completed due to a conflict with the current state of the resource.";
    }
  },

  /**
   * UnsupportedMediaType - 415.
   * @param {String} langCode Mã ngôn ngữ.
   * @returns
   * @author NVDung (16-05-2024)
   */
  UnsupportedMediaType: (langCode) => {
    switch (langCode) {
      case "vi-VN":
        return "Tệp không được máy chủ hỗ trợ.";
      case "en-US":
      default:
        return "The media-type is not supported by the server.";
    }
  },

  /**
   * Trả về tin nhắn: {FieldName} không được phép để trống.
   * @author NVDung (16-05-2024)
   * @param {string} fieldName
   * @param {String} langCode Mã ngôn ngữ.
   * @returns
   */
  errorFieldEmpty: (fieldName, langCode) => {
    switch (langCode) {
      case "vi-VN":
        return `<${fieldName || "Thông tin"}> không được phép để trống.`;
      case "en-US":
      default:
        return `${fieldName || "This field"} can not be empty.`;
    }
  },

  /**
   * Trả về message: 'Mã bị trùng: <code> '
   * @author NVDung (16-05-2024)
   * @param {string} code
   * @param {String} langCode Mã ngôn ngữ.
   * @returns {string}
   */
  errorDuplicateCode: (code, langCode) => {
    switch (langCode) {
      case "vi-VN":
        return `Mã bị trùng: <${code}>`;
      case "en-US":
      default:
        return `Duplicate code: <${code}>`;
    }
  },
};

export default errorMessage;
