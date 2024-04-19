<template>
  <div class="app-container">
    <RouterView></RouterView>

    <!-- div toast message -->
    <div class="toast-container">
      <TransitionGroup>
        <m-toast
          v-for="toastItem in dataToast.arrayToast"
          :key="toastItem.id"
          :typeToast="toastItem.type"
          :showButtonUndo="toastItem.showButtonUndo"
          :title="toastItem.title"
          :message="toastItem.message"
          @closeToast="removeToast(toastItem.id)"
        >
        </m-toast>
      </TransitionGroup>
    </div>

    <!-- dialog-->
    <m-dialog
      v-if="dataDialog.showDialog"
      :inputDialog="dataDialog.inputDialog"
    ></m-dialog>
    <!-- Loading -->
    <m-loading
      v-if="dataLoading.showLoading"
      :isLoadingControl="false"
    ></m-loading>
  </div>
</template>

<script>
// import toast để có class gắn vào DataType.
import toast from "./js/toast.js";
// import dialog để có class gắn vào DataType.
import dialog from "./js/dialog.js";

export default {
  name: "App",
  data() {
    return {
      /**
       * Dữ liệu về component loading.
       */
      dataLoading: {
        /**
         * Toggle hiển thị loading.
         */
        showLoading: false,
      },

      /**
       * Dữ liệu về component toast.
       */
      dataToast: {
        /**
         * Danh sách chứa các đối tượng toast
         */
        arrayToast: [],
        /**
         * Đánh dấu key đã tạo một toast
         */
        keyToastMessage: 0,
      },

      /**
       * Dữ liệu về component dialog.
       */
      dataDialog: {
        /**
         * Toggle hiện thị dialog.
         */
        showDialog: false,
        /**
         * Đối tượng truyền dữ liệu cho dialog.
         * Type: Dialog
         */
        inputDialog: {},
        /* obj {title: "", content: "", iconClass: "",
        hasButtonSecondary: true/false, buttonSecondaryText: "",
        buttonContinueText: ""} */
      },
    };
  },
  created() {
    /* ============= Event listener loading ============= */
    /**
     * Tạo lắng nghe sự kiện ẩn hiện loading.
     * @param {boolean} isShow Giá trị toggle bật/tắt loading.
     * @author NVDung (18-04-2024)
     */
    this.$emitter.on("showLoading", (isShow) => {
      this.dataLoading.showLoading = isShow;
    });

    /* ============= Event listener dialog ============= */
    /**
     * Tạo lắng nghe sự kiện hiện dialog
     * @param {dialog} inputObject Đối tượng truyền dữ liệu cho dialog
     * @author NVDung (18-04-2024)
     */
    this.$emitter.on("showDialog", (inputDialog) => {
      console.log("dữ liệu dialog: ", inputDialog);

      // Gọi hàm hiển thị dialog
      this.showDialog(inputDialog);
    });

    /**
     * Tạo lắng nghe sự kiện hủy dialog
     * @author NVDung (18-04-2024)
     */
    this.$emitter.on("closeDialog", () => {
      this.dataDialog.showDialog = false;
    });

    /* ============= Event listener toast ============= */
    /**
     * Tạo lắng nghe sự kiện hiện toast.
     * @param {toast} toastObject Đối tượng truyền dữ liệu cho toast.
     * @author NVDung (18-04-2024)
     */
    this.$emitter.on("showToast", (toastObject) => {
      console.log("dữ liệu toast: ", toastObject);
      // Tạo đối tượng truyền dữ liệu cho toast
      this.addToast(toastObject);
    });
  },
  beforeUnmount() {
    // Hủy lắng nghe sự kiện showLoading
    this.$emitter.off("showLoading");
    // Hủy lắng nghe sự kiện showDialog
    this.$emitter.off("showDialog");
    // Hủy lắng nghe sự kiện closeMISADialog
    this.$emitter.off("closeDialog");
    // Hủy lắng nghe sự kiện showToast
    this.$emitter.off("showToast");
  },

  provide() {
    return {
      toastSuccessNoButtonUndo: this.toastSuccess,
      toastWarningNoButtonUndo: this.toastWarning,
      showDialogError: this.dialogError,
      showDialogWarningOneButton: this.dialogWarningOneButton,
      showDialogWarningTwoButtons: this.dialogWarningTwoButtons,
      showDialogInfoThreeButtons: this.dialogInfoThreeButtons,
      handleAPIError: this.handleAPIError,
    };
  },

  methods: {
    /* ========================== START TOAST MESSAGE ========================== */
    /**
     * Hàm thêm toast vào Danh sách toast.
     * @param {toast} objToast Đối tượng chứa thông tin toast.
     * @returns {void}
     * @author NVDung (18-04-2024).
     */
    addToast(objToast) {
      try {
        // Cập nhật lại key phù hợp.
        objToast.id = this.dataToast.keyToastMessage;

        // Thêm vào arrayToast
        this.dataToast.arrayToast.push(objToast);

        // Tăng keyToastMessage
        this.dataToast.keyToastMessage++;
      } catch (error) {
        console.error("Loi khi them toast vao array");
        console.error(error);
      }
    },

    /**
     * Xóa toast message
     * @param {Number} key id của toast cần xóa.
     * @returns {void}
     * @author NVDung (18-04-2024).
     */
    removeToast(key) {
      try {
        // Lấy vị trí của toast cần xóa
        const pos = this.dataToast.arrayToast
          .map((item) => item.id)
          .indexOf(key);

        // Xóa toast khỏi array
        this.dataToast.arrayToast.splice(pos, 1);

        // Kiểm tra Array rỗng => Cập nhật key về 0
        if (!this.dataToast.arrayToast.length) {
          this.dataToast.keyToastMessage = 0;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /* ============= PHƯƠNG THỨC HIỆN TOAST ĐẶC TRƯNG ============= */
    /**
     * Thực hiện Toast success không có button HOÀN TÁC.
     * @param {String} toastMessage Nội dung thông báo thành công.
     * @returns {void}
     * @author NVDUNG (18-04-2024)
     */
    toastSuccess(toastMessage) {
      // Tạo biến chứa thông tin để tạo đối tượng toast.
      const toastType = this.$resource.toastType.success;
      const toastTitle = this.$resource["vi-VN"].toast.title.success;

      // Tạo đối tượng toast
      const toastObject = new toast(
        0, // id bất kì, vì sẽ được cập nhật lại khi push vào array.
        toastType,
        false,
        toastTitle,
        toastMessage
      );

      // Thêm toast vào array để hiển thị.
      this.addToast(toastObject);
    },

    /**
     * Thực hiện Toast warning không có button HOÀN TÁC.
     * @param {String} toastMessage Nội dung thông báo thành công.
     * @returns {void}
     * @author NVDUNG (18-04-2024)
     */
    toastWarning(toastMessage) {
      // Tạo biến chứa thông tin để tạo đối tượng toast.
      const toastType = this.$resource.toastType.warning;
      const toastTitle = this.$resource["vi-VN"].toast.title.warning;

      // Tạo đối tượng toast
      const toastObject = new toast(
        0, // id bất kì, vì sẽ được cập nhật lại khi push vào array.
        toastType,
        false,
        toastTitle,
        toastMessage
      );

      // Thêm toast vào array để hiển thị.
      this.addToast(toastObject);
    },
    /* ========================== END TOAST MESSAGE ========================== */

    /* ========================== START DIALOG ========================== */
    /**
     * Hàm hiển thị dialog chung
     * @param {dialog} dialogObject Đối tượng của class dialog chứa thông tin để hiển thị.
     * @returns {void}
     * @author NVDung (18-04-2024)
     */
    showDialog(dialogObject) {
      // Truyền dữ liệu props cho dialog
      this.dataDialog.inputDialog = dialogObject;

      // Hiển thị dialog.
      this.dataDialog.showDialog = true;
    },

    /* ============= PHƯƠNG THỨC HIỆN DIALOG ĐẶC TRƯNG ============= */
    /**
     * Hàm thực hiện hiển thị dialog thông báo LỖI 1 nút bấm [đóng]
     * @param {string} message nội dung thông báo
     * @returns {void}
     * @author NVDUNG (18-04-2024)
     */
    dialogError(message) {
      // Tạo biến chứa thông tin để tạo đối tượng toast.
      const title = this.$resource["vi-VN"].dialog.title.error;
      const iconClass = this.$resource.dialog.iconClass.error;
      const totalButton = 1;
      const buttonPrimaryText = this.$resource["vi-VN"].button.close; // Đóng.

      // Tạo đối tượng dialog.
      const dialogData = new dialog(
        title,
        message,
        iconClass,
        totalButton,
        buttonPrimaryText,
        null,
        null
      );

      // Thực hiện hiển thị dialog.
      this.showDialog(dialogData);
    },

    /**
     * Hàm thực hiện hiển thị dialog thông báo CẢNH BÁO 1 nút bấm [Đồng ý]
     * @param {string} message nội dung thông báo
     * @returns {void}
     * @author NVDUNG (18-04-2024)
     */
    dialogWarningOneButton(message) {
      // Tạo biến chứa thông tin để tạo đối tượng toast.
      const title = this.$resource["vi-VN"].dialog.title.warning;
      const iconClass = this.$resource.dialog.iconClass.warning;
      const totalButton = 1;
      const buttonPrimaryText = this.$resource["vi-VN"].button.ok; // Đồng ý.

      // Tạo đối tượng dialog.
      const dialogData = new dialog(
        title,
        message,
        iconClass,
        totalButton,
        buttonPrimaryText,
        null,
        null
      );
      // Thực hiện hiển thị dialog.
      this.showDialog(dialogData);
    },

    /**
     * Hàm thực hiện hiển thị dialog thông báo cảnh báo 2 nút bấm [có]|[không]
     * @param {string} message nội dung thông báo
     * @returns {void}
     * @author NVDUNG (18-04-2024)
     */
    dialogWarningTwoButtons(message) {
      // Tạo biến chứa thông tin để tạo đối tượng toast.
      const title = this.$resource["vi-VN"].dialog.title.warning;
      const iconClass = this.$resource.dialog.iconClass.warning;
      const totalButton = 2;
      const buttonPrimaryText = this.$resource["vi-VN"].button.yes; // Có.
      const buttonSecondary1Text = this.$resource["vi-VN"].button.no; // Không.
      // Tạo đối tượng dialog.
      const dialogData = new dialog(
        title,
        message,
        iconClass,
        totalButton,
        buttonPrimaryText,
        buttonSecondary1Text,
        null
      );
      // Thực hiện hiển thị dialog.
      this.showDialog(dialogData);
    },

    /**
     * Hàm thực hiện hiển thị dialog thông báo infomation 3 nút bấm [có]|[không]|[Hủy]
     * @param {string} message nội dung thông báo
     * @returns {void}
     * @author NVDUNG (18-04-2024)
     */
    dialogInfoThreeButtons(message) {
      // Tạo biến chứa thông tin để tạo đối tượng toast.
      const title = this.$resource["vi-VN"].dialog.title.info;
      const iconClass = this.$resource.dialog.iconClass.info;
      const totalButton = 3;
      const buttonPrimaryText = this.$resource["vi-VN"].button.yes; // Có.
      const buttonSecondary1Text = this.$resource["vi-VN"].button.no; // Không.
      const buttonSecondary2Text = this.$resource["vi-VN"].button.cancel; // Hủy.
      // Tạo đối tượng dialog.
      const dialogData = new dialog(
        title,
        message,
        iconClass,
        totalButton,
        buttonPrimaryText,
        buttonSecondary1Text,
        buttonSecondary2Text
      );
      // Thực hiện hiển thị dialog.
      this.showDialog(dialogData);
    },
    /* ========================== END DIALOG ========================== */

    /* ============= Xử lý lỗi API ============= */

    /**
     * Hàm xử lý lỗi API chung
     * @param {object} response Đối tượng chứa thông tin trả về lỗi từ API
     * Created by: NVDung (05/10/2023)
     */
    handleAPIError(response) {
      // Danh sách đối tượng errors
      var errors = response.dataError.Errors;
      // Tạo chuỗi html nội dung thông báo
      var message = ``;
      for (var error of errors) {
        console.log("error: ", error);
        var errorMessage = error.ErrorMessage;
        message += `- ${errorMessage}<br>`;
        console.log("message: ", message);
      }
      message = message.slice(0, -4);
      console.log("message: ", message);

      // Tạo dialog thông báo lỗi
      this.dialogError(message);
    },
  },
};
</script>

<style lang="scss" scoped>
/* ==================== START CSS App.vue ==================== */
/* ========== Toast message ========== */
.toast-container {
  z-index: 20;
  position: fixed;
  right: 24px;
  bottom: 24px;
  display: flex;
  flex-direction: column; /* Hiện theo chiều dọc */
  background-color: transparent;
}
/* ==================== END CSS App.vue ==================== */

/* ==================== START TRANSITION GROUP FOR TOAST MESSAGE ==================== */
.v-enter-from {
  opacity: 0;
  scale: 0;
  /* rotate: 360deg; */
  translate: 0 100px;
}
.v-enter-to {
  opacity: 1;
  scale: 1;
  /* rotate: 0deg; */
  translate: 0 0;
}

.v-enter-active,
.v-leave-active,
.v-move {
  transition: all 1s;
}

.v-leave-from {
  opacity: 1;
  translate: 0 0;
  /* rotate: 0deg; */
}
.v-leave-to {
  opacity: 0;
  translate: 1000px;
  /* rotate: 360deg; */
}

.v-leave-active {
  position: absolute;
}
/* ==================== END TRANSITION GROUP FOR TOAST MESSAGE ==================== */
</style>
