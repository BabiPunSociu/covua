import { api } from "@/api/api";

/**
 * Thực hiện đăng nhập bằng username, password
 * @param {String} username
 * @param {String} password
 * @returns {Promise} Kết quả login.
 * @author NVDung (16-05-2024)
 */
export const authenUsernamePasswordApiAsync = (username, password) => {
  api.post("/Authentication/login", {
    username: username,
    password: password,
  });
};
