<template>
  <footer class="footer-container">
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
    <div class="navigation-flatforms-component flex flex-center">
      <router-link taget="_blank" to="" class="link-flatform-component">
        <div class="icon"></div>
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
