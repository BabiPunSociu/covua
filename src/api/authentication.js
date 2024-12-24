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
 * Thực hiện đăng kí tài khoản người dùng mới.
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @param {string} levelId
 * @returns {Promise} Đối tượng gồm OTP (Gmail) và UserId để xác thực mail.
 * @author NVDung (19-11-2024)
 */
export const registerAccountAsync = async (
  firstName,
  lastName,
  username,
  password,
  email,
  levelId
) => {
  try {
    return apiWithOutAuth.post("/Authentication/register", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      email: email,
      levelId: levelId,
    });
  } catch (error) {
    console.log("registerAccountAsync() in authentication.js", error);
  }
};

/**
 * Thực hiện xác thực email và nhận JWT.
 * @param {string} userId
 * @param {string} OTP
 * @returns {Promise} Đối tượng JWT.
 * @author NVDung (29-11-2024)
 */
export const confirmRegisterAcconuntAsync = async (userId, OTP) => {
  try {
    return apiWithOutAuth.post("/Authentication/register-confirm", {
      userId: userId,
      OTP: OTP,
    });
  } catch (error) {
    console.log("confirmRegisterAcconuntAsync() in authentication.js", error);
  }
};
