<template>
  <!-- Ngoài ra, có thể thêm các class: m-textfield-icon, m-textfield-icon-action -->
  <div class="m-textfield">
    <m-label
      :lblRequired="textFieldRequired"
      :tooltip="lblTooltip"
      :isTextWhite="isTextWhite"
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
     */
    lblTooltip: {
      type: String,
      default: "",
      required: false,
    },
    /**
     * Hiển thị label hay không?
     */
    haveLabel: {
      type: Boolean,
      default: true,
      required: false,
    },
    /**
     * Hiển thị * required hay không?
     */
    textFieldRequired: {
      type: Boolean,
      default: false,
      required: false,
    },

    /**
     * Hiển thị label màu trắng?
     */
    isTextWhite: {
      type: Boolean,
      default: false,
      required: false,
    },

    /**
     * Truyền type của input
     * @optional: "text", "number", "password", "email", ...
     */
    inputType: {
      type: String,
      default: "text",
      required: false,
    },
    /**
     * Hiển thị placeholder cho input
     */
    placeholderTextField: {
      type: String,
      default: "",
      required: false,
    },
    /**
     * Truyền giá trị tabindex cho input
     */
    tabIndex: {
      type: Number,
      default: 1,
      required: false,
    },
    /**
     * Truyền giá trị value cho input
     */
    valueInput: {
      type: String,
      default: "",
      required: false,
    },
    /**
     * Truyền mảng các hàm validate để validate input
     */
    validateFunctions: {
      type: Array, // Các hàm trong đối tượng validator trong file validate-input.js
      required: false,
    },
    /**
     * Truyền trạng thái lỗi để hiển thị lỗi ban đầu
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

    /**
     * Giá trị min-length để validate input.
     */
    minLength: {
      type: Number,
      default: 0,
      required: false,
    },

    /**
     * Giá trị max-length để validate input.
     */
    maxLength: {
      type: Number,
      default: 255,
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
     * @author NVDung (19-04-2024)
     * @param {$event} event: newValue
     */
    validate(event) {
      // Kiểm tra mảng các hàm validate
      if (this.validateFunctions.length == 0) {
        this.isError = false;
      } // Có hàm validate
      else {
        // Mảng lưu trữ các kết quả các hàm validate
        let boolArray = [];
        // Giá trị thay đổi
        let valueInput = event.target.value;

        // Kiểm tra các hàm validate khác
        this.validateFunctions.forEach((func) => {
          // Nếu kết quả validate hợp lệ thì trả về True.
          let isValidFunction = null;
          switch (func) {
            /**
             * Min length
             */
            case this.$validator.minLength:
              isValidFunction = func(valueInput, this.minLength);
              break;

            /**
             * Max length
             */
            case this.$validator.maxLength:
              isValidFunction = func(valueInput, this.maxLength);
              break;

            default:
              isValidFunction = func(valueInput);
              break;
          }
          boolArray.push(isValidFunction);
        });

        // Trả về kết quả chung
        this.isError = boolArray.some((value) => value === false);
      }
    },

    /**
     * Hàm xử lý event khi nhấn Enter
     * @param {*} event
     * @returns {void}
     * @author NVDung (19-04-2024)
     */
    keydownEnter(event) {
      if (event.key === "Enter") {
        this.iConActionClick();
      }
    },

    /**
     * Phát sự kiện iconActionClick cho component cha xử lý
     * @returns {void}
     * @author NVDung (19-04-2024)
     */
    iConActionClick() {
      // Chuyển active icon
      this.isActive = true;
      // Phát sự kiện iconActionClick lên component cha
      this.$emit("iconActionClick");
    },

    /**
     * Hàm thực hiện focus input
     * @returns {void}
     * @author NVDung (19-04-2024)
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
     * @author NVDung (19-04-2024)
     */
    valueOutput(newValue) {
      // Tạo sự kiện để truyền giá trị mới cho component cha
      this.$emit("inputOnChange", this.valueOutput);
    },
  },
};
</script>
<style scoped>
@import url(./text-field.scss);
</style>
