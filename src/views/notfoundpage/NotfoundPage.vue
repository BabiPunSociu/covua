<template>
  <div class="background-overlay">
    <div class="notfound-page">
      <div class="notication">404 Notfound.</div>
      <m-button @click="goPreviusPage" :functionHandlePessEnter="goPreviusPage">
        Quay lại
      </m-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotfoundPage",

  
  methods: {
    /**
     * Quay lại trang trước đó.
     * @author NVDung (21-04-2024)
     */
    goPreviusPage() {
      this.$router.go(-1);
    },

    /**
     * Thực hiện đóng cửa sổ nếu là route là: "https://localhost:5173/callback"
     * @author NVDung (09-05-2024)
     */
    closeWindowWhileLoginOAuth2() {
      // Nếu route là: "https://localhost:5173/callback"
      if (this.$route.fullPath.includes("callback#")) {
        window.close();
      }
    },

    /**
     * Thực hiện gửi dữ liệu đến cửa sổ "https://localhost:5173" khi route là: "https://localhost:5173/callback"
     * @author NVDung (09-05-2024)
     */
    postMessageWhileLoginOAuth2() {
      try {
        // Nếu route là: "https://localhost:5173/callback"
        if (this.$route.fullPath.includes("callback#")) {
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

          // Thực hiện gửi dữ liệu OAuth2 đến cửa sổ "localhost:5173"
          window.postMessage(this.$route.hash, "http://localhost:5173");

          this.$refs.oauth.textContent = "Da gui du lieu OAuth2";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(./notfound-page.scss);

.oauth2 {
  color: white;
  font-size: 30px;
  text-align: center;
  margin-top: 1rem;
}
</style>
