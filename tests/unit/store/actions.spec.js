import { state as baseState, mutations, actions } from "@/store";
import Vuex from "vuex";

describe("actions", () => {
  it("Updates content", () => {
    const state = Object.assign({}, baseState);
    state.message = "Success";

    const store = new Vuex.Store({
      state,
      mutations,
      actions
    });

    store.dispatch("updateContent", "_");
    expect(state.content).toBe("_");
    expect(state.message).toBe("");
    expect(state.contentIsJson).toBe(false);
    expect(state.contentIsJsonValue).toBe(false);
    expect(state.error).toContain("Unexpected token");

    store.dispatch("updateContent", "12345");
    expect(state.content).toBe("12345");
    expect(state.message).toBe("");
    expect(state.contentIsJson).toBe(true);
    expect(state.contentIsJsonValue).toBe(true);
    expect(state.error).toBe("");

    store.dispatch("updateContent", "[12345]");
    expect(state.content).toBe("[12345]");
    expect(state.message).toBe("");
    expect(state.contentIsJson).toBe(true);
    expect(state.contentIsJsonValue).toBe(false);
    expect(state.error).toBe("");

    store.dispatch("updateContent", "");
    expect(state).toEqual(baseState);
  });

  it("Clears content", () => {
    const state = Object.assign({}, baseState, {
      content: "[]",
      message: "message",
      error: "error",
      contentIsJson: true,
      contentIsJsonValue: true
    });

    const store = new Vuex.Store({
      state,
      mutations,
      actions
    });

    store.dispatch("clearContent");
    expect(state).toEqual(baseState);
  });

  it("Resets content", () => {
    const state = Object.assign({}, baseState, {
      error: "error",
      contentIsJson: true,
      contentIsJsonValue: true
    });

    const store = new Vuex.Store({
      state,
      mutations,
      actions
    });

    store.dispatch("resetContent", { content: "Decoded", message: "Success!" });
    expect(state.content).toBe("Decoded");
    expect(state.message).toBe("Success!");
    expect(state.error).toBe("");
    expect(state.contentIsJson).toBe(false);
    // this value is not being updated by the action
    expect(state.contentIsJsonValue).toBe(true);
  });
});
