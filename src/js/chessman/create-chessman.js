import NVDEnum from "../enum.js";
// import các file JS chứa class quân cờ
import chessManKing from "./chessman-king.js";
import chessManQueen from "./chessman-queen.js";
import chessManBishop from "./chessman-bishop.js";
import chessManKnight from "./chessman-knight.js";
import chessManRook from "./chessman-rook.js";
import chessManPawn from "./chessman-pawn.js";

/**
 * Hàm thực hiện tạo đối tượng quân cờ - Factory Pattern
 *
 * @param {Number} chessManValue Giá trị số của quân cờ theo quy ước, từ 1 đến 12. Ví dụ: 1, 2, ..., 12
 * @param {Number} rowCurrent Vị trí hàng hiện tại của quân cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
 * @param {Number} colCurrent Vị trí cột hiện tại của quân cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
 * @returns {Object} Đối tượng quân cờ cần tạo.
 *
 * @author: NVDung (10-03-2024)
 */
function createChessMan(chessManValue, rowCurrent, colCurrent) {
  try {
    switch (chessManValue) {
      case NVDEnum.chessMan.whiteKing:
      case NVDEnum.chessMan.blackKing:
        return new chessManKing(chessManValue, rowCurrent, colCurrent);
      case NVDEnum.chessMan.whiteQueen:
      case NVDEnum.chessMan.blackQueen:
        return new chessManQueen(chessManValue, rowCurrent, colCurrent);
      case NVDEnum.chessMan.whiteBishop:
      case NVDEnum.chessMan.blackBishop:
        return new chessManBishop(chessManValue, rowCurrent, colCurrent);
      case NVDEnum.chessMan.whiteKnight:
      case NVDEnum.chessMan.blackKnight:
        return new chessManKnight(chessManValue, rowCurrent, colCurrent);
      case NVDEnum.chessMan.whiteRook:
      case NVDEnum.chessMan.blackRook:
        return new chessManRook(chessManValue, rowCurrent, colCurrent);
      case NVDEnum.chessMan.whitePawn:
      case NVDEnum.chessMan.blackPawn:
        return new chessManPawn(chessManValue, rowCurrent, colCurrent);

      default:
        throw new Error("Invalid number");
    }
  } catch (e) {
    console.error("Lỗi khi tạo quân cờ", e);
  }
}

export default createChessMan;
