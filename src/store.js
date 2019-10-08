import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    content: ""
  },
  mutations: {
    updateContent(state, content) {
      state.content = content;
    },
    clearContent(state) {
      state.content = "";
    }
  },
  actions: {}
});
