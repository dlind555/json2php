import { state as baseState, getters } from "@/store";
import Vuex from "vuex";

describe("getters", () => {
  it("Gets errors flag", () => {
    const state = Object.assign({}, baseState);
    const store = new Vuex.Store({
      state,
      getters
    });

    expect(store.getters.contentHasErrors).toBe(false);
    state.error = "error";
    expect(store.getters.contentHasErrors).toBe(true);
  });

  it("Gets the message", () => {
    const state = Object.assign({}, baseState);
    const store = new Vuex.Store({
      state,
      getters
    });

    state.content = "{}";
    // with non-empty content and no json parsing error it shouldn't be possible
    // for contentIsJson flag to be false
    expect(store.getters.statusMessage).toBe("Internal state error");
    state.contentIsJson = true;
    expect(store.getters.statusMessage).toBe("Content is a JSON value");
    state.contentIsJsonStructure = true;
    expect(store.getters.statusMessage).toBe("Content is a JSON object/array");
    state.content = "";
    expect(store.getters.statusMessage).toBe("Content is empty");
    state.error = "Error!";
    expect(store.getters.statusMessage).toBe("Error!");
    state.message = "Success!";
    expect(store.getters.statusMessage).toBe("Success!");
  });

  it("Gets canConvert flag", () => {
    const state = Object.assign({}, baseState);
    const store = new Vuex.Store({
      state,
      getters
    });

    state.error = "error";
    state.contentIsJson = false;
    state.contentIsJsonStructure = false;
    expect(store.getters.canConvert).toBe(false);
    state.contentIsJsonStructure = true;
    expect(store.getters.canConvert).toBe(false);
    state.contentIsJson = true;
    state.contentIsJsonStructure = false;
    expect(store.getters.canConvert).toBe(false);
    state.contentIsJsonStructure = true;
    expect(store.getters.canConvert).toBe(false);

    state.error = "";
    state.contentIsJson = false;
    state.contentIsJsonStructure = false;
    expect(store.getters.canConvert).toBe(false);
    state.contentIsJson = true;
    expect(store.getters.canConvert).toBe(false);
    state.contentIsJsonStructure = true;
    expect(store.getters.canConvert).toBe(true);
  });
});
