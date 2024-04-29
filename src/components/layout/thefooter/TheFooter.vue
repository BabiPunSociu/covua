<template>
  <footer class="footer-container">
    <!-- PAGES -->
    <div class="navigation-pages-component flex flex-center">
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textHelp[languageStore.getLanguage] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textChessTerms[languageStore.getLanguage] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textAbout[languageStore.getLanguage] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textJobs[languageStore.getLanguage] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textDevelopers[languageStore.getLanguage] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textUserAgreement[languageStore.getLanguage] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textPrivacy[languageStore.getLanguage] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textFairPlay[languageStore.getLanguage] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textPartners[languageStore.getLanguage] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textCompliance[languageStore.getLanguage] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textCopyright[languageStore.getLanguage] }}
      </router-link>
    </div>

    <!-- PLATFORMS -->
    <div class="navigation-flatforms-component flex flex-center">
      <!-- IOS -->
      <router-link taget="_blank" to="" class="link-flatform-component">
        <div class="mi mi-24 mi-ios"></div>
      </router-link>

      <!-- Android -->
      <router-link taget="_blank" to="" class="link-flatform-component">
        <div class="mi mi-24 mi-android"></div>
      </router-link>

      <!-- Tiktok -->
      <router-link taget="_blank" to="" class="link-flatform-component">
        <div class="mi mi-24 mi-tiktok"></div>
      </router-link>

      <!-- Twitter -->
      <router-link taget="_blank" to="" class="link-flatform-component">
        <div class="mi mi-24 mi-twitter"></div>
      </router-link>

      <!-- Youtube -->
      <router-link taget="_blank" to="" class="link-flatform-component">
        <div class="mi mi-24 mi-youtube"></div>
      </router-link>

      <!-- Instagram -->
      <router-link taget="_blank" to="" class="link-flatform-component">
        <div class="mi mi-24 mi-instagram"></div>
      </router-link>

      <!-- Discord -->
      <router-link taget="_blank" to="" class="link-flatform-component">
        <div class="mi mi-24 mi-discord"></div>
      </router-link>
    </div>
  </footer>
</template>

<script>
import { useLanguageStore } from "@/stores/languagestore.js";

export default {
  name: "TheFooter",
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
@import url(./the-footer.scss);
</style>
