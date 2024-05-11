<template>
  <div ref="oauth" class="oauth2"></div>
</template>

<script>
import axios from "axios";

export default {
  name: "CallbackOAuth",
  async mounted() {
    await this.getInfoTokenFromOAuth2();
  },

  methods: {
    async getInfoTokenFromOAuth2() {
      /**
       * Lấy mảng tham số cần thực hiện phân tích
       * Tách từ route.hash được: ["state=abc", "access_token=xyz", ...]
       */
      let params = this.$route.hash.slice(1).split("&");
      /**
       * Thực hiện tạo đối tượng chứa thông tin OAuth
       */
      let objOAuth = params.reduce((objTemp, item) => {
        // Tách key và value.
        let [key, value] = item.split("=");

        // Thêm key và value vào đối tượng objTemp
        objTemp[key] = value;

        return objTemp;
      }, {});

      console.table(objOAuth);

      console.log("State1: ", window.datastate);
      console.log("State2: ", objOAuth.state);

      // Thực hiện so sánh state
      if (objOAuth.state !== window.datastate) return;

      try {
        // Thực hiện gửi token đến backend để backend lấy thông tin từ google.
        const response = await axios.post(
          "https://localhost:7011/api/v1/Authentication/login/google-callback",
          // Request Body
          {
            accessToken: objOAuth.access_token,
          }
        );

        console.log("response: ", response);
      } catch (error) {
        console.log("Loi khi goi toi backend... ");
        console.log(error);
      }

      // Lấy token từ backend -> Lưu vào localStorage và store

      this.$refs.oauth.textContent =
        "Da gui du lieu OAuth2: " +
        objOAuth.access_token.length +
        "   " +
        objOAuth.access_token;
    },
  },
};
</script>
