<template>
  <div class="home-container flex flex-column">
    <!-- Play -->
    <section class="grid section-play">
      <div class="grid-item link">
        <!-- Bàn cờ -->
        <router-link
          to="/play/online"
          :title="
            this.$resource.resourcesHome.sectionPlay.playOnline[
              languageStore.getLanguage
            ]
          "
          class="play-link-image block-user-select"
        >
          <img
            loading="lazy"
            :src="this.$resource.resourcesImage.chessboard.standardBoard"
            alt="Hình ảnh bàn cờ"
          />
        </router-link>
      </div>

      <!-- Giới thiệu -->
      <div class="grid-item intro flex flex-column">
        <!-- Giới thiệu -->
        <h1 class="intro-title block-user-select flex flex-center">
          {{
            this.$resource.resourcesHome.sectionPlay.textTitleIntro[
              languageStore.getLanguage
            ]
          }}
        </h1>
        <!-- Thông tin giới thiệu -->
        <div class="intro-info flex block-user-select">
          <div class="game-today">
            <span class="number">1000</span>
            <span class="text">
              {{
                this.$resource.resourcesHome.sectionPlay.textGameToday[
                  languageStore.getLanguage
                ]
              }}
            </span>
          </div>
          <div class="playing-now">
            <span class="number">1000</span>
            <span class="text">
              {{
                this.$resource.resourcesHome.sectionPlay.textPlayingNow[
                  languageStore.getLanguage
                ]
              }}
            </span>
          </div>
        </div>
        <!-- Buttons chơi cờ -->
        <div class="group-button-play flex flex-column">
          <!-- Router-link Play Online -->
          <m-button
            :title="
              this.$resource.resourcesHome.sectionPlay.playOnline[
                languageStore.getLanguage
              ]
            "
            class="btn-play-online"
            :hasIcon="true"
            classIcon="mi-24 mi-play-white"
            :tabIndex="1"
            :isOutlineWhite="false"
            :isRouterLink="true"
            to="/play/online"
          >
            <span class="text">
              {{
                this.$resource.resourcesHome.sectionPlay.playOnline[
                  languageStore.getLanguage
                ]
              }}
            </span>
          </m-button>

          <!-- Router-link Play Computer -->
          <m-button
            :title="
              this.$resource.resourcesHome.sectionPlay.playComputer[
                languageStore.getLanguage
              ]
            "
            class="m-btn-secondary btn-play-computer"
            :hasIcon="true"
            classIcon="mi-24 mi-computer"
            :tabIndex="1"
            :isOutlineWhite="false"
            :isRouterLink="true"
            to="/play/computer"
          >
            <span class="text">
              {{
                this.$resource.resourcesHome.sectionPlay.playComputer[
                  languageStore.getLanguage
                ]
              }}
            </span>
          </m-button>
        </div>
      </div>
    </section>

    <!-- Puzzle -->
    <section class="grid section-puzzle">
      <div class="grid-item puzzle-intro flex flex-column">
        <h1 class="title block-user-select flex flex-center">
          {{
            this.$resource.resourcesHome.sectionPuzzle.textTitle[
              languageStore.getLanguage
            ]
          }}
        </h1>

        <m-button :textAlignCenter="true">
          {{
            this.$resource.resourcesHome.sectionPuzzle.textButtonSolvePuzzle[
              languageStore.getLanguage
            ]
          }}
        </m-button>

        <div class="quote-group flex">
          <img
            :src="
              this.$resource.resourcesImage.professionalPlayer.hikaruNakamura
            "
            alt="Ảnh tác giả câu trích dẫn"
            loading="lazy"
            class="img-author block-user-select"
          />
          <div class="quote flex flex-column">
            <h3 class="quote-text block-user-select flex flex-center">
              {{
                this.$resource.resourcesHome.sectionPuzzle.textQuote[
                  languageStore.getLanguage
                ]
              }}
            </h3>
            <h4 class="quote-author block-user-select">
              {{
                "___" +
                this.$resource.resourcesHome.sectionPuzzle.textQuoteAuthor +
                "___"
              }}
            </h4>
          </div>
        </div>
      </div>

      <div class="grid-item link">
        <router-link
          to="/puzzles/rated"
          class="puzzle-link-image block-user-select"
        >
          <img
            loading="lazy"
            :src="this.$resource.resourcesImage.chessboard.boardPuzzle"
            alt="Câu đố cờ vua"
          />
        </router-link>
      </div>
    </section>

    <!-- Lesson -->
    <section class="grid section-puzzle section-lesson">
      <div class="grid-item puzzle-intro flex flex-column">
        <h1 class="title block-user-select flex flex-center">
          {{
            this.$resource.resourcesHome.sectionLesson.textTitle[
              languageStore.getLanguage
            ]
          }}
        </h1>

        <m-button :textAlignCenter="true">
          {{
            this.$resource.resourcesHome.sectionLesson.textButtonStartLesson[
              languageStore.getLanguage
            ]
          }}
        </m-button>

        <div class="quote-group flex">
          <img
            :src="this.$resource.resourcesImage.professionalPlayer.annaRudolf"
            alt="Ảnh tác giả câu trích dẫn"
            loading="lazy"
            class="img-author block-user-select"
          />
          <div class="quote flex flex-column">
            <h3 class="quote-text block-user-select flex flex-center">
              {{
                this.$resource.resourcesHome.sectionLesson.textQuote[
                  languageStore.getLanguage
                ]
              }}
            </h3>
            <h4 class="quote-author block-user-select">
              {{
                "___" +
                this.$resource.resourcesHome.sectionLesson.textQuoteAuthor +
                "___"
              }}
            </h4>
          </div>
        </div>
      </div>

      <div class="grid-item link">
        <router-link to="/lessons" class="puzzle-link-image block-user-select">
          <img
            loading="lazy"
            :src="this.$resource.resourcesImage.chessboard.boardLesson"
            alt="Bài học cờ vua"
          />
        </router-link>
      </div>
    </section>

    <!-- Article / News -->
    <section class="section-article">
      <h1 class="title block-user-select flex flex-center">
        {{
          this.$resource.resourcesHome.sectionArticle.textTitle[
            languageStore.getLanguage
          ]
        }}
      </h1>
      <div class="article-list flex">
        <div class="article-item" v-for="item in 4" :key="item">
          <router-link class="article-link" to="">
            <img
              loading="lazy"
              width="504"
              height="283"
              src="../../assets/images/1378473.e42c196c.507x286o.0efca59bad6a.png"
              alt="Ảnh bìa bài viết"
            />
            <h3 class="article-title">111</h3>
            <div class="article-author">222</div>
          </router-link>
        </div>
      </div>
      <m-button
        class="btn-chess-today"
        :tabIndex="0"
        :textAlignCenter="true"
        :isRouterLink="true"
        to="/today"
      >
        {{ this.$resource.resourcesHome.sectionArticle.textButtonChessToday }}
      </m-button>
    </section>

    <m-footer></m-footer>
  </div>
</template>

<script>
import { useLanguageStore } from "@/stores/languagestore.js";

import TheFooter from "@/components/layout/thefooter/TheFooter.vue";

export default {
  name: "Home",
  components: { "m-footer": TheFooter },
  data() {
    return {
      /**
       * Đối tượng chứa store giá trị ngôn ngữ.
       */
      languageStore: useLanguageStore(),
    };
  },
};
</script>

<style lang="scss" scoped>
@import url(./home.scss);
</style>
