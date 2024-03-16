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
    // Kiểm tra màu cờ của người chơi đang thực hiện
    const isWhite = colorPlayer === NVDEnum.colorPlayer.white;
    const isBlack = colorPlayer === NVDEnum.colorPlayer.black;

    // Kiểm tra màu không hợp lệ.
    if (!(isWhite || isBlack)) {
      throw new Error("Invalid color player.");
    }

    // Xác định giá trị min-max của quân cờ theo màu
    const minChessMan = isWhite
      ? NVDEnum.chessMan.whiteKing
      : NVDEnum.chessMan.blackKing;
    const maxChessMan = isWhite
      ? NVDEnum.chessMan.whitePawn
      : NVDEnum.chessMan.blackPawn;

    // Duyệt qua toàn bộ bàn cờ
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        // Giá trị ô cờ
        const cell = boardStateMatrix[row][col];
        // Xác định quân cờ theo màu đang thực hiện
        if (minChessMan <= cell && cell <= maxChessMan) {
          // Tạo đối tượng sourceChessMan phù hợp
          const sourceChessMan = createChessMan(cell, row, col);

          // Duyệt lại toàn bộ bàn cờ để xác định các ô đích
          for (let targetRow = 0; targetRow < 8; targetRow++) {
            for (let targetCol = 0; targetCol < 8; targetCol++) {
              // Giá trị ô cờ đích
              const targetCell = boardStateMatrix[targetRow][targetCol];

              if (
                // Nếu chơi quân TRẮNG thì cần các ô không có quân TRẮNG
                (isWhite && (targetCell === 0 || targetCell > maxChessMan)) ||
                // Nếu chơi quân ĐEN thì cần các ô không có quân ĐEN
                (isBlack && targetCell < minChessMan)
              ) {
                // Tạo đối tượng targetChessMan
                const targetChessManObject = new targetChessMan(
                  targetCell,
                  targetRow,
                  targetCol
                );
                const isLegalMove = sourceChessMan.moveTo(
                  boardStateMatrix,
                  targetChessManObject
                );

                if (isLegalMove) {
                  listResult.push({
                    chessMan: sourceChessMan,
                    targetChessMan: targetChessManObject,
                  });
                }
              }
            }
          }
        }
      }
    }

    return listResult;
  } catch (e) {
    console.error("Lỗi khi tìm danh sách nước đi hợp lệ", e);
  }
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
