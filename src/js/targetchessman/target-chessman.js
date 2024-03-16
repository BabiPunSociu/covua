/**
 * Khai báo lớp mục tiêu ô cờ
 *
 * @author NVDung (16-03-2024)
 */
class targetChessMan {
  /**
   * Constructor
   *
   * @param {Number} targetCellValue Giá trị số trong ô đích.
   * @param {Number} targetRow Vị trí HÀNG của ô cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
   * @param {Number} targetCol Vị trí CỘT của ô cờ theo ma trận. Ví dụ: 0, 1, ..., 7.
   * @author NVDung (16-03-2024)
   */
  constructor(targetCellValue, targetRow, targetCol) {
    /**
     * Giá trị số của quân cờ trên ô cờ
     */
    this.id = targetCellValue;

    /**
     * Vị trị HÀNG của ô đích theo ma trận.
     */
    this.row = targetRow;

    /**
     * Vị trị CỘT của ô đích theo ma trận.
     */
    this.col = targetCol;
  }
}

export default targetChessMan;
