const key = "NVDChessLastURL";

/**
 * Đối tượng cung cấp các hàm thực hiện tương tác local storage về url cuối cùng.
 * - Nhằm lưu trữ trang trước khi chuyển đến đăng nhập / đăng kí.
 */
const lastURLLocalStorage = {
  /**
   * Set thông tin URL cuối cùng vào local storage.
   * @param {{ name: string, params: object }} options Thông tin URL lấy từ $route gồm: name và params.
   * @author NVDung (16-05-2024)
   */
  setLastUrl: (options = { name: "HomeRouter", params: {} }) => {
    try {
      // Chuyển Obj -> JSON
      let lastUrlJSON = JSON.stringify(options);

      // Lưu vào local storage.
      localStorage.setItem(key, lastUrlJSON);
    } catch (error) {
      console.error("Loi khi set last_url vao local storage", error);
    }
  },

  /**
   * Get thông tin URL cuối cùng từ local storage.
   * @returns {{ name: string, params: object }} obj options Thông tin URL lấy từ $route gồm: name và params.
   * @author NVDung (16-05-2024)
   */
  getLastUrl: function () {
    try {
      // Lấy thông tin từ local storage.
      const lastUrlJSON = localStorage.getItem(key);

      if (lastUrlJSON) {
        // Chuyển JSON -> Obj
        let { name, params } = JSON.parse(lastUrlJSON);
        return { name, params };
      }

      // Set last url mặc định.
      this.setLastUrl();

      // Gọi đệ quy, lấy URL một lần nữa.
      return this.getLastUrl();
    } catch (error) {
      console.error("Loi khi get last_url tu local storage", error);
    }
  },
};

export default lastURLLocalStorage;
