import Vue from "vue";
import Vuex from "vuex";
import convertPhpToJson from "@/library/php2json";

Vue.use(Vuex);

export const state = {
  content: "",
  error: "",
  message: "",
  contentIsJson: false,
  contentIsJsonStructure: false,
  contentIsPHP: false,
  contentIsPHPArray: false,
  settings: {
    alignValues: true,
    compactMode: false
  }
};

export const getters = {
  contentHasErrors(state) {
    return state.error !== "";
  },
  statusMessage(state, getters) {
    if (state.message !== "") {
      return state.message;
    }
    if (state.content === "") {
      return "Content is empty";
    }
    if (getters.canConvert) {
      return getters.canConvertFromPHP
        ? "Content is a PHP array"
        : "Content is a JSON object/array";
    }
    if (getters.canConvertFromJson && getters.canConvertFromPHP) {
      return "Content is both a PHP array and a JSON array, no need to convert it";
    }
    if (state.contentIsJson && !state.contentIsPHP) {
      return "Content is a JSON value\n" + state.error;
    }
    if (!state.contentIsJson && state.contentIsPHP) {
      return state.error + "\nContent is valid PHP code";
    }
    if (state.contentIsJson && state.contentIsPHP) {
      return "Content could be both a JSON value or a PHP statement";
    }
    if (getters.contentHasErrors) {
      return state.error;
    }
    return "Internal state error";
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
  },
  setSettings(state, settings) {
    state.settings = JSON.parse(JSON.stringify(settings));
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
      convertPhpToJson(content);
      commit("setPHPFlag", true);
      commit("setPHPArrayFlag", true);
    } catch (error) {
      if (error instanceof TypeError) {
        commit("setPHPFlag", true);
        commit("setPHPArrayFlag", false);
      } else {
        errors.push("PHP Parser: " + error.message);
        commit("setPHPFlag", false);
        commit("setPHPArrayFlag", false);
      }
    }
    commit("setError", errors.join("\n"));
  },
  clearContent({ dispatch }) {
    dispatch("updateContent", "");
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state,
  getters,
  mutations,
  actions
});
