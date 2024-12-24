/**
 * Đối tượng cung cấp các hàm thực hiện tương tác local storage về userId.
 */
const key = "NVDChessUserId";
const userIdLocalStorage = {
  /**
   * Set UserId vào local storage.
   * @param {string} userId UserId nhận được từ Backend.
   * @author NVDung (29-11-2024)
   */
  setUserId: (userId) => {
    try {
      // Chuyển Obj -> JSON
      const userIdJSON = JSON.stringify(userId);
      // Thêm vào localStorage
      localStorage.setItem(key, userIdJSON);
    } catch (error) {
      console.error("Error while set UserId to local storage", error);
    }
  },

  /**
   * Lấy thông tin UserId từ local storage.
   * @returns {string} UserId nhận được này Backend được lưu trong local storage.
   * @author NVDung (29-11-2024)
   */
  getUserId: () => {
    // Lấy value từ local storage
    const userIdJSON = localStorage.getItem(key);

    if (!userIdJSON || userIdJSON == `undefined`) return null;

    // Chuyển JSON -> Obj
    let obj = JSON.parse(userIdJSON);
    return obj;
  },

  /**
   * Xóa UserId trong local storage.
   * @author NVDung (29-11-2024)
   */
  removeUserId: () => {
    localStorage.removeItem(key);
  },
};

export default userIdLocalStorage;
