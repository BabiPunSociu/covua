import { apiWithAuth } from "@/api/base/api";

/**
 * Thực hiện lấy danh sách ModeGame.
 * @returns {Promise} List of ModeGames
 * @author NVDung (06-12-2024)
 */
export const getModeGamesAsync = async () => {
  try {
    return apiWithAuth.get("/ModeGame");
  } catch (error) {
    console.error("getModeGamesAsync() in modegame.js", error);
  }
};
