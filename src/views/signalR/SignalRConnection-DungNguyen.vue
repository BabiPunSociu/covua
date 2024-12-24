<template>
  <div>
    <h1>Test SignalR</h1>
    <div>
      <input type="text" v-model="user" placeholder="User Name" />
      <input type="text" v-model="groupName" placeholder="Group Name" />
      <input type="text" v-model="message" placeholder="Message" />
      <br />
      <button @click="btnAddToGroupClick">Add to Group</button>
      <button @click="btnRemoveFromGroupClick">Remove from Group</button>
      <button @click="btnSendToAllClick(message)">Send to all</button>
      <button @click="btnSendToGroupClick(groupName, message)">
        Send to group
      </button>
    </div>
    <div>
      <h3>Received Data:</h3>
      <div v-for="mes of dataResponse" :key="mes">
        <i>
          <strong>{{ mes.user }}:</strong>
        </i>
        {{ mes.data }}
      </div>
    </div>
  </div>
</template>

<script>
import { HubConnectionBuilder } from "@microsoft/signalr";

export default {
  name: "SignalRConnection",
  data() {
    return {
      connection: null,
      message: "",
      user: "",
      groupName: "",
      dataResponse: [], // { user, data }
    };
  },
  mounted() {
    try {
      /// ============================ Thiết lập connection ============================ //
      // Initialize SignalR connection
      this.connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7011/notificationhub") // Replace with your actual URL
        .build();

      this.connection
        .start()
        .then(() => {
          console.log("Connection established");
          console.log(this.connection);
        })
        .then(() => {
          this.getConnectionId(this.connection);
        })
        .catch((err) => console.error("SignalR connection error:", err));

      // Lắng nghe sự kiện "NotificationReceiveMessageFromAll" từ server
      this.connection.on("NotificationReceiveMessageFromAll", (message) => {
        console.log("Received message:", message);

        this.dataResponse.push(message);
      });

      // Lắng nghe sự kiện "NotificationShowMessageAddToGroup" từ server
      this.connection.on("NotificationShowMessageAddToGroup", (message) => {
        console.log("Received message:", message);

        this.dataResponse.push(message);
      });

      // Lắng nghe sự kiện "NotificationShowMessageRemoveFromGroup" từ server
      this.connection.on(
        "NotificationShowMessageRemoveFromGroup",
        (message) => {
          console.log("Received message:", message);

          this.dataResponse.push(message);
        }
      );

      // Lắng nghe sự kiện "NotificationReceiveMessageFromGroup" từ server
      this.connection.on("NotificationReceiveMessageFromGroup", (message) => {
        console.log("Received message:", message);

        this.dataResponse.push(message);
      });
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async getConnectionId(connection) {
      try {
        let result = await connection.invoke("getConnectionId");
        console.log(`Connection Id: ${result}`);
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * Add to group
     * @author NVDung (20-08-2024)
     */
    async btnAddToGroupClick() {
      // Check if message is empty before sending
      if (this.groupName) {
        try {
          let result = await this.connection.invoke(
            // Invoke the "AddToGroup" method on the server
            "AddToGroupAsync",
            this.groupName
          );

          console.log(result);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.warn("Please enter a group name to add.");
      }
    },

    /**
     * Remove from group
     * @author NVDung (20-08-2024)
     */
    async btnRemoveFromGroupClick() {
      if (this.groupName) {
        try {
          await this.connection.invoke(
            // Invoke the "RemoveFromGroup" method on the server
            "RemoveFromGroupAsync",
            this.groupName
          );
        } catch (error) {
          console.error("Error sending message:", error);
        }
      } else {
        console.warn("Please enter a group name to remove.");
      }
    },

    /**
     * Send message to all
     * @param {object} data Data to send
     * @author NVDung (19-08-2024)
     */
    async btnSendToAllClick(data) {
      try {
        await this.connection.invoke(
          // Invoke the "SendMessage" method on the server
          "SendMessageAsync",
          { user: this.user, data }
        );

        // Clear input
        this.message = "";

        console.log("Sent message to all successfully!");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },

    /**
     * Send message to group
     * @param {string} groupName Group name
     * @param {object} data Data to send
     * @author NVDung (20-08-2024)
     */
    async btnSendToGroupClick(groupName, data) {
      if (!groupName) {
        console.warn("Please enter a group name to send.");
        return;
      }

      try {
        let result = await this.connection.invoke(
          // Invoke the "SendMessageToGroup" method on the server
          "SendMessageToGroupAsync",

          /**
           * Các tham số sử dụng trong phương thức SendMessageToGroup
           */
          groupName,
          data
        );

        console.log(result);
        console.log("Sent message to group successfully!");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
  },
};
</script>
