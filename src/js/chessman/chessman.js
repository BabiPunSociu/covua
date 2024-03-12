import NVDResource from "../resource.js";
import NVDEnum from "../enum.js";
import createChessMan from "./createChessMan.js";
import playSoundEffect from "../cloudinary/soundEffect.js";

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
   * @param {Number} rowCurrent Vị trí hàng hiện tại của quân cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
   * @param {Number} colCurent Vị trí cột hiện tại của quân cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
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
        return NVDResource.classChessMan[chessManValue];
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
    boardStateMatrix[this.rowCurrent][this.colCurent] = NVDEnum.chessMan.empty;
    // vị trí mới => quân cờ
    boardStateMatrix[toRow][toColumn] = this.id;
  }

  /**
   * Kiểm tra chặn đường theo đường ngang & dọc ?
   *
   * @param {Number} toRow Vị trí hàng quân cờ bị Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number} toColumn Vị trí cột quân cờ bị Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại.
   * @returns {Boolean} True - Có quân cờ chặn đường, False - Không bị chặn đường.
   * @author: NVDung (12-03-2024)
   */
  isBlockedPath(toRow, toColumn, boardStateMatrix) {
    // Di chuyển NGANG
    if (toRow === this.colCurent) {
      let col = this.colCurent;
      while (col !== toColumn) {
        // Kiểm tra có quân cờ khác cản đường ?
        if (boardStateMatrix[this.rowCurrent][col] !== NVDEnum.chessMan.empty) {
          return true;
        }
        // Cập nhật vị trí col
        col += this.colCurent < toColumn ? 1 : -1;
      }
    }

    // Di chuyển DỌC
    else if (toColumn === this.colCurent) {
      let row = this.rowCurrent;
      while (row !== toRow) {
        // Kiểm tra có quân cờ khác cần đường ?
        if (boardStateMatrix[row][this.colCurent] !== NVDEnum.chessMan.empty) {
          return true;
        }
        // Cập nhật vị trí row
        row += this.rowCurrent < toRow ? 1 : -1;
      }
    }

    return false;
  }

  /**
   * Kiểm tra chặn đường theo đường chéo ?
   *
   * @param {Number} toRow Vị trí hàng quân cờ bị Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number} toColumn Vị trí cột quân cờ bị Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại.
   * @returns {Boolean} True - Có quân cờ chặn đường, False - Không bị chặn đường.
   * @author: NVDung (12-03-2024)
   */
  isBlockedPathDiagonal(toRow, toColumn, boardStateMatrix) {
    let row = this.rowCurrent;
    let col = this.colCurent;
    while (row !== toRow && col !== toColumn) {
      // Kiểm tra có quân cờ khác cần đường ?
      if (boardStateMatrix[row][col] !== NVDEnum.chessMan.empty) {
        return true;
      }
      // Cập nhật vị trí row
      row += this.rowCurrent < toRow ? 1 : -1;
      col += this.colCurent < toColumn ? 1 : -1;
    }
    return false;
  }

  /**
   * Lấy vị trí quân cờ trong ma trận theo "giá trị số của quân cờ".
   *
   * @param {Number[][]} boardStateMatrix Ma trận trạng thái hiện tại.
   * @param {Number} chessManValue Giá trị số của quân cờ theo quy ước, từ 1 đến 12. Ví dụ: 1, 2, ..., 12
   * @returns {Object} Đối tượng chứa {row, col}
   * @author: NVDung (12-03-2024)
   */
  getPositionByChessManValue(boardStateMatrix, chessManValue) {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (boardStateMatrix[row][col] === chessManValue) {
          return { row, col };
        }
      }
    }
  }

  /**
   * Kiểm tra chiếu tướng vua trắng
   *
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại.
   * @returns {Boolean} True - Có chiếu tướng, False - Không bị chiếu tướng.
   * @author: NVDung (12-03-2024)
   */
  isWhiteKingCheck(boardStateMatrix) {
    // Xác định vị trí VUA TRẮNG
    let rowKing,
      colKing = this.getPositionByChessManValue(
        boardStateMatrix,
        NVDEnum.chessMan.whiteKing
      );

    // Duyệt qua các vị trí trên bàn cờ
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        // Xác định là quân cờ đen [7, ..., 12]
        if (boardStateMatrix[row][col] >= NVDEnum.chessMan.blackKing) {
          // Tạo đối tượng quân cờ phù hợp
          let blackChessPiece = createChessMan(
            boardStateMatrix[row][col],
            row,
            col
          );

          // Kiểm tra quân ĐEN này có Capture quân vua TRẮNG không?
          if (
            blackChessPiece.isCanCapture(
              NVDEnum.chessMan.whiteKing,
              rowKing,
              colKing,
              boardStateMatrix
            )
          ) {
            console.log("Vua trắng bị chiếu tướng");
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * Kiểm tra chiếu tướng vua đen
   *
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại.
   * @returns {Boolean} True - Có chiếu tướng, False - Không bị chiếu tướng.
   * @author: NVDung (12-03-2024)
   */
  isBlackKingCheck(boardStateMatrix) {
    // Xác định vị trí VUA ĐEN
    let rowKing,
      colKing = this.getPositionByChessManValue(
        boardStateMatrix,
        NVDEnum.chessMan.blackKing
      );

    // Duyệt qua các vị trí trên bàn cờ
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        // Xác định là quân cờ TRẮNG [1, ..., 6]
        if (
          NVDEnum.chessMan.empty <
          boardStateMatrix[row][col] <=
          NVDEnum.chessMan.whitePawn
        ) {
          // Tạo đối tượng quân cờ phù hợp
          let blackChessPiece = createChessMan(
            boardStateMatrix[row][col],
            row,
            col
          );

          // Kiểm tra quân TRẮNG này có Capture quân vua ĐEN không?
          if (
            blackChessPiece.isCanCapture(
              NVDEnum.chessMan.blackKing,
              rowKing,
              colKing,
              boardStateMatrix
            )
          ) {
            console.log("Vua đen bị chiếu tướng");
            return true;
          }
        }
      }
    }
    return false;
  }
  // ==================== Phương thức cần override ==================== //

  /**
   * Kiểm tra di chuyển hợp lệ ?
   *
   * @param {Number} toRow Vị trí hàng quân cờ bị Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number} toColumn Vị trí cột quân cờ bị Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại.
   * @returns {Boolean} True - Hợp lệ, False - Không hợp lệ.
   * @author: NVDung (19-02-2024)
   */
  isCanMove(toRow, toColumn, boardStateMatrix) {
    // Đảm bảo di chuyển khỏi vị trí hiện tại
    if (
      !(Math.abs(toRow - this.rowCurrent) + Math.abs(toColumn - this.colCurent))
    ) {
      return false;
    }
  }

  /**
   * Kiểm tra ăn quân cờ hợp lệ ?
   *
   * @param {Number} toChessManValue Giá trị số quân cờ sẽ Capture, từ 1 đến 12.
   * @param {Number} toRow Vị trí hàng quân cờ bị Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number} toColumn Vị trí cột quân cờ bị Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại.
   * @returns {Boolean} True - Hợp lệ, False - Không hợp lệ.
   * @author: NVDung (19-02-2024)
   */
  isCanCapture(toChessManValue, toRow, toColumn, boardStateMatrix) {
    throw new Error("Not implement!");
  }

  /**
   * Phương thức di chuyển quân cờ (Move + Capture)
   *
   * @param {Number} toChessManValue Giá trị số quân cờ sẽ Capture, từ 1 đến 12.
   * @param {Number} toRow Vị trí HÀNG quân cờ sẽ Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number} toCol Vị trí CỘT quân cờ sẽ Capture. Ví dụ: 0, 1, ..., 7.
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại.
   * @author: NVDung (19-02-2024)
   */
  moveTo(toChessManValue = 0, toRow, toColumn, boardStateMatrix) {
    // Kiểm tra ăn quân cờ hợp lệ
    if (
      toChessManValue &&
      this.isCanCapture(toChessManValue, toRow, toColumn, boardStateMatrix)
    ) {
      // Tạo ma trận bàn cờ sao chép
      let boardStateMatrixClone = JSON.parse(JSON.stringify(boardStateMatrix));

      // Cập nhật vị trí quân cờ trên bàn cờ sao chép
      this.updateMatrix(boardStateMatrixClone, toRow, toColumn);

      if (
        // Nếu đang di chuyển quân TRẮNG -> Kiểm tra chiếu tướng Vua TRẮNG
        (NVDEnum.chessMan.whiteKing <= this.id <= NVDEnum.chessMan.whitePawn &&
          !this.isWhiteKingCheck(boardStateMatrixClone)) ||
        // Nếu di chuyển quân ĐEN -> Kiểm tra chiếu tướng Vua ĐEN
        (NVDEnum.chessMan.blackKing <= this.id &&
          !this.isBlackKingCheck(boardStateMatrixClone))
      ) {
        // Hợp lệ
        // Cập nhật vị trí quân cờ trên bàn cờ THẬT
        this.updateMatrix(boardStateMatrix, toRow, toColumn);
        // Phát âm thanh ăn quân cờ
        playSoundEffect(
          "https://res.cloudinary.com/nvdwebsitecovua/video/upload/v1708438790/sound/capture.mp3"
        );
      }
    }
    // Kiểm tra di chuyển quân cờ hợp lệ
    else if (this.isCanMove(toRow, toColumn, boardStateMatrix)) {
      // Tạo ma trận sao chép
      let boardStateMatrixClone = JSON.parse(JSON.stringify(boardStateMatrix));

      // Cập nhật vị trí quân cờ trên bàn cờ sao chép
      this.updateMatrix(boardStateMatrixClone, toRow, toColumn);
      if (
        // Nếu đang di chuyển quân TRẮNG -> Kiểm tra chiếu tướng Vua TRẮNG
        (NVDEnum.chessMan.whiteKing <= this.id <= NVDEnum.chessMan.whitePawn &&
          !this.isWhiteKingCheck(boardStateMatrixClone)) ||
        // Nếu di chuyển quân ĐEN -> Kiểm tra chiếu tướng Vua ĐEN
        (NVDEnum.chessMan.blackKing <= this.id &&
          !this.isBlackKingCheck(boardStateMatrixClone))
      ) {
        // Hợp lệ
        // Cập nhật vị trí quân cờ trên bàn cờ THẬT
        this.updateMatrix(boardStateMatrix, toRow, toColumn);
        // Phát âm thanh di chuyển quân cờ
        playSoundEffect(
          "https://res.cloudinary.com/nvdwebsitecovua/video/upload/v1708438793/sound/move-self.mp3"
        );
      }
    } else {
      // Move không hợp lệ
      // Phát âm thanh di chuyển không hợp lệ.
    }
  }
}

export default chessMan;
