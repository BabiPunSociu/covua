<template>
  <div class="play-container flex">
    <div class="board-layout-main flex flex-column">
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
        </div>
        <div class="time flex">
          <div class="mi mi-24 mi-clock icon-resize"></div>
          <span class="time-text block-user-select">00:00</span>
        </div>
      </div>
      <div class="board-layout-chessboard flex flex-center">
        <div class="overlay"></div>
        <!-- Chess Board -->
        <m-chess-board class="chess-board" ref="chessBoard"></m-chess-board>
      </div>
      <div class="board-layout-player-bottom flex flex-space-between">
        <div class="player flex">
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
        <div class="time flex">
          <div class="mi mi-24 mi-clock icon-resize"></div>
          <span class="time-text block-user-select">00:00</span>
        </div>
      </div>
    </div>

    <div class="board-layout-sidebar">
      <nav class="direct-menu-header flex flex-space-around">
        <!-- New game -->
        <a
          class="direct-menu-item flex flex-column flex-center block-user-select"
          :class="{
            'section-selected': sectionSelected === 'newGame',
          }"
          @click="sectionSelectedChanged('newGame')"
        >
          <div class="mi mi-24 icon-resize mi-add-new"></div>
          <div class="text">
            {{
              this.$resource.resourcesPlayOnline.sidebarContent.navHeader
                .newGame[languageStore.getLanguage]
            }}
          </div>
        </a>

        <!-- Games -->
        <a
          class="direct-menu-item flex flex-column flex-center block-user-select"
          :class="{
            'section-selected': sectionSelected === 'games',
          }"
          @click="sectionSelectedChanged('games')"
        >
          <div class="mi mi-24 icon-resize mi-chessboard"></div>
          <span class="text">
            {{
              this.$resource.resourcesPlayOnline.sidebarContent.navHeader.games[
                languageStore.getLanguage
              ]
            }}
          </span>
        </a>

        <!-- Players -->
        <a
          class="direct-menu-item flex flex-column flex-center block-user-select"
          :class="{
            'section-selected': sectionSelected === 'players',
          }"
          @click="sectionSelectedChanged('players')"
        >
          <div class="mi mi-24 icon-resize mi-friends"></div>
          <span class="text">
            {{
              this.$resource.resourcesPlayOnline.sidebarContent.navHeader
                .players[languageStore.getLanguage]
            }}
          </span>
        </a>
      </nav>

      <div class="option-menu-main">
        <section
          class="flex flex-column new-game"
          v-if="sectionSelected === 'newGame'"
        >
          <div class="direct-menu-items flex flex-column scroller scroller-y">
            <!-- Mode game -->
            <div class="game-mode">
              <!-- Button mode game selected -->
              <a
                class="btn-mode-game-selected flex flex-center block-user-select"
                @click="toggleShowOptionModeGame"
              >
                <div
                  class="mi mi-24 icon-resize"
                  :class="sectionNewGame.modeGameSelected.iconModeGameSelected"
                ></div>
                <div class="text">
                  {{ sectionNewGame.modeGameSelected.textModeGameSelected }}
                </div>
                <!-- Icon arrow down/up -->
                <div
                  class="mi mi-16 icon-resize mi-arrow-dropdown mi-arrow-dropdown--close"
                  :class="{
                    'mi-arrow-dropdown--open': sectionNewGame.isShowModeGame,
                  }"
                ></div>
              </a>

              <div
                v-if="sectionNewGame.isShowModeGame"
                class="options-mode-game"
              >
                <!-- Siêu chớp - Bullet -->
                <div class="option-mode-game-category">
                  <label class="flex">
                    <!-- Icon label -->
                    <div class="mi mi-24 icon-resize mi-ammo"></div>
                    <div class="title-category">
                      {{
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsBullet.title[
                          languageStore.getLanguage
                        ]
                      }}
                    </div>
                  </label>
                  <div class="option-mode-game-group flex">
                    <a
                      data-class-icon="mi-ammo"
                      class="option-mode-game-item block-user-select"
                      @click="
                        setModeGame(
                          this.$resource.resourcesPlayOnline.sidebarContent
                            .sectionNewGame.groupOptionsBullet.options.text1min[
                            languageStore.getLanguage
                          ],
                          'mi-ammo',
                          1
                        )
                      "
                    >
                      {{
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsBullet.options.text1min[
                          languageStore.getLanguage
                        ]
                      }}
                    </a>
                    <a
                      data-class-icon="mi-ammo"
                      class="option-mode-game-item block-user-select"
                      @click="
                        setModeGame(
                          this.$resource.resourcesPlayOnline.sidebarContent
                            .sectionNewGame.groupOptionsBullet.options.text1vs1,
                          'mi-ammo',
                          1
                        )
                      "
                    >
                      {{
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsBullet.options.text1vs1
                      }}
                    </a>
                    <a
                      data-class-icon="mi-ammo"
                      class="option-mode-game-item block-user-select"
                      @click="
                        setModeGame(
                          this.$resource.resourcesPlayOnline.sidebarContent
                            .sectionNewGame.groupOptionsBullet.options.text2vs1,
                          'mi-ammo',
                          1
                        )
                      "
                    >
                      {{
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsBullet.options.text2vs1
                      }}
                    </a>
                  </div>
                </div>

                <!-- Chớp - Blitz -->
                <div class="option-mode-game-category">
                  <label class="flex">
                    <!-- Icon label -->
                    <div class="mi mi-24 icon-resize mi-lightning"></div>
                    <div class="title-category">
                      {{
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsBlitz.title[
                          languageStore.getLanguage
                        ]
                      }}
                    </div>
                  </label>
                  <div class="option-mode-game-group flex">
                    <a
                      data-class-icon="mi-lightning"
                      class="option-mode-game-item block-user-select"
                      @click="
                        setModeGame(
                          this.$resource.resourcesPlayOnline.sidebarContent
                            .sectionNewGame.groupOptionsBlitz.options.text3min[
                            languageStore.getLanguage
                          ],
                          'mi-lightning',
                          1
                        )
                      "
                    >
                      {{
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsBlitz.options.text3min[
                          languageStore.getLanguage
                        ]
                      }}
                    </a>
                    <a
                      data-class-icon="mi-lightning"
                      class="option-mode-game-item block-user-select"
                      @click="
                        setModeGame(
                          this.$resource.resourcesPlayOnline.sidebarContent
                            .sectionNewGame.groupOptionsBlitz.options.text3vs2,
                          'mi-lightning',
                          1
                        )
                      "
                    >
                      {{
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsBlitz.options.text3vs2
                      }}
                    </a>
                    <a
                      data-class-icon="mi-lightning"
                      class="option-mode-game-item block-user-select"
                      @click="
                        setModeGame(
                          this.$resource.resourcesPlayOnline.sidebarContent
                            .sectionNewGame.groupOptionsBlitz.options.text5min[
                            languageStore.getLanguage
                          ],
                          'mi-lightning',
                          1
                        )
                      "
                    >
                      {{
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsBlitz.options.text5min[
                          languageStore.getLanguage
                        ]
                      }}
                    </a>
                  </div>
                </div>

                <!-- Cờ chớp - Rapid -->
                <div class="option-mode-game-category">
                  <label class="flex">
                    <!-- Icon label -->
                    <div class="mi mi-24 icon-resize mi-clock"></div>
                    <div class="title-category">
                      {{
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsRapid.title[
                          languageStore.getLanguage
                        ]
                      }}
                    </div>
                  </label>
                  <div class="option-mode-game-group flex">
                    <a
                      data-class-icon="mi-clock"
                      class="option-mode-game-item block-user-select"
                      @click="
                        setModeGame(
                          this.$resource.resourcesPlayOnline.sidebarContent
                            .sectionNewGame.groupOptionsRapid.options.text10min[
                            languageStore.getLanguage
                          ],
                          'mi-clock',
                          1
                        )
                      "
                    >
                      {{
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsRapid.options.text10min[
                          languageStore.getLanguage
                        ]
                      }}
                    </a>
                    <a
                      data-class-icon="mi-clock"
                      class="option-mode-game-item block-user-select"
                      @click="
                        setModeGame(
                          this.$resource.resourcesPlayOnline.sidebarContent
                            .sectionNewGame.groupOptionsRapid.options
                            .text15vs10,
                          'mi-clock',
                          1
                        )
                      "
                    >
                      {{
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsRapid.options.text15vs10
                      }}
                    </a>
                    <a
                      data-class-icon="mi-clock"
                      class="option-mode-game-item block-user-select"
                      @click="
                        setModeGame(
                          this.$resource.resourcesPlayOnline.sidebarContent
                            .sectionNewGame.groupOptionsRapid.options.text30min[
                            languageStore.getLanguage
                          ],
                          'mi-clock',
                          1
                        )
                      "
                    >
                      {{
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsRapid.options.text30min[
                          languageStore.getLanguage
                        ]
                      }}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Button Play -->
            <m-button
              ref="btnPlay"
              class="btn-play"
              :hasIcon="false"
              :tabIndex="1"
              :isOutlineWhite="false"
              :textAlignCenter="true"
            >
              {{
                this.$resource.resourcesPlayOnline.sidebarContent.sectionNewGame
                  .buttons.textPlay[languageStore.getLanguage]
              }}
            </m-button>

            <!-- Group button -->
            <div class="group-play-other">
              <!-- Play a Friend -->
              <m-button
                class="m-btn-secondary btn-play-friend"
                :hasIcon="true"
                classIcon=" mi-32 mi-handshake"
                :tabIndex="3"
                :isOutlineWhite="false"
                :textAlignCenter="true"
              >
                {{
                  this.$resource.resourcesPlayOnline.sidebarContent
                    .sectionNewGame.buttons.textPlayAFriend[
                    languageStore.getLanguage
                  ]
                }}
              </m-button>

              <!-- Tournaments -->
              <m-button
                class="m-btn-secondary btn-tournaments"
                :hasIcon="true"
                classIcon=" mi-32 mi-tournaments"
                :tabIndex="4"
                :isOutlineWhite="false"
                :textAlignCenter="true"
              >
                {{
                  this.$resource.resourcesPlayOnline.sidebarContent
                    .sectionNewGame.buttons.textTournaments[
                    languageStore.getLanguage
                  ]
                }}
              </m-button>
            </div>

            <!-- Giải đấu sắp tới -->
            <div class="up-coming-tournaments" v-if="userStore.getUserId">
              <label>
                {{
                  this.$resource.resourcesPlayOnline.sidebarContent
                    .sectionNewGame.upcomingTournaments.textUpcomingTournaments[
                    languageStore.getLanguage
                  ]
                }}
              </label>
            </div>
          </div>

          <!-- footer -->
          <div class="direct-menu-footer flex flex-center block-user-select">
            <div class="information">
              <span class="number">93.058</span>
              <span class="text">
                {{
                  this.$resource.resourcesPlayOnline.sidebarContent
                    .sectionNewGame.footer.textPlaying[
                    languageStore.getLanguage
                  ]
                }}
              </span>
            </div>
            <div class="information">
              <span class="number">14.315.023</span>
              <span class="text">
                {{
                  this.$resource.resourcesPlayOnline.sidebarContent
                    .sectionNewGame.footer.textGamesToday[
                    languageStore.getLanguage
                  ]
                }}
              </span>
            </div>
          </div>
        </section>
        <section
          class="flex flex-column games"
          v-if="sectionSelected === 'games'"
        ></section>
        <section
          class="flex flex-column players"
          v-if="sectionSelected === 'players'"
        ></section>
      </div>
    </div>
  </div>
</template>

<script>
import { useLanguageStore } from "@/stores/languagestore.js";
import { useUserStore } from "@/stores/userstore";

export default {
  name: "PlayOnline",

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
       * Đối tượng đánh dấu section đang được chọn.
       */
      sectionSelected: "newGame", // ["newGame", "games", "players"]

      sectionNewGame: {
        /**
         * Hiển thị danh sách chế độ chơi.
         */
        isShowModeGame: false,

        /**
         * Thông tin về chế độ chơi đã chọn.
         */
        modeGameSelected: {
          /**
           * Text modegame để đưa vào button selected.
           */
          textModeGameSelected: null,

          /**
           * class icon để đưa vào class selected.
           */
          iconModeGameSelected: "mi-clock",
          valueModeGameSelected: "",
        },
      },
    };
  },

  methods: {
    /**
     * Hàm thực hiện thiết lập chế độ chơi.
     *
     * @param {string} textModeGameSelected Giá trị text chế độ chơi đã chọn.
     * @param {string} iconModeGameSelected Class icon hiển thị chế độ chơi đã chọn.
     * @param {string} valueModeGameSelected Giá trị value chế độ chơi đã chọn.
     * @author NVDUNG (01-05-2024)
     */
    setModeGame(
      textModeGameSelected,
      iconModeGameSelected,
      valueModeGameSelected
    ) {
      // Cập nhật giá trị chế độ chơi
      this.sectionNewGame.modeGameSelected.textModeGameSelected =
        textModeGameSelected;
      this.sectionNewGame.modeGameSelected.iconModeGameSelected =
        iconModeGameSelected;
      this.sectionNewGame.modeGameSelected.valueModeGameSelected =
        valueModeGameSelected;

      // Ẩn danh sách chế độ chơi
      this.toggleShowOptionModeGame();
    },

    /**
     * Hàm thực hiện ẩn / hiện danh sách chế độ chơi.
     * @author NVDUNG (01-05-2024)
     */
    toggleShowOptionModeGame() {
      this.sectionNewGame.isShowModeGame = !this.sectionNewGame.isShowModeGame;
    },

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

    /**
     * Thực hiện focus button play.
     * @author NVDung (29-04-2024)
     */
    focusButtonPlay() {
      try {
        // let elBtnPlay = this.$refs.btnPlay.$refs.myButton.$el;
        let elBtnPlay = this.$refs.btnPlay.$refs.myButton;
        console.log(elBtnPlay);
        elBtnPlay.focus();
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

    /**
     * Hàm xử lý cập nhật giá trị section đang được chọn.
     * @param newString Giá trị section đang được chọn
     * @author NVDung (01-05-2024)
     */
    sectionSelectedChanged(newString) {
      this.sectionSelected = newString;
    },
  },

  mounted() {
    // Thiết lập modegame mặc định.
    this.sectionNewGame.modeGameSelected.textModeGameSelected =
      this.$resource.resourcesPlayOnline.sidebarContent.sectionNewGame.groupOptionsRapid.options.text10min[
        this.languageStore.getLanguage
      ];

    // Focus button play
    this.focusButtonPlay();

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
