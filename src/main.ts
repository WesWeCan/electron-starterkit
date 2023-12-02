
import { createApp } from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
import "./styles/index.scss"

import { useManager } from "./assets/Manager";

const app = createApp(App).use(router);
const manager = useManager(app);

app.mount("#app");