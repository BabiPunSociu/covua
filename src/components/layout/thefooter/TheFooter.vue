<template>
  <footer class="footer-container">
    <!-- PAGES -->
    <div class="navigation-pages-component flex flex-center">
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textHelp["vi-VN"] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textChessTerms["vi-VN"] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textAbout["vi-VN"] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textJobs["vi-VN"] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textDevelopers["vi-VN"] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textUserAgreement["vi-VN"] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textPrivacy["vi-VN"] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textFairPlay["vi-VN"] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textPartners["vi-VN"] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textCompliance["vi-VN"] }}
      </router-link>
      <router-link taget="_blank" to="" class="link-page-component">
        {{ this.$resource.resourcesFooter.textCopyright["vi-VN"] }}
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
export default {
  name: "TheFooter",
};
</script>

<style lang="scss" scoped>
@import url(./the-footer.scss);
</style>
