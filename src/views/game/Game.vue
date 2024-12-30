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
        </div>
        <div class="time flex">
          <div class="mi mi-24 mi-clock icon-resize"></div>
          <span class="time-text block-user-select">
            {{ this.sectionNewGame.modeGameSelected.textTime }}
          </span>
        </div>
      </div>

      <!-- Chess Board -->
      <div class="board-layout-chessboard flex flex-center">
        <!-- Ngăn chặn hành động khi game chưa bắt đầu -->
        <div
          class="overlay"
          v-if="gameControl.matchInfomation.isMatchStartedState != true"
        ></div>
        <!-- Chess Board -->
        <m-chess-board
          class="chess-board"
          :colorPlayer="this.colorPlayer"
          :isEndGame="false"
          @endGame="handleEndGameOnBoard"
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
              gameControl.playerInformation.avatar ??
              this.$resource.resourcesImage.logo.avatarWhite
            "
            alt="Ảnh đại diện người chơi"
          />
          <span>
            {{
              gameControl.playerInformation.fullName ??
              this.$resource.resourcesPlay.players.player[
                languageStore.getLanguage
              ]
            }}
          </span>
        </div>

        <!-- Hiển thị khi chưa sẵn sàng -->
        <m-button
          v-if="gameControl.playersState.player1Ready == false"
          @click="btnReadyOnClick"
        >
          {{
            this.$resource.resourcesGame.statePlayerReady[
              languageStore.getLanguage
            ]
          }}
        </m-button>

        <div class="time flex">
          <div class="mi mi-24 mi-clock icon-resize"></div>
          <span class="time-text block-user-select">
            {{ this.sectionNewGame.modeGameSelected.textTime }}
          </span>
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
                          1,
                          '01:00'
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
                          1,
                          '01:00'
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
                          1,
                          '02:00'
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
                          1,
                          '03:00'
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
                          1,
                          '03:00'
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
                          1,
                          '05:00'
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
                          1,
                          '10:00'
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
                          1,
                          '15:00'
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
                          1,
                          '30:00'
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
                style="justify-content: center"
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
                style="justify-content: center"
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
                'tab-item-active':
                  sectionGames.tabItemActive === 'tabItemWatch',
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
  </div>
</template>

<script>
// Store pinia
import { useLanguageStore } from "@/stores/languagestore.js";
import { useUserStore } from "@/stores/userstore";

// Local storage
import tokenLocalStorage from "@/js/localstorage/tokenLocalStorage";
import userIdLocalStorage from "@/js/localstorage/userIdLocalStorage";

// APIs
import { getGameByIdAsync } from "@/api/game";
import { getUserByIdAsync } from "@/api/user";
import { getImageByIdAsync } from "@/api/image";

export default {
  name: "Game",

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
          textTime: "10:00",
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
         * Thông tin người chơi 1
         */
        playerInformation: {
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
      },
    };
  },

  computed: {
    /**
     * Người chơi cầm quân cờ màu?
     * @returns {int} 0 - white || 1 - black
     */
    colorPlayer() {
      // Lấy UserId từ Local Storage
      let userId = userIdLocalStorage.getUserId();

      let result =
        this.gameControl.gameInfomation.sender == userId
          ? this.$enum.colorPlayer.white
          : this.$enum.colorPlayer.black;

      console.log(`ColorPlayer: ${result}`);

      return result;
    },
  },

  methods: {
    /* =================== START - STATE PLAYER ==================== */
    /**
     * Cập nhật trạng thái sẵn sàng để bắt đầu ván đấu.
     * @author NVDung (19-12-2024)
     */
    btnReadyOnClick() {
      // Thực hiện phát sự kiện đến NotificationHub để gửi trạng thái sẵn sàng cho Server
      this.$emitter.emit("sendReadyState");
    },

    /* =================== END - STATE STATE PLAYER ==================== */

    /* =================== START GAME CHESSBOARD ==================== */
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

          // Lấy GameId từ router code
          let gameId = this.$route.params.gameCode;

          // Thực hiện gọi API để lấy thông tin Game
          let response = await getGameByIdAsync(gameId);

          console.log("response: ", response);

          // Cập nhật thông tin vào data.
          this.gameControl.gameInfomation.score = response.data.score;
          this.gameControl.gameInfomation.sender = response.data.sender;
          this.gameControl.gameInfomation.receiver = response.data.receiver;
          this.gameControl.gameInfomation.viewerCount =
            response.data.viewerCount;

          // Load dữ liệu về đối thủ.
          this.getOpponentInfomation();

          // Dừng vòng lặp nếu gọi API thành công.
          callAPIAgain = false;
        } catch (error) {
          console.error("Lỗi khi lấy thông tin trận đấu");
          console.error(error);

          // Điều khiển vòng lặp, thực hiện gọi lại API khi refresh token.
          callAPIAgain = error.message === "CallApiAgain";
        } finally {
          this.$emitter.emit("showLoading", false);
        }
      } while (callAPIAgain);
    },

    /**
     * Lấy thông tin về người chơi (Player 1).
     * @author NVDung (19-12-2024)
     */
    async getPlayer1Infomation() {
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

          // Thực hiện gọi API để lấy thông tin User
          let response = await getUserByIdAsync(userId);

          console.log("response user player 1: ", response);

          // Cập nhật thông tin vào data.
          this.gameControl.playerInformation.fullName =
            response.data.fullName.trim();

          // Được set avatar mặc định nên NOT NULL.
          let avatarId = response.data.avatar;

          // Thực hiện gọi API để lấy thông tin Image
          response = await getImageByIdAsync(avatarId);

          console.log("response image player 1: ", response);

          // Cập nhật thông tin vào data.
          this.gameControl.playerInformation.avatar = response.data.url.trim();

          // Dừng vòng lặp nếu gọi API thành công.
          callAPIAgain = false;
        } catch (error) {
          console.error("Lỗi khi lấy thông tin người chơi 1");
          console.error(error);

          // Điều khiển vòng lặp, thực hiện gọi lại API khi refresh token.
          callAPIAgain = error.message === "CallApiAgain";
        } finally {
          // Tắt loading
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

          // Điều khiển vòng lặp, thực hiện gọi lại API khi refresh token.
          callAPIAgain = error.message === "CallApiAgain";
        } finally {
          // Tắt loading
          this.$emitter.emit("showLoading", false);
        }
      } while (callAPIAgain);
    },
    /* =================== END GAME CHESSBOARD ==================== */

    /* =================== START GAME CHESSBOARD ==================== */
    /**
     * Hàm xử lý sự kiện kết thúc game trên bàn cờ.
     * @author NVDUNG (05-05-2024)
     */
    handleEndGameOnBoard() {
      console.log("handleEndGameOnBoard");
    },
    /* =================== END GAME CHESSBOARD ==================== */

    /* =================== START SIDEBAR ==================== */
    /**
     * Hàm thực hiện chuyển hướng đến trang game/live
     * @param {string} gameId Định danh game
     * @author NVDUNG (03-05-2024)
     */
    goToGame(gameId) {
      this.$router.push({ path: `/game/live/${gameId}` });
    },

    /**
     * Thực hiện thiết lập tab đang được chọn.
     * @param newTabItemActive Giá trị tab đang được chọn
     * @author NVDUNG (02-05-2024)
     */
    setTabItemActive(newTabItemActive) {
      if (this.sectionSelected == "games") {
        this.sectionGames.tabItemActive = newTabItemActive;
      } else if (this.sectionSelected == "players") {
        this.sectionPlayers.tabItemActive = newTabItemActive;
      }
    },

    /**
     * Hàm thực hiện thiết lập chế độ chơi.
     *
     * @param {string} textModeGameSelected Giá trị text chế độ chơi đã chọn.
     * @param {string} iconModeGameSelected Class icon hiển thị chế độ chơi đã chọn.
     * @param {string} valueModeGameSelected Giá trị value chế độ chơi đã chọn.
     * @param {string} textTime Giá trị text thời gian của chế độ chơi đã chọn.
     * @author NVDUNG (01-05-2024)
     */
    setModeGame(
      textModeGameSelected,
      iconModeGameSelected,
      valueModeGameSelected,
      textTime
    ) {
      // Cập nhật giá trị chế độ chơi
      this.sectionNewGame.modeGameSelected.textModeGameSelected =
        textModeGameSelected;
      this.sectionNewGame.modeGameSelected.iconModeGameSelected =
        iconModeGameSelected;
      this.sectionNewGame.modeGameSelected.valueModeGameSelected =
        valueModeGameSelected;
      this.sectionNewGame.modeGameSelected.textTime = textTime;

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
    },
    /* =================== END SIDEBAR ==================== */
  },

  mounted() {
    /* =================== START SETUP GAME ==================== */
    // Lấy thông tin Game.
    this.getInfomationGame();

    // Load thông tin người chơi 1
    this.getPlayer1Infomation();

    // Load thông tin về
    /* =================== END SETUP GAME ==================== */

    /* =================== START SETUP SIDEBAR ==================== */
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
    /* =================== END SETUP SIDEBAR ==================== */
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
