/**
 * Đối tượng cung cấp các hàm thực hiện tương tác local storage về token.
 */
const tokenLocalStorage = {
  /**
   * Set token vào local storage.
   * @param {String} token Token nhận được từ Backend.
   * @author NVDung (15-05-2024)
   */
  setToken: (token) => {
    localStorage.setItem("NVDChessToken", token);
  },

  /**
   * Lấy thông tin ngôn ngữ từ local storage.
   * @returns {String?} Token nhận được này Backend được lưu trong local storage.
   * @author NVDung (15-05-2024)
   */
  getToken: () => localStorage.getItem("NVDChessToken"),

  /**
   * Xóa token trong local storage.
   * @author NVDung (15-05-2024)
   */
  removeToken: () => {
    localStorage.removeItem("NVDChessToken");
  },
};

export default tokenLocalStorage;
