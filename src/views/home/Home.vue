<template>
  <div class="home-container flex flex-column">
    <!-- Play -->
    <section class="grid section-play">
      <div class="grid-item link">
        <!-- Bàn cờ -->
        <router-link
          to="/play/online"
          :title="this.$resource.resourcesHome.sectionPlay.playOnline['vi-VN']"
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
          {{ this.$resource.resourcesHome.sectionPlay.textTitleIntro["vi-VN"] }}
        </h1>
        <!-- Thông tin giới thiệu -->
        <div class="intro-info flex block-user-select">
          <div class="game-today">
            <span class="number">1000</span>
            <span class="text">
              {{
                this.$resource.resourcesHome.sectionPlay.textGameToday["vi-VN"]
              }}
            </span>
          </div>
          <div class="playing-now">
            <span class="number">1000</span>
            <span class="text">
              {{
                this.$resource.resourcesHome.sectionPlay.textPlayingNow["vi-VN"]
              }}
            </span>
          </div>
        </div>
        <!-- Buttons chơi cờ -->
        <div class="group-button-play flex flex-column">
          <!-- Button chơi online -->
          <router-link
            to="/play/online"
            :title="
              this.$resource.resourcesHome.sectionPlay.playOnline['vi-VN']
            "
            class="button-play button-play-online flex"
          >
            <div class="icon mi mi-24 icon-resize"></div>
            <span class="text">
              {{ this.$resource.resourcesHome.sectionPlay.playOnline["vi-VN"] }}
            </span>
          </router-link>
          <!-- Button chơi với máy -->
          <router-link
            to="/play/computer"
            :title="
              this.$resource.resourcesHome.sectionPlay.playComputer['vi-VN']
            "
            class="button-play button-play-computer flex"
          >
            <div class="icon mi mi-24 icon-resize"></div>
            <span class="text">
              {{
                this.$resource.resourcesHome.sectionPlay.playComputer["vi-VN"]
              }}
            </span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Puzzle -->
    <section class="grid section-puzzle">
      <div class="grid-item puzzle-intro flex flex-column">
        <h1 class="title block-user-select flex flex-center">
          {{ this.$resource.resourcesHome.sectionPuzzle.textTitle["vi-VN"] }}
        </h1>

        <m-button :textAlignCenter="true">
          {{
            this.$resource.resourcesHome.sectionPuzzle.textButtonSolvePuzzle[
              "vi-VN"
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
                this.$resource.resourcesHome.sectionPuzzle.textQuote["vi-VN"]
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
          {{ this.$resource.resourcesHome.sectionLesson.textTitle["vi-VN"] }}
        </h1>

        <m-button :textAlignCenter="true">
          {{
            this.$resource.resourcesHome.sectionLesson.textButtonStartLesson[
              "vi-VN"
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
                this.$resource.resourcesHome.sectionLesson.textQuote["vi-VN"]
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

    <section class="section-article">
      <h1 class="title block-user-select flex flex-center">
        {{ this.$resource.resourcesHome.sectionArticle.textTitle["vi-VN"] }}
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
import TheFooter from "@/components/layout/thefooter/TheFooter.vue";

export default {
  name: "Home",
  components: { "m-footer": TheFooter },
};
</script>

<style lang="scss" scoped>
@import url(./home.scss);
</style>
