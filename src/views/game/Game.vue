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
            :src="
              gameControl.opponentInfomation.avatar ??
              this.$resource.resourcesImage.logo.avatarBlack
            "
            alt="Ảnh đại diện đối thủ"
          />
          <span>
            {{
              gameControl.opponentInfomation.fullName ??
              this.$resource.resourcesPlay.players.opponent[
                languageStore.getLanguage
              ]
            }}
          </span>
          <!-- Thông tin trạng thái đối thủ -->
          <b
            v-if="gameControl.playersState.isShowState == true"
            class="player-state-opponent"
          >
            {{
              gameControl.playersState.player2Ready == true
                ? this.$resource.resourcesGame.statePlayerReady[
                    languageStore.getLanguage
                  ]
                : this.$resource.resourcesGame.statePlayerNotReady[
                    languageStore.getLanguage
                  ]
            }}
          </b>

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
          <span class="time-text block-user-select"
            >{{
              Math.floor(gameControl.timeControl.timePlayer2 / 60)
                .toString()
                .padStart(2, "0")
            }}
            :
            {{
              Math.floor(gameControl.timeControl.timePlayer2 % 60)
                .toString()
                .padStart(2, "0")
            }}
          </span>
        </div>
      </div>

      <!-- Chess Board -->
      <div class="board-layout-chessboard flex flex-center">
        <!-- Ngăn chặn hành động khi game "chưa bắt đầu" hoặc "đã bắt đầu nhưng không đúng lượt" -->
        <div
          class="overlay"
          v-if="
            !gameControl.matchInfomation.isMatchStartedState ||
            (gameControl.matchInfomation.isMatchStartedState &&
              !gameControl.allowedToPlay)
          "
        ></div>
        <!-- Chess Board -->
        <m-chess-board
          class="chess-board"
          :colorPlayer="gameControl.colorPlayer"
          :matrix="gameControl.boardStateInfomation.matrix"
          :isEndGame="false"
          @endGame="handleEndGameOnBoard"
          @sendUpdateBoardState="sendUpdateBoardState"
          ref="chessBoard"
        >
        </m-chess-board>
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
            alt="Ảnh đại diện người chơi"
          />
          <span>
            {{
              userStore.getName ||
              this.$resource.resourcesPlay.players.player[
                languageStore.getLanguage
              ]
            }}
          </span>
          <b
            v-if="gameControl.playersState.isShowState == true"
            class="player-state-player"
          >
            {{
              gameControl.playersState.player1Ready == true
                ? this.$resource.resourcesGame.statePlayerReady[
                    languageStore.getLanguage
                  ]
                : this.$resource.resourcesGame.statePlayerNotReady[
                    languageStore.getLanguage
                  ]
            }}
          </b>
        </div>

        <div class="time flex">
          <!-- Hiển thị trạng thái sẵn sàng? -->
          <m-button
            v-if="gameControl.playersState.isShowState == true"
            :class="{
              'm-btn-secondary': gameControl.playersState.player1Ready,
            }"
            @click="btnReadyOnClick"
          >
            {{
              gameControl.playersState.player1Ready == true
                ? this.$resource.resourcesGame.statePlayerNotReady[
                    languageStore.getLanguage
                  ]
                : this.$resource.resourcesGame.statePlayerReady[
                    languageStore.getLanguage
                  ]
            }}
          </m-button>

          <div
            class="mi mi-24 mi-clock icon-resize"
            :class="modeGame.iconModeGame"
          ></div>
          <span class="time-text block-user-select"
            >{{
              Math.floor(gameControl.timeControl.timePlayer1 / 60)
                .toString()
                .padStart(2, "0")
            }}
            :
            {{
              Math.floor(gameControl.timeControl.timePlayer1 % 60)
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

  <m-game-hub @updatePlayerStatus="updatePlayerStatus" @startGame="startGame">
  </m-game-hub>
</template>

<script>
// Component
import TheGameSidebar from "@/components/layout/thegamesidebar/TheGameSidebar.vue";

// Store pinia
import { useLanguageStore } from "@/stores/languagestore.js";
import { useUserStore } from "@/stores/userstore";

// Local storage
import tokenLocalStorage from "@/js/localstorage/tokenLocalStorage";
import userIdLocalStorage from "@/js/localstorage/userIdLocalStorage";

// APIs
import { getGameByIdAsync, getPlayerStateByGameIdAsync } from "@/api/game";
import { getUserByIdAsync } from "@/api/user";
import { getImageByIdAsync } from "@/api/image";

export default {
  name: "Game",

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
      },

      /**
       * Quản lý các trạng thái trong trận đấu.
       */
      gameControl: {
        /**
         * Trạng thái của 2 người chơi
         */
        playersState: {
          /**
           * Trạng thái "người chơi 1" đã sẵn sàng?
           */
          player1Ready: false,

          /**
           * Trạng thái "người chơi 2 - Đối thủ" đã sẵn sàng?
           */
          player2Ready: false,

          /**
           * Hiển thị trạng thái người chơi
           */
          isShowState: true,
        },

        /**
         * Thông tin về game đấu
         */
        gameInfomation: {
          /**
           * Tỷ số trận đấu.
           */
          score: null,

          /**
           * Người gửi yêu cầu - Cầm quân trắng.
           */
          sender: null,

          /**
           * Người nhận yêu cầu - Cầm quân đen.
           */
          receiver: null,

          /**
           * Số người đang xem trận đấu.
           */
          viewerCount: 0,
        },

        /**
         * Thông tin về ván đấu hiện tại.
         */
        matchInfomation: {
          /**
           * Định danh ván đấu, để lưu trữ thông tin kết quả.
           */
          matchId: null,

          /**
           * Ván đấu thứ x. Nếu x chẵn => Quân trắng đi trước.
           */
          numberOfMatch: 0,

          /**
           * Trạng thái VÁN ĐẤU bắt đầu, khi cả 2 người chơi đã sẵn sàng.
           */
          isMatchStartedState: false,
        },

        /**
         * Thông tin về bàn cờ.
         */
        boardStateInfomation: {
          matrix: null,
          turnNumber: 0,
        },

        /**
         * Thông tin đối thủ
         */
        opponentInfomation: {
          /**
           * URL avatar đổi thủ.
           */
          avatar: null,

          /**
           * Tên đối thủ.
           */
          fullName: null,
        },

        /**
         * Kiểm soát thời gian còn lại.
         */
        timeControl: {
          /**
           * Người chơi
           */
          timePlayer1: null,

          /**
           * Đối thủ
           */
          timePlayer2: null,
        },

        /**
         * Màu cờ của player 1.
         */
        colorPlayer: this.$enum.colorPlayer.white, // 0 - white || 1 - black

        /**
         * Cho phép player 1 chơi
         */
        allowedToPlay: false,
      },
    };
  },

  watch: {
    /**
     * Gửi dữ liệu đến GameHub để thực hiện đồng bộ thời gian
     * @param value Giá trị thời gian còn lại của người chơi 1.
     */
    "gameControl.timeControl.timePlayer1": function (value) {
      let time;

      if (this.gameControl.colorPlayer == this.$enum.colorPlayer.white) {
        time = {
          gameId: this.$route.params.gameId,
          timePlayerWhite: value,
          timePlayerBlack: this.gameControl.timeControl.timePlayer2,
        };
      } else {
        time = {
          gameId: this.$route.params.gameId,
          timePlayerWhite: this.gameControl.timeControl.timePlayer1,
          timePlayerBlack: value,
        };
      }

      // Gửi dữ liệu đến GameHub
      this.$emitter.emit("sendUpdateTime", time);
    },

    "gameControl.allowedToPlay": function (value) {
      let timer;
      if (value) {
        timer = setInterval(this.reduceTime, 1000);
      } else {
        clearInterval(timer);

        let data = {
          gameId: this.$route.params.gameId,
          matchId: this.gameControl.matchInfomation.matchId,
          userId: userIdLocalStorage.getUserId(),
        };

        // Gửi thông tin "hết giờ" đến GameHub
        this.$emitter.emit("sendPlayerTimeOut", data);
      }
    },
  },

  methods: {
    /* =================== START - SIDEBAR ==================== */
    /**
     * Cập nhật thông tin chế độ chơi đã chọn.
     * @param data Thông tin về chế độ chơi.
     */
    modeGameSelected(data) {
      // Trận đấu chưa bắt đầu
      if (!this.gameControl.matchInfomation.isMatchStartedState) {
        let { modeGameId, icon, time } = data;

        // Cập nhật vào data
        this.modeGame.modeGameId = modeGameId;
        this.modeGame.iconModeGame = icon;

        this.gameControl.timeControl.timePlayer1 = time;
        this.gameControl.timeControl.timePlayer2 = time;
      }
    },

    /**
     * Ẩn / Hiện loading
     * @param isShow True - Hiển thị, false - Ẩn
     */
    showLoadingFindGame(isShow) {
      this.showLoadingSearchOpponent = isShow;
    },
    /* =================== END - SIDEBAR ==================== */

    /* =================== START - STATE PLAYER ==================== */
    /**
     * Cập nhật trạng thái sẵn sàng để bắt đầu ván đấu.
     * @author NVDung (19-12-2024)
     */
    btnReadyOnClick() {
      // Cập nhật trạng thái Ready
      this.gameControl.playersState.player1Ready =
        !this.gameControl.playersState.player1Ready;

      // Thực hiện phát sự kiện đến NotificationHub để gửi trạng thái sẵn sàng và color cho Server
      this.$emitter.emit("sendReadyState", {
        gameId: this.$route.params.gameId,
        color: this.gameControl.colorPlayer,
        state: this.gameControl.playersState.player1Ready,
      });
    },

    /**
     * Cập nhật trạng thái người chơi.
     * @param {object} data Dữ liệu gửi về từ Server
     */
    updatePlayerStatus(data) {
      console.log("updatePlayerStatus", data);

      // Cập nhật trạng thái người chơi
      this.gameControl.playersState.player1Ready =
        this.gameControl.colorPlayer == this.$enum.colorPlayer.white
          ? data.playerWhiteReady
          : data.playerBlackReady;

      this.gameControl.playersState.player2Ready =
        this.gameControl.colorPlayer == this.$enum.colorPlayer.white
          ? data.playerBlackReady
          : data.playerWhiteReady;
    },

    /* =================== END - STATE STATE PLAYER ==================== */

    /* =================== START - GAME PLAY ==================== */
    /**
     * Thực hiện bắt đầu trận đấu
     * @param match Thông tin trận đấu
     */
    startGame(match) {
      console.log("Start match", match);

      // Cập nhật thông tin trạng thái người chơi
      this.gameControl.playersState.player1Ready = true;
      this.gameControl.playersState.player2Ready = true;
      this.gameControl.playersState.isShowState = false; // Tắt hiển thị trạng thái.

      // Cập nhật thông tin Match
      this.gameControl.matchInfomation.matchId = match.matchId;
      this.gameControl.matchInfomation.numberOfMatch = match.numberOfMatch;
      this.gameControl.matchInfomation.isMatchStartedState = true;

      // Set BoardState
      this.gameControl.boardStateInfomation.matrix;
      this.gameControl.boardStateInfomation.turnNumber = 0; // Tăng khi gửi lên server

      // Set timeControl
      this.gameControl.timeControl.timePlayer1 = 10 * 60; // 10 minutes
      this.gameControl.timeControl.timePlayer2 = 10 * 60;

      // Nếu Player cầm quân trắng và number of match là số lẻ (1) => Đúng lượt chơi
      if (this.gameControl.colorPlayer == this.$enum.colorPlayer.white) {
        this.gameControl.allowedToPlay = match.numberOfMatch % 2 == 1;
      }

      if (this.gameControl.allowedToPlay) {
        // Trừ time
      }
    },

    /**
     * Giảm thời gian của người chơi hiện tại.
     */
    reduceTime() {
      this.gameControl.timeControl.timePlayer1--;
    },
    /* =================== END - GAME PLAY ==================== */

    /* =================== START Load data ==================== */
    /**
     * Lấy thông tin về game đấu.
     * @author NVDung (19-12-2024)
     */
    async getInfomationGame() {
      // Lấy giá trị Token trong local storage
      let jwt = tokenLocalStorage.getToken();

      if (!jwt?.accessToken) {
        // Lưu URL hiện tại vào local storage
        lastURLLocalStorage.setLastUrl({
          name: this.$route.name,
          params: this.$route.params,
        });
        // Điều hướng đến trang login.
        this.$router.push({ name: "LoginRouter" });
        return;
      }

      let callAPIAgain = false;
      do {
        try {
          // Hiện loading
          this.$emitter.emit("showLoading", true);

          /**
           * Lấy GameId từ router
           */
          let gameId = this.$route.params.gameId;

          // Thực hiện gọi API để lấy thông tin Game
          let response = await getGameByIdAsync(gameId);

          console.log("response: ", response);

          // Cập nhật thông tin vào data.
          this.gameControl.gameInfomation.score = response.data.score;
          this.gameControl.gameInfomation.sender = response.data.sender;
          this.gameControl.gameInfomation.receiver = response.data.receiver;
          this.gameControl.gameInfomation.viewerCount =
            response.data.viewerCount;

          /**
           * Lấy UserId từ Local Storage
           */
          let userId = userIdLocalStorage.getUserId();

          this.gameControl.colorPlayer =
            this.gameControl.gameInfomation.sender == userId
              ? this.$enum.colorPlayer.white
              : this.$enum.colorPlayer.black;

          // Load dữ liệu về đối thủ.
          await this.getOpponentInfomation();

          // Load dữ liệu trạng thái người chơi
          await this.getPlayerState();

          // Dừng vòng lặp nếu gọi API thành công.
          callAPIAgain = false;
        } catch (error) {
          console.error("Lỗi khi lấy thông tin trận đấu");
          console.error(error);

          if (error.message === "GoToLogin") {
            // Lưu URL hiện tại vào local storage
            lastURLLocalStorage.setLastUrl({
              name: this.$route.name,
              params: this.$route.params,
            });

            // Điều hướng đến trang login.
            this.$router.push({ name: "LoginRouter" });
          } else {
            // Điều khiển vòng lặp, thực hiện gọi lại API khi refresh token.
            callAPIAgain = error.message === "CallApiAgain";
          }
        } finally {
          this.$emitter.emit("showLoading", false);
        }
      } while (callAPIAgain);
    },

    /**
     * Lấy thông tin về đối thủ.
     * @author NVDung (19-12-2024)
     */
    async getOpponentInfomation() {
      // Lấy giá trị Token trong local storage
      let jwt = tokenLocalStorage.getToken();

      if (!jwt?.accessToken) {
        // Lưu URL hiện tại vào local storage
        lastURLLocalStorage.setLastUrl({
          name: this.$route.name,
          params: this.$route.params,
        });
        // Điều hướng đến trang login.
        this.$router.push({ name: "LoginRouter" });
        return;
      }

      let callAPIAgain = false;
      do {
        try {
          // Hiện loading
          this.$emitter.emit("showLoading", true);

          // Lấy UserId từ Local storage
          let userId = userIdLocalStorage.getUserId();

          /**
           * Xác định UserId đối thủ
           */
          let opponentId =
            userId == this.gameControl.gameInfomation.sender
              ? this.gameControl.gameInfomation.receiver
              : this.gameControl.gameInfomation.sender;

          // Thực hiện gọi API để lấy thông tin User
          let response = await getUserByIdAsync(opponentId);

          console.log("response user opponent: ", response);

          // Cập nhật thông tin vào data.
          this.gameControl.opponentInfomation.fullName =
            response.data.fullName.trim();

          // Được set avatar mặc định nên NOT NULL.
          let avatarId = response.data.avatar;

          // Thực hiện gọi API để lấy thông tin Image
          response = await getImageByIdAsync(avatarId);

          console.log("response image opponent: ", response);

          // Cập nhật thông tin vào data.
          this.gameControl.opponentInfomation.avatar = response.data.url.trim();

          // Dừng vòng lặp nếu gọi API thành công.
          callAPIAgain = false;
        } catch (error) {
          console.error("Lỗi khi lấy thông tin đối thủ");
          console.error(error);

          if (error.message === "GoToLogin") {
            // Lưu URL hiện tại vào local storage
            lastURLLocalStorage.setLastUrl({
              name: this.$route.name,
              params: this.$route.params,
            });

            // Điều hướng đến trang login.
            this.$router.push({ name: "LoginRouter" });
          } else {
            // Điều khiển vòng lặp, thực hiện gọi lại API khi refresh token.
            callAPIAgain = error.message === "CallApiAgain";
          }
        } finally {
          // Tắt loading
          this.$emitter.emit("showLoading", false);
        }
      } while (callAPIAgain);
    },

    /**
     * Lấy thông tin trạng thái người chơi.
     */
    async getPlayerState() {
      // Lấy giá trị Token trong local storage
      let jwt = tokenLocalStorage.getToken();

      if (!jwt?.accessToken) {
        // Lưu URL hiện tại vào local storage
        lastURLLocalStorage.setLastUrl({
          name: this.$route.name,
          params: this.$route.params,
        });
        // Điều hướng đến trang login.
        this.$router.push({ name: "LoginRouter" });
        return;
      }

      let callAPIAgain = false;
      do {
        try {
          // Hiện loading
          this.$emitter.emit("showLoading", true);

          /**
           * Lấy GameId từ router
           */
          let gameId = this.$route.params.gameId;

          // Thực hiện gọi API để lấy thông tin Game
          let response = await getPlayerStateByGameIdAsync(gameId);

          console.log("response player state: ", response);

          // Cập nhật thông tin vào data.
          this.gameControl.playersState.player1Ready =
            this.gameControl.colorPlayer == this.$enum.colorPlayer.white
              ? response.playerWhiteReady
              : response.playerBlackReady;

          this.gameControl.playersState.player2Ready =
            this.gameControl.colorPlayer == this.$enum.colorPlayer.white
              ? response.playerBlackReady
              : response.playerWhiteReady;

          if (
            this.gameControl.playersState.player1Ready &&
            this.gameControl.playersState.player2Ready
          ) {
            this.gameControl.matchInfomation.isMatchStartedState = true;
          }

          // Dừng vòng lặp nếu gọi API thành công.
          callAPIAgain = false;
        } catch (error) {
          console.error("Lỗi khi lấy thông tin trận đấu");
          console.error(error);

          switch (error.message) {
            case "GoToLogin":
              // Lưu URL hiện tại vào local storage
              lastURLLocalStorage.setLastUrl({
                name: this.$route.name,
                params: this.$route.params,
              });

              // Điều hướng đến trang login.
              this.$router.push({ name: "LoginRouter" });
              break;

            case "NotFoundGame":
              // Chuyển hướng đến trang PlayOnline
              this.$router.push({ name: "PlayOnlineRouter" });
              break;

            default:
              break;
          }

          // Điều khiển vòng lặp, thực hiện gọi lại API khi refresh token.
          callAPIAgain = error.message === "CallApiAgain";
        } finally {
          this.$emitter.emit("showLoading", false);
        }
      } while (callAPIAgain);
    },
    /* =================== END Load data ==================== */

    /* =================== START GAME CHESSBOARD ==================== */
    /**
     * Cập nhật thông tin trạng thái bàn cờ.
     * @param {Number[][]} matrix Ma trận trạng thái bàn cờ
     */
    sendUpdateBoardState(matrix) {
      // Chuyển matrix thành string
      let matrixJson = JSON.stringify(matrix);

      // Gửi đến GameHub
      this.$emitter.emit("sendUpdateBoardState", {
        matrix: matrixJson,
        turnNumber: this.gameControl.boardStateInfomation.turnNumber++,
        gameId: this.$route.params.gameId,
        matchId: this.gameControl.matchInfomation.matchId,
      });
    },
    /**
     * Hàm xử lý sự kiện kết thúc game trên bàn cờ.
     * @author NVDUNG (05-05-2024)
     */
    handleEndGameOnBoard() {
      console.log("handleEndGameOnBoard");
    },
    /* =================== END GAME CHESSBOARD ==================== */

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
  },

  mounted() {
    /* =================== START SETUP GAME ==================== */
    // Lấy thông tin Game.
    this.getInfomationGame();

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
@import url(./game.scss);
</style>
