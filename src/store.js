import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    content: "",
    error: "",
    message: "",
    contentIsJson: false,
    contentIsJsonValue: false
  },
  getters: {
    contentHasErrors(state) {
      return state.error !== "";
    },
    statusMessage(state, getters) {
      if (state.message !== "") {
        return state.message;
      } else if (getters.contentHasErrors) {
        return state.error;
      } else {
        if (state.content === "") {
          return "Content is empty";
        } else if (state.contentIsJsonValue) {
          return "Content is a JSON value";
        } else if (state.contentIsJson) {
          return "Content is a JSON object/array";
        }
      }
    },
    canConvert(state, getters) {
      return (
        !getters.contentHasErrors &&
        state.contentIsJson &&
        !state.contentIsJsonValue
      );
    }
  },
  mutations: {
    setContent(state, content) {
      state.content = content;
    },
    setJsonFlag(state, flag) {
      state.contentIsJson = flag;
    },
    setJsonValueFlag(state, flag) {
      state.contentIsJsonValue = flag;
    },
    setError(state, error) {
      state.error = error;
    },
    setMessage(state, message) {
      state.message = message;
    }
  },
  actions: {
    updateContent({ commit }, content) {
      commit("setContent", content);
      commit("setMessage", "");
      if (content === "") {
        commit("setError", "");
        commit("setJsonFlag", false);
        commit("setJsonValueFlag", false);
        return;
      }
      try {
        let decoded = JSON.parse(content);
        commit("setJsonFlag", true);
        commit("setError", "");
        if (decoded instanceof Array || decoded instanceof Object) {
          commit("setJsonValueFlag", false);
        } else {
          commit("setJsonValueFlag", true);
        }
      } catch (error) {
        commit("setError", error.message);
        commit("setJsonFlag", false);
        commit("setJsonValueFlag", false);
      }
    },
    clearContent({ dispatch }) {
      dispatch("updateContent", "");
    },
    resetContent({ commit }, data) {
      commit("setContent", data.content);
      commit("setMessage", data.message);
      commit("setError", "");
      commit("setJsonFlag", false);
    }
  }
});
