<template>
  <div class="play-container flex">
    <div class="board-layout-main flex flex-column">
      <div class="board-layout-player-top flex flex-center">
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
      </div>
      <div class="board-layout-chessboard flex flex-center">
        <div class="overlay"></div>
        <!-- Chess Board -->
        <m-chess-board class="chess-board" ref="chessBoard"></m-chess-board>
      </div>
      <div class="board-layout-player-bottom flex flex-center">
        <img
          ref="imgAvatar"
          loading="lazy"
          width="20"
          height="20"
          :src="this.$resource.resourcesImage.logo.avatarWhite"
          alt="Ảnh đại diện đối thủ"
        />
        <span>
          {{
            this.$resource.resourcesPlay.players.player[
              languageStore.getLanguage
            ]
          }}
        </span>
      </div>
    </div>
    
    <div class="board-layout-sidebar flex flex-column">
      <div class="direct-menu-header">
        <h1 class="direct-menu-header-title">
          {{
            this.$resource.resourcesPlay.sidebarContent.textTitle[
              languageStore.getLanguage
            ]
          }}
        </h1>

        <!-- Icon -->
        <div class="mi mi-play-white direct-menu-header-img icon-resize"></div>
      </div>
      <div class="direct-menu-main scroller scroller-y">
        <div class="direct-menu-items flex flex-column">
          <!-- Play Online -->
          <m-button
            ref="btnPlayOnline"
            class="btn-menu-link"
            :hasIcon="true"
            classIcon=" mi-48 mi-blitz"
            :tabIndex="1"
            :isOutlineWhite="false"
            :isRouterLink="true"
            to="/play/online"
          >
            <div class="content">
              <h2 class="title">
                {{
                  this.$resource.resourcesPlay.sidebarContent.menuItems
                    .playOnline.title[languageStore.getLanguage]
                }}
              </h2>
              <div class="description">
                {{
                  this.$resource.resourcesPlay.sidebarContent.menuItems
                    .playOnline.description[languageStore.getLanguage]
                }}
              </div>
            </div>
          </m-button>

          <!-- Play Computer -->
          <m-button
            class="btn-menu-link"
            :hasIcon="true"
            classIcon=" mi-48 mi-computer"
            :tabIndex="2"
            :isOutlineWhite="false"
            :isRouterLink="true"
            to="/play/computer"
          >
            <div class="content">
              <h2 class="title">
                {{
                  this.$resource.resourcesPlay.sidebarContent.menuItems
                    .playComputer.title[languageStore.getLanguage]
                }}
              </h2>
              <div class="description">
                {{
                  this.$resource.resourcesPlay.sidebarContent.menuItems
                    .playComputer.description[languageStore.getLanguage]
                }}
              </div>
            </div>
          </m-button>

          <!-- Play a Friend -->
          <m-button
            class="btn-menu-link"
            :hasIcon="true"
            classIcon=" mi-48 mi-handshake"
            :tabIndex="3"
            :isOutlineWhite="false"
            :isRouterLink="true"
            to="/play/online/friend"
          >
            <div class="content">
              <h2 class="title">
                {{
                  this.$resource.resourcesPlay.sidebarContent.menuItems
                    .playAFriend.title[languageStore.getLanguage]
                }}
              </h2>
              <div class="description">
                {{
                  this.$resource.resourcesPlay.sidebarContent.menuItems
                    .playAFriend.description[languageStore.getLanguage]
                }}
              </div>
            </div>
          </m-button>

          <!-- Tournaments -->
          <m-button
            class="btn-menu-link"
            :hasIcon="true"
            classIcon=" mi-48 mi-tournaments"
            :tabIndex="4"
            :isOutlineWhite="false"
            :isRouterLink="true"
            to="/play/online/tournaments"
          >
            <div class="content">
              <h2 class="title">
                {{
                  this.$resource.resourcesPlay.sidebarContent.menuItems
                    .tournaments.title[languageStore.getLanguage]
                }}
              </h2>
              <div class="description">
                {{
                  this.$resource.resourcesPlay.sidebarContent.menuItems
                    .tournaments.description[languageStore.getLanguage]
                }}
              </div>
            </div>
          </m-button>
        </div>
        <div class="direct-menu-sub-items flex flex-center">
          <!-- Lưu trữ -->
          <m-button
            class="m-btn-secondary"
            :hasIcon="true"
            classIcon="mi-archive"
            :tabIndex="5"
            :isOutlineWhite="false"
            :isRouterLink="true"
            to="/games/archive"
          >
            {{
              this.$resource.resourcesPlay.sidebarContent.menuSubItems.archive[
                languageStore.getLanguage
              ]
            }}
          </m-button>

          <!-- Bảng xếp hạng -->
          <m-button
            class="m-btn-secondary"
            :hasIcon="true"
            classIcon="mi-leaderboard"
            :tabIndex="6"
            :isOutlineWhite="false"
            :isRouterLink="true"
            to="/games/leaderboard"
            @keydown.tab="tabIndexAround($event)"
          >
            {{
              this.$resource.resourcesPlay.sidebarContent.menuSubItems
                .leaderboard[languageStore.getLanguage]
            }}
          </m-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLanguageStore } from "@/stores/languagestore.js";

export default {
  name: "Play",

  data() {
    return {
      /**
       * Đối tượng chứa store giá trị ngôn ngữ.
       */
      languageStore: useLanguageStore(),
    };
  },

  methods: {
    /**
     * Hàm thực hiện điều chỉnh kích thước bàn cờ.
     * @author: NVDung (29-04-2024)
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

    /**
     * Thực hiện focus button play online.
     * @author NVDung (29-04-2024)
     */
    focusButtonPlayOnline() {
      try {
        let elBtnPlayOnline = this.$refs.btnPlayOnline.$refs.myButton.$el;
        // console.log(elBtnPlayOnline);
        elBtnPlayOnline.focus();
      } catch (error) {
        console.error("Lỗi khi thực hiện focus button play online...");
        console.error(error);
      }
    },

    /**
     * Hàm thực hiện tabindex vòng tròn menu.
     * @param {Event} event Tham số event.
     * @author: NVDung (29-04-2024)
     */
    tabIndexAround(event) {
      // focus btn PlayOnline
      this.focusButtonPlayOnline();

      // Chặn hành vi mặc định của phím Tab.
      event.preventDefault();
    },
  },

  mounted() {
    // Focus button play online
    this.focusButtonPlayOnline();

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
@import url(./play.scss);
</style>
