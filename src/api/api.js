import axios from "axios";
import helper from "@/js/helper/helper";
import languageLocalStorage from "@/js/localstorage/localstorage";
import errorMessage from "@/js/resources/errormessage/errormessage";
/**
 * Khởi tạo cách truyền và xử lí Rest-API.
 * @author NVDung (15-05-2024)
 * @param {import('axios').CreateAxiosDefaults} config
 * @param {{auth: boolean, silent: boolean}} param2
 * @returns {import('axios').AxiosInstance}
 */
export const createApiInstance = (config, { auth = true, silent } = {}) => {
  const api = axios.create(config);

  api.interceptors.request.use(
    (config) => {
      if (auth && config?.headers) {
        //     config.headers['Authorization'] = 'Bearer ' + getAccessToken();
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
        console.log(error);
      }

      // Mã ngôn ngữ
      const { langCode, langName } = languageLocalStorage.getLangCode();

      if (!error.response) {
        return Promise.reject({
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

      let { userMessage } = camelCaseResData;

      switch (status) {
        case 400: {
          if (!userMessage) {
            userMessage = errorMessage.DataNotValid(langCode);
          }
          break;
        }

        case 401: {
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
          break;
        }
        default:
          userMessage = errorMessage.ErrorText(langCode);
      }
      return Promise.reject({
        message: userMessage,
        data: camelCaseResData.errors,
      });
    }
  );

  return api;
};

/**
 * Tạo một apiInstance với content là json
 * @author NVDung (15-05-2024)
 */
export const api = createApiInstance(
  {
    baseURL: `https://localhost:7011/api/v1`,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  },
  { auth: false, silent: false }
);
