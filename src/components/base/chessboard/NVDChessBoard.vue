<template>
  <div class="container">
    <!-- <video
      style="display: none"
      height="90%"
      controls
      :autoplay="true"
      :playsinline="false"
      loop
      :muted="false"
    >
      <source
        src="https://res.cloudinary.com/nvdwebsitecovua/video/upload/v1711004482/video/C%E1%BA%A1m_b%E1%BA%ABy_th%C3%AD_h%E1%BA%ADu_trong_c%E1%BB%9D_vua_benrikids_boardgames_chess_1920p_30fps_H264-128kbit_AAC_hsanpr.mp4"
      />
    </video> -->

    <table :key="reRender">
      <tr
        v-for="(row, indexRow) in theStartMatrix"
        :key="row"
        :data-row="indexRow"
      >
        <!-- Thuộc tính v-draggable để chỉ thị thẻ <td> là một vùng THẢ -->
        <!-- @dragover.prevent="handleDragOver" -->
        <td
          v-for="(cell, indexCol) in row"
          :ref="'td' + indexRow.toString() + indexCol"
          :key="cell"
          :data-col="indexCol"
          :class="{
            'cell-color': true,
            'cell-color-caro': (indexRow + indexCol) % 2 !== 0,
          }"
          @dragenter="handleDragEnter($event, cell, indexRow, indexCol)"
          @dragover.prevent="handleDragOver($event)"
          @dragleave="handleDragLeave"
          @drop="handleDrop"
        >
          <!-- Thuộc tính draggable="true" để cho phép Drag -->
          <!-- Hiển thị ảnh quân cờ bằng class -->
          <div
            v-if="cell !== this.$enum.chessMan.empty"
            :ref="'div' + indexRow.toString() + indexCol"
            :data-chessman="cell"
            class="chess-man chess-man-neo"
            :class="this.$resource.classChessMan[cell]"
            draggable="true"
            @dragstart="handleDragStart"
            @dragend="handleDragEnd"
          ></div>
          <!-- Đánh dấu hàng ở cột 0 -->
          <span
            class="maker-row"
            :class="{ 'maker-text-white': (indexRow + indexCol) % 2 !== 0 }"
            v-if="indexCol === 0"
            >{{ indexRow }}</span
          >
          <span
            class="maker-col"
            :class="{ 'maker-text-white': (indexRow + indexCol) % 2 !== 0 }"
            v-if="indexRow === 7"
            >{{ indexCol }}</span
          >

          <span class="maker-cell">{{ indexRow + " " + indexCol }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "NVDChessBoard",
  data() {
    return {
      /**
       * Đánh dấu re-render table.
       */
      reRender: false,

      theStartMatrix: [
        [11, 10, 9, 8, 7, 9, 10, 11],
        [12, 12, 12, 12, 12, 12, 12, 12],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [6, 6, 6, 6, 6, 6, 6, 6],
        [5, 4, 3, 2, 1, 3, 4, 5],
      ],

      /**
       * Đối tượng chessMan Source đang thao tác
       */
      sourceChessMan: null,

      /**
       * Hàng đợi chứa các đối tượng targetChessMan.
       */
      targetChessManQueue: [],

      /**
       * Chơi quân cờ màu ?
       */
      colorPlayer: null,
    };
  },

  methods: {
    /* ================== DRAG - DROP ================== */
    /**
     * Xử lý sự kiện khi BẮT ĐẦU Drag:
     * - Lấy thông tin của đối tượng cần Drag
     *
     * @param {Event} event Event sự kiện
     * @author: NVDung (13-03-2024)
     */
    handleDragStart(event) {
      console.log(
        `============================================================================
        ============================================================================`
      );
      console.log("handleDragStart");
      event.dataTransfer.effectAllowed = "copyMove";

      // Lấy thông tin ChessMan Source
      let dragData = {
        // Giá trị quân cờ theo giá trị số
        chessManValue: parseInt(event.target.dataset.chessman),
        // Giá trị HÀNG trong ma trận
        indexRow: parseInt(
          event.target.parentElement.parentElement.dataset.row
        ),
        // Giá trị CỘT trong ma trận
        indexCol: parseInt(event.target.parentElement.dataset.col),
      };

      // Tạo đối tượng chessMan Source  để xử lý thao tác
      this.sourceChessMan = this.$createChessMan(
        dragData.chessManValue,
        dragData.indexRow,
        dragData.indexCol
      );
      // console.table(this.sourceChessMan);
      console.log(
        `Chess Man Source: (${this.sourceChessMan.id},${this.sourceChessMan.name}, ${this.sourceChessMan.rowCurrent},${this.sourceChessMan.colCurrent})`
      );
    },

    /**
     * Xử lý sự kiện khi con trỏ chuỗi di chuyển VÀO VÙNG THẢ.
     * - Tạo hình ảnh khi kéo.
     * - Tô sáng VÙNG THẢ.
     * - Nhận dữ liệu VÙNG THẢ -> Tạo đối tượng targetChessMan.
     *
     * @param {Event} event  Đối tượng Event
     * @param {Number} chessValue Giá trị số của quân cờ.
     * @param {Number} row Giá trị HÀNG trong ma trận.
     * @param {Number} col Giá trị CỘT trong ma trận.
     * @author: NVDung (13-03-2024)
     */
    handleDragEnter(event, chessValue, row, col) {
      console.log("======================================");
      console.log("handleDragEnter");

      event.preventDefault();

      /* ========== Tạo hình ảnh khi kéo ========== */
      try {
        // Lấy ref thẻ td nguồn
        let divRef =
          "div" +
          this.sourceChessMan.rowCurrent.toString() +
          this.sourceChessMan.colCurrent;

        // Lấy thẻ div.chess-man
        let divElement = this.$refs[divRef][0];
        // console.log(divElement);
        event.dataTransfer.setDragImage(divElement, 0, 0);
      } catch (error) {
        console.error("Lỗi khi lấy thẻ div.chess-man");
        console.error(error);
      }

      /* ========== Tô sáng VÙNG THẢ ========== */
      try {
        // Xác định thẻ HTML VÙNG THẢ
        let el = this.$refs["td" + row.toString() + col][0];

        // Tô sáng
        el.style.outline = "100px auto white";

        // console.log(el);
      } catch (error) {
        console.error("Lỗi khi xác định thẻ HTML VÙNG THẢ để Tô sáng");
        console.error(error);
      }

      /* ========== Lưu trữ dữ liệu cùng thả ========== */
      // Tạo đối tượng targetChessMan
      let targetChessMan = new this.$targetChessMan(chessValue, row, col);

      console.log(
        `Chess Man Destination: (${targetChessMan.id}, ${targetChessMan.row},${targetChessMan.col})`
      );

      // Thêm đối tượng targetChessMan vào cuối Hàng đợi targetChessManQueue
      this.targetChessManQueue.push(targetChessMan);
    },

    /**
     * Xử lý sự kiện khi con trỏ chuột di chuyển trên vùng thả => Bắt sự kiện liên tục ngay trên 1 vùng thả.
     *
     * @param {Event} event Đối tượng Event
     * @author: NVDung (13-03-2024)
     */
    handleDragOver(event) {
      event.preventDefault();
      // console.log("======================================");
      // console.log("handleDragOver");

      event.dataTransfer.dropEffect = "move";
    },

    /**
     * Xử lý sự kiện khi con trỏ chuỗi di chuyển RA khỏi VÙNG THẢ.
     * - Tắt Tô sáng VÙNG THẢ - Đối tượng targetChessMan đầu tiên trong Queue.
     * - Xóa đối tượng targetChessMan đã tắt Tô sáng khỏi Queue.
     * @param {Event} event Đối tượng Event
     * @param {Number} row Giá trị HÀNG trong ma trận.
     * @param {Number} col Giá trị CỘT trong ma trận.
     * @author: NVDung (13-03-2024)
     */
    handleDragLeave() {
      console.log("======================================");
      console.log("handleDragLeave");
      try {
        // Lấy hàng & cột của đối tượng targetChessMan đầu tiên trong hàng đợi
        let row = this.targetChessManQueue[0].row;
        let col = this.targetChessManQueue[0].col;
        // Xác định thẻ HTML VÙNG THẢ
        let el = this.$refs["td" + row + col][0];

        // Tắt tô sáng
        el.style.outline = "none";
        console.log(`Row: ${row}, Col: ${col}`);
        console.log(el);

        // Xóa đối tượng targetChessMan đã tắt Tô sáng khỏi Queue.
        this.targetChessManQueue.shift();
      } catch (e) {
        console.error("handleDragLeave...");
        console.error(e);
      }
    },

    /**
     * Xử lý khi THẢ phần tử vào VÙNG THẢ <td>
     * - Validate và cập nhật dữ liệu.
     *
     * @param {Event} event Event sự kiện
     * @author: NVDung (13-03-2024)
     */
    handleDrop(event) {
      console.log("======================================");
      console.log("handleDrop");

      event.preventDefault();
      try {
        let isLegalMove = this.sourceChessMan.moveTo(
          this.theStartMatrix,
          this.targetChessManQueue[0]
        );
        console.log(isLegalMove);
      } catch (e) {
        console.error("handleDrop...");
        console.error(e);
      }
    },

    /**
     * Xử lý sự kiện khi KẾT THÚC Drag.
     * - Xóa tô sáng VÙNG THẢ Đích.
     * - Clear dữ liệu.
     *
     * @author: NVDung (13-03-2024)
     */
    handleDragEnd() {
      console.log("======================================");
      console.log("handleDragEnd: Xóa tô sáng ô đích.");

      try {
        // Lấy hàng & cột của đối tượng targetChessMan đầu tiên trong hàng đợi
        let row = this.targetChessManQueue[0].row;
        let col = this.targetChessManQueue[0].col;

        // Xác định thẻ HTML đích từ đối tượng targetChessMan.
        let el = this.$refs["td" + row + col][0];

        console.log(`Row: ${row}, Col: ${col}`);
        // Xóa tô sáng
        el.style.outline = "none";
      } catch (e) {
        console.error("handleDragEnd...");
        console.error(e);
      }

      // Clear dữ liệu
      this.sourceChessMan = null;
      this.targetChessManQueue = [];

      // Re-render
      this.reRender = !this.reRender;
    },
    /* ================== End DRAG - DROP ================== */

    /* ================== GAME ================== */
    /**
     * Kiểm tra kết thúc ván cờ?
     *
     */
    gameOverCheck() {
      try {
        // Tạo biến lưu giá trị trả về
        let result = this.$enum.resultMatch.happenning;

        // Kiểm tra kết thúc trên bàn cờ.
        let checkEndGame = this.$checkEndGame(
          this.theStartMatrix,
          this.colorPlayer
        );

        switch (checkEndGame) {
          // Thua Checkmate
          case this.$enum.resultMatch.lose:
            console.log("Bạn đã thua.");
            break;
          // Hòa
          case this.$enum.resultMatch.draw:
            console.log("Bạn đã HÒA.");
            break;
          // Vẫn đang diễn ra.
          default:
            console.log("Vẫn đang diễn ra.");
            break;
        }

        return result;
      } catch (e) {
        console.error("gameOverCheck...", e);
      }
    },
    /* ================== GAME ================== */
  },
};
</script>

<style lang="scss" scoped>
@import url(./nvd-chess-board.scss);
</style>
