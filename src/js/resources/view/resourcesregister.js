/**
 * Đối tượng cung cấp resources cho Register.
 */
const resourcesRegister = {
  /**
   * Bước 1
   */
  step1: {
    textLable: {
      "en-US": "Create your NVDChess account",
      "vi-VN": "Tạo tài khoản NVDChess của bạn",
    },
    textSignUp: {
      "en-US": "Sign up",
      "vi-VN": "Đăng kí",
    },
    textOr: {
      "en-US": "OR",
      "vi-VN": "HOẶC",
    },
    textGoogle: {
      "en-US": "Continue with Google",
      "vi-VN": "Tiếp tục với Google",
    },
    textFacebook: {
      "en-US": "Continue with Facebook",
      "vi-VN": "Tiếp tục với Facebook",
    },
    textLogin: {
      "en-US": "Log in",
      "vi-VN": "Đăng nhập",
    },
  },

  /**
   * Bước 2
   */
  step2: {
    textLable: {
      "en-US": "What is your chess skill level?",
      "vi-VN": "Tình trạng chơi cờ của bạn ra sao?",
    },
    textLableDescription: {
      "en-US": "A starting point for match pairings",
      "vi-VN": "Cơ sở cho việc ghép cặp thi đấu",
    },
    /**
     * List cấp độ kĩ năng để đăng kí tài khoản mới.
     */
    skillLevels: [
      {
        text: {
          "en-US": "New to Chess",
          "vi-VN": "Người mới chơi",
        },
        value: 0,
        classIcon: "icon-pawn",
      },
      {
        text: {
          "en-US": "Beginner",
          "vi-VN": "Người mới tập chơi",
        },
        value: 1,
        classIcon: "icon-knight",
      },
      {
        text: {
          "en-US": "Intermediate",
          "vi-VN": "Trung cấp",
        },
        value: 2,
        classIcon: "icon-rook",
      },
      {
        text: {
          "en-US": "Advanced",
          "vi-VN": "Nâng cấp",
        },
        value: 3,
        classIcon: "icon-queen",
      },
    ],
    textContinue: {
      "en-US": "Continue",
      "vi-VN": "Tiếp tục",
    },
  },

  /**
   * Bước 3
   */
  step3: {
    textLable: {
      "en-US": "Enter your username and a password",
      "vi-VN": "Nhập tên tài khoản và mật khẩu của bạn",
    },
    textLableDescription: {
      "en-US": "This allows you to log in on any device",
      "vi-VN": "Cho phép bạn đăng nhập trên mọi thiết bị",
    },
    textUsername: {
      "en-US": "Username",
      "vi-VN": "Tên tài khoản",
    },
    textWarningUsername: {
      "en-US": "Username from 5 to 255 characters.",
      "vi-VN": "Tên tài khoản từ 5 đến 255 ký tự.",
    },
    textPassword: {
      "en-US": "Password",
      "vi-VN": "Mật khẩu",
    },
    textWarningPassword: {
      "en-US": "Password from 6 to 255 characters.",
      "vi-VN": "Mật khẩu từ 6 đến 255 ký tự.",
    },
    textConfirmPassword: {
      "en-US": "Confirm Password",
      "vi-VN": "Nhập lại mật khẩu",
    },
    textWarningConfirmPassword: {
      "en-US": "Confirm password from 6 to 255 characters.",
      "vi-VN": "Nhập lại mật khẩu từ 6 đến 255 ký tự.",
    },
    textEmail: {
      "en-US": "Email",
      "vi-VN": "Email",
    },
    textWarningEmail: {
      "en-US":
        "Email must be properly formatted and less than 255 characters long.",
      "vi-VN": "Email phải đúng định dạng và có độ dài dưới 255 ký tự.",
    },
    textContinue: {
      "en-US": "Continue",
      "vi-VN": "Tiếp tục",
    },
  },
};

export default resourcesRegister;
