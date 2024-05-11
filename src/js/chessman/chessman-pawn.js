import NVDEnum from "../enum.js";

import chessMan from "./chessman";

/**
 * Khai báo lớp quân TỐT
 *
 * @author: NVDung (11-03-2024)
 */
class chessManPawn extends chessMan {
  // ===================================== Constructor ===================================== //
  /**
   * Contructor
   *
   * @param {Number} chessManValue Giá trị số của quân cờ theo quy ước, từ 1 đến 12. Ví dụ: 1, 2, ..., 12
   * @param {Number} rowCurrent Vị trí hàng hiện tại của quân cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
   * @param {Number} colCurrent Vị trí cột hiện tại của quân cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
   *
   * @author: NVDung (11-03-2024)
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

      // Đảm bảo quân tốt di chuyển thẳng
      if (this.colCurrent !== targetChessMan.col) {
        // console.error("Lỗi quân tốt PHẢI di chuyển thẳng.");
        return false;
      }

      // // TỐT ĐEN Ở Trên -> Xuống
      // if (
      //   this.id === NVDEnum.chessMan.blackPawn &&
      //   (this.rowCurrent + 1 === targetChessMan.row ||
      //     (this.rowCurrent === 1 && this.rowCurrent + 2 === targetChessMan.row))
      // ) {
      //   return true;
      // }
      // // TỐT TRẮNG Ở Dưới -> Lên
      // if (
      //   this.id === NVDEnum.chessMan.whitePawn &&
      //   (this.rowCurrent - 1 === targetChessMan.row ||
      //     (this.rowCurrent === 6 && this.rowCurrent - 2 === targetChessMan.row))
      // ) {
      //   return true;
      // }

      // Vì quân đen được xoay ma trận nên tự động nó cũng là từ dưới -> lên.
      if (
        this.rowCurrent - 1 === targetChessMan.row ||
        (this.rowCurrent === 6 && this.rowCurrent - 2 === targetChessMan.row)
      ) {
        return true;
      }

      return false;
    } catch (error) {
      console.error("Lỗi khi kiểm tra di chuyển Pawn", error);
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
      // Đảm bảo di chuyển chéo 1 ô
      if (Math.abs(this.colCurrent - targetChessMan.col) !== 1) {
        return false;
      }

      // // TỐT trắng ăn quân đen
      // if (
      //   this.id === NVDEnum.chessMan.whitePawn &&
      //   targetChessMan.id >= NVDEnum.chessMan.blackKing &&
      //   this.rowCurrent - 1 === targetChessMan.row
      // ) {
      //   return true;
      // }

      // // TỐT đen ăn quân trắng
      // if (
      //   this.id === NVDEnum.chessMan.blackPawn &&
      //   0 < targetChessMan.id <= NVDEnum.chessMan.whitePawn &&
      //   this.rowCurrent + 1 === targetChessMan.row
      // ) {
      //   return true;
      // }

      if (
        // TỐT trắng ăn quân đen
        ((this.id === NVDEnum.chessMan.whitePawn &&
          targetChessMan.id >= NVDEnum.chessMan.blackKing) ||
          // TỐT đen ăn quân trắng
          (this.id === NVDEnum.chessMan.blackPawn &&
            targetChessMan.id <= NVDEnum.chessMan.whitePawn)) &&
        this.rowCurrent - 1 === targetChessMan.row
      ) {
        return true;
      }

      return false;
    } catch (e) {
      console.error("Lỗi khi kiểm tra di chuyên Pawn", e);
    }
  }

  /**
   * Phương thức di chuyển quân cờ (Move + Capture)
   *
   * @param {Number[][]} boardStateMatrix Ma trận bàn cờ hiện tại.
   * @param {targetChessMan} targetChessMan Đối tượng targetChessMan.
   * @param {Boolean} update True - Cập nhật vị trí quân cờ, False - Không cập nhật.
   * @returns {Boolean} True - Hợp lệ, False - Không hợp lệ.
   * @author: NVDung (19-02-2024)
   */
  moveTo(boardStateMatrix, targetChessMan, update = true) {
    try {
      // Gọi đến Class cha để thực hiện di chuyển
      let isLegalMove = super.moveTo(boardStateMatrix, targetChessMan, update);

      return isLegalMove;
      // Các xử lý mở rộng viết ở đây
    } catch (e) {
      console.error("Lỗi khi di chuyên Pawn", e);
    }
  }
}

export default chessManPawn;
