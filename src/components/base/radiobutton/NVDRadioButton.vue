<template>
  <div id="m-rdo-gioitinh" class="m-rdo">
    <label><slot></slot></label>
    <div class="m-rdo-content">
      <div
        class="item"
        v-for="(item, index) in listOptions"
        :key="item"
        :class="{ 'm-rdo-selected': index === indexSelectedData }"
        v-on:click="itemClick(index)"
      >
        <a
          :ref="index"
          :tabindex="tabIndexRadio + index"
          @keyup="itemKeyUp($event, index)"
          ><span></span
        ></a>
        <label>{{ item }}</label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NVDRadioButton",
  data() {
    return {
      indexSelectedData: -1,
    };
  },
  props: {
    /**
     * Danh sách các options
     */
    listOptions: {
      type: Array,
      required: true,
    },
    /**
     * Giá trị tabindex của option đầu tiên
     */
    tabIndexRadio: {
      type: Number,
      required: false,
    },
    /**
     * Giá trị index của option được chọn
     */
    indexSelected: {
      type: Number,
      default: -1,
      required: false,
    },
  },
  mounted() {
    // Thiết lập data
    if (this.indexSelected > -1) {
      this.indexSelectedData = this.indexSelected;
    }
  },
  watch: {
    indexSelectedData(newValue) {
      // Truyền dữ liệu về lại component cha
      this.$emit("changeValue", newValue);
    },
  },
  methods: {
    /**
     * Cập nhật đánh dấu selected của radio button
     * Author: NVDUNG (20/08/2023)
     */
    itemClick(index) {
      this.indexSelectedData = index;
    },

    /**
     * Hàm xử lý keyup của radio button
     * @param {event} event Sự kiện
     * @param {string} item Giá trị item của radio button
     */
    itemKeyUp(event, index) {
      switch (event.key) {
        case "Space":
        case "Enter":
          this.itemClick(index);
          break;
        case "ArrowLeft":
          if (index > 0) {
            var elem = this.$refs[index - 1][0];
            if (elem) {
              elem.focus();
            }
          }
          break;
        case "ArrowRight":
          if (index < this.listOptions.length - 1) {
            var elem = this.$refs[index + 1][0];
            console.log("elem", elem);
            if (elem) {
              elem.focus();
            }
          }
          break;
      }
    },
  },
};
</script>
<style scoped>
@import url(./radio-button.css);
</style>
