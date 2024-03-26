/* ============================== IMPORT CLASSES/ FUNCTIONS ============================== */
// Function createChessMan
import createChessMan from "../chessman/create-chessman.js";
// Class targetChessMan
import targetChessMan from "../targetchessman/target-chessman.js";
// Đối tượng NVDEnum
import NVDEnum from "../enum.js";

/* ============================== CÁC HÀM VỀ NƯỚC CỜ HỢP LỆ ============================== */
/**
 * Tìm danh sách nước đi hợp lệ.
 *
 * @param {Number[][]} boardStateMatrix Ma trận trạng thái bàn cờ.
 * @param {Number} colorPlayer Màu cờ người chơi đang thực hiện.
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
 * @param {Number} colorPlayer Màu cờ người chơi đang thực hiện.
 *
 * @returns {Boolean} True - Checkmate, False - Không checkmate.
 * @author NVDung (16-03-2024)
 */
function isCheckmate(boardStateMatrix, colorPlayer) {
  try {
    // Kiểm tra màu cờ của người chơi đang thực hiện
    const isWhite = colorPlayer === NVDEnum.colorPlayer.white;
    const isBlack = colorPlayer === NVDEnum.colorPlayer.black;

    // Kiểm tra màu không hợp lệ.
    if (!(isWhite || isBlack)) {
      throw new Error("Invalid color player.");
    }

    // Tìm danh sách nước đi hợp lệ
    let listLegalMoves = findLegalMoves(boardStateMatrix, colorPlayer);

    // Tạo đối tượng chessMan bất kì, để dùng phương thức kiểm tra chiếu tướng
    const chessMan = createChessMan(NVDEnum.chessMan.whiteKing, 0, 0);

    // Kiểm tra chiếu tướng && không có nước đi hợp lệ để thoát khỏi.
    if (
      // Chơi quân TRẮNG + Vua TRẮNG bị chiếu
      ((isWhite && chessMan.isWhiteKingCheck(boardStateMatrix)) ||
        // Chơi quân ĐEN + Vua ĐEN bị chiếu
        (isBlack && chessMan.isBlackKingCheck(boardStateMatrix))) &&
      // Không có nước đi nào hợp lệ để di chuyển.
      listLegalMoves.length === 0
    ) {
      return true;
    }
    return false;
  } catch (e) {
    console.error("Lỗi khi kiểm tra checkmate", e);
  }
}

/* ============================== CÁC HÀM VỀ CỜ HÒA ============================== */
/**
 * Kiểm tra ván cờ HÒA
 *
 * @param {Number[][]} boardStateMatrix Ma trận trạng thái bàn cờ.
 * @param {Number} colorPlayer Màu cờ người chơi đang thực hiện: 0 - TRẮNG, 1 - ĐEN.
 *
 * @returns {Boolean} True - Hòa, False - Không hòa.
 * @author NVDung (16-03-2024)
 */
function isDraw(boardStateMatrix, colorPlayer) {
  try {
    // Kiểm tra màu cờ của người chơi đang thực hiện
    const isWhite = colorPlayer === NVDEnum.colorPlayer.white;
    const isBlack = colorPlayer === NVDEnum.colorPlayer.black;

    // Kiểm tra màu không hợp lệ.
    if (!(isWhite || isBlack)) {
      throw new Error("Invalid color player.");
    }

    // Kiểm tra stalemate
    if (stalemateCheck(boardStateMatrix, colorPlayer)) {
      return true;
    }

    // Kiểm tra threefold repetition

    // Kiểm tra insufficient material

    // Kiểm tra fivefold repetition

    return false;
  } catch (error) {
    console.error("Lỗi khi kiểm tra hòa", error);
  }
}

/**
 * Kiểm tra trường hợp hòa phổ biến stalemate.
 * - Vua không bị chiếu, nhưng không có nước đi nào hợp lệ để di chuyển.
 *
 * @param {Number[][]} boardStateMatrix Ma trận trạng thái bàn cờ.
 * @param {Number} colorPlayer Màu cờ người chơi đang thực hiện: 0 - TRẮNG, 1 - ĐEN.
 *
 * @returns {Boolean} True - Hòa, False - Không hòa.
 * @author NVDung (17-03-2024)
 */
function stalemateCheck(boardStateMatrix, colorPlayer) {
  try {
    // Kiểm tra màu cờ của người chơi đang thực hiện
    const isWhite = colorPlayer === NVDEnum.colorPlayer.white;
    const isBlack = colorPlayer === NVDEnum.colorPlayer.black;

    // Kiểm tra màu không hợp lệ.
    if (!(isWhite || isBlack)) {
      throw new Error("Invalid color player.");
    }

    // Tìm danh sách nước đi hợp lệ
    let listLegalMoves = findLegalMoves(boardStateMatrix, colorPlayer);

    // Tạo đối tượng chessMan bất kì, để dùng phương thức kiểm tra chiếu tướng
    const chessMan = createChessMan(NVDEnum.chessMan.whiteKing, 0, 0);

    // Kiểm tra chiếu tướng && không có nước đi hợp lệ để thoát khỏi.
    if (
      // Chơi quân TRẮNG + Vua TRẮNG "KHÔNG" bị chiếu
      ((isWhite && !chessMan.isWhiteKingCheck(boardStateMatrix)) ||
        // Chơi quân ĐEN + Vua ĐEN "KHÔNG" bị chiếu
        (isBlack && !chessMan.isBlackKingCheck(boardStateMatrix))) &&
      // Không có nước đi nào hợp lệ để di chuyển.
      listLegalMoves.length === 0
    ) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Lỗi khi kiểm tra hòa trong stalemate", error);
  }
}

/**
 * Kiểm tra trường hợp hòa phải biến threefold repetition.
 * - Nếu bàn cờ xuất hiện ba lần theo 1 tình huống => Tìm bằng CSDL (API)
 *
 * @param {Number[][]} boardStateMatrix Ma trận trạng thái bàn cờ.
 * @param {Number} colorPlayer Màu cờ người chơi đang thực hiện: 0 - TRẮNG, 1 - ĐEN.
 *
 * @returns {Boolean} True - Hòa, False - Không hòa.
 * @author NVDung (17-03-2024)
 */
function threefoldRepetitionCheck(boardStateMatrix, colorPlayer) {}

/**
 * Kiểm tra trường hợp hòa phải biến insufficient material.
 * - Không đủ quân để có thể thực hiện Checkmate. (Thường là còn mỗi Vua)
 *
 * @param {Number[][]} boardStateMatrix Ma trận trạng thái bàn cờ.
 * @param {Number} colorPlayer Màu cờ người chơi đang thực hiện: 0 - TRẮNG, 1 - ĐEN.
 *
 * @returns {Boolean} True - Hòa, False - Không hòa.
 * @author NVDung (17-03-2024)
 */
function insufficientMaterialCheck(boardStateMatrix, colorPlayer) {}

/**
 * Kiểm tra trường hợp hòa phải biến fifty-move rule.
 * - Nếu trong 50 nước đi liên tiếp không có việc bắt quân hoặc di chuyển quân tốt -> HÒA.
 *
 * @param {Number[][]} boardStateMatrix Ma trận trạng thái bàn cờ.
 * @param {Number} colorPlayer Màu cờ người chơi đang thực hiện: 0 - TRẮNG, 1 - ĐEN.
 *
 * @returns {Boolean} True - Hòa, False - Không hòa.
 * @author NVDung (17-03-2024)
 */
function fiftyMoveRuleCheck(boardStateMatrix, colorPlayer) {}

/* ============================== HÀM KIỂM TRA KẾT THÚC VÁN CỜ ============================== */
/**
 * Kiểm tra KẾT THÚC ván cờ theo trạng thái bàn cờ.
 *
 * @param {Number[][]} boardStateMatrix Ma trận trạng thái bàn cờ.
 * @param {Number} colorPlayer Màu cờ người chơi đang thực hiện: 0 - TRẮNG, 1 - ĐEN.
 *
 * @returns {Number} 0 - Đang diễn ra, 1 - THUA, 2 - HÒA.
 * @author NVDung (16-03-2024)
 */
function checkEndGame(boardStateMatrix, colorPlayer) {
  // Kiem tra checkmate
  if (isCheckmate(boardStateMatrix, colorPlayer)) {
    return NVDEnum.resultMatch.lose;
  }

  // Kiem tra draw
  if (isDraw(boardStateMatrix)) {
    return NVDEnum.resultMatch.draw;
  }

  // Mặc định trả về trạng thái: Đang diễn ra.
  return NVDEnum.resultMatch.happenning;
}

export default checkEndGame;
