import Vue from "vue";
import Vuex from "vuex";
import phpParser from "php-parser";

Vue.use(Vuex);

export const state = {
  content: "",
  error: "",
  message: "",
  contentIsJson: false,
  contentIsJsonStructure: false,
  contentIsPHP: false,
  contentIsPHPArray: false
};

export const getters = {
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
      } else if (state.contentIsJson) {
        return state.contentIsJsonStructure
          ? "Content is a JSON object/array"
          : "Content is a JSON value";
      } else {
        return "Internal state error";
      }
    }
  },
  canConvert(state, getters) {
    return (
      (getters.canConvertFromPHP && !getters.canConvertFromJson) ||
      (!getters.canConvertFromPHP && getters.canConvertFromJson)
    );
  },
  canConvertFromPHP(state) {
    return state.contentIsPHP && state.contentIsPHPArray;
  },
  canConvertFromJson(state) {
    return state.contentIsJson && state.contentIsJsonStructure;
  }
};

export const mutations = {
  setContent(state, content) {
    state.content = content;
  },
  setJsonFlag(state, flag) {
    state.contentIsJson = flag;
  },
  setJsonStructureFlag(state, flag) {
    state.contentIsJsonStructure = flag;
  },
  setPHPFlag(state, flag) {
    state.contentIsPHP = flag;
  },
  setPHPArrayFlag(state, flag) {
    state.contentIsPHPArray = flag;
  },
  setError(state, error) {
    state.error = error;
  },
  setMessage(state, message) {
    state.message = message;
  }
};

export const actions = {
  updateContent({ commit }, content) {
    commit("setContent", content);
    commit("setMessage", "");
    if (content === "") {
      commit("setError", "");
      commit("setJsonFlag", false);
      commit("setJsonStructureFlag", false);
      commit("setPHPFlag", false);
      commit("setPHPArrayFlag", false);
      return;
    }
    let errors = [];
    try {
      let decoded = JSON.parse(content);
      commit("setJsonFlag", true);
      if (decoded instanceof Array || decoded instanceof Object) {
        commit("setJsonStructureFlag", true);
      } else {
        commit("setJsonStructureFlag", false);
      }
    } catch (error) {
      errors.push(error.message);
      commit("setJsonFlag", false);
      commit("setJsonStructureFlag", false);
    }
    try {
      let ast = phpParser.parseEval(content);
      commit("setPHPFlag", true);
      if (
        ast.children &&
        ast.children.length == 1 &&
        ast.children[0].kind == "expressionstatement" &&
        ast.children[0].expression.kind == "array"
      ) {
        commit("setPHPArrayFlag", true);
      } else {
        commit("setPHPArrayFlag", false);
      }
    } catch (error) {
      errors.push("PHP Parser: " + error.message);
      commit("setPHPFlag", false);
      commit("setPHPArrayFlag", false);
    }
    commit("setError", errors.join("\n"));
  },
  clearContent({ dispatch }) {
    dispatch("updateContent", "");
  },
  resetContent({ commit }, data) {
    commit("setContent", data.content);
    commit("setMessage", data.message);
    commit("setError", "");
    commit("setJsonFlag", false);
    commit("setJsonStructureFlag", false);
    commit("setPHPFlag", false);
    commit("setPHPArrayFlag", false);
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state,
  getters,
  mutations,
  actions
});
