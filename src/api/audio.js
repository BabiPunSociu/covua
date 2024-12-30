import { apiWithAuth } from "@/api/base/api";

/**
 * Thực hiện lấy danh sách Audio.
 * @returns {Promise} List of Audio
 * @author NVDung (30-12-2024)
 */
export const getAudiosAsync = async () => {
  try {
    return apiWithAuth.get("/Audio");
  } catch (error) {
    console.error("getAudiosAsync() in audio.js", error);
  }
};
