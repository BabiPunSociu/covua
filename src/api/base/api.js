import axios from "axios";
import helper from "@/js/helper/helper";
import languageLocalStorage from "@/js/localstorage/languageLocalStorage";
import tokenLocalStorage from "@/js/localstorage/tokenLocalStorage";
import errorMessage from "@/js/resources/errormessage/errormessage";
/**
 * Khởi tạo cách truyền và xử lí Rest-API.
 * @author NVDung (15-05-2024)
 * @param {import('axios').CreateAxiosDefaults} config
 * @param {{auth: boolean, silent: boolean}} param2
 * @returns {import('axios').AxiosInstance}
 */
const createApiInstance = (config, { auth = true, silent = false }) => {
  const api = axios.create(config);

  api.interceptors.request.use(
    (config) => {
      if (auth && config?.headers) {
        try {
          // Lấy giá trị Token trong local storage
          let jwt = tokenLocalStorage.getToken();

          let { accessToken, refreshToken } = jwt;

          // Thiết lập Header request
          config.headers["AccessToken"] = "Bearer " + accessToken;
          config.headers["RefreshToken"] = "Bearer " + refreshToken;
        } catch (error) {
          console.error(`Lỗi khi thiết lập Token vào Header`, error);
        }
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    /**
     * Nếu response nhận về là json về convert về dạng camelCase
     * @author NVDung (15-05-2024)
     * @param {import('axios').AxiosResponse} response
     * @returns {import('axios').AxiosResponse}
     */
    (response) => {
      console.log(response);

      const contentType = response.headers["content-type"] || "";

      if (contentType.includes("application/json")) {
        return helper.convertKeysToCamelCase(response);
      }

      return response;
    },

    /**
     * Xử lí các trường hợp lỗi
     * @author NVDung (15-05-2024)
     * @param {import('axios').AxiosError} error
     * @returns {{message: string, data: object}} data
     */
    (error) => {
      if (!silent) {
        console.log(`Lỗi API`, error);
      }

      // Mã ngôn ngữ
      const { langCode, langName } = languageLocalStorage.getLangCode();
      /**
       * Lỗi do người dùng.
       * - true: Dialog.
       * - false: Toast.
       */
      let userError = true;

      if (!error.response) {
        return Promise.reject({
          useDialog: (userError = false), // Hiển thị lỗi bằng dialog || toast.
          message: errorMessage.ErrorText(langCode), // Có lỗi xảy ra, vui lòng liên hệ NVDChess để được hỗ trợ.
          data: null,
        });
      }

      const { status } = error.response;

      /**
       * Response Data dạng camel case.
       */
      const camelCaseResData = helper.convertKeysToCamelCase(
        error.response.data
      );

      let { userMessage, devMessage } = camelCaseResData;

      switch (status) {
        case 400: {
          if (!userMessage) {
            userMessage = errorMessage.DataNotValid(langCode);
          }

          if (devMessage == "NotFoundGame") {
            return Promise.reject({ message: "NotFoundGame" });
          }
          break;
        }

        case 401: {
          // Lấy thông tin DevMessage
          if (devMessage) {
            try {
              if (devMessage == "InValidToken") {
                return Promise.reject({ message: "GoToLogin" });
              }

              // Chuyển JSON -> Object
              devMessage = JSON.parse(devMessage);
              let { message, accessToken, refreshToken } = devMessage;
              // Refresh token
              if (message == "REFRESH_TOKEN") {
                // Cập nhật local storage
                tokenLocalStorage.setToken({ accessToken, refreshToken });

                return Promise.reject({ message: "CallApiAgain" });
              }
            } catch (error) {
              console.log(`Lỗi khi chuyển DevMessage sang Object`, error);
            }
          }

          // Xóa token trong local storage
          tokenLocalStorage.removeToken();

          if (!userMessage) {
            userMessage = errorMessage.Unauthorized(langCode);
          }
          break;
        }
        case 403: {
          if (!userMessage) {
            userMessage = errorMessage.Forbidden(langCode);
          }
          break;
        }
        case 404: {
          if (!userMessage) {
            userMessage = errorMessage.NotFound(langCode);
          }
          break;
        }
        case 405: {
          if (!userMessage) {
            userMessage = errorMessage.MethodNotAllowed(langCode);
          }
          break;
        }
        case 409: {
          if (!userMessage) {
            userMessage = errorMessage.ErrorConflict(langCode);
          }
          break;
        }
        case 415: {
          if (!userMessage) {
            userMessage = errorMessage.UnsupportedMediaType(langCode);
          }
          break;
        }
        case 500: {
          if (!userMessage) {
            userMessage = errorMessage.ErrorText(langCode);
          }
          userError = false;
          break;
        }
        default:
          userMessage = errorMessage.ErrorText(langCode);
      }
      return Promise.reject({
        useDialog: userError, // Hiển thị lỗi bằng dialog || toast.
        message: `${userMessage}: ${devMessage}` || userMessage,
        // Array errors validate input backend.
        data: camelCaseResData.errors,
      });
    }
  );

  return api;
};

/**
 * Tạo một apiInstance với content là json.
 * - Đã Authentication JWT.
 * @author NVDung (15-05-2024)
 */
export const apiWithAuth = createApiInstance(
  {
    baseURL: `https://localhost:7011/api/v1`,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  },
  { auth: true, silent: false }
);

/**
 * Tạo một apiInstance với content là json.
 * Không Authentication JWT.
 * @author NVDung (15-05-2024)
 */
export const apiWithOutAuth = createApiInstance(
  {
    baseURL: `https://localhost:7011/api/v1`,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  },
  { auth: false, silent: false }
);
