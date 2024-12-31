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

  created() {
    /* ============= Event listener SendReadyToPlay ============= */
    /**
     * Tạo lắng nghe sự kiện ẩn hiện loading.
     * @param {object} info {gameId, state, color} Thông tin tham số cho backend.
     * @author NVDung (18-04-2024)
     */
    this.$emitter.on("sendReadyState", async (info) => {
      // Thực hiện gửi yêu cầu đến backend.
      try {
        let { gameId, state, color } = info;

        await this.connection.invoke(
          // Invoke the "ClientReadyToPlay" method on the server
          "ClientReadyToPlay",
          gameId,
          state,
          color
        );
      } catch (error) {
        console.error("Error sending ready to play:", error);
      }
    });
  },

  beforeUnmount() {
    this.$emitter.off("sendReadyState");
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

        this.addEventListenerFindMatch();
        this.addEventListenerUpdatePlayerStatus();
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
     * Thiết lập lắng nghe sự kiện NotificationFindMatch
     * Sự kiện NotificationFindMatch được Server gửi cho Client khi Server tìm thấy đối thủ cho Client.
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerFindMatch() {
      this.connection.on("NotificationFindMatch", (data) => {
        console.log("NotificationFindMatch: ", data);

        // Thực hiện chuyển hướng đến trang Game.
        this.$router.push({
          name: "GameRouter",
          params: { gameId: data },
        });
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

    /**
     * Thiết lập lắng nghe sự kiện UpdatePlayerStatus nhận từ Group GameId
     * @author NVDung (30-12-2024)
     */
    addEventListenerUpdatePlayerStatus() {
      this.connection.on("UpdatePlayerStatus", (data) => {
        console.log(`UpdatePlayerStatus:`, data);

        // Gửi dữ liệu sang Game.vue để cập nhật thông tin
        this.$emitter.emit("UpdatePlayerStatus", data);
      });
    },
  },
};
</script>
