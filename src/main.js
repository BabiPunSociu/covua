/* ==================== IMPORT CSS ==================== */
import "./assets/css/main.css";

/* ==================== IMPORT LIBRARIES ==================== */
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

/* ==================== IMPORT JS FILE ==================== */
// Đối tượng NVDEnum
import NVDEnum from "./js/enum.js";
// Đối tượng NVDResource
import NVDResource from "./js/resource.js";
// function playSoundEffect()
import playSoundEffect from "./js/cloudinary/sound-effect.js";
// function createChessMan()
import createChessMan from "./js/chessman/create-chessman.js";
// class targetChessMan
import targetChessMan from "./js/targetchessman/target-chessman.js";
// function checkEndGame()
import checkEndGame from "./js/checkgameend/check-end-game.js";

/* ==================== CREATE APP (Instance) ==================== */
const app = createApp(App);

/* ==================== CREATE GLOBAL VARIABLE ==================== */
app.config.globalProperties.$enum = NVDEnum;
app.config.globalProperties.$resource = NVDResource;
app.config.globalProperties.$playSoundEffect = playSoundEffect;
app.config.globalProperties.$createChessMan = createChessMan;
app.config.globalProperties.$targetChessMan = targetChessMan;
app.config.globalProperties.$checkEndGame = checkEndGame;

app.use(createPinia());
// app.use(router);

app.mount("#app");
