<template>
  <div class="container">
    <table>
      <tr v-for="(row, indexRow) in theStartMatrix" :key="row">
        <td v-for="(cell, indexCol) in row" :key="cell">
          <div
            class="chess-man chess-man-neo"
            :class="
              ('cell-color',
              { 'cell-color-caro': (indexRow + indexCol) % 2 !== 0 })
            "
          >
            <!-- Hiển thị ảnh quân cờ -->
            <div :class="this.$resource.classChessMan[cell]"></div>
          </div>
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
    };
  },

  mounted() {
    // console.log(this.$resource);
    // console.log(typeof this.$resource.NVDResource.classChessMan);
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
    width: 100vh;
    height: 100vh;
    border-collapse: collapse;

    td {
      border: 1px solid black;

      .chess-man {
        width: 100%;

        &.chess-man-neo {
          height: 100%;
        }

        &.cell-color {
          background-color: rgb(115, 90, 58);
        }

        &.cell-color-caro {
          background-color: #01ef9282; // rgb(114, 251, 162);
        }
      }
    }
  }
}
</style>
