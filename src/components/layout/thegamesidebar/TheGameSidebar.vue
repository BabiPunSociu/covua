<template>
  <div class="game-sidebar">
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
            this.$resource.resourcesPlayOnline.sidebarContent.navHeader.newGame[
              languageStore.getLanguage
            ]
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
            this.$resource.resourcesPlayOnline.sidebarContent.navHeader.players[
              languageStore.getLanguage
            ]
          }}
        </span>
      </a>
    </nav>

    <div class="option-menu-main">
      <!-- New game -->
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

            <div v-if="sectionNewGame.isShowModeGame" class="options-mode-game">
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
                        0,
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsBullet.options.text1min[
                          languageStore.getLanguage
                        ],
                        'mi-ammo',
                        1 * 60 // 1 minutes
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
                        1,
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsBullet.options.text1vs1,
                        'mi-ammo',
                        1 * 60 // 1 minutes
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
                        2,
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsBullet.options.text2vs1,
                        'mi-ammo',
                        2 * 60 // 2 minutes
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
                        3,
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsBlitz.options.text3min[
                          languageStore.getLanguage
                        ],
                        'mi-lightning',
                        3 * 60 // 3 minutes
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
                        4,
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsBlitz.options.text3vs2,
                        'mi-lightning',
                        3 * 60 // 3 minutes
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
                        5,
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsBlitz.options.text5min[
                          languageStore.getLanguage
                        ],
                        'mi-lightning',
                        5 * 60 // 5 minutes
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
                        6,
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsRapid.options.text10min[
                          languageStore.getLanguage
                        ],
                        'mi-clock',
                        10 * 60 // 10 minutes
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
                        7,
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsRapid.options.text15vs10,
                        'mi-clock',
                        15 * 60 // 15 minutes
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
                        8,
                        this.$resource.resourcesPlayOnline.sidebarContent
                          .sectionNewGame.groupOptionsRapid.options.text30min[
                          languageStore.getLanguage
                        ],
                        'mi-clock',
                        30 * 60 // 30 minutes
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
            @click="btnPlayClick"
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
              style="justify-content: center"
              class="m-btn-secondary btn-play-friend"
              :hasIcon="true"
              classIcon=" mi-32 mi-handshake"
              :tabIndex="3"
              :isOutlineWhite="false"
              :textAlignCenter="true"
            >
              {{
                this.$resource.resourcesPlayOnline.sidebarContent.sectionNewGame
                  .buttons.textPlayAFriend[languageStore.getLanguage]
              }}
            </m-button>

            <!-- Tournaments -->
            <m-button
              style="justify-content: center"
              class="m-btn-secondary btn-tournaments"
              :hasIcon="true"
              classIcon=" mi-32 mi-tournaments"
              :tabIndex="4"
              :isOutlineWhite="false"
              :textAlignCenter="true"
            >
              {{
                this.$resource.resourcesPlayOnline.sidebarContent.sectionNewGame
                  .buttons.textTournaments[languageStore.getLanguage]
              }}
            </m-button>
          </div>

          <!-- Giải đấu sắp tới -->
          <div class="up-coming-tournaments" v-if="userStore.getUserId">
            <label>
              {{
                this.$resource.resourcesPlayOnline.sidebarContent.sectionNewGame
                  .upcomingTournaments.textUpcomingTournaments[
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
                this.$resource.resourcesPlayOnline.sidebarContent.sectionNewGame
                  .footer.textPlaying[languageStore.getLanguage]
              }}
            </span>
          </div>
          <div class="information">
            <span class="number">14.315.023</span>
            <span class="text">
              {{
                this.$resource.resourcesPlayOnline.sidebarContent.sectionNewGame
                  .footer.textGamesToday[languageStore.getLanguage]
              }}
            </span>
          </div>
        </div>
      </section>

      <!-- Games -->
      <section
        class="flex flex-column games"
        v-if="sectionSelected === 'games'"
      >
        <nav class="tab-list">
          <!-- Tab Lưu trữ -->
          <button
            class="tab-item block-user-select"
            :class="{
              'tab-item-active':
                sectionGames.tabItemActive === 'tabItemArchive',
            }"
            @click="setTabItemActive('tabItemArchive')"
          >
            {{
              this.$resource.resourcesPlayOnline.sidebarContent.sectionGames
                .tabNavigation.textArchive[languageStore.getLanguage]
            }}
          </button>

          <!-- Tab theo dõi -->
          <button
            class="tab-item block-user-select"
            :class="{
              'tab-item-active': sectionGames.tabItemActive === 'tabItemWatch',
            }"
            @click="setTabItemActive('tabItemWatch')"
          >
            {{
              this.$resource.resourcesPlayOnline.sidebarContent.sectionGames
                .tabNavigation.textWatch[languageStore.getLanguage]
            }}
          </button>
        </nav>

        <!-- Tab Archives -->
        <div
          v-if="sectionGames.tabItemActive === 'tabItemArchive'"
          class="content-tab-archive flex flex-column"
        >
          <!-- Ô tìm kiếm -->
          <m-text-field
            class="m-textfield-icon-action"
            style="width: 100%"
            :haveLabel="false"
            inputType="text"
            :placeholderTextField="
              this.$resource.resourcesPlayOnline.sidebarContent.sectionGames
                .inputSearch.textUsername[languageStore.getLanguage]
            "
            :tabIndex="1"
            :validateFunctions="[]"
            :isAutoFocused="true"
          >
          </m-text-field>

          <!-- Danh sách lịch sử ván đấu -->
          <div class="list-archives scroller">
            <!-- Chưa có ván đấu nào -->
            <div
              v-if="!sectionGames.archive.matchList.length"
              class="no-match-found"
            >
              {{
                this.$resource.resourcesPlayOnline.sidebarContent.sectionGames
                  .textNoMatchFound[languageStore.getLanguage]
              }}
            </div>

            <table class="table-archive" v-else>
              <tr v-for="i in 50" :key="i" @click="goToGame(i.toString())">
                <!-- Icon chế độ chơi -->
                <td class="width-col-1 icon fix-column-icon">
                  <div class="mi mi-24 mi-clock icon-resize"></div>
                </td>

                <!-- Chế độ chơi -->
                <td class="width-col-2 modeGame">10 min</td>

                <!-- Player 1 (level) -->
                <td class="width-col-3 player1">
                  player1 (100)player1 (100)player1 (100)player1 (100)player1
                  (100)player1 (100)
                </td>

                <!-- Player 2 (level) -->
                <td class="width-col-4 player2">player2 (100)</td>

                <!-- Tỉ số -->
                <td
                  class="width-col-5 score fix-column-score"
                  :class="{ 'score-win': true }"
                >
                  0 - 1
                </td>
              </tr>
            </table>
          </div>

          <!-- footer -->
          <div class="footer">
            <m-button
              class="m-btn-secondary btn-go-to-archive"
              :hasIcon="true"
              classIcon="mi-archive"
              :tabIndex="2"
              :isOutlineWhite="false"
              :textAlignCenter="false"
              :isRouterLink="true"
              to="/games.archive"
            >
              {{
                this.$resource.resourcesPlayOnline.sidebarContent.sectionGames
                  .textGoToFullArchive[languageStore.getLanguage]
              }}
            </m-button>
          </div>
        </div>

        <!-- Tab Watch -->
        <div
          v-if="sectionGames.tabItemActive === 'tabItemWatch'"
          class="content-tab-watch flex flex-column"
        >
          <!-- Ô tìm kiếm -->
          <m-text-field
            class="m-textfield-icon-action"
            style="width: 100%"
            :haveLabel="false"
            inputType="text"
            :placeholderTextField="
              this.$resource.resourcesPlayOnline.sidebarContent.sectionGames
                .inputSearch.textUsername[languageStore.getLanguage]
            "
            :tabIndex="1"
            :validateFunctions="[]"
            :isAutoFocused="true"
          >
          </m-text-field>

          <!-- Danh sách ván đấu của người khác -->
          <div class="list-watches scroller scroller-y">
            <table class="table-watch">
              <tr v-for="i in 50" :key="i" @click="goToGame(i.toString())">
                <td class="width-col-1 player">
                  <div>player1width-col-1width-col-1player1(100)</div>
                  <div>player2 (100)</div>
                </td>
                <td class="width-col-2 icon">
                  <!-- Icon chế độ chơi -->
                  <div class="mi mi-24 mi-clock icon-resize"></div>
                </td>
                <td class="width-col-3">10 min</td>
              </tr>
            </table>
          </div>
        </div>
      </section>

      <!-- Players -->
      <section
        class="flex flex-column players"
        v-if="sectionSelected === 'players'"
      >
        <nav class="tab-list">
          <!-- Tab bạn bè -->
          <button
            class="tab-item block-user-select"
            :class="{
              'tab-item-active':
                sectionPlayers.tabItemActive === 'tabItemFriends',
            }"
            @click="setTabItemActive('tabItemFriends')"
          >
            {{
              this.$resource.resourcesPlayOnline.sidebarContent.sectionPlayers
                .tabNavigation.textFriends[languageStore.getLanguage]
            }}
          </button>

          <!-- Tab All Players -->
          <button
            class="tab-item block-user-select"
            :class="{
              'tab-item-active':
                sectionPlayers.tabItemActive === 'tabItemAllPlayers',
            }"
            @click="setTabItemActive('tabItemAllPlayers')"
          >
            {{
              this.$resource.resourcesPlayOnline.sidebarContent.sectionPlayers
                .tabNavigation.textAllPlayers[languageStore.getLanguage]
            }}
          </button>

          <!-- Tab streaming -->
          <button
            class="tab-item block-user-select"
            :class="{
              'tab-item-active':
                sectionPlayers.tabItemActive === 'tabItemStreaming',
            }"
            @click="setTabItemActive('tabItemStreaming')"
          >
            {{
              this.$resource.resourcesPlayOnline.sidebarContent.sectionPlayers
                .tabNavigation.textStreaming
            }}
          </button>
        </nav>

        <div class="content-tab flex flex-column">
          <!-- Ô tìm kiếm -->
          <m-text-field
            class="m-textfield-icon-action"
            style="width: 100%"
            :haveLabel="false"
            inputType="text"
            :placeholderTextField="
              this.$resource.resourcesPlayOnline.sidebarContent.sectionGames
                .inputSearch.textUsername[languageStore.getLanguage]
            "
            :tabIndex="1"
            :validateFunctions="[]"
            :isAutoFocused="true"
          >
          </m-text-field>

          <!-- Danh sách kết quả -->
          <div class="list-results scroller scroller-y">
            <table class="table-results">
              <tr v-for="i in 50" :key="i" @click="goToGame(i.toString())">
                <td class="width-col-1 icon">
                  <img
                    loading="lazy"
                    src="https://res.cloudinary.com/nvdwebsitecovua/image/upload/v1714223865/image/images/professional-player/Anna-Rudolf_bjcnpe.jpg"
                    alt="Avatar người dùng"
                    width="24"
                    height="24"
                  />
                </td>
                <td class="width-col-2 player">
                  <span class="player-name"
                    >Thu Hien VuThu Hien VuThu Hien VuThu Hien VuThu Hien
                    Vu</span
                  >
                  <span class="player-level">(1000)</span>
                </td>
                <td class="width-col-3 status">Online</td>
              </tr>
            </table>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
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
  name: "TheGameSidebar",

  emits: ["modeGameSelected", "showLoadingFindGame"],

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
         * Danh sách Ids chế độ chơi.
         */
        modeGameIds: [],

        /**
         * Thông tin về chế độ chơi đã chọn.
         */
        modeGameSelected: {
          /**
           * Index chế độ chơi đã chọn, để xác định ModeGameId.
           */
          indexModeGameSelected: null,

          /**
           * Text modegame để đưa vào button selected.
           */
          textModeGameSelected: null,

          /**
           * class icon để đưa vào class selected.
           */
          iconModeGameSelected: "mi-clock",

          /**
           * Thời gian của mỗi người (s).
           */
          time: 10 * 60, // 10 minutes
        },
      },

      sectionGames: {
        /**
         * Đánh dấu tab đang hoạt động
         */
        tabItemActive: "tabItemArchive", // ["tabItemArchive", "tabItemWatch"]

        /**
         * Thông tin về tab archive.
         */
        archive: {
          matchList: [1],
        },

        /**
         * Thông tin về tab watch.
         */
        watch: {},
      },

      sectionPlayers: {
        /**
         * Đánh dấu tab đang hoạt động
         */
        tabItemActive: "tabItemFriends", // ["tabItemFriends", "tabItemAllPlayers", "tabItemStreaming"]

        /**
         * Giá trị trong input search để thực hiện tìm kiếm
         */
        searchValue: "",

        /**
         * Danh sách kết quả hiển thị.
         */
        listResult: [],
      },
    };
  },

  methods: {
    /**
     * Hàm thực hiện xử lý tạo new game
     * @author NVDUNG (23-08-2024)
     */
    async btnPlayClick() {
      // Lấy ConnectionId GameHub
      let connectionIdGameHub = signalRHubLocalStorage.gameHub.getGameHub();

      // Xác định ModeGameId đã chọn
      let modeGameId =
        this.sectionNewGame.modeGameIds[
          this.sectionNewGame.modeGameSelected.indexModeGameSelected
        ];

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
          // Thực hiện gọi API để tìm trận đấu
          let response = await findGameAsync(connectionIdGameHub, modeGameId);

          console.log("response: ", response);

          // Không có đối thủ... => Chờ.
          if (response.data == "Searching") {
            // Hiện loading tìm đối thủ
            this.$emit("showLoadingFindGame", true);
          } else {
            // Tắt loading tìm đối thủ
            this.$emit("showLoadingFindGame", false);
          }

          // Nếu tìm thấy trận đấu, GameHub tự động chuyển hướng đến game/live.

          // Dừng vòng lặp nếu gọi API thành công.
          callAPIAgain = false;
        } catch (error) {
          console.error("Lỗi khi tìm trận đấu");
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
        }
      } while (callAPIAgain);
    },

    /**
     * Hàm thực hiện chuyển hướng đến trang game/watch
     * @param {string} gameId Định danh game
     * @author NVDUNG (03-05-2024)
     */
    goToGame(gameId) {
      this.$router.push({ path: `/game/watch/${gameId}` });
    },

    /**
     * Thực hiện thiết lập tab đang được chọn.
     * @param newTabItemActive Giá trị tab đang được chọn
     * @author NVDUNG (02-05-2024)
     */
    setTabItemActive(newTabItemActive) {
      if (this.sectionSelected == "games") {
        this.sectionGames.tabItemActive = newTabItemActive;

        switch (newTabItemActive) {
          case "tabItemArchive":
            // Load data archive
            this.loadArchivement();
            break;
          case "tabItemAllPlayers":
            // Load data các ván cờ để xem lại
            this.loadWatch();
            break;
          default:
            break;
        }
      } else if (this.sectionSelected == "players") {
        this.sectionPlayers.tabItemActive = newTabItemActive;

        switch (newTabItemActive) {
          case "tabItemFriends":
            this.loadFriends();
            break;
          case "tabItemFriends":
            this.loadAllPlayers();
            break;
          case "tabItemStreaming":
            this.loadStreaming();
            break;

          default:
            break;
        }
      }
    },

    /**
     * Hàm thực hiện thiết lập chế độ chơi.
     *@param {int} indexModeGameSelected Giá trị index chế độ chơi đã chọn.
     * @param {string} textModeGameSelected Giá trị text chế độ chơi đã chọn.
     * @param {string} iconModeGameSelected Class icon hiển thị chế độ chơi đã chọn.
     * @param {string} time Giá trị thời gian của chế độ chơi đã chọn.
     * @author NVDUNG (01-05-2024)
     */
    setModeGame(
      indexModeGameSelected,
      textModeGameSelected,
      iconModeGameSelected,
      time
    ) {
      // Cập nhật giá trị chế độ chơi
      this.sectionNewGame.modeGameSelected.indexModeGameSelected =
        indexModeGameSelected;
      this.sectionNewGame.modeGameSelected.textModeGameSelected =
        textModeGameSelected;
      this.sectionNewGame.modeGameSelected.iconModeGameSelected =
        iconModeGameSelected;
      this.sectionNewGame.modeGameSelected.time = time;

      // Ẩn danh sách chế độ chơi
      this.toggleShowOptionModeGame();

      /**
       * Tạo đối tượng gửi dữ liệu đến component cha.
       */
      let modeGame = {
        modeGameId: this.sectionNewGame.modeGameIds[indexModeGameSelected],
        icon: iconModeGameSelected,
        time: time,
      };

      // Gửi dữ liệu đến component cha
      this.$emit("modeGameSelected", modeGame);
    },

    /**
     * Hàm thực hiện ẩn / hiện danh sách chế độ chơi.
     * @author NVDUNG (01-05-2024)
     */
    toggleShowOptionModeGame() {
      this.sectionNewGame.isShowModeGame = !this.sectionNewGame.isShowModeGame;
    },

    /**
     * Thực hiện focus button play.
     * @author NVDung (29-04-2024)
     */
    focusButtonPlay() {
      try {
        // let elBtnPlay = this.$refs.btnPlay.$refs.myButton.$el;
        let elBtnPlay = this.$refs.btnPlay.$refs.myButton;
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
      event.preventhefault();
    },

    /**
     * Hàm xử lý cập nhật giá trị section đang được chọn.
     * @param newString Giá trị section đang được chọn
     * @author NVDung (01-05-2024)
     */
    sectionSelectedChanged(newString) {
      this.sectionSelected = newString;

      // Thiết lập data cho tab được chọn
      switch (newString) {
        case "newGame":
          break;
        case "games":
          // Load thông tin Achive của chính mình
          this.loadArchivement();
          break;
        case "players":
          break;

        default:
          break;
      }
    },

    /**
     * Thực hiện load data ModeGame.
     * @author NVDung (06-12-2024)
     */
    async loadModeGame() {
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

          // Thực hiện gọi API để lấy thông tin ModeGame
          let response = await getModeGamesAsync();

          console.log(response);
          let { data } = response;

          if (data && data.length > 0) {
            this.sectionNewGame.modeGameIds = data.map((m) => m.modeGameId);
            // console.log(this.sectionNewGame.modeGameIds);
          }

          // Dừng vòng lặp nếu gọi API thành công.
          callAPIAgain = false;
        } catch (error) {
          console.error("Lỗi khi lấy thông tin người dùng");
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
     * Thực hiện load data Archive.
     * @author NVDung (06-12-2024)
     */
    async loadArchivement() {},

    /**
     * Thực hiện load data các ván cờ để xem lại.
     * @author NVDung (06-12-2024)
     */
    async loadWatch() {},

    /**
     * Thực hiện load danh sách bạn bè
     */
    async loadFriends() {},

    /**
     * Thực hiện load danh sách toàn bộ người chơi
     */
    async loadAllPlayers() {},

    /**
     * Thực hiện load danh sách toàn bộ player đang Streaming
     */
    async loadStreaming() {},
  },

  mounted() {
    /* =========================== LOAD DATA =========================== */
    this.loadModeGame();

    /* ========================= SET UP DEFAULT ========================= */
    // Thiết lập modegame mặc định.
    this.setModeGame(
      6,
      this.$resource.resourcesPlayOnline.sidebarContent.sectionNewGame
        .groupOptionsRapid.options.text10min[this.languageStore.getLanguage],
      "mi-clock",
      10 * 60 // 10 minutes
    );

    // Focus button play
    this.focusButtonPlay();
  },
};
</script>

<style lang="scss" scoped>
@import url(./the-game-sidebar.scss);
</style>
