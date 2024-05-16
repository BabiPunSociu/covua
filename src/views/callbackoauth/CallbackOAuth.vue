<template>
  <div class="container">
    <div ref="oauth" class="oauth2"></div>
    <div class="loading"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CallbackOAuth",
  mounted() {
    this.getInfoTokenFromOAuth2();
    alert("Da gui du lieu OAuth2");
    window.close();
  },

  methods: {
    /**
     * Hàm lấy thông tin trả về trong URL.
     * @author NVDUNG (07-05-2024)
     */
    getInfoTokenFromOAuth2() {
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

      // Luu access token vao localStorage
      localStorage.setItem("tokenGoogle", objOAuth.access_token);
      localStorage.setItem("stateGoogle", objOAuth.state);

      // Thực hiện gửi dữ liệu OAuth2 đến cửa sổ "localhost:5173"
      window.postMessage("dataMessage", "http://localhost:5173");

      // Thực hiện so sánh state
      // if (objOAuth.state !== window.datastate) return;

      // try {
      //   // Thực hiện gửi token đến backend để backend lấy thông tin từ google.
      //   const response = await axios.post(
      //     "https://localhost:7011/api/v1/Authentication/login/google-callback",
      //     // Request Body
      //     {
      //       accessToken: objOAuth.access_token,
      //     }
      //   );

      //   console.log("response: ", response);
      // } catch (error) {
      //   console.log("Loi khi goi toi backend... ");
      //   console.log(error);
      // }

      this.$refs.oauth.textContent =
        "Da gui du lieu OAuth2: " +
        "POST MESSAGE " +
        "   " +
        objOAuth.access_token;

      // Đóng cửa sổ.
      // window.close();
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(./callback-oauth.scss);
</style>
