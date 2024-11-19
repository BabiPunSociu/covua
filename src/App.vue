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
    >
    </m-dialog>

    <!-- Loading -->
    <m-loading v-if="dataLoading.showLoading" :isLoadingControl="false">
    </m-loading>

    <vue-identify-network @network-speed="networlSpeedChanged">
      <span slot="unknown"> REEE! Unable to identify your network type. </span>
      <span slot="slow">
        <img
          src="../../assets/images/1378473.e42c196c.507x286o.0efca59bad6a.png"
          alt="you got slow internet"
        />
      </span>
      <span slot="fast">
        <video width="400" controls>
          <source src="../../assets/videos/bear.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </span>
    </vue-identify-network>

    <notification-hub></notification-hub>
  </div>
</template>

<script>
// import toast để có class gắn vào DataType.
import toast from "./js/classconstructor/toast.js";
// import dialog để có class gắn vào DataType.
import dialog from "./js/classconstructor/dialog.js";

import { VueIdentifyNetwork } from "vue-identify-network";

import notificationHub from "@/views/signalR/NotificationHub.vue";

import { useLanguageStore } from "@/stores/languagestore.js";
import languageLocalStorage from "@/js/localstorage/languageLocalStorage.js";

export default {
  name: "App",

  components: {
    "vue-identify-network": VueIdentifyNetwork,
    "notification-hub": notificationHub,
  },

  data() {
    return {
      /**
       * Đối tượng chứa store giá trị ngôn ngữ.
       */
      languageStore: useLanguageStore(),

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
  mounted() {
    /* ============= Thực hiện đặt ngôn ngữ ============= */
    // Lấy ngôn ngữ từ localStorage.
    let { langCode, langName } = languageLocalStorage.getLangCode();

    // Set ngôn ngữ cho Store.
    this.languageStore.setLanguage(langCode);
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
      /**
       * Thực hiện Toast success không có button HOÀN TÁC.
       */
      toastSuccessNoButtonUndo: this.toastSuccess,

      /**
       * Thực hiện Toast warning không có button HOÀN TÁC.
       */
      toastWarningNoButtonUndo: this.toastWarning,

      /**
       * Hàm thực hiện hiển thị dialog thông báo LỖI 1 nút bấm [đóng]
       */
      showDialogError: this.dialogError,

      /**
       * Hàm thực hiện hiển thị dialog thông báo CẢNH BÁO 1 nút bấm [Đồng ý]
       */
      showDialogWarningOneButton: this.dialogWarningOneButton,

      /**
       * Hàm thực hiện hiển thị dialog thông báo cảnh báo 2 nút bấm [có]|[không]
       */
      showDialogWarningTwoButtons: this.dialogWarningTwoButtons,

      /**
       * Hàm thực hiện hiển thị dialog thông báo infomation 3 nút bấm [có]|[không]|[Hủy]
       */
      showDialogInfoThreeButtons: this.dialogInfoThreeButtons,

      /**
       * Hàm xử lý lỗi API chung
       */
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
      const toastType = this.$resource.resourcesToast.toastType.success;
      const toastTitle =
        this.$resource.resourcesToast.title.success[
          this.languageStore.getLanguage
        ];

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
      const toastType = this.$resource.resourcesToast.toastType.warning;
      const toastTitle =
        this.$resource.resourcesToast.title.warning[
          this.languageStore.getLanguage
        ];

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
     * @param {string} key Key để xác định dialog, sẽ là data gửi về khi bắt sự kiện click button.
     * @param {string} message nội dung thông báo
     * @returns {void}
     * @author NVDUNG (18-04-2024)
     */
    dialogError(key, message) {
      // Tạo biến chứa thông tin để tạo đối tượng dialog.
      const title =
        this.$resource.resourcesDialog.title.error[
          this.languageStore.getLanguage
        ];
      const iconClass = this.$resource.resourcesDialog.iconClass.error;
      const totalButton = 1;
      const buttonPrimaryText =
        this.$resource.resourceButton.close[this.languageStore.getLanguage]; // Đóng.

      // Tạo đối tượng dialog.
      const dialogData = new dialog(
        key,
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
     * @param {string} key Key để xác định dialog, sẽ là data gửi về khi bắt sự kiện click button.
     * @param {string} message nội dung thông báo
     * @returns {void}
     * @author NVDUNG (18-04-2024)
     */
    dialogWarningOneButton(key, message) {
      // Tạo biến chứa thông tin để tạo đối tượng dialog.
      const title =
        this.$resource.resourcesDialog.title.warning[
          this.languageStore.getLanguage
        ];
      const iconClass = this.$resource.resourcesDialog.iconClass.warning;
      const totalButton = 1;
      const buttonPrimaryText =
        this.$resource.resourceButton.ok[this.languageStore.getLanguage]; // Đồng ý.

      // Tạo đối tượng dialog.
      const dialogData = new dialog(
        key,
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
     * @param {string} key Key để xác định dialog, sẽ là data gửi về khi bắt sự kiện click button.
     * @param {string} message nội dung thông báo
     * @returns {void}
     * @author NVDUNG (18-04-2024)
     */
    dialogWarningTwoButtons(key, message) {
      // Tạo biến chứa thông tin để tạo đối tượng toast.
      const title =
        this.$resource.resourcesDialog.title.warning[
          this.languageStore.getLanguage
        ];
      const iconClass = this.$resource.resourcesDialog.iconClass.warning;
      const totalButton = 2;
      const buttonPrimaryText =
        this.$resource.resourceButton.yes[this.languageStore.getLanguage]; // Có.
      const buttonSecondary1Text =
        this.$resource.resourceButton.no[this.languageStore.getLanguage]; // Không.
      // Tạo đối tượng dialog.
      const dialogData = new dialog(
        key,
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
     * @param {string} key Key để xác định dialog, sẽ là data gửi về khi bắt sự kiện click button.
     * @param {string} message nội dung thông báo
     * @returns {void}
     * @author NVDUNG (18-04-2024)
     */
    dialogInfoThreeButtons(message) {
      // Tạo biến chứa thông tin để tạo đối tượng toast.
      const title =
        this.$resource.resourcesDialog.title.info[
          this.languageStore.getLanguage
        ];
      const iconClass = this.$resource.resourcesDialog.iconClass.info;
      const totalButton = 3;
      const buttonPrimaryText =
        this.$resource.resourceButton.yes[this.languageStore.getLanguage]; // Có.
      const buttonSecondary1Text =
        this.$resource.resourceButton.no[this.languageStore.getLanguage]; // Không.
      const buttonSecondary2Text =
        this.$resource.resourceButton.cancel[this.languageStore.getLanguage]; // Hủy.
      // Tạo đối tượng dialog.
      const dialogData = new dialog(
        key,
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
    handleAPIError(error) {
      /**
       * Truy cập dữ liệu trong lỗi API
       * - message: Thông báo lỗi người dùng (UserMessage)
       * - data: Danh sách lỗi validate input.
       */
      var { message, data } = error;

      // Tạo chuỗi html nội dung thông báo
      var messageResult = message + "<br>";

      if (data) {
        for (var d of data) {
          let errorMes = d.errorMessage;
          messageResult += `- ${errorMes}<br>`;
        }
      }

      messageResult = messageResult.slice(0, -4);
      // console.log("message: ", messageResult);

      // Tạo dialog thông báo lỗi
      this.dialogError("CallApiError", messageResult);
    },

    /* ========================== Network ========================== */
    /**
     * Hàm xử lý sự kiện thay đổi tốc độ mạng.
     * @param {Number} newSpeed Giá trị tốc độ mạng mới.
     */
    networlSpeedChanged(newSpeed) {
      console.log(`Network speed: ${newSpeed}`);

      // Kiểm tra kết nối mạng
      if (!navigator.onLine) {
        // Hiển thị dialog thông báo lỗi, mất kết nối mạng
        this.dialogError(
          this.$resource.resourcesDialog.message.network.offline[
            this.languageStore.getLanguage
          ]
        );
      }
      // Mạng không tốt: 0.4 0.35
      else if (newSpeed <= 1) {
        // Hiển thị toast massages.
        this.toastWarning(
          this.$resource.resourcesDialog.message.network.badConnection[
            this.languageStore.getLanguage
          ]
        );
      }
      // Mạng tạm chấp nhận: 1.45 1.3
      else if (newSpeed <= 1.5) {
        // Hiện thị toast messages.
        this.toastWarning(
          this.$resource.resourcesDialog.message.network.averageConnection[
            this.languageStore.getLanguage
          ]
        );
      }
      // Mạng tốt: 1.7 3.85
      else if (newSpeed <= 5) {
        // Hiện thị toast messages.
        this.toastWarning(
          this.$resource.resourcesDialog.message.network.goodConnection[
            this.languageStore.getLanguage
          ]
        );
      }
      // Mạng rất tốt (Lag rất ít): 10
      else {
      }
    },

    /* ======================== END Network ======================== */
  },
};
</script>

<style lang="scss" scoped>
/* ==================== START CSS App.vue ==================== */
.app-container {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;

  // Toast message
  .toast-container {
    z-index: 20;
    position: fixed;
    right: calc(24 / 14 * 1rem);
    bottom: calc(24 / 14 * 1rem);
    display: flex;
    flex-direction: column; /* Hiện theo chiều dọc */
    background-color: transparent;
  }
}

/* ==================== END CSS App.vue ==================== */

/* ==================== START TRANSITION GROUP FOR TOAST MESSAGE ==================== */
.v-enter-from {
  opacity: 0;
  scale: 0;
  /* rotate: 360deg; */
  translate: 0 calc(100 / 14 * 1rem);
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
  translate: calc(1000 / 14 * 1rem);
  /* rotate: 360deg; */
}

.v-leave-active {
  position: absolute;
}
/* ==================== END TRANSITION GROUP FOR TOAST MESSAGE ==================== */
</style>
