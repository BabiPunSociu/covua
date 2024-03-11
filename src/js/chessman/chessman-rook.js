import NVDEnum from "../enum.js";

import chessMan from "./chessman";

/**
 * Khai báo lớp quân XE
 *
 * @author: NVDung (11-03-2024)
 */
class chessManRook extends chessMan {
  // ===================================== Constructor ===================================== //
  /**
   * Contructor
   *
   * @param {Number} chessManValue Giá trị số của quân cờ theo quy ước, từ 1 đến 12. Ví dụ: 1, 2, ..., 12
   * @param {Number} rowCurrent Vị trí hàng hiện tại của quân cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
   * @param {Number} colCurent Vị trí cột hiện tại của quân cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
   *
   * @author: NVDung (11-03-2024)
   */
  constructor(chessManValue, rowCurrent, colCurent) {
    super(chessManValue, rowCurrent, colCurent);
  }

  // ===================================== Phương thức ===================================== //

  /**
   * Kiểm tra di chuyển hợp lệ ?
   *
   * @param {Number} toRow Vị trí hàng quân cờ bị Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number} toColumn Vị trí cột quân cờ bị Capture. Ví dụ: 0, 1, ..., 7.
   * @returns {Boolean} True - Hợp lệ, False - Không hợp lệ.
   * @author: NVDung (11-03-2024)
   */
  isCanMove(toRow, toColumn) {
    // Đảm bảo di chuyển khỏi vị trí hiện tại
    if (!super.isCanMove(toRow, toColumn)) {
      return false;
    }

    // Kiểm tra di chuyển ngang / dọc
    if (
      // Di chuyển ngang
      toRow === this.rowCurrent ||
      // Di chuyển dọc
      toColumn === this.colCurent
    ) {
      return true;
    }
    return false;
  }

  /**
   * Kiểm tra ăn quân cờ hợp lệ ?
   *
   * @param {Number} toChessManValue Giá trị số quân cờ sẽ Capture, từ 1 đến 12.
   * @param {Number} toRow Vị trí hàng quân cờ bị Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number} toColumn Vị trí cột quân cờ bị Capture. Ví dụ: 0, 1, ..., 7.
   * @returns {Boolean} True - Hợp lệ, False - Không hợp lệ.
   * @author: NVDung (11-03-2024)
   */
  isCanCapture(toChessManValue, toRow, toColumn) {
    if (
      // XE trắng ăn quân đen
      (this.id === NVDEnum.chessMan.whiteRook &&
        toChessManValue >= NVDEnum.chessMan.blackKing) ||
      // XE đen ăn quân trắng
      (this.id === NVDEnum.chessMan.blackRook &&
        0 < toChessManValue <= NVDEnum.chessMan.whitePawn)
    ) {
      // Kiểm tra Capture hợp lệ của quân XE -> Tương tự với Move
      return this.isCanMove(toRow, toColumn);
    }
    return false;
  }

  /**
   * Phương thức di chuyển quân cờ (Move + Capture)
   *
   * @param {Number} toChessMan Giá trị số quân cờ sẽ Capture, từ 1 đến 12.
   * @param {Number} toRow Vị trí HÀNG quân cờ sẽ Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number} toCol Vị trí CỘT quân cờ sẽ Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại.
   * @author: NVDung (11-03-2024)
   */
  moveTo(toChessManValue = 0, toRow, toColumn, boardStateMatrix) {
    // Gọi đến Class cha để thực hiện di chuyển
    super.moveTo(toChessManValue, toRow, toColumn, boardStateMatrix);

    // Các xử lý mở rộng viết ở đây
  }
}

export default chessManRook;
