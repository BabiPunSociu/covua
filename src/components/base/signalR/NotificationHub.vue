<template></template>
<script>
// Pinia Store
import { useLanguageStore } from "@/stores/languagestore.js";

// File JS
import errorMessage from "@/js/resources/errormessage/errormessage";

// Local Storage
import signalRHubLocalStorage from "@/js/localstorage/signalRHubLocalStorage.js";
import userIdLocalStorage from "@/js/localstorage/userIdLocalStorage";

// Libraries
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

  created() {},

  beforeUnmount() {},

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
        this.connection = new HubConnectionBuilder()
          .withUrl(this.url)
          // Tự động kết nối lại sau 0ms, 2s, 10s, 30s
          .withAutomaticReconnect([0, 2000, 10000, 30000])
          .build();

        // Cài đặt timeout (thời gian tối đa trước khi bị ngắt kết nối)
        this.connection.serverTimeoutInMilliseconds = 2 * 60 * 1000; // 2 phút

        // Cài đặt ping interval (thời gian gửi tín hiệu ping đến server)
        this.connection.keepAliveIntervalInMilliseconds = 15 * 1000; // 15 giây

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

    /* =========================== Phương thức kết nối SignalR hub notification =========================== */
    /**
     * Thiết lập các lắng nghe sự kiện từ NotificationHub
     * @author NVDUNG (19-09-2024)
     */
    async addEventListenerFromNotificationHub() {
      try {
        // Các lắng nghe sự kiện ...
        this.addEventListenerOnConnected();

        this.addEventListenerAddToGroup();
        this.addEventListenerRemoveFromGroup();
        this.addEventListenerReceiveMessageFromGroup();
        this.addEventListenerReceiveMessageFromAll();
        this.addEventListenerServerSentMessageToClientSpecific();
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

            // Thực hiện restore Group GameHub
            this.restoreGroup();

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
     * Thực hiện kết nối lại Connection Hub theo UserId.
     * @author NVDUNG (19-09-2024)
     */
    async restoreGroup() {
      try {
        // Lấy UserId từ local storage
        let userId = userIdLocalStorage.getUserId();

        // Thực hiện gọi đến Server
        let result = await this.connection.invoke("RestoreGroupAsync", userId);

        console.log(`Restore join group`, result);
      } catch (error) {
        console.error(`Error from Restore Group: ${error}`);
        // Thông báo toast
        let message = errorMessage.ErrorText(this.languageStore.getLanguage);
        this.toastWarningNoButtonUndo(message);
      }
    },

    /**
     * Thiết lập lắng nghe sự kiện NotificationHub_AddToGroup
     * Sự kiện NotificationHub_AddToGroup được Server gửi cho Client khi có Client mới tham gia vào Group.
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerAddToGroup() {
      this.connection.on("NotificationHub_AddToGroup", (data) => {
        console.log("AddToGroupAsync: ", data);

        // To do code ...
      });
    },

    /**
     * Thiết lập lắng nghe sự kiện NotificationHub_RemoveFromGroup
     * Sự kiện NotificationHub_RemoveFromGroup là Server gửi cho Client khi Client đã thoát khỏi Group.
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerRemoveFromGroup() {
      this.connection.on("NotificationHub_RemoveFromGroup", (data) => {
        console.log("RemoveFromGroupAsync: ", data);

        // To do code ...
      });
    },

    /**
     * Thiết lập lắng nghe sự kiện NotificationHub_ReceiveMessageFromAll
     * Sự kiện NotificationHub_ReceiveMessageFromAll là Server gửi cho tất cả Client.
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerReceiveMessageFromAll() {
      this.connection.on("NotificationHub_ReceiveMessageFromAll", (data) => {
        console.log("MessageFromAll: ", data);

        // To do code ...
      });
    },

    /**
     * Thiết lập lắng nghe sự kiện NotificationHub_ReceiveMessageFromGroup
     * Sự kiện NotificationHub_ReceiveMessageFromGroup là Server gửi cho Client trong Group.
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerReceiveMessageFromGroup() {
      this.connection.on("NotificationHub_ReceiveMessageFromGroup", (data) => {
        console.log("MessageFromGroup: ", data);

        // To do code ...
      });
    },

    /**
     * Thiết lập lắng nghe sự kiện NotificationHub_ReceiveMessageFromClientSpecific
     * Sự kiện NotificationHub_ReceiveMessageFromClientSpecific là Server gửi cho Client cụ thể.
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerServerSentMessageToClientSpecific() {
      this.connection.on(
        "NotificationHub_ReceiveMessageFromClientSpecific",
        (data) => {
          console.log("Server send to Specific Client: ", data);

          // To do code ...
        }
      );
    },
  },
};
</script>
