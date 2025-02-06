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
  name: "GameHub",
  inject: ["toastWarningNoButtonUndo", "showDialogError"],
  emits: ["updatePlayerStatus", "startGame", "updateBoardState", "updateTime"],
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
      url: "https://localhost:7011/gamehub",

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
     * Tạo lắng nghe sự kiện gửi trạng thái sẵn sàng cho server
     * @param {object} info {gameId, color, state } Thông tin tham số cho backend.
     * @author NVDung (18-04-2024)
     */
    this.$emitter.on("sendReadyState", async (info) => {
      // Thực hiện gửi yêu cầu đến backend.
      try {
        let { gameId, color, state } = info;

        await this.connection.invoke(
          // Invoke the "ClientReadyToPlay" method on the server
          "ClientReadyToPlay",
          gameId,
          color,
          state
        );
      } catch (error) {
        console.error("Error sending ready to play:", error);
      }
    });

    /**
     * Gửi dữ liệu bàn cờ lên server
     */
    this.$emitter.on("sendUpdateBoardState", async (data) => {
      try {
        let { matrix, turnNumber, gameId, matchId } = data;

        await this.connection.invoke(
          "PlayGameAsync",
          gameId,
          matchId,
          matrix,
          turnNumber
        );
      } catch (error) {
        console.error("Error sending boardstate to server:", error);
      }
    });

    /**
     * Đồng bộ thời gian
     */
    this.$emitter.on("sendUpdateTime", async (data) => {
      try {
        let { gameId, timePlayerWhite, timePlayerBlack } = data;

        await this.connection.invoke(
          "TimeControlAsync",
          gameId,
          timePlayerWhite,
          timePlayerBlack
        );
      } catch (error) {
        console.error("Error sending timer to server:", error);
      }
    });

    /**
     * Gửi dữ liệu hết giờ => kết thúc trận đấu lên Server
     */
    this.$emitter.on("sendPlayerTimeOut", async (data) => {
      try {
        let { gameId, matchId, userId } = data;

        await this.connection.invoke("PlayerTimeOut", gameId, matchId, userId);
      } catch (error) {
        console.error("Error sending player timeout to server:", error);
      }
    });
  },

  beforeUnmount() {
    this.$emitter.off("sendReadyState");
    this.$emitter.off("sendUpdateBoardState");
    this.$emitter.off("sendUpdateTime");
    this.$emitter.off("sendPlayerTimeOut");
  },

  mounted() {
    // Thực hiện kết nối SignalR
    this.initConnectToServer();

    // Thiết lập các lắng nghe sự kiện gửi về từ Server.
    this.addEventListenerFromGameHub();
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

    /* =========================== Phương thức kết nối SignalR hub Game =========================== */
    /**
     * Thiết lập các lắng nghe sự kiện từ GameHub
     * @author NVDUNG (19-09-2024)
     */
    async addEventListenerFromGameHub() {
      try {
        // Các lắng nghe sự kiện ...
        this.addEventListenerOnConnected();

        this.addEventListenerAddToGroup();
        this.addEventListenerRemoveFromGroup();
        this.addEventListenerReceiveMessageFromGroup();
        this.addEventListenerReceiveMessageFromAll();
        this.addEventListenerServerSentMessageToClientSpecific();

        this.addEventListenerFindMatch();
        this.addEventListenerUpdatePlayerStatus();
        this.addEventListenerStartGame();
        this.addEventListenerUpdateBoardState();
        this.addEventListenerUpdateTime();
      } catch (error) {
        console.error("Error from addEventListenerFromGameHub", error);
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
            signalRHubLocalStorage.gameHub.setGameHub(this.connectionId);

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
     * Thiết lập lắng nghe sự kiện GameHub_FindGame
     * Sự kiện GameHub_FindGame được Server gửi cho Client khi Server tìm thấy đối thủ cho Client.
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerFindMatch() {
      this.connection.on("GameHub_FindGame", (data) => {
        console.log("GameHub_FindGame: ", data);

        // Thực hiện chuyển hướng đến trang Game.
        this.$router.push({
          name: "GameRouter",
          params: { gameId: data },
        });
      });
    },

    /**
     * Thiết lập lắng nghe sự kiện GameHub_AddToGroup
     * Sự kiện GameHub_AddToGroup được Server gửi cho Client khi có Client mới tham gia vào Group.
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerAddToGroup() {
      this.connection.on("GameHub_AddToGroup", (data) => {
        console.log("AddToGroup: ", data);

        // To do code ...
      });
    },

    /**
     * Thiết lập lắng nghe sự kiện GameHub_RemoveFromGroup
     * Sự kiện GameHub_RemoveFromGroup là Server gửi cho Client khi Client đã thoát khỏi Group.
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerRemoveFromGroup() {
      this.connection.on("GameHub_RemoveFromGroup", (data) => {
        console.log("RemoveFromGroup: ", data);

        // To do code ...
      });
    },

    /**
     * Thiết lập lắng nghe sự kiện GameHub_ReceiveMessageFromAll
     * Sự kiện GameHub_ReceiveMessageFromAll là Server gửi cho tất cả Client.
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerReceiveMessageFromAll() {
      this.connection.on("GameHub_ReceiveMessageFromAll", (data) => {
        console.log("MessageFromAll: ", data);

        // To do code ...
      });
    },

    /**
     * Thiết lập lắng nghe sự kiện GameHub_ReceiveMessageFromGroup
     * Sự kiện GameHub_ReceiveMessageFromGroup là Server gửi cho Client trong Group.
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerReceiveMessageFromGroup() {
      this.connection.on("GameHub_ReceiveMessageFromGroup", (data) => {
        console.log("MessageFromGroup: ", data);

        // To do code ...
      });
    },

    /**
     * Thiết lập lắng nghe sự kiện GameHub_ReceiveMessageFromClientSpecific
     * Sự kiện GameHub_ReceiveMessageFromClientSpecific là Server gửi cho Client cụ thể.
     * @author NVDUNG (19-09-2024)
     */
    addEventListenerServerSentMessageToClientSpecific() {
      this.connection.on("GameHub_ReceiveMessageFromClientSpecific", (data) => {
        console.log("Server send to Specific Client: ", data);

        // To do code ...
      });
    },

    /**
     * Thiết lập lắng nghe sự kiện GameHub_UpdatePlayerStatus nhận từ Group GameId
     * @author NVDung (30-12-2024)
     */
    addEventListenerUpdatePlayerStatus() {
      this.connection.on("GameHub_UpdatePlayerStatus", (data) => {
        console.log(`GameHub_UpdatePlayerStatus:`, data);

        // Gửi dữ liệu sang Game.vue để cập nhật thông tin
        this.$emit("updatePlayerStatus", data);
      });
    },

    /**
     * Thiết lập lắng nghe sự kiện GameHub_StartGame nhận từ Group GameId
     * @author NVDung (30-12-2024)
     */
    addEventListenerStartGame() {
      this.connection.on("GameHub_StartGame", (data) => {
        console.log(`GameHub_StartGame:`, data);

        // Gửi dữ liệu sang Game.vue để cập nhật thông tin
        this.$emit("startGame", data);
      });
    },

    addEventListenerUpdateBoardState() {
      this.connection.on("GameHub_UpDateBoardState", (data) => {
        console.log(`GameHub_UpDateBoardState`, data);

        // Gửi dữ liệu sang Game.vue để cập nhật thông tin
        this.$emit("updateBoardState", data);
      });
    },

    addEventListenerUpdateTime() {
      this.connection.on("GameHub_UpDateTimer", (data) => {
        console.log(`GameHub_UpDateTimer`, data);

        // Gửi dữ liệu sang Game.vue để cập nhật thông tin
        this.$emit("updateTime", data);
      });
    },
  },
};
</script>
