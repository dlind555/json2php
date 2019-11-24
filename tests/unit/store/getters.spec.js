import { state as baseState, getters } from "@/store";
import Vuex from "vuex";

describe("getters", () => {
  it("Gets errors flag", () => {
    const state = JSON.parse(JSON.stringify(baseState));
    const store = new Vuex.Store({
      state,
      getters
    });

    expect(store.getters.contentHasErrors).toBe(false);
    state.error = "error";
    expect(store.getters.contentHasErrors).toBe(true);
  });

  it("Gets the message", () => {
    const state = JSON.parse(JSON.stringify(baseState));
    const store = new Vuex.Store({
      state,
      getters
    });

    state.content = "{}";
    // with non-empty content and no parsing errors it shouldn't be possible
    // for contentIsJson/contentIsPHP flags to be false
    expect(store.getters.statusMessage).toBe("Internal state error");
    state.contentIsJson = true;
    state.error = "Error";
    expect(store.getters.statusMessage).toBe("Content is a JSON value\nError");
    state.contentIsPHP = true;
    expect(store.getters.statusMessage).toBe(
      "Content could be both a JSON value or a PHP statement"
    );
    state.contentIsJson = false;
    expect(store.getters.statusMessage).toBe(
      "Error\nContent is valid PHP code"
    );
    state.contentIsJson = true;
    state.contentIsJsonStructure = true;
    state.contentIsPHPArray = true;
    expect(store.getters.statusMessage).toBe(
      "Content is both a PHP array and a JSON array, no need to convert it"
    );
    state.contentIsPHPArray = false;
    expect(store.getters.statusMessage).toBe("Content is a JSON object/array");
    state.contentIsPHPArray = true;
    state.contentIsJsonStructure = false;
    expect(store.getters.statusMessage).toBe("Content is a PHP array");
    state.content = "";
    expect(store.getters.statusMessage).toBe("Content is empty");
    state.error = "Error!";
    state.content = "{}";
    state.contentIsPHP = false;
    state.contentIsPHPArray = false;
    state.contentIsJson = false;
    state.contentIsJsonStructure = false;
    expect(store.getters.statusMessage).toBe("Error!");
    state.message = "Success!";
    expect(store.getters.statusMessage).toBe("Success!");
  });

  it("Gets canConvertFromPHP flag", () => {
    const state = JSON.parse(JSON.stringify(baseState));
    const store = new Vuex.Store({
      state,
      getters
    });

    state.contentIsPHP = false;
    state.contentIsPHPArray = false;
    expect(store.getters.canConvertFromPHP).toBe(false);
    state.contentIsPHP = true;
    expect(store.getters.canConvertFromPHP).toBe(false);
    state.contentIsPHPArray = true;
    expect(store.getters.canConvertFromPHP).toBe(true);
  });

  it("Gets canConvertFromJson flag", () => {
    const state = JSON.parse(JSON.stringify(baseState));
    const store = new Vuex.Store({
      state,
      getters
    });

    state.contentIsJson = false;
    state.contentIsJsonStructure = false;
    expect(store.getters.canConvertFromJson).toBe(false);
    state.contentIsJson = true;
    expect(store.getters.canConvertFromJson).toBe(false);
    state.contentIsJsonStructure = true;
    expect(store.getters.canConvertFromJson).toBe(true);
  });

  it("Gets canConvert flag", () => {
    const state = JSON.parse(JSON.stringify(baseState));
    const store = new Vuex.Store({
      state,
      getters
    });

    expect(store.getters.canConvert).toBe(false);
    state.contentIsJson = true;
    state.contentIsJsonStructure = true;
    expect(store.getters.canConvert).toBe(true);
    state.contentIsPHP = true;
    state.contentIsPHPArray = true;
    // content is both PHP and JSON, no need to convert it
    expect(store.getters.canConvert).toBe(false);
    state.contentIsJson = false;
    expect(store.getters.canConvert).toBe(true);
  });
});
