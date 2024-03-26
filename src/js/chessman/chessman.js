import NVDResource from "../resource.js";
import NVDEnum from "../enum.js";
import createChessMan from "./create-chessman.js";
import playSoundEffect from "../cloudinary/sound-effect.js";
import targetChessMan from "../targetchessman/target-chessman.js";

/**
 * Khai báo lớp quân cờ
 *
 * @author NVDung (19-02-2024)
 */
class chessMan {
  // ===================================== Constructor ===================================== //
  /**
   * Contructor
   *
   * @param {Number} chessManValue Giá trị số của quân cờ theo quy ước, từ 1 đến 12. Ví dụ: 1, 2, ..., 12
   * @param {Number} rowCurrent Vị trí hàng hiện tại của quân cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
   * @param {Number} colCurrent Vị trí cột hiện tại của quân cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
   * @author NVDung (19-02-2024)
   */
  constructor(chessManValue, rowCurrent, colCurrent) {
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
    this.colCurrent = colCurrent;
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

  /**
   * Hàm cập nhật ma trận bàn cờ.
   *
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại
   * @param {targetChessMan} targetChessMan Đối tượng targetChessMan.
   *
   * @author: NVDung (19-02-2024)
   */
  updateMatrix(boardStateMatrix, targetChessMan) {
    try {
      // Vị trí cũ => trống
      boardStateMatrix[this.rowCurrent][this.colCurrent] =
        NVDEnum.chessMan.empty;
      // vị trí mới => quân cờ
      boardStateMatrix[targetChessMan.row][targetChessMan.col] = this.id;
    } catch (error) {
      console.error("Lỗi khi cập nhật ma trả bàn cờ", error);
    }
  }

  /**
   * Kiểm tra chặn đường theo đường ngang & dọc ?
   *
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại.
   * @param {targetChessMan} targetChessMan Đối tượng targetChessMan.
   * @returns {Boolean} True - Có quân cờ chặn đường, False - Không bị chặn đường.
   * @author: NVDung (12-03-2024)
   */
  isBlockedPath(boardStateMatrix, targetChessMan) {
    try {
      // Di chuyển NGANG
      if (targetChessMan.row === this.rowCurrent) {
        let col =
          this.colCurrent < targetChessMan.col
            ? this.colCurrent + 1
            : this.colCurrent - 1;
        while (col !== targetChessMan.col) {
          // Kiểm tra có quân cờ khác cản đường ?
          if (
            boardStateMatrix[this.rowCurrent][col] !== NVDEnum.chessMan.empty
          ) {
            return true;
          }
          // Cập nhật vị trí col
          col += this.colCurrent < targetChessMan.col ? 1 : -1;
        }
      }

      // Di chuyển DỌC
      else if (targetChessMan.col === this.colCurrent) {
        let row =
          this.rowCurrent < targetChessMan.row
            ? this.rowCurrent + 1
            : this.rowCurrent - 1;
        while (row !== targetChessMan.row) {
          // Kiểm tra có quân cờ khác cần đường ?
          if (
            boardStateMatrix[row][this.colCurrent] !== NVDEnum.chessMan.empty
          ) {
            return true;
          }
          // Cập nhật vị trí row
          row += this.rowCurrent < targetChessMan.row ? 1 : -1;
        }
      }

      return false;
    } catch (e) {
      console.error("Lỗi khi kiểm tra chặn đường theo đường ngang & dọc", e);
    }
  }

  /**
   * Kiểm tra chặn đường theo đường chéo ?
   *
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại.
   * @param {targetChessMan} targetChessMan Đối tượng targetChessMan.
   * @returns {Boolean} True - Có quân cờ chặn đường, False - Không bị chặn đường.
   * @author: NVDung (12-03-2024)
   */
  isBlockedPathDiagonal(boardStateMatrix, targetChessMan) {
    try {
      let row =
        this.rowCurrent < targetChessMan.row
          ? this.rowCurrent + 1
          : this.rowCurrent - 1;
      let col =
        this.colCurrent < targetChessMan.col
          ? this.colCurrent + 1
          : this.colCurrent - 1;
      while (row !== targetChessMan.row && col !== targetChessMan.col) {
        // Kiểm tra có quân cờ khác cần đường ?
        if (boardStateMatrix[row][col] !== NVDEnum.chessMan.empty) {
          return true;
        }
        // Cập nhật vị trí row
        row += this.rowCurrent < targetChessMan.row ? 1 : -1;
        col += this.colCurrent < targetChessMan.col ? 1 : -1;
      }
      return false;
    } catch (e) {
      console.error("Lỗi khi kiểm tra chặn đường theo đường chéo", e);
    }
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
    try {
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (boardStateMatrix[row][col] === chessManValue) {
            return [row, col];
          }
        }
      }
    } catch (e) {
      console.error("Lỗi khi lọc vị trí quân cờ", e);
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
    try {
      // Xác định vị trí VUA TRẮNG
      let [rowKing, colKing] = this.getPositionByChessManValue(
        boardStateMatrix,
        NVDEnum.chessMan.whiteKing
      );

      // Tạo đối tượng targetChessMan quân vua trắng.
      const whiteKing = new targetChessMan(
        NVDEnum.chessMan.whiteKing,
        rowKing,
        colKing
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
            if (blackChessPiece.isCanCapture(boardStateMatrix, whiteKing)) {
              console.log("Vua trắng bị chiếu tướng");
              return true;
            }
          }
        }
      }
      return false;
    } catch (e) {
      console.error("Lỗi khi kiểm tra chiếu tướng vua trắng", e);
    }
  }

  /**
   * Kiểm tra chiếu tướng vua đen
   *
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại.
   * @returns {Boolean} True - Có chiếu tướng, False - Không bị chiếu tướng.
   * @author: NVDung (12-03-2024)
   */
  isBlackKingCheck(boardStateMatrix) {
    try {
      // Xác định vị trí VUA ĐEN
      let [rowKing, colKing] = this.getPositionByChessManValue(
        boardStateMatrix,
        NVDEnum.chessMan.blackKing
      );

      // Tạo đối tượng targetChessMan quân vua ĐEN.
      const blackKing = new targetChessMan(
        NVDEnum.chessMan.blackKing,
        rowKing,
        colKing
      );

      // Duyệt qua các vị trí trên bàn cờ
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          // Giá trị ô cờ
          let cellValue = boardStateMatrix[row][col];

          // Xác định là quân cờ TRẮNG [1, ..., 6]
          if (
            NVDEnum.chessMan.empty < cellValue &&
            cellValue <= NVDEnum.chessMan.whitePawn
          ) {
            // Tạo đối tượng quân cờ phù hợp
            let blackChessPiece = createChessMan(cellValue, row, col);

            // Kiểm tra quân TRẮNG này có Capture quân vua ĐEN không?
            if (blackChessPiece.isCanCapture(boardStateMatrix, blackKing)) {
              console.log("Vua đen bị chiếu tướng");
              return true;
            }
          }
        }
      }
      return false;
    } catch (e) {
      console.error("Lỗi khi kiểm tra chiếu tướng vua đen", e);
    }
  }
  // ==================== Phương thức cần override ==================== //

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
      if (
        Math.abs(targetChessMan.row - this.rowCurrent) +
        Math.abs(targetChessMan.col - this.colCurrent)
      ) {
        return true; // Đã di chuyển khỏi vị trí ban đầu.
      }
      return false; // Không di chuyển khỏi vị trí ban đầu.
    } catch (e) {
      console.error("Lỗi khi kiểm tra di chuyển hợp lệ", e);
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
    throw new Error("Not implement!");
  }

  /**
   * Phương thức di chuyển quân cờ (Move + Capture)
   *
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại.
   * @param {targetChessMan} targetChessMan Đối tượng targetChessMan.
   * @return {Boolean} True - Di chuyển hợp lệ, False - Không di chuyển hợp lệ.
   * @author: NVDung (19-02-2024)
   */
  moveTo(boardStateMatrix, targetChessMan) {
    try {
      // Kiểm tra ăn quân cờ hợp lệ
      if (
        targetChessMan.id &&
        this.isCanCapture(boardStateMatrix, targetChessMan)
      ) {
        // Tạo ma trận bàn cờ sao chép
        let boardStateMatrixClone = JSON.parse(
          JSON.stringify(boardStateMatrix)
        );

        // Cập nhật vị trí quân cờ trên bàn cờ sao chép
        this.updateMatrix(boardStateMatrixClone, targetChessMan);

        if (
          // Nếu đang di chuyển quân TRẮNG -> Kiểm tra chiếu tướng Vua TRẮNG
          (NVDEnum.chessMan.whiteKing <=
            this.id <=
            NVDEnum.chessMan.whitePawn &&
            !this.isWhiteKingCheck(boardStateMatrixClone)) ||
          // Nếu di chuyển quân ĐEN -> Kiểm tra chiếu tướng Vua ĐEN
          (NVDEnum.chessMan.blackKing <= this.id &&
            !this.isBlackKingCheck(boardStateMatrixClone))
        ) {
          // Hợp lệ
          // Cập nhật vị trí quân cờ trên bàn cờ THẬT
          this.updateMatrix(boardStateMatrix, targetChessMan);
          // Phát âm thanh ăn quân cờ
          playSoundEffect(
            "https://res.cloudinary.com/nvdwebsitecovua/video/upload/v1708438790/sound/capture.mp3"
          );

          return true;
        }

        return false;
      }
      // Kiểm tra di chuyển quân cờ hợp lệ
      else if (
        !targetChessMan.id &&
        this.isCanMove(boardStateMatrix, targetChessMan)
      ) {
        // Tạo ma trận sao chép
        let boardStateMatrixClone = JSON.parse(
          JSON.stringify(boardStateMatrix)
        );

        // Cập nhật vị trí quân cờ trên bàn cờ sao chép
        this.updateMatrix(boardStateMatrixClone, targetChessMan);

        // Nếu đang di chuyển quân TRẮNG
        if (
          NVDEnum.chessMan.whiteKing <= this.id &&
          this.id <= NVDEnum.chessMan.whitePawn
        ) {
          // Kiểm tra chiếu tướng Vua TRẮNG
          if (!this.isWhiteKingCheck(boardStateMatrixClone)) {
            // Không chiếu tướng Vua Trắng -> Hợp lệ.
            // Cập nhật vị trí quân cờ trên bàn cờ THẬT
            this.updateMatrix(boardStateMatrix, targetChessMan);
            // Phát âm thanh di chuyển quân cờ
            playSoundEffect(
              "https://res.cloudinary.com/nvdwebsitecovua/video/upload/v1708438793/sound/move-self.mp3"
            );

            return true;
          }
        }

        // Nếu di chuyển quân ĐEN
        else if (NVDEnum.chessMan.blackKing <= this.id) {
          // Kiểm tra chiếu tướng Vua ĐEN
          if (!this.isBlackKingCheck(boardStateMatrixClone)) {
            // Không chiếu tướng Vua ĐEN -> Hợp lệ.
            // Cập nhật vị trí quân cờ trên bàn cờ THẬT
            this.updateMatrix(boardStateMatrix, targetChessMan);
            // Phát âm thanh di chuyển quân cờ
            playSoundEffect(
              "https://res.cloudinary.com/nvdwebsitecovua/video/upload/v1708438793/sound/move-self.mp3"
            );

            return true;
          }
        }
      }
      // Move không hợp lệ
      return false;

      // Phát âm thanh di chuyển không hợp lệ.
    } catch (e) {
      console.error("Lỗi khi di chuyển quân cờ", e);
    }
  }
}

export default chessMan;
