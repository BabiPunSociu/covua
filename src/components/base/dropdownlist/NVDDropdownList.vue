<template>
  <div
    class="m-dropdown"
    :class="{ 'm-dropdown-up': dropup }"
    id="cbo_ddl_donvi"
  >
    <div class="scroller">
      <a
        v-for="(item, index) in items"
        :key="item"
        ref="itemdropdowns"
        v-bind:class="{
          selected: item == itemSelected, // Thêm class selected cho item đang được chọn
          focused: index == indexItemFocus, // Thêm class focused cho item đang được focus
        }"
        @keydown="changeFocusItem"
        @click="ddlSelectedItem(item)"
        >{{ item }}
        <div class="mi mi-24 mi-tick"></div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "NVDDropdownList",
  data() {
    return {
      // Giá trị string item đã chọn
      itemSelected: "",
    };
  },
  props: {
    /**
     * Giá trị item đang được chọn
     */
    valueInputCombobox: {
      type: String,
      required: false,
    },

    /**
     * Danh sách item để hiển thị dropdownlist
     */
    items: {
      type: Array,
      required: true,
    },
    /**
     * Đánh dấu danh sách hiển thị up và down
     * Nếu dropup = true, thì sẽ hiển thị dropdown up
     * Nếu dropup = false, thì sẽ hiển thị dropdown down
     */
    dropup: {
      type: Boolean,
      default: false,
      required: false,
    },

    /**
     * Index item focus
     */
    indexItemFocus: {
      type: Number,
      default: -1,
      required: false,
    },

    /**
     * Đánh dấu component cha nhấn enter để chọn item
     * true: press enter
     * false: không nhấn enter
     */
    isPressEnter: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  watch: {
    isPressEnter(newValue) {
      if (newValue) {
        // Gọi phương thức ddlSelectedItem như clicking
        this.ddlSelectedItem(this.items[this.indexItemFocus]);
        // Phát sự kiện cập nhật lại isPressEnter ở component cha
        this.$emit("pressedEnter");
      }
    },
  },
  created() {
    // Cập nhật itemSelected nếu có
    if (this.valueInputCombobox != "") {
      this.itemSelected = this.valueInputCombobox;
    }
  },

  methods: {
    /**
     * Truyền item được chọn đến component cha.
     * Author: NVDUNG (18/08/2023).
     */
    ddlSelectedItem(itemValue) {
      // Nhận giá trị cho thuộc tính itemSelected
      this.itemSelected = itemValue;

      // Gửi giá trị itemSelected cho component cha
      // Gửi nhiều giá trị khác nhau, thì đóng gói thành 1 object
      this.$emit("dropdownItemSelected", itemValue);
    },

    /**
     * Thay đổi giá trị index focus item khi nhấn ArrowDown hoặc ArrowUp
     * Gọi sự kiện ddlSelectedItem khi nhấn Enter
     * Author: NVDUNG (28/09/2023).
     * @param {*} event
     */
    changeFocusItem(event) {
      switch (event.key) {
        case "ArrowDown":
          if (this.indexItemFocus < this.items.length - 1) {
            // Tăng giá trị index focus item
            this.indexItemFocus = this.indexItemFocus + 1;

            // Set focus
            var x = this.$refs.itemdropdowns[this.indexItemFocus];
            console.log(x);
            x.focus();
          }
          break;
        case "ArrowUp":
          if (this.indexItemFocus > 0) {
            // Giảm giá trị index focus item
            this.indexItemFocus = this.indexItemFocus - 1;

            // Set focus
            var x = this.$refs.itemdropdowns[this.indexItemFocus];
            console.log(x);
            x.focus();
          }
          // Giá trị focus hiện tại là item đầu tiên
          if (this.indexItemFocus === 0) {
            // Bỏ focus item đầu tiên
            this.$refs["item" + this.indexItemFocus].blur();

            // Phát sự kiện focus thẻ input của component cha
            this.emit("focusInputCombobox");
          }
          break;
        case "Enter":
          this.ddlSelectedItem(this.items[this.indexItemFocus]);
      }
    },
  },
};
</script>

<style scoped>
@import url(./dropdownlist.css);
</style>
