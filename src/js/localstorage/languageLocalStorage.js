const key = "NVDChessLangguageCode";

/**
 * Đối tượng cung cấp các hàm thực hiện tương tác local storage về ngôn ngữ.
 */
const languageLocalStorage = {
  /**
   * Set mã ngôn ngữ vào local storage.
   * @param {{langCode: string, langName: string}} options Đối tượng lưu trữ thông tin ngôn ngữ.
   * @author NVDung (15-05-2024)
   */
  setLangCode: (options = { langCode: "vi-VN", langName: "Tiếng Việt" }) => {
    try {
      // Chuyển Obj -> JSON
      const langCodeJSON = JSON.stringify(options);
      // Thêm vào localStorage
      localStorage.setItem(key, langCodeJSON);
    } catch (error) {
      console.error("Error while set langCode to local storage", error);
    }
  },

  /**
   * Lấy thông tin ngôn ngữ từ local storage.
   * @returns {{langCode: string, langName: string}} Đối tượng lưu trữ ngôn ngữ hiện tại.
   * @author NVDung (15-05-2024)
   */
  getLangCode: function () {
    try {
      const langCodeJSON = localStorage.getItem(key);

      /* ========== Nếu có langCode trong localStorage ========== */
      if (langCodeJSON) {
        // Chuyển JSON thành obj
        let obj = JSON.parse(langCodeJSON);
        return obj;
      }

      /* ========== KHÔNG có langCode trong localStorage ========== */
      // Thực hiện thêm ngôn ngữ mặc định Tiếng việt.
      this.setLangCode();
      // Thực hiện lại get language
      return this.getLangCode();
    } catch (e) {
      console.error("Error while get langCode from local storage", e);
    }
  },
};

export default languageLocalStorage;
