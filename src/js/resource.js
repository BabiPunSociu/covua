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
   * Resources Tiếng Anh
   */
  "en-US": {
    /**
     * Resources Login
     */
    resourcesLogin: {
      textUsername: "Username",
      textPassword: "Password",
      textRememberMe: "Remember me",
      textForgotPassword: "Forgot password?",
      textLogin: "Login",
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
        textPassword: "Password",
        textConfirmPassword: "Confirm Password",
        textEmail: "Email",
        textContinue: "Continue",
      },
    },
  },

  /**
   * Resources Tiếng Việt
   */
  "vi-VN": {
    /**
     * Resources Login
     */
    resourcesLogin: {
      textUsername: "Tên tài khoản",
      textPassword: "Mật khẩu",
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
        textPassword: "Mật khẩu",
        textConfirmPassword: "Nhập lại mật khẩu",
        textEmail: "Email",
        textContinue: "Tiếp tục",
      },
    },
  },
};

export default NVDResource;
