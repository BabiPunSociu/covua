/**
 * Đối tượng cung cấp các hàm thực hiện tương tác local storage về token.
 */
const key = "NVDChessToken";
const tokenLocalStorage = {
  /**
   * Set token vào local storage.
   * @param {{accessToken: string, refreshToken: string}} tokenModel Token nhận được từ Backend.
   * @author NVDung (15-05-2024)
   */
  setToken: (tokenModel) => {
    try {
      // Chuyển Obj -> JSON
      const tokenJSON = JSON.stringify(tokenModel);
      // Thêm vào localStorage
      localStorage.setItem(key, tokenJSON);
    } catch (error) {
      console.error("Error while set token to local storage", error);
    }
  },

  /**
   * Lấy thông tin ngôn ngữ từ local storage.
   * @returns {{accessToken: string, refreshToken: string}} Token nhận được này Backend được lưu trong local storage.
   * @author NVDung (15-05-2024)
   */
  getToken: () => {
    // Lấy value từ local storage
    const tokenJSON = localStorage.getItem(key);

    if (!tokenJSON || tokenJSON == `undefined`) return null;

    // Chuyển JSON -> Obj
    let obj = JSON.parse(tokenJSON);
    return obj;
  },

  /**
   * Xóa token trong local storage.
   * @author NVDung (15-05-2024)
   */
  removeToken: () => {
    localStorage.removeItem(key);
  },
};

export default tokenLocalStorage;
