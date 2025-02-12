/* ==================== IMPORT SCSS ==================== */
import "./assets/scss/main.scss";

/* ==================== IMPORT LIBRARIES ==================== */
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import emitter from "tiny-emitter/instance";
import axios from "axios";

/* ==================== IMPORT JS FILE ==================== */
// Đối tượng NVDEnum
import NVDEnum from "./js/enum.js";
// Đối tượng NVDResource
import NVDResource from "./js/resources/resource.js";
// Đối tượng NVDHelper
import NVDHelper from "./js/helper/helper.js";
// function playSoundEffect()
import playSoundEffect from "./js/cloudinary/sound-effect.js";
// function createChessMan()
import createChessMan from "./js/chessman/create-chessman.js";
// class targetChessMan
import targetChessMan from "./js/targetchessman/target-chessman.js";
// function checkEndGame()
import checkEndGame from "./js/checkgameend/check-end-game.js";
// Đối tượng NVDValidator
import NVDValidator from "./js/validate/validate-input.js";
// class Toast
import toast from "./js/classconstructor/toast.js";
// class Dialog
import dialog from "./js/classconstructor/dialog.js";

/* ==================== IMPORT VUE COMPONENT ==================== */
import NVDButton from "./components/base/buttons/NVDButton.vue";
import NVDLabelVue from "./components/base/label/NVDLabel.vue";
import NVDTextField from "./components/base/textfield/NVDTextField.vue";
import NVDCombobox from "./components/base/combobox/NVDCombobox.vue";
import NVDCheckbox from "./components/base/checkbox/NVDCheckbox.vue";
import NVDRadioButton from "./components/base/radiobutton/NVDRadioButton.vue";
import NVDDialog from "./components/base/dialog/NVDDialog.vue";
import NVDLoading from "./components/base/loading/NVDLoading.vue";
import NVDToast from "./components/base/toast/NVDToast.vue";
import NVDForm from "./components/base/form/NVDForm.vue";
import NVDChessBoard from "./components/base/chessboard/NVDChessBoard.vue";
import NVDDialogOtp from "./components/base/dialogotp/NVDDialogOtp.vue";

import NotificationHub from "./components/base/signalR/NotificationHub.vue";
import GameHub from "./components/base/signalR/GameHub.vue";
/* ==================== CREATE APP (Instance) ==================== */
const app = createApp(App);

/* ==================== COMPONENT GLOBAL ==================== */
app.component("m-button", NVDButton);
app.component("m-label", NVDLabelVue);
app.component("m-text-field", NVDTextField);
app.component("m-combobox", NVDCombobox);
app.component("m-checkbox", NVDCheckbox);
app.component("m-radio", NVDRadioButton);
app.component("m-dialog", NVDDialog);
app.component("m-dialog-otp", NVDDialogOtp);
app.component("m-loading", NVDLoading);
app.component("m-toast", NVDToast);
app.component("m-form", NVDForm);
app.component("m-chess-board", NVDChessBoard);
app.component("m-notification-hub", NotificationHub);
app.component("m-game-hub", GameHub);

/* ==================== CREATE GLOBAL VARIABLE ==================== */
app.config.globalProperties.$enum = NVDEnum;
app.config.globalProperties.$resource = NVDResource;
app.config.globalProperties.$helper = NVDHelper;
app.config.globalProperties.$validator = NVDValidator;
app.config.globalProperties.$playSoundEffect = playSoundEffect;
app.config.globalProperties.$createChessMan = createChessMan;
app.config.globalProperties.$targetChessMan = targetChessMan;
app.config.globalProperties.$checkEndGame = checkEndGame;
app.config.globalProperties.$emitter = emitter;
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$toast = toast;
app.config.globalProperties.$dialog = dialog;

// Add Middleware
app.use(createPinia());
app.use(router);

app.mount("#app");
