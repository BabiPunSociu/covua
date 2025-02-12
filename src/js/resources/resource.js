// import các file resources khác.
import resourcesClassChessMan from "./classchesman.js";

// import resources của image và icon là URL tới cloudinary.
import resourcesImage from "./resourceimageicon/resourceimages.js";
import resourcesIcon from "./resourceimageicon/resourceicons.js";

// import resources của các base component.
import resourcesToast from "./basecomponent/resourcetoast.js";
import resourcesDialog from "./basecomponent/resourcedialog.js";
import resourcesDialogOtp from "./basecomponent/resourcedialogotp.js";
import resourceButton from "./basecomponent/resourcebutton.js";
import resourcesNotification from "./basecomponent/resourcenotification.js";
import resourcesSideBar from "./basecomponent/resourcessidebar.js";
import resourcesTextField from "./basecomponent/resourcestextfield.js";

// import resources của layout component.
import resourcesFooter from "./layoutcomponent/resourcefooter.js";

// import resources của các view component.
import resourcesLogin from "./view/resource_login.js";
import resourcesRegister from "./view/resource_register.js";
import resourcesHome from "./view/resource_home.js";
import resourcesPlay from "./view/resource_play.js";
import resourcesPlayOnline from "./view/resource_play_online.js";
import resourcesGame from "./view/resource_game.js";
import { resourcesForgotPassword } from "./view/resource_forgot_password.js";

/**
 * Đối tượng cung cấp resources cho ứng dụng.
 */
const NVDResource = {
  /**
   * Hàm get giá trị trong đối tượng resources.
   * @param {string} stringPath Mảng đường dẫn, ngăn cách bởi dấu '/'
   * @returns {string} URL.
   * @author NVDung (27-04-2024)
   */
  getURL(stringPath) {
    try {
      let url = null;

      // Chia mảng stringPath thành mảng.
      let arrayPath = stringPath.split("/");

      for (const path of arrayPath) {
        url = url ? url[path] : this[path];
      }

      return url;
    } catch (error) {
      console.error("Lỗi khi lấy URL từ resources: ", error);
    }
  },
  /**
   * Mảng cung cấp class chessman cho ứng dụng.
   */
  resourcesClassChessMan,

  /**
   * Đối tượng cung cấp resources URL từ cloudinary cho Image.
   */
  resourcesImage,

  /**
   * Đối tượng cung cấp resources URL từ cloudinary cho Icon.
   */
  resourcesIcon,

  /**
   * Đối tượng cung cấp resources cho Toast message.
   */
  resourcesToast,

  /**
   * Đối tượng cung cấp resources cho Dialog.
   */
  resourcesDialog,

  /**
   * Đối tượng cung cấp resources cho Dialog OTP.
   */
  resourcesDialogOtp,

  /**
   * Đối tượng chứa thông tin về Button.
   */
  resourceButton,

  /**
   * Đối tượng cung cấp resources cho Notification.
   */
  resourcesNotification,

  /**
   * Đối tượng cung cấp resources cho Sidebar.
   */
  resourcesSideBar,

  /**
   * Đối tượng cung cấp resources cho TextField.
   */
  resourcesTextField,

  /**
   * Đối tượng cung cấp resource cho footer.
   */
  resourcesFooter,

  /**
   * Đối tượng cung cấp resources cho Login.
   */
  resourcesLogin,

  /**
   * Đối tượng cung cấp resources cho Register.
   */
  resourcesRegister,

  /**
   * Đối tượng cung cấp resources cho Home view-component.
   */
  resourcesHome,

  /**
   * Đối tượng cung cấp resources cho Play view-component.
   */
  resourcesPlay,

  /**
   * Đối tượng cung cấp resources cho PlayOnline view-component.
   */
  resourcesPlayOnline,

  /**
   * Đối tượng cung cấp resources cho Game view-component.
   */
  resourcesGame,

  /**
   * Đối tượng cung cấp resources cho ForgotPassword view-component.
   */
  resourcesForgotPassword,
};

export default NVDResource;
