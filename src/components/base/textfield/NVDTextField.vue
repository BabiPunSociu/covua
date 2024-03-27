<template>
  <!-- Ngoài ra, có thể thêm các class: m-textfield-icon, m-textfield-icon-action -->
  <div class="m-textfield">
    <m-label
      :lblRequired="textFieldRequired"
      :tooltip="lblTooltip"
      v-if="haveLabel"
    >
      <slot name="lbl-content"></slot>
    </m-label>
    <input
      ref="inputTextField"
      autocomplete="true"
      :class="{ warning: isError }"
      :tabindex="tabIndex"
      :type="inputType"
      :placeholder="placeholderTextField"
      v-on:mouseover="isHover = true"
      v-on:mouseleave="isHover = false"
      v-on:focusin="isActive = true"
      v-on:focusout="isActive = false"
      @keydown="keydownEnter"
      @input="validate"
      v-model="valueOutput"
    />
    <a
      @click="iConActionClick"
      v-on:mouseover="isHover = true"
      v-on:mouseleave="isHover = false"
      ><div class="mi mi-24 mi-search"></div
    ></a>
    <span class="warning" v-if="isError"> <slot name="warning"></slot></span>
  </div>
</template>
<script>
export default {
  name: "NVDTextField",
  data() {
    return {
      isHover: false,
      isActive: false,
      isError: false,

      valueOutput: this.valueInput,
    };
  },
  props: {
    /**
     * Set tooltip cho label
     * Author: NVDUNG (20/08/2023)
     * @type {String}
     * @default ""
     * @required false
     * @since 1.0
     * @version 1.0
     */
    lblTooltip: {
      type: String,
      default: "",
      required: false,
    },
    /**
     * Hiển thị label hay không?
     * Author: NVDUNG (20/08/2023)
     * @type {Boolean}
     * @default true
     * @required false
     * @since 1.0
     * @version 1.0
     */
    haveLabel: {
      type: Boolean,
      default: true,
      required: false,
    },
    /**
     * Hiển thị * required hay không?
     * Author: NVDUNG (20/08/2023)
     * @type {Boolean}
     * @default false
     * @required false
     */
    textFieldRequired: {
      type: Boolean,
      default: false,
      required: false,
    },
    /**
     * Truyền type của input
     * Author: NVDUNG (20/08/2023)
     * @type {String}
     * @default "text"
     * @required false
     * @since 1.0
     * @version 1.0
     * @optional: "text", "number", "password", "email", ...
     */
    inputType: {
      type: String,
      default: "text",
      required: false,
    },
    /**
     * Hiển thị placeholder cho input
     * Author: NVDUNG (20/08/2023)
     * @type {String}
     * @default ""
     * @required false
     * @since 1.0
     * @version 1.0
     */
    placeholderTextField: {
      type: String,
      default: "",
      required: false,
    },
    /**
     * Truyền giá trị tabindex cho input
     * Author: NVDUNG (20/08/2023)
     * @type {Number}
     * @default 1
     * @required false
     * @since 1.0
     * @version 1.0
     */
    tabIndex: {
      type: Number,
      default: 1,
      required: false,
    },
    /**
     * Truyền giá trị value cho input
     * Author: NVDUNG (20/08/2023)
     * @type {String}
     * @default ""
     * @required false
     * @since 1.0
     * @version 1.0
     */
    valueInput: {
      type: String,
      default: "",
      required: false,
    },
    /**
     * Truyền mảng các hàm validate để validate input
     * Author: NVDUNG (20/08/2023)
     * @type {Array}
     * @default []
     * @required false
     * @since 1.0
     * @version 1.0
     * @optional: required, minLength, ... (xem trong file validate.js)
     */
    validateFunctions: {
      type: Array,
      required: false,
    },
    /**
     * Truyền trạng thái lỗi để hiển thị lỗi ban đầu
     * Author: NVDUNG (17/09/2023)
     * @type {boolean}
     * @default false
     * @required false
     * @since 1.0
     * @version 1.0
     */
    isErrorInput: {
      type: Boolean,
      default: false,
      required: false,
    },

    /**
     * Tự động focus input
     */
    isAutoFocused: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  created() {
    // Cập nhật isError
    if (this.isErrorInput) {
      this.isError = this.isErrorInput;
    }
  },

  mounted() {
    this.autoFocusInput();
  },

  methods: {
    /**
     * Kiểm tra input rỗng
     * Author: NVDUNG (20/08/2023)
     * @param {$event} event: newValue
     */
    validate(event) {
      // Kiểm tra mảng các hàm validate
      if (this.validateFunctions == null) {
        this.isError = false;
      } // Có hàm validate
      else {
        // Mảng lưu trữ các kết quả các hàm validate
        let boolArray = [];
        // Giá trị thay đổi
        let valueInput = event.target.value;

        // Kiểm tra rỗng
        // if (this.textFieldRequired) {
        //   let isNotEmpty = this.$validate(valueInput);
        //   boolArray.push(isNotEmpty);
        // }

        // Kiểm tra các hàm validate khác
        this.validateFunctions.forEach((item) => {
          let isValidFunction = item(valueInput);
          boolArray.push(isValidFunction);
        });

        // Trả về kết quả chung
        this.isError = boolArray.some((value) => value === false);
      }
    },

    /**
     * Hàm xử lý event khi nhấn Enter
     * @param {*} event
     * Author: NVDUNG (18/09/2023)
     */
    keydownEnter(event) {
      if (event.keyCode === 13) {
        this.iConActionClick();
      }
    },

    /**
     * Phát sự kiện iconActionClick cho component cha xử lý
     * Author: NVDUNG (18/09/2023)
     */
    iConActionClick() {
      // Chuyển active icon
      this.isActive = true;
      // Phát sự kiện iconActionClick lên component cha
      this.$emit("iconActionClick");
    },

    /**
     * Hàm thực hiện focus input
     * Author: NVDUNG (18/09/2023)
     */
    autoFocusInput() {
      if (this.isAutoFocused) {
        // console.log("focus in NVD Text Field");
        this.$refs.inputTextField.focus();
      }
    },
  },
  watch: {
    /**
     * Gửi dữ liệu cho component cha khi data thay đổi
     * Author: NVDUNG (20/08/2023)
     */
    valueOutput(newValue) {
      // Tạo sự kiện để truyền giá trị mới cho component cha
      this.$emit("inputOnChange", this.valueOutput);
    },
  },
};
</script>
<style scoped>
@import url(./text-field.css);
</style>
