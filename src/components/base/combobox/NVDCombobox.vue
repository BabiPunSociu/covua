<template>
  <div
    ref="comboboxElement"
    id="m-cbo-donvi"
    :class="{
      'm-combobox': true,
      'm-combobox-hover': comboboxProps.isHover,
      'm-combobox-active': comboboxProps.isActive,
    }"
  >
    <m-label :lblRequired="comboboxRequired" v-if="haveLabel">
      <slot name="lbl-content"></slot>
    </m-label>
    <div
      class="m-combobox-content"
      :class="{ 'warning-input': comboboxProps.isError }"
    >
      <!-- input readonly -->
      <input
        v-if="isInputReadOnly"
        ref="inputCombobox"
        readonly
        type="text"
        style="width: calc(100% - 40px)"
        @mouseover="setComboboxHover(true)"
        @mouseleave="setComboboxHover(false)"
        @focusin="setComboboxActive(true)"
        @focusout="setComboboxActive(false)"
        @click.stop
        :tabindex="tabIndexInput"
      />

      <!-- input text -->
      <input
        v-else="!isInputReadOnly"
        ref="inputCombobox"
        type="text"
        style="width: calc(100% - 40px)"
        @mouseover="setComboboxHover(true)"
        @mouseleave="setComboboxHover(false)"
        @focusin="setComboboxActive(true)"
        @focusout="setComboboxActive(false)"
        @click="comboboxProps.isShowDropDown = true"
        @keyup="filterComboboxFunction"
        :tabindex="tabIndexInput"
      />
      <a
        v-on:click="showHideDropdown"
        v-on:mouseover="setComboboxHover(true)"
        v-on:mouseleave="setComboboxHover(false)"
        :tabindex="tabIndexButton"
      >
        <div
          @click="iconClick"
          v-if="comboboxProps.isShowDropDown"
          class="mi mi-16 mi-arrow-dropdown mi-arrow-dropdown--open"
        ></div>
        <div
          @click="iconClick"
          v-else
          class="mi mi-16 mi-arrow-dropdown mi-arrow-dropdown--close"
        ></div>
      </a>
    </div>
    <!-- dropdown -->
    <NVDDropdownList
      v-if="comboboxProps.isShowDropDown"
      v-bind:class="{ show: comboboxProps.isShowDropDown }"
      :items="dropdownProps.itemsDropdownlist"
      :dropup="dropup"
      :valueInputCombobox="valueInputCombobox"
      :indexItemFocus="dropdownProps.indexItemDropdownFocus"
      :isPressEnter="dropdownProps.isPressEnter"
      @dropdownItemSelected="itemSelected"
      @focusInputCombobox="focusInputCombobox"
      @pressedEnter="pressedEnter"
    ></NVDDropdownList>
    <!-- Hiển thị lỗi -->
    <span class="warning-text" v-if="comboboxProps.isError">
      <slot name="warning"></slot>
    </span>
  </div>
</template>

<script>
import NVDDropdownList from "../dropdownlist/NVDDropdownList.vue";
export default {
  name: "NVDCombobox",
  components: {
    NVDDropdownList,
  },
  data() {
    return {
      // Các thuộc tính của combobox
      comboboxProps: {
        isHover: false,
        isActive: false,
        isShowDropDown: false,
        isError: this.isErrorInput,
      },

      // Các thuộc tính truyền cho dropdown
      dropdownProps: {
        // Danh sách items truyền cho dropdown
        itemsDropdownlist: null,
        // Index item focus
        indexItemDropdownFocus: -1,
        // Đánh dấu cờ press enter
        isPressEnter: false,
      },
    };
  },
  props: {
    // item selected
    valueInputCombobox: {
      type: String,
      default: "",
      required: false,
    },

    /**
     * Hiển thị label
     * true: Hiển thị label
     * false: Không hiển thị label
     */
    haveLabel: {
      type: Boolean,
      default: true,
      required: false,
    },

    /**
     * Danh sách tất cả items cho dropdown
     * Type: Mảng các string
     * Author: NVDUNG (18/08/2023)
     */
    dataDropdownlist: {
      type: Array,
      required: true,
    },

    /**
     * Hiển thị * required
     * true: Hiển thị required
     * false: Không hiển thị required
     */
    comboboxRequired: {
      type: Boolean,
      default: false,
      required: false,
    },

    /**
     * Hiển thị thành dropup
     * true: Hiển thị drop up
     * false: Hiển thị drop down
     */
    dropup: {
      type: Boolean,
      default: false,
      required: false,
    },

    /**
     * Tabindex input
     */
    tabIndexInput: {
      type: Number,
      default: 1,
      required: false,
    },

    /**
     * Tabindex button dropdown
     */
    tabIndexButton: {
      type: Number,
      default: 2,
      required: false,
    },

    /**
     * Để đánh dấu lỗi validate input từ component cha
     * true: Lỗi -> Đỏ
     * false: Không lỗi
     */
    isErrorInput: {
      type: Boolean,
      default: false,
      required: false,
    },

    /**
     * Đánh dấu input readonly
     * true: input readonly
     * false: không readonly
     */
    isInputReadOnly: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  created() {
    //Cập nhật isError
    if (this.isErrorInput) {
      this.isError = this.isErrorInput;
    }
    // Cập nhật itemsDropdownlist
    this.dropdownProps.itemsDropdownlist = this.dataDropdownlist;
  },
  mounted() {
    // Tạo input.value ban đầu
    if (this.valueInputCombobox != "") {
      this.$refs.inputCombobox.value = this.valueInputCombobox;
    }

    //this.clickOutCombobox();
  },
  methods: {
    // ========================= Combobox hover ========================= //
    /**
     * Hàm thực hiện set hovered hoặc unhovered cho combobox
     * @param {Boolean} isHover Giá trị đầu vào
     * Author: NVDUNG (18/08/2023)
     */
    setComboboxHover(isHover) {
      this.comboboxProps.isHover = isHover;
    },

    // ========================= Combobox hover ========================= //
    /**
     * Hàm thực hiện set actived hoặc unactived cho combobox
     * @param {Boolean} isActive Giá trị đầu vào
     * Author: NVDUNG (18/08/2023)
     */
    setComboboxActive(isActive) {
      this.comboboxProps.isActive = isActive;
    },

    /**
     * Ẩn/hiện dropdownlist và active
     * Author: NVDUNG (18/08/2023)
     */
    showHideDropdown() {
      // Chuyển đổi trạng thái isShowDropDown
      this.comboboxProps.isShowDropDown = !this.comboboxProps.isShowDropDown;
      // Active
      this.comboboxProps.isActive = true;
    },

    /**
     * Hiển thị itemSelected từ dropdownlist sang input
     * Author: NVDUNG (18/08/2023)
     */
    itemSelected(newValue) {
      /* Nhận dữ liệu được truyền từ component con gửi đến
      component cha qua emit sự kiện dropdownItemSelected
      - itemValue là dữ liệu được truyền từ dropdownlist
      */
      try {
        // Lấy thẻ input từ DOM qua reference
        this.$refs.inputCombobox.value = newValue;
        // Cập nhật trạng thái isError
        this.comboboxProps.isError = newValue ? false : true;
        // Phát sự kiện comboboxChangeValue
        this.$emit("comboboxChangeValue", newValue);
        // Đóng dropdownlist
        this.comboboxProps.isShowDropDown = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lọc các giá trị từ input và hiển thị lên dropdownlist
     * Author: NVDUNG (28/09/2023)
     */
    filterComboboxFunction(event) {
      // ArrowDown
      if (
        event.key === "ArrowDown" &&
        this.comboboxProps.isShowDropDown &&
        this.dropdownProps.indexItemDropdownFocus <
          this.dropdownProps.itemsDropdownlist.length - 1
      ) {
        // Focus vào phần tử sau đó
        this.dropdownProps.indexItemDropdownFocus++;
      }

      // ArrowUp
      else if (
        event.key === "ArrowUp" &&
        this.comboboxProps.isShowDropDown &&
        this.dropdownProps.indexItemDropdownFocus > 0
      ) {
        // Focus vào phần tử trước đó
        this.dropdownProps.indexItemDropdownFocus--;
      }

      // Enter
      else if (
        event.key === "Enter" &&
        this.dropdownProps.indexItemDropdownFocus >= 0
      ) {
        this.dropdownProps.isPressEnter = true;
      } else {
        // input.value rỗng => Lấy tất cả dataDropdownlist ban đầu
        if (!this.$refs.inputCombobox.value.trim()) {
          this.dropdownProps.itemsDropdownlist = this.dataDropdownlist;
        }
        // input.value không rỗng => Lọc giá trị phù hợp
        else {
          // Lấy thẻ input từ DOM qua reference
          var inputValue = this.$refs.inputCombobox.value;

          // Tìm các items có giá trị phù hợp với input
          this.dropdownProps.itemsDropdownlist = this.dataDropdownlist.filter(
            // Lấy các items có chứa inputValue, chuyển về lowercase để tiện so sánh chữ hoa, chữ thường
            (item) => item.toLowerCase().includes(inputValue.toLowerCase())
          );

          // Hiện dropdownlist khi itemsDropdownlist có giá trị phù hợp
          this.comboboxProps.isShowDropDown = this.dropdownProps
            .itemsDropdownlist.length
            ? true
            : false;
        }
      }
    },

    /**
     * Xử lý sự kiện pressedEnter từ dropdownlist gửi về
     * - Cập nhật lại isPressEnter
     * - Cập nhật lại indexItemFocus
     * Author: NVDUNG (28/09/2023)
     */
    pressedEnter() {
      this.dropdownProps.isPressEnter = false;
      this.dropdownProps.indexItemFocus = -1;
    },

    /**
     * Focus vào input combobox
     * Author: NVDUNG (28/09/2023)
     */
    focusInputCombobox() {
      this.$refs.inputCombobox.focus();
    },

    /**
     * Đóng dropdownlist và deactive khi click bên ngoài combox
     * Author: NVDUNG (18/08/2023)
     */
    clickOutCombobox() {
      try {
        // Lưu tạm giá trị vueIntance
        const vueIntance = this;
        // Lấy thẻ combobox
        const combobox = this.$refs.comboboxElement;
        // console.log("combobox: " + combobox);
        if (this.comboboxProps.isShowDropDown) {
          document.addEventListener("click", function documentClick(event) {
            // console.log("clickOutCombobox");
            // console.log("cbo: " + combobox.innerHTML);
            // Kiểm tra click bên ngoài combobox
            if (combobox && !combobox.contains(event.target)) {
              // Đóng dropdownlist
              vueIntance.comboboxProps.isShowDropDown = false;
              // Hủy active
              vueIntance.comboboxProps.isActive = false;
              // Hủy sự kiện này luôn
              document.removeEventListener("click", documentClick);
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * Xử lý sự kiện khi click vào icon
     * - Thực hiện sự kiện click vào thẻ a
     * - Ngăn chặn sự lan truyền sự kiện lên document, vì document.onclick đóng dropdownlist
     * Author: NVDUNG (18/08/2023)
     */
    iconClick(event) {
      // Ngăn chặn sự kiện lan truyền lên cha
      event.stopPropagation();

      // Ẩn hiện dropdownlist
      this.showHideDropdown();
    },
  },
  watch: {
    "comboboxProps.isShowDropDown": function (newValue) {
      // console.log("watch isShowDropDown: " + newValue);
      this.clickOutCombobox();
    },
  },
};
</script>
<style scoped>
@import url(./combobox.css);
</style>
