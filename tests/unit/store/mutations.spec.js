import { state, mutations } from "@/store";

describe("mutations", () => {
  it("Sets content", () => {
    const localState = Object.assign({}, state);

    mutations.setContent(localState, "new content");

    const expectedState = Object.assign({}, state);
    expectedState.content = "new content";
    expect(localState).toEqual(expectedState);
  });

  it("Sets jsonFlag", () => {
    const localState = Object.assign({}, state);

    mutations.setJsonFlag(localState, true);

    const expectedState = Object.assign({}, state);
    expectedState.contentIsJson = true;
    expect(localState).toEqual(expectedState);
  });

  it("Sets jsonStructureFlag", () => {
    const localState = Object.assign({}, state);

    mutations.setJsonStructureFlag(localState, true);

    const expectedState = Object.assign({}, state);
    expectedState.contentIsJsonStructure = true;
    expect(localState).toEqual(expectedState);
  });

  it("Sets error", () => {
    const localState = Object.assign({}, state);

    mutations.setError(localState, "error");

    const expectedState = Object.assign({}, state);
    expectedState.error = "error";
    expect(localState).toEqual(expectedState);
  });

  it("Sets message", () => {
    const localState = Object.assign({}, state);

    mutations.setMessage(localState, "message");

    const expectedState = Object.assign({}, state);
    expectedState.message = "message";
    expect(localState).toEqual(expectedState);
  });
});
