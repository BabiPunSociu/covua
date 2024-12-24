import { apiWithAuth } from "@/api/base/api";

/**
 * Thực hiện lấy Image theo id
 * @param {string} imageId Id của Image
 * @returns {Promise} Thông tin Image
 * @author NVDung (19-12-2024)
 */
export const getImageByIdAsync = async (imageId) => {
  try {
    return apiWithAuth.get("/Image/" + imageId);
  } catch (error) {
    console.error("getImageByIdAsync() in image.js", error);
  }
};
