/**
 * Đối tượng cung cấp resources cho ứng dụng.
 */
const NVDResource = {
  classChessMan: [
    "",

    "white-king", // Vua trắng
    "white-queen", // Hậu trắng
    "white-bishop", // Tượng trắng
    "white-knight", // Mã trắng
    "white-rook", // Xe trắng
    "white-pawn", // Tốt trắng

    "black-king",
    "black-queen",
    "black-bishop",
    "black-knight",
    "black-rook",
    "black-pawn",
  ],

  /**
   * Đối tượng loại Toast message.
   */
  toastType: {
    success: "success",
    error: "error",
    warning: "warning",
    info: "info",
  },

  /**
   * Đối tượng chứa thông tin chung về Dialog.
   */
  dialog: {
    /**
     * Đối tượng chứa các class hiển thị icon.
     */
    iconClass: {
      success: "mi-success",
      error: "mi-error",
      warning: "mi-warning",
      info: "mi-info",
    },
  },

  /**
   * Resources Tiếng Anh
   */
  "en-US": {
    /**
     * Đối tượng chứa thông tin về Toast message.
     */
    toast: {
      /**
       * Đối tượng tiêu đề.
       */
      title: {
        success: "Success!",
        error: "Error!",
        warning: "Warning!",
        info: "Infomation!",
      },
      /**
       * Đối tượng nội dung thông báo.
       */
      message: {},
    },

    /**
     * Đối tượng chứa thông tin về Dialog bằng tiếng Anh.
     */
    dialog: {
      title: {
        success: "Success!",
        error: "Error!",
        warning: "Warning!",
        info: "Infomation!",
      },
      message: {},
    },

    /**
     * Đối tượng chứa thông tin về Button bằng tiếng Anh.
     */
    button: {
      close: "Close",
      ok: "OK",
      yes: "Yes",
      no: "No",
      cancel: "Cancel",
    },

    /**
     * Resources Login
     */
    resourcesLogin: {
      textUsername: "Username",
      textWarningUsername: "Username from 5 to 255 characters.",
      textPassword: "Password",
      textWarningPassword: "Password from 6 to 255 characters.",
      textRememberMe: "Remember me",
      textForgotPassword: "Forgot password?",
      textLogin: "Log in",
      textOr: "OR",
      textLoginGoogle: "Log in with Google",
      textLoginFacebook: "Log in with Facebook",
      textRegister: "New? Sign up - and start playing chess!",
    },

    /**
     * Resources Register
     */
    resourcesRegister: {
      /**
       * Bước 1
       */
      step1: {
        textLable: "Create your NVDChess account",
        textSignUp: "Sign up",
        textOr: "OR",
        textGoogle: "Continue with Google",
        textFacebook: "Continue with Facebook",
        textLogin: "Log in",
      },

      /**
       * Bước 2
       */
      step2: {
        textLable: "What is your chess skill level?",
        textLableDescription: "A starting point for match pairings",
        /**
         * List cấp độ kĩ năng để đăng kí tài khoản mới.
         */
        skillLevels: [
          {
            text: "New to Chess",
            value: 0,
            classIcon: "icon-pawn",
          },
          {
            text: "Beginner",
            value: 1,
            classIcon: "icon-knight",
          },
          {
            text: "Intermediate",
            value: 2,
            classIcon: "icon-rook",
          },
          {
            text: "Advanced",
            value: 3,
            classIcon: "icon-queen",
          },
        ],
        textContinue: "Continue",
      },

      /**
       * Bước 3
       */
      step3: {
        textLable: "Enter your username and a password",
        textLableDescription: "This allows you to log in on any device",
        textUsername: "Username",
        textWarningUsername: "Username from 5 to 255 characters.",
        textPassword: "Password",
        textWarningPassword: "Password from 6 to 255 characters.",
        textConfirmPassword: "Confirm Password",
        textWarningConfirmPassword:
          "Confirm password from 6 to 255 characters.",
        textEmail: "Email",
        textWarningEmail:
          "Email must be properly formatted and less than 255 characters long.",
        textContinue: "Continue",
      },
    },

    /**
     * Resources SideBar tiếng Anh
     */
    sideBar: {
      play: "Play",
      puzzle: "Puzzle",
      learn: "Learn",
      watch: "Watch",
      news: "News",
      social: "Social",
    },

    /**
     * Resources TextField tiếng Anh
     */
    textField: {
      textSearchOnNVDChess: "Search on NVDChess",
    },
  },

  /**
   * Resources Tiếng Việt
   */
  "vi-VN": {
    /**
     * Đối tượng chứa thông tin về Toast message.
     */
    toast: {
      /**
       * Đối tượng tiêu đề.
       */
      title: {
        success: "Thành công!",
        error: "Lỗi!",
        warning: "Cảnh báo!",
        info: "Thông tin!",
      },
      /**
       * Đối tượng nội dung thông báo.
       */
      message: {},
    },

    /**
     * Đối tượng chứa thông tin về Dialog bằng tiếng Anh.
     */
    dialog: {
      title: {
        success: "Thành công!",
        error: "Lỗi!",
        warning: "Cảnh báo!",
        info: "Thông tin!",
      },
      message: {},
    },

    /**
     * Đối tượng chứa thông tin về Button bằng tiếng Anh.
     */
    button: {
      close: "Đóng",
      ok: "Đồng ý",
      yes: "Có",
      no: "Không",
      cancel: "Hủy",
    },

    /**
     * Resources Login
     */
    resourcesLogin: {
      textUsername: "Tên tài khoản",
      textWarningUsername: "Tên tài khoản từ 5 đến 255 ký tự.",
      textPassword: "Mật khẩu",
      textWarningPassword: "Mật khẩu từ 6 đến 255 ký tự.",
      textRememberMe: "Ghi nhớ tôi",
      textForgotPassword: "Quên mật khẩu?",
      textLogin: "Đăng nhập",
      textOr: "HOẶC",
      textLoginGoogle: "Đăng nhập với Google",
      textLoginFacebook: "Đăng nhập với Facebook",
      textRegister: "Người mới? Đăng kí - và bắt đầu chơi cờ vua!",
    },

    /**
     * Resources Register
     */
    resourcesRegister: {
      /**
       * Bước 1
       */
      step1: {
        textLable: "Tạo tài khoản NVDChess của bạn",
        textSignUp: "Đăng kí",
        textOr: "HOẶC",
        textGoogle: "Tiếp tục với Google",
        textFacebook: "Tiếp tục với Facebook",
        textLogin: "Đăng nhập",
      },

      /**
       * Bước 2
       */
      step2: {
        textLable: "Tình trạng chơi cờ của bạn ra sao?",
        textLableDescription: "Cơ sở cho việc ghép cặp thi đấu",
        /**
         * List cấp độ kĩ năng để đăng kí tài khoản mới.
         */
        skillLevels: [
          {
            text: "Người mới chơi",
            value: 0,
            classIcon: "icon-pawn",
          },
          {
            text: "Người mới tập chơi",
            value: 1,
            classIcon: "icon-knight",
          },
          {
            text: "Trung cấp",
            value: 2,
            classIcon: "icon-rook",
          },
          {
            text: "Nâng cấp",
            value: 3,
            classIcon: "icon-queen",
          },
        ],
        textContinue: "Tiếp tục",
      },

      /**
       * Bước 3
       */
      step3: {
        textLable: "Nhập tên tài khoản và mật khẩu của bạn",
        textLableDescription: "Cho phép bạn đăng nhập trên mọi thiết bị",
        textUsername: "Tên tài khoản",
        textWarningUsername: "Tên tài khoản từ 5 đến 255 ký tự.",
        textPassword: "Mật khẩu",
        textWarningPassword: "Mật khẩu từ 6 đến 255 ký tự.",
        textConfirmPassword: "Nhập lại mật khẩu",
        textWarningConfirmPassword: "Nhập lại mật khẩu từ 6 đến 255 ký tự.",
        textEmail: "Email",
        textWarningEmail:
          "Email phải đúng định dạng và có độ dài dưới 255 ký tự.",
        textContinue: "Tiếp tục",
      },
    },

    /**
     * Resources SideBar tiếng Việt
     */
    sideBar: {
      play: "Chơi",
      puzzle: "Câu đố",
      learn: "Học",
      watch: "Theo dõi",
      news: "Tin tức",
      social: "Cộng đồng",
    },

    /**
     * Resources TextField tiếng Việt
     */
    textField: {
      textSearchOnNVDChess: "Tìm kiếm trên NVDChess",
    },
  },
};

export default NVDResource;
