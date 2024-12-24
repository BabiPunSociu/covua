/**
 * Giá trị key local storage để lưu trữ ConnectionId kết nối với Notification Hub.
 */
const keyNotificationHub = "NVDChessNotificationHub";

/**
 * Giá trị key local storage để lưu trữ ConnectionId kết nối với Game Hub.
 */
const keyGameHub = "NVDChessGameHub";

const signalRHubLocalStorage = {
  /**
   * Các phương thức thao tác về hub notification
   */
  notificationHub: {
    /**
     * Lấy giá trị ConnectionId kết nối với Notification Hub
     * @returns {string} ConnectionId
     */
    getNotificationHub: () => {
      try {
        let connectionId = localStorage.getItem(keyNotificationHub);
        return connectionId;
      } catch (error) {
        console.error(
          "Error while get ConnectionId NotificationHub from local storage",
          error
        );
      }
    },
    /**
     * Hàm thiết lập giá trị ConnectionId kết nối với Notification Hub
     * @param {string} connectionId Giá trị ConnectionId
     */
    setNotificationHub: (connectionId) => {
      try {
        localStorage.setItem(keyNotificationHub, connectionId);
      } catch (error) {
        console.error(
          "Error while set ConnectionId NotificationHub to local storage",
          error
        );
      }
    },
  },

  /**
   * Các phương thức thao tác về hub game
   */
  gameHub: {
    /**
     * Lấy giá trị ConnectionId kết nối với Game Hub
     * @returns {string} ConnectionId
     */
    getGameHub: () => {
      try {
        let connectionId = localStorage.getItem(keyGameHub);
        return connectionId;
      } catch (error) {
        console.error(
          "Error while get ConnectionId GameHub from local storage",
          error
        );
      }
    },
    /**
     * Hàm thiết lập giá trị ConnectionId kết nối với Game Hub
     * @param {string} connectionId Giá trị ConnectionId
     */
    setGameHub: (connectionId) => {
      try {
        localStorage.setItem(keyGameHub, connectionId);
      } catch (error) {
        console.error(
          "Error while set ConnectionId GameHub to local storage",
          error
        );
      }
    },
  },
};

export default signalRHubLocalStorage;
