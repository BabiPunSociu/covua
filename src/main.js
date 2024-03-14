import "./assets/css/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// import js globals
import NVDEnum from "./js/enum.js";
import NVDResource from "./js/resource.js";
import playSoundEffect from "./js/cloudinary/soundEffect.js";
import createChessMan from "./js/chessman/createChessMan.js";
const app = createApp(App);

// Tạo biến globals
app.config.globalProperties.$enum = NVDEnum;
app.config.globalProperties.$resource = NVDResource;
app.config.globalProperties.$playSoundEffect = playSoundEffect;
app.config.globalProperties.$createChessMan = createChessMan;

app.use(createPinia());
// app.use(router);

app.mount("#app");
