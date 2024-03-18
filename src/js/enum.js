/**
 * Đối tượng NVDEnum
 */
const NVDEnum = {
  /**
   * Quân cờ
   */
  chessMan: {
    /**
     * Ô trống
     */
    empty: 0,

    /**
     * Quân vua trắng
     */
    whiteKing: 1,

    /**
     * Quân hậu trắng
     */
    whiteQueen: 2,

    /**
     * Quân tượng trắng
     */
    whiteBishop: 3,

    /**
     * Quân mã trắng
     */
    whiteKnight: 4,

    /**
     * Quân xe trắng
     */
    whiteRook: 5,

    /**
     * Quân tốt trắng
     */
    whitePawn: 6,

    /**
     * Quân vua đen
     */
    blackKing: 7,

    /**
     * Quân hậu đen
     */
    blackQueen: 8,

    /**
     * Quân tượng đen
     */
    blackBishop: 9,

    /**
     * Quân mã đen
     */
    blackKnight: 10,

    /**
     * Quân xe đen
     */
    blackRook: 11,

    /**
     * Quân tốt đen
     */
    blackPawn: 12,
  },

  /**
   * Màu quân cờ mà người chơi cầm.
   * @author NVDung (16-03-2024)
   */
  colorPlayer: {
    /**
     * Người chơi cầm quân TRẮNG.
     */
    white: 0,

    /**
     * Người chơi cẩm quân ĐEN.
     */
    black: 1,
  },

  /**
   * Kết quả trận đấu
   * @author NVDung (17-03-2024)
   */
  resultMatch: {
    /**
     * Đang diễn ra
     */
    happenning: 0,

    /**
     * Kết quả THUA
     */
    lose: 1,

    /**
     * Kết quả HÒA
     */
    draw: 2,
  },
};

export default NVDEnum;
