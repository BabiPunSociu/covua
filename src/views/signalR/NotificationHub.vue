<template></template>
<script>
import { useLanguageStore } from "@/stores/languagestore.js";
import errorMessage from "@/js/resources/errormessage/errormessage";
import signalRHubLocalStorage from "@/js/localstorage/signalRHubLocalStorage.js";
import { HubConnectionBuilder } from "@microsoft/signalr";
export default {
  name: "NotificationHub",
  inject: ["toastWarningNoButtonUndo", "showDialogError"],
  data() {
    return {
      /**
       * ConnectionId kết nối đến Server
       */
      connectionId: null,

      /**
       * Đối tượng kết nối SignalR
       */
      connection: null,

      /**
       * Đối tượng chứa store giá trị ngôn ngữ phục vụ cho việc thông báo.
       */
      languageStore: useLanguageStore(),

      /**
       * Địa chị URL đến Hub SignalR
       */
      url: "https://localhost:7011/notificationhub",

      /**
       * Đánh dấu trạng thái đã kết nối
       */
      connected: false,

      /**
       * Số lần kết nối lại.
       */
      retryCount: 0,
    };
  },

  mounted() {
    // Thực hiện kết nối SignalR
    this.initConnectToServer();

    // Thiết lập các lắng nghe sự kiện gửi về từ Server.
    this.addEventListenerFromNotificationHub();
  },

  methods: {
    /* =========================== Phương thức kết nối SignalR hub notification =========================== */
    /**
     * Thiết lập kết nối SignalR tới Server.
     * Tự động kết nối lại sau 5s.
     * Kết nối lại tối đa 5 lần.
     * @author NVDUNG (19-09-2024)
     */
    async initConnectToServer() {
      // Nếu chưa thiết lập kết nối.
      if (!this.connected) {
        // Khởi tạo đối tượng kết nối
        this.connection = new HubConnectionBuilder().withUrl(this.url).build();

        // Hiện loading
        this.$emitter.emit("showLoading", true);

        try {
          // Bắt đầu kết nối
          // ConnectionId được gửi về caller thông qua event "OnConnected"
          await this.connection.start();

          this.retryCount = 0;
        } catch (error) {
          console.error(error);

          // Tăng số lần kết nối
          this.retryCount++;

          // Thông báo toast
          let message = errorMessage.errorConnectToServer(
            this.languageStore.getLanguage
          );
          this.toastWarningNoButtonUndo(message);

          // Giới hạn 5 lần kết nối lại.
          if (this.retryCount < 5) {
            // Thực hiện đệ quy kết nối lại sau 5s.
            setTimeout(() => {
              this.initConnectToServer();
              console.log("Reconnect...");
            }, 5000);
          } else {
            message = errorMessage.ErrorText(this.languageStore.getLanguage);
            // Thông báo Toast
            this.toastWarningNoButtonUndo(message);
          }
        } finally {
          // Tắt loading
          this.$emitter.emit("showLoading", false);
        }
      }
    },

    /**
     * Lấy Connection Id tương ứng với connection đến Server
     * @returns {string} ConnectionId
     * @author NVDUNG (19-09-2024)
     */
    // async getConnectionId() {
    //   try {
    //     let connectionId = await this.connection.invoke("getConnectionId");
    //     console.log(`Connection Id: ${connectionId}`);
    //     return connectionId;
    //   } catch (error) {
    //     console.error(`Error from getConnectionId: ${error}`);
    //     // Thông báo toast
    //     let message = errorMessage.ErrorText(this.languageStore.getLanguage);
    //     this.toastWarningNoButtonUndo(message);
    //   }
    // },

    /* =========================== Phương thức kết nối SignalR hub notification =========================== */
    /**
     * Thiết lập các lắng nghe sự kiện từ NotificationHub
     * @author NVDUNG (19-09-2024)
     */
    async addEventListenerFromNotificationHub() {
      try {
        // Các lắng nghe sự kiện ...
        this.addEventListenerOnConnected();
        this.addEventListenerFindMatch();
        this.addEventListenerAddToGroup();
        this.addEventListenerRemoveFromGroup();
        this.addEventListenerReceiveMessageFromGroup();
        this.addEventListenerReceiveMessageFromAll();
      } catch (error) {
        console.error("Error from addEventListenerFromNotificationHub", error);
      }
    },

    /**
     * Thiết lập lắng nghe sự kiện onConnected
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerOnConnected() {
      this.connection.on("OnConnected", (data) => {
        try {
          if (data) {
            this.connectionId = data;
            console.log("ConnectionId: ", this.connectionId);

            // Lưu trữ ConnectionId với local storage
            signalRHubLocalStorage.notificationHub.setNotificationHub(
              this.connectionId
            );

            this.connected = true;
          } else {
            throw new Error();
          }
        } catch (error) {
          console.error(`Error from getConnectionId: ${error}`);
          // Thông báo toast
          let message = errorMessage.ErrorText(this.languageStore.getLanguage);
          this.toastWarningNoButtonUndo(message);
        }
      });
    },

    /**
     * Thiết lập lắng nghe sự kiện FindMatch
     * Sự kiện FindMatch được Server gửi cho Client khi Server tìm thấy đối thủ cho Client.
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerFindMatch() {
      this.connection.on("FindMatch", (data) => {
        console.log("FindMatch: ", data);

        // Thực hiện chuyển hướng đến trang Game.
      });
    },

    /**
     * Thiết lập lắng nghe sự kiện NotificationShowMessageAddToGroup
     * Sự kiện NotificationShowMessageAddToGroup được Server gửi cho Client khi có Client mới tham gia vào Group.
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerAddToGroup() {
      this.connection.on("NotificationShowMessageAddToGroup", (data) => {
        console.log("AddToGroup: ", data);

        // To do code ...
      });
    },

    /**
     * Thiết lập lắng nghe sự kiện NotificationShowMessageRemoveFromGroup
     * Sự kiện NotificationShowMessageRemoveFromGroup là Server gửi cho Client khi Client đã thoát khỏi Group.
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerRemoveFromGroup() {
      this.connection.on("NotificationShowMessageRemoveFromGroup", (data) => {
        console.log("RemoveFromGroup: ", data);

        // To do code ...
      });
    },

    /**
     * Thiết lập lắng nghe sự kiện NotificationReceiveMessageFromAll
     * Sự kiện NotificationReceiveMessageFromAll là Server gửi cho tất cả Client.
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerReceiveMessageFromAll() {
      this.connection.on("NotificationReceiveMessageFromAll", (data) => {
        console.log("MessageFromAll: ", data);

        // To do code ...
      });
    },

    /**
     * Thiết lập lắng nghe sự kiện NotificationReceiveMessageFromGroup
     * Sự kiện NotificationReceiveMessageFromGroup là Server gửi cho Client trong Group.
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerReceiveMessageFromGroup() {
      this.connection.on("NotificationReceiveMessageFromGroup", (data) => {
        console.log("MessageFromGroup: ", data);

        // To do code ...
      });
    },
  },
};
</script>
