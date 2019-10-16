import Vue from "vue";
import WrapperApp from "./WrapperApp.vue";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(WrapperApp)
}).$mount("#app");
