import { apiWithAuth, apiWithOutAuth } from "@/api/base/api";

/**
 * Thực hiện lấy danh sách Levels
 * @returns {Promise} List of levels
 * @author NVDung (23-10-2024)
 */
export const getLevelsAsync = async () => {
  try {
    return apiWithOutAuth.get("/Level");
  } catch (error) {
    console.error("getLevelsAsync() in level.js", error);
  }
};

/**
 * Thực hiện lấy chi tiết của Level theo id
 * @param {Number} levelId Id của Level
 * @returns {Promise} Chi tiết Level
 * @author NVDung (23-10-2024)
 */
export const getLevelByIdAsync = async (levelId) => {
  try {
    return apiWithAuth.get("/Level/" + levelId);
  } catch (error) {
    console.error("getLevelByIdAsync() in level.js", error);
  }
};
