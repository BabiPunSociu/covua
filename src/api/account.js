import { apiWithOutAuth, apiWithAuth } from "@/api/base/api";

/**
 * Thực hiện gửi yêu cầu gửi OTP để xác thực người dùng yêu cầu quên mật khẩu.
 * @param {string} email
 * @returns {Promise} Gửi yêu cầu forgot password.
 * @author NVDung (27-12-2024)
 */
export const forgotPasswordSentOtpAsync = async (email) => {
  try {
    return apiWithOutAuth.post("/Account/forgot-password-send-otp", null, {
      params: {
        email: email,
      },
    });
  } catch (error) {
    console.log("forgotPasswordAsync() in account.js", error);
  }
};

/**
 * Thực hiện gửi OTP cho server để thực hiện cấp mật khẩu mới.
 * @param {string} email
 * @param {string} otp
 * @returns {Promise} Gửi yêu cầu forgot password.
 * @author NVDung (27-12-2024)
 */
export const forgotPasswordCheckOtpAsync = async (email, otp) => {
  try {
    return apiWithOutAuth.post("/Account/forgot-password-check-otp", {
      email: email,
      otp: otp,
    });
  } catch (error) {
    console.log("forgotPasswordCheckOtpAsync() in account.js", error);
  }
};
