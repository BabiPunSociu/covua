import axios from "axios";

/**
 * Đối tượng chứa các thông tin để thực hiện OAuth 2.0 với google.
 * @author NVDung (07-05-2024)
 */
const googleOAuth2 = {
  /**
   * URL Endpoint để yêu cầu truy cập từ google.
   */
  baseURL: "https://accounts.google.com/o/oauth2/v2/auth",

  /**
   * Client ID.
   */
  clientID:
    "475315088299-t8nli5i6c0617jtnnf1jaos8pgv2oegt.apps.googleusercontent.com",

  /**
   * URI để chuyển hướng đến sau khi người dùng hoàn tất ủy quyền
   */
  redirectURI: "http://localhost:5173/callback",

  /**
   * Kiểu kết quả trả về.
   * Ứng dụng JS cần đặt là: "token" để Authentication Server trả về MÃ TRUY CẬP dạng "key:value"
   */
  responeType: "token",

  /**
   * Danh sách phạm vi tài nguyên cần xin phép người dùng cấp quyền truy cập
   */
  scope:
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",

  /**
   * Giá trị state để gửi kèm yêu cầu, sau đó google sẽ trả lại state này để thực hiện xác thực
   * Nếu state gửi đi và state trả về giống nhau => yêu cầu đến từ máy chủ OAuth hợp lệ và không phải là yêu cầu giả mạo.
   */
  state: "",

  /**
   * Cho phép ứng dụng dùng tính năng uỷ quyền gia tăng.
   */
  includeGrantedScopes: true,

  /**
   * Phương thức thực hiện xác thực + ủy quyền.
   * @returns Thêm token backend vào local storage nếu hợp lệ.
   * @author NVDung (12-05-2024)
   */
  signIn: async function () {
    // Gọi API đến google để thực hiện xác thực +  ủy quyền
    try {
      // Tạo giá trị state: sinh ngẫu nhiên 22 ký tự.
      this.state =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      /**
       * URL Endpoint thực hiện xác thực +  ủy quyền.
       */
      const urlEndPointSignIn = `${this.baseURL}?client_id=${this.clientID}&redirect_uri=${this.redirectURI}&response_type=${this.responeType}&scope=${this.scope}&state=${this.state}&include_granted_scopes=${this.includeGrantedScopes}`;

      /**
       * Mở URL xác thực trong cửa sổ mới.
       */
      let popup = window.open(
        urlEndPointSignIn,
        "_blank",
        `width=600,height=400,scrollbars=yes,status=yes,resizable=yes,location=center,menubar=no`
      );

      /* ========== START - THUC HIEN XU LY SU KIEN MESSAGE TU POPUP ========== */

      /**
       * Hàm xử lý sự kiện message
       * @param {Event} e Đối tượng Event
       * @author NVDUNG (12-05-2024)
       */
      let functionHandlerMessage = async function (e) {
        console.log("e: ", e);
        if (e.origin != "http://localhost:5173") return;

        console.log("Nhan su kien tu popup");
        // Lay du lieu duoc luu trong localStorage
        let token = await localStorage.getItem("tokenGoogle");
        let state = await localStorage.getItem("stateGoogle");

        console.log(`state: ${state}, token: ${token}`);

        // Thực hiện gọi API đến backend để lấy token backend

        window.removeEventListener("message", await functionHandlerMessage);
      };

      // Bat su kien message duoc gui tu popup
      window.addEventListener("message", await functionHandlerMessage);

      /* ========== END - THUC HIEN XU LY SU KIEN MESSAGE TU POPUP ========== */
    } catch (e) {
      console.error("Loi khi thuc hien yeu cau uy quyen truy cap google");
      console.error(e);
    }
  },
};

export default googleOAuth2;
