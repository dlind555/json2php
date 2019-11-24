import { state as baseState, mutations, actions } from "@/store";
import Vuex from "vuex";

describe("actions", () => {
  it("Updates content", () => {
    const state = JSON.parse(JSON.stringify(baseState));
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
    expect(state.contentIsJsonStructure).toBe(false);
    expect(state.contentIsPHP).toBe(false);
    expect(state.contentIsPHPArray).toBe(false);
    expect(state.error).toContain("Unexpected token");
    expect(state.error).toContain("Parse Error");

    store.dispatch("updateContent", "12345");
    expect(state.content).toBe("12345");
    expect(state.message).toBe("");
    expect(state.contentIsJson).toBe(true);
    expect(state.contentIsJsonStructure).toBe(false);
    expect(state.contentIsPHP).toBe(true);
    expect(state.contentIsPHPArray).toBe(false);
    expect(state.error).toBe("");

    store.dispatch("updateContent", "[12345]");
    expect(state.content).toBe("[12345]");
    expect(state.message).toBe("");
    expect(state.contentIsJson).toBe(true);
    expect(state.contentIsJsonStructure).toBe(true);
    expect(state.contentIsPHP).toBe(true);
    expect(state.contentIsPHPArray).toBe(true);
    expect(state.error).toBe("");

    store.dispatch("updateContent", '{"key":12345}');
    expect(state.content).toBe('{"key":12345}');
    expect(state.message).toBe("");
    expect(state.contentIsJson).toBe(true);
    expect(state.contentIsJsonStructure).toBe(true);
    expect(state.contentIsPHP).toBe(false);
    expect(state.contentIsPHPArray).toBe(false);
    expect(state.error).toContain("Parse Error");

    store.dispatch("updateContent", "$a = 5;");
    expect(state.content).toBe("$a = 5;");
    expect(state.message).toBe("");
    expect(state.contentIsJson).toBe(false);
    expect(state.contentIsJsonStructure).toBe(false);
    expect(state.contentIsPHP).toBe(true);
    expect(state.contentIsPHPArray).toBe(false);
    expect(state.error).toContain("Unexpected token");

    store.dispatch("updateContent", '["test" => "php"]');
    expect(state.content).toBe('["test" => "php"]');
    expect(state.message).toBe("");
    expect(state.contentIsJson).toBe(false);
    expect(state.contentIsJsonStructure).toBe(false);
    expect(state.contentIsPHP).toBe(true);
    expect(state.contentIsPHPArray).toBe(true);
    expect(state.error).toContain("Unexpected token");

    store.dispatch("updateContent", "");
    expect(state).toEqual(baseState);
  });

  it("Clears content", () => {
    const state = Object.assign(JSON.parse(JSON.stringify(baseState)), {
      content: "[]",
      message: "message",
      error: "error",
      contentIsJson: true,
      contentIsJsonStructure: true,
      contentIsPHP: true,
      contentIsPHPArray: true
    });

    const store = new Vuex.Store({
      state,
      mutations,
      actions
    });

    store.dispatch("clearContent");
    expect(state).toEqual(baseState);
  });
});
