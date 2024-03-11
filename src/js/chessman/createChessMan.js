// import các file JS chứa class quân cờ
import chessManKing from "./chessman-king.js";

/**
 * Hàm thực hiện tạo đối tượng quân cờ - Factory Pattern
 * 
 * @param {Number} chessManValue Giá trị số của quân cờ theo quy ước, từ 1 đến 12. Ví dụ: 1, 2, ..., 12
 * @param {Number} rowCurrent Vị trí hàng hiện tại của quân cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
 * @param {Number} colCurent Vị trí cột hiện tại của quân cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
 * @returns {Object} Đối tượng quân cờ cần tạo.
 *
 * @author: NVDung (10-03-2024)
 */
function createChessMan(chessManValue, rowCurrent, colCurent) {
  try {
    switch (chessManValue) {
      case 1:
        return new chessManKing(chessManValue, rowCurrent, colCurent);
      case 2:
        return;
      case 3:
        return;
      case 4:
        return;
      case 5:
        return;
      case 6:
        return;
      case 7:
        return;

      default:
        throw new Error("Invalid number");
    }
  } catch (e) {
    console.error("Lỗi khi tạo quân cờ", e);
  }
}

export default createChessMan;
