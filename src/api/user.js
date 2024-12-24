import { apiWithAuth } from "@/api/base/api";

/**
 * Thực hiện lấy danh sách Users.
 * @returns {Promise} List of Users
 * @author NVDung (23-10-2024)
 */
export const getUsersAsync = async () => {
  try {
    return apiWithAuth.get("/User");
  } catch (error) {
    console.error("getUsersAsync() in user.js", error);
  }
};

/**
 * Thực hiện lấy chi tiết của User theo id
 * @param {string} userId Id của User
 * @returns {Promise} Chi tiết User
 * @author NVDung (23-10-2024)
 */
export const getUserByIdAsync = async (userId) => {
  try {
    return apiWithAuth.get("/User/" + userId);
  } catch (error) {
    console.error("getUserByIdAsync() in user.js", error);
  }
};
