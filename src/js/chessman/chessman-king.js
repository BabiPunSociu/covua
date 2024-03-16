import NVDEnum from "../enum.js";

import chessMan from "./chessman";

/**
 * Khai báo lớp quân vua
 *
 * @author: NVDung (19-02-2024)
 */
class chessManKing extends chessMan {
  // ===================================== Constructor ===================================== //
  /**
   * Contructor
   *
   * @param {Number} chessManValue Giá trị số của quân cờ theo quy ước, từ 1 đến 12. Ví dụ: 1, 2, ..., 12
   * @param {Number} rowCurrent Vị trí hàng hiện tại của quân cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
   * @param {Number} colCurrent Vị trí cột hiện tại của quân cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
   *
   * @author: NVDung (19-02-2024)
   */
  constructor(chessManValue, rowCurrent, colCurrent) {
    super(chessManValue, rowCurrent, colCurrent);
  }

  // ===================================== Phương thức ===================================== //

  /**
   * Kiểm tra di chuyển hợp lệ ?
   *
   * @param {targetChessMan} targetChessMan Đối tượng targetChessMan.
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại.
   * @returns {Boolean} True - Hợp lệ, False - Không hợp lệ.
   * @author: NVDung (19-02-2024)
   */
  isCanMove(boardStateMatrix, targetChessMan) {
    try {
      // Đảm bảo di chuyển khỏi vị trí hiện tại
      if (!super.isCanMove(boardStateMatrix, targetChessMan)) {
        return false;
      }

      // Kiểm tra di chuyển 1 ô theo mọi hướng
      if (
        Math.abs(targetChessMan.row - this.rowCurrent) <= 1 &&
        Math.abs(targetChessMan.col - this.colCurrent) <= 1
      ) {
        return true;
      }
      return false;
    } catch (e) {
      console.error("Lỗi khi kiểm tra di chuyển King", e);
    }
  }

  /**
   * Kiểm tra ăn quân cờ hợp lệ ?
   *
   * @param {targetChessMan} targetChessMan Đối tượng targetChessMan.
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại.
   * @returns {Boolean} True - Hợp lệ, False - Không hợp lệ.
   * @author: NVDung (19-02-2024)
   */
  isCanCapture(boardStateMatrix, targetChessMan) {
    try {
      if (
        // Vua trắng ăn quân đen
        (this.id === NVDEnum.chessMan.whiteKing &&
          targetChessMan.id >= NVDEnum.chessMan.blackKing) ||
        // Vua đen ăn quân trắng
        (this.id === NVDEnum.chessMan.blackKing &&
          0 < targetChessMan.id <= NVDEnum.chessMan.whitePawn)
      ) {
        // Kiểm tra Capture hợp lệ của quân VUA -> Tương tự với Move
        return this.isCanMove(boardStateMatrix, targetChessMan);
      }

      return false;
    } catch (e) {
      console.error("Lỗi khi kiểm tra Capture King", e);
    }
  }

  /**
   * Phương thức di chuyển quân cờ (Move + Capture)
   *
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại.
   * @param {targetChessMan} targetChessMan Đối tượng targetChessMan.
   * @returns {Boolean} True - Hợp lệ, False - Không hợp lệ.
   * @author: NVDung (19-02-2024)
   */
  moveTo(boardStateMatrix, targetChessMan) {
    try {
      // Gọi đến Class cha để thực hiện di chuyển
      let isLegalMove = super.moveTo(boardStateMatrix, targetChessMan);

      return isLegalMove;

      // Các xử lý mở rộng viết ở đây
    } catch (e) {
      console.error("Lỗi khi di chuyển King", e);
    }
  }
}

export default chessManKing;
