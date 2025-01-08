<template>
  <div class="play-container flex">
    <div class="board-layout-main flex flex-column">
      <!-- Top -->
      <div class="board-layout-player-top flex flex-space-between">
        <div class="opponent flex">
          <img
            loading="lazy"
            width="20"
            height="20"
            :src="this.$resource.resourcesImage.logo.avatarBlack"
            alt="Ảnh đại diện đối thủ"
          />
          <span>
            {{
              this.$resource.resourcesPlay.players.opponent[
                languageStore.getLanguage
              ]
            }}
          </span>

          <div>
            <!-- Loading search đối thủ -->
            <m-loading
              v-if="showLoadingSearchOpponent"
              :isLoadingControl="true"
            >
            </m-loading>
          </div>
        </div>
        <div class="time flex">
          <div
            class="mi mi-24 mi-clock icon-resize"
            :class="modeGame.iconModeGame"
          ></div>
          <span class="time-text block-user-select">
            {{
              Math.floor(modeGame.time / 60)
                .toString()
                .padStart(2, "0")
            }}
            :
            {{
              Math.floor(modeGame.time % 60)
                .toString()
                .padStart(2, "0")
            }}
          </span>
        </div>
      </div>

      <!-- Chess Board -->
      <div class="board-layout-chessboard flex flex-center">
        <div class="overlay"></div>
        <!-- Chess Board -->
        <m-chess-board
          class="chess-board"
          :colorPlayer="this.$enum.colorPlayer.white"
          ref="chessBoard"
        ></m-chess-board>
      </div>

      <!-- Bottom -->
      <div class="board-layout-player-bottom flex flex-space-between">
        <div class="player flex">
          <img
            ref="imgAvatar"
            loading="lazy"
            width="20"
            height="20"
            :src="
              userStore.getAvatar ||
              this.$resource.resourcesImage.logo.avatarWhite
            "
            alt="Ảnh đại diện bản thân"
          />
          <span>
            {{
              userStore.getName ||
              this.$resource.resourcesPlay.players.player[
                languageStore.getLanguage
              ]
            }}
          </span>
        </div>
        <div class="time flex">
          <div
            class="mi mi-24 mi-clock icon-resize"
            :class="modeGame.iconModeGame"
          ></div>
          <span class="time-text block-user-select">
            {{
              Math.floor(modeGame.time / 60)
                .toString()
                .padStart(2, "0")
            }}
            :
            {{
              Math.floor(modeGame.time % 60)
                .toString()
                .padStart(2, "0")
            }}
          </span>
        </div>
      </div>
    </div>

    <div class="board-layout-sidebar">
      <the-game-side-bar
        @modeGameSelected="modeGameSelected"
        @showLoadingFindGame="showLoadingFindGame"
      >
      </the-game-side-bar>
    </div>
  </div>

  <m-game-hub></m-game-hub>
</template>

<script>
// Component
import TheGameSidebar from "@/components/layout/thegamesidebar/TheGameSidebar.vue";

// Store pinia
import { useLanguageStore } from "@/stores/languagestore.js";
import { useUserStore } from "@/stores/userstore";

// Local storage
import tokenLocalStorage from "@/js/localstorage/tokenLocalStorage";
import lastURLLocalStorage from "@/js/localstorage/lastUrlLocalStorage";
import signalRHubLocalStorage from "@/js/localstorage/signalRHubLocalStorage";

// APIs
import { getModeGamesAsync } from "@/api/modegame";
import { findGameAsync } from "@/api/game";
export default {
  name: "PlayOnline",

  components: {
    "the-game-side-bar": TheGameSidebar,
  },

  data() {
    return {
      /**
       * Đối tượng chứa store giá trị ngôn ngữ.
       */
      languageStore: useLanguageStore(),

      /**
       * Đối tượng chứa store thông tin User.
       */
      userStore: useUserStore(),

      /**
       * Điều khiển hiển thị loading tìm kiếm đối thủ.
       */
      showLoadingSearchOpponent: false,

      /**
       * Thông tin chế độ chơi
       */
      modeGame: {
        modeGameId: null,

        iconModeGame: null,

        /**
         * Thời gian tối đa của mỗi người chơi (giây)
         */
        time: null,
      },
    };
  },

  methods: {
    /**
     * Hàm thực hiện điều chỉnh kích thước bàn cờ.
     * @author NVDung (29-04-2024)
     */
    adjustTableSize() {
      // Kích thước màn hình
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;

      // console.log(`Màn hình: ${windowWidth} x ${windowHeight}`);

      try {
        // HTML table
        let tableChessBoard = this.$refs.chessBoard.$refs.tableChessBoard;

        // Màn hình dọc => Thực hiện điều chỉnh kích thước bàn cờ theo chiều ngang.
        if (windowWidth < windowHeight) {
          // Giá trị width.
          let width = getComputedStyle(tableChessBoard).width;

          // Cập nhật giá trị biến css
          document.documentElement.style.setProperty(
            "--width-table-chess-board",
            "100%"
          );
          document.documentElement.style.setProperty(
            "--height-table-chess-board",
            width
          );

          // console.log(`Table: ${width} x ${width}`);
        }
        // Màn hình ngang
        else {
          // Giá trị height
          let height = getComputedStyle(tableChessBoard).height;

          // Cập nhật giá trị biến css
          document.documentElement.style.setProperty(
            "--width-table-chess-board",
            height
          );
          document.documentElement.style.setProperty(
            "--height-table-chess-board",
            "100%"
          );

          // console.log(`Table: ${height} x ${height}`);
        }
      } catch (error) {
        console.error("Lỗi khi điều chỉnh kích thước bàn cờ...");
        console.error(error);
      }
    },

    modeGameSelected(data) {
      let { modeGameId, icon, time } = data;

      // Cập nhật vào data
      this.modeGame.modeGameId = modeGameId;
      this.modeGame.iconModeGame = icon;

      this.modeGame.time = time;
    },

    /**
     * Ẩn / Hiện loading
     * @param isShow True - Hiển thị, false - Ẩn
     */
    showLoadingFindGame(isShow) {
      this.showLoadingSearchOpponent = isShow;
    },
  },

  mounted() {
    // Điều chỉnh kích thước bàn cờ
    this.adjustTableSize();

    window.addEventListener("resize", this.adjustTableSize);
  },

  beforeUnmount() {
    // Hủy sự kiện resize để điều chỉnh kích thước bàn cờ.
    window.removeEventListener("resize", this.adjustTableSize);
  },
};
</script>

<style lang="scss" scoped>
@import url(./play-online.scss);
</style>
