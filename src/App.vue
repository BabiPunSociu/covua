<template>
  <div class="container">
    <table>
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
          :class="{ 'cell-color-caro': (indexRow + indexCol) % 2 !== 0 }"
          @dragenter="handleDragEnter($event, cell, indexRow, indexCol)"
          @dragover.prevent="handleDragOver($event)"
          @dragleave="handleDragLeave(indexRow, indexCol)"
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
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
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
       * Đối tượng chessMan Target - đây KHÔNG phải đối tượng chessman:
       * { chessValue: Number, row: Number, col: Number, }
       */
      targetChessMan: null,
    };
  },

  mounted() {},

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
      console.log("======================================");
      console.log("handleDragStart");
      event.dataTransfer.effectAllowed = "move";

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
      console.log("Chess Man Source: ");
      console.table(this.sourceChessMan);

      console.log("======================================");
    },

    /**
     * Xử lý sự kiện khi con trỏ chuỗi di chuyển VÀO VÙNG THẢ.
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

      event.dataTransfer.dropEffect = "move";

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

      console.log("======================================");

      // Xác định thẻ HTML VÙNG THẢ
      let el = this.$refs["td" + row.toString() + col][0];

      // Tô sáng
      el.style.outline = "3px auto white";
      // console.log(el);

      // Tạo đối tượng targetChessMan
      this.targetChessMan = {
        chessValue: chessValue,
        row: row,
        col: col,
      };

      console.log("Target chess man: ");
      console.table(this.targetChessMan);
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
      event.preventDefault();
    },

    /**
     * Xử lý sự kiện khi con trỏ chuỗi di chuyển RA khỏi VÙNG THẢ.
     * - Tắt Tô sáng VÙNG THẢ.
     *
     * @param {Event} event Đối tượng Event
     * @param {Number} row Giá trị HÀNG trong ma trận.
     * @param {Number} col Giá trị CỘT trong ma trận.
     * @author: NVDung (13-03-2024)
     */
    handleDragLeave(row, col) {
      // console.log("======================================");
      // console.log("handleDragLeave");

      // Xác định thẻ HTML VÙNG THẢ
      let el = this.$refs["td" + row.toString() + col][0];

      // Tắt tô sáng
      el.style.outline = "none";
      // console.log(el);
    },

    /**
     * Xử lý khi THẢ phần tử vào VÙNG THẢ <td>
     * - Validate và cập nhật dữ liệu.
     *
     * @param {Event} event Event sự kiện
     * @author: NVDung (13-03-2024)
     */
    handleDrop() {
      console.log("======================================");
      console.log("handleDrop");
      this.sourceChessMan.moveTo(
        this.targetChessMan.chessValue,
        this.targetChessMan.row,
        this.targetChessMan.col,
        this.theStartMatrix
      );
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

      // Xác định thẻ HTML đích từ đối tượng targetChessMan.
      let el =
        this.$refs[
          "td" + this.targetChessMan.row.toString() + this.targetChessMan.col
        ][0];

      // console.log(el);
      // Xóa tô sáng
      el.style.outline = "none";

      // Clear dữ liệu
      this.sourceChessMan = null;
      this.targetChessMan = null;
    },
    /* ================== End DRAG - DROP ================== */
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #525151de;

  table {
    width: 80vh;
    height: 80vh;
    border-collapse: collapse;

    td {
      background-color: rgb(115, 90, 58);

      &.cell-color-caro {
        background-color: #01ef9282; // rgb(114, 251, 162);
      }

      .chess-man {
        user-select: none;

        &:hover {
          cursor: grab;
        }

        &.chess-man-neo {
          height: 100%;
        }
      }
    }
  }
}
</style>
