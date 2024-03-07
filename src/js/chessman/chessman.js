import * as Resource from "../resource";
import * as Enum from "../enum";

/**
 * Khai báo lớp quân cờ
 *
 * @author: NVDung (19-02-2024)
 */
class chessMan {
  // ===================================== Constructor ===================================== //
  /**
   * Contructor
   *
   * @param {Number} chessManValue Giá trị số của quân cờ theo quy ước, từ 1 đến 12. Ví dụ: 1, 2, ..., 12
   * @param {Number} chessManPosition Vị trí hiện tại của quân cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
   * @param {Number} chessManPosition Vị trí hiện tại của quân cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
   * @author: NVDung (19-02-2024)
   */
  constructor(chessManValue, rowCurrent, colCurent) {
    /**
     * Giá trị số của quân cờ theo quy ước, từ 1 đến 12.
     */
    this.id = chessManValue;

    /**
     * Tên quân cờ text.
     */
    this.name = this.getChessManName(chessManValue) || "";

    /**
     * Vị trí hàng hiện tại của quân cờ theo ma trận.
     */
    this.rowCurrent = rowCurrent;

    /**
     * Vị trí cột hiện tại của quân cờ theo ma trận.
     */
    this.colCurent = colCurent;
  }

  // ===================================== Phương thức ===================================== //

  // ==================== Phương thức dùng chung ==================== //
  /**
   * Lấy tên quân cờ
   *
   * @param {Number} chessManValue Giá trị số của quân cờ theo quy ước, từ 1 đến 12.
   * @returns {String} Tên quân cờ.
   * @author: NVDung (19-02-2024)
   */
  getChessManName(chessManValue) {
    try {
      if (chessManValue >= 1 && chessManValue <= 12) {
        return Resource.classChessMan[chessManValue];
      }
    } catch (e) {
      console.error("Lỗi khi lấy tên quân cờ", e);
    }
  }

  // /**
  //  * Lấy vị trí "HÀNG" của quân cờ với stringPosition
  //  *
  //  * @param {String} stringPosition
  //  * @returns {Number} Vị trí Row.
  //  * @author: NVDung (19-02-2024)
  //  */
  // getRowPosition(stringPosition) {
  //   return parseInt(stringPosition.slice(0, 1));
  // }

  //   /**
  //  * Lấy vị trí "CỘT" của quân cờ với stringPosition
  //  *
  //  * @param {String} stringPosition
  //  * @returns {Number} Vị trí Column.
  //  * @author: NVDung (19-02-2024)
  //  */
  // getColPosition(stringPosition) {
  //   return parseInt(stringPosition.slice(1, 2));
  // }

  /**
   * Hàm cập nhật ma trận bàn cờ.
   *
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại
   * @param {Number} toRow Vị trí hàng mới
   * @param {Number} toColumn Vị trí cột mới
   *
   * @author: NVDung (19-02-2024)
   */
  updateMatrix(boardStateMatrix, toRow, toColumn) {
    // Vị trí cũ => trống
    boardStateMatrix[this.rowCurrent][this.colCurent] = 0;
    // vị trí mới => quân cờ
    boardStateMatrix[toRow][toColumn] = this.id;
  }
  // ==================== Phương thức cần override ==================== //

  /**
   * Kiểm tra di chuyển hợp lệ ?
   *
   * @param {Number} toRow Vị trí hàng quân cờ bị Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number} toColumn Vị trí cột quân cờ bị Capture. Ví dụ: 0, 1, ..., 7.
   * @returns {Boolean} True - Hợp lệ, False - Không hợp lệ.
   * @author: NVDung (19-02-2024)
   */
  isCanMove(toRow, toColumn) {
    throw new Error("Not implement!");
  }

  /**
   * Kiểm tra ăn quân cờ hợp lệ ?
   *
   * @param {Number} toChessManValue Giá trị số quân cờ sẽ Capture, từ 1 đến 12.
   * @param {Number} toRow Vị trí hàng quân cờ bị Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number} toColumn Vị trí cột quân cờ bị Capture. Ví dụ: 0, 1, ..., 7.
   * @returns {Boolean} True - Hợp lệ, False - Không hợp lệ.
   * @author: NVDung (19-02-2024)
   */
  isCanCapture(toChessManValue, toRow, toColumn) {
    throw new Error("Not implement!");
  }

  /**
   * Phương thức di chuyển quân cờ (Move + Capture)
   *
   * @param {Number} toChessMan Giá trị số quân cờ sẽ Capture, từ 1 đến 12.
   * @param {Number} toRow Vị trí HÀNG quân cờ sẽ Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number} toCol Vị trí CỘT quân cờ sẽ Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại.
   * @authorization: NVDung (19-02-2024)
   */
  moveTo(toChessManValue = 0, toRow, toColumn, boardStateMatrix) {
    // Kiểm tra ăn quân cờ hợp lệ
    if (toChessMan && this.iCanCapture(toChessManValue, toRow, toColumn)) {
      // Cập nhật vị trí quân cờ trên bàn cờ
      this.updateMatrix(boardStateMatrix, toRow, toColumn);
      // Phát âm thanh ăn quân cờ
    }
    // Kiểm tra di chuyển quân cờ hợp lệ
    else if (this.isCanMove(toRow, toColumn)) {
      // Cập nhật vị trí quân cờ trên bàn cờ
      this.updateMatrix(boardStateMatrix, toRow, toColumn);
      // Phát âm thanh di chuyển quân cờ
    } else {
      // Move không hợp lệ
      // Phát âm thanh di chuyển không hợp lệ.
    }
  }
}

export default chessMan;
