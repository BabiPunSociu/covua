import { apiWithAuth } from "@/api/base/api";

/**
 * Tìm trận đấu theo cấp độ.
 * @param {string} notificationHubId ID kết nối notification hub để thông báo khi tìm thấy trận.
 * @param {string} modeGameId ID chế độ chơi cần tìm.
 * @returns {Promise}
 * @author NVDung (06-12-2024)
 */
export const findGameAsync = async (notificationHubId, modeGameId) => {
  try {
    return apiWithAuth.post("/Game/FindGame", {
      connectionId: notificationHubId,
      modeGameId: modeGameId,
    });
  } catch (error) {
    console.error("Error while findGameAsync() in game.js", error);
  }
};

/**
 * Lấy thông tin TRẬN ĐẤU theo GameId.
 * @param {string} gameId ID trận đấu.
 * @returns {Promise}
 * @author NVDung (19-12-2024)
 */
export const getGameByCodeAsync = async (gameId) => {
  try {
    return apiWithAuth.get("Game/" + gameId);
  } catch (error) {
    console.error("getGameByCodeAsync() in game.js", error);
  }
};

/**
 * Lấy thông tin TRẬN ĐẤU theo GameId.
 * @param {string} gameId ID trận đấu.
 * @returns {Promise}
 * @author NVDung (19-12-2024)
 */
export const getGameByIdAsync = async (gameId) => {
  try {
    return apiWithAuth.get("Game/" + gameId);
  } catch (error) {
    console.error("getGameByIdAsync() in game.js", error);
  }
};
