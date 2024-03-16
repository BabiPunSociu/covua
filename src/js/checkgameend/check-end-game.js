/* ============================== IMPORT CLASSES/ FUNCTIONS ============================== */
// Function createChessMan
import createChessMan from "../chessman/create-chessman.js";
// Class targetChessMan
import targetChessMan from "../targetchessman/target-chessman.js";
// Đối tượng NVDEnum
import NVDEnum from "../enum.js";

/* ============================== CÁC HÀM VỀ CỜ HÒA ============================== */
/**
 * Tìm danh sách nước đi hợp lệ.
 *
 * @param {Number[][]} boardStateMatrix Ma trận trạng thái bàn cờ.
 * @param {Number} colorPlayer Máy tính hợp lệ.
 * @returns {Array[Object]} Array chứa các đối tượng nước đi hợp lệ, dạng {chessMan, targetChessMan}.
 * @author NVDung (16-03-2024)
 */
function findLegalMoves(boardStateMatrix, colorPlayer) {
  // List chứa các đối tượng nước đi hợp lệ.
  const listResult = [];
  try {
    // Người chơi cầm quân TRẮNG
    if (colorPlayer === NVDEnum.colorPlayer.white) {
      // Máy tính hợp lệ
    } else if (colorPlayer === NVDEnum.colorPlayer.black) {
      // Máy tính đen
    }

    // Màu cờ không hợp lệ
    else {
      throw new Error("Invalid colorPlayer");
    }
  } catch (e) {
    console.error("Lỗi khi tìm danh sách nước đi hợp lệ", e);
  }
  return listResult;
}

/* ============================== CÁC HÀM VỀ CỜ THẮNG - THUA ============================== */
/**
 * Kiểm tra Checkmate:
 * - Chiếu tướng đối thủ.
 * - Đối thủ không có bất kì nước đi hợp lệ nào để thoát khỏi chiếu.
 *
 * @param {Number[][]} boardStateMatrix Ma trận trạng thái bàn cờ.
 * @returns {Boolean} True - Checkmate, False - Không checkmate.
 * @author NVDung (16-03-2024)
 */
function isCheckmate(boardStateMatrix) {}

/* ============================== CÁC HÀM VỀ CỜ HÒA ============================== */
/**
 * Kiểm tra ván cờ HÒA
 *
 * @param {Number[][]} boardStateMatrix Ma trận trạng thái bàn cờ.
 * @returns {Boolean} True - Hòa, False - Không hòa.
 * @author NVDung (16-03-2024)
 */
function isDraw(boardStateMatrix) {
  //
}

/* ============================== HÀM KIỂM TRA KẾT THÚC VÁN CỜ ============================== */
/**
 * Kiểm tra KẾT THÚC ván cờ theo trạng thái bàn cờ.
 *
 * @param {Number[][]} boardStateMatrix Ma trận trạng thái bàn cờ.
 * @param {} colorPlayer
 * @returns {boolean} True - Kết thúc, False - Không kết thúc.
 * @author NVDung (16-03-2024)
 */
export function checkEndGame(boardStateMatrix, colorPlayer) {}
