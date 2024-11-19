import { apiWithOutAuth } from "@/api/base/api";

/**
 * Thực hiện đăng nhập bằng username, password
 * @param {String} username
 * @param {String} password
 * @returns {Promise} Kết quả login.
 * @author NVDung (16-05-2024)
 */
export const authenUsernamePasswordApiAsync = async (username, password) => {
  try {
    return apiWithOutAuth.post("/Authentication/login", {
      username: username,
      password: password,
    });
  } catch (error) {
    console.log("authenUsernamePasswordApiAsync() in authentication.js", error);
  }
};



/**
 * Thực hiện đăng kí tài khoản mới
 */
export const registerAccountAsync = async () => {
  try {
  } catch (error) {
    console.log("registerAccountAsync() in authentication.js", error);
  }
};
