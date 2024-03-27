<template>
  <div class="m-context-menu" ref="contextMenuContainer">
    <a
      v-for="item in items"
      :key="item"
      @click="this.$emit('contextMenuItemClick', item)"
      >{{ item }}</a
    >
  </div>
</template>
<script>
export default {
  name: "NVDContextMenu",
  props: {
    /**
     * Danh sách items hiển thị contextmenu
     */
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>
@import url(./context-menu.css);
</style>
