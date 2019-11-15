import { state, mutations } from "@/store";

describe("mutations", () => {
  it("Sets content", () => {
    const localState = JSON.parse(JSON.stringify(state));

    mutations.setContent(localState, "new content");

    const expectedState = JSON.parse(JSON.stringify(state));
    expectedState.content = "new content";
    expect(localState).toEqual(expectedState);
  });

  it("Sets jsonFlag", () => {
    const localState = JSON.parse(JSON.stringify(state));

    mutations.setJsonFlag(localState, true);

    const expectedState = JSON.parse(JSON.stringify(state));
    expectedState.contentIsJson = true;
    expect(localState).toEqual(expectedState);
  });

  it("Sets jsonStructureFlag", () => {
    const localState = JSON.parse(JSON.stringify(state));

    mutations.setJsonStructureFlag(localState, true);

    const expectedState = JSON.parse(JSON.stringify(state));
    expectedState.contentIsJsonStructure = true;
    expect(localState).toEqual(expectedState);
  });

  it("Sets PHPFlag", () => {
    const localState = JSON.parse(JSON.stringify(state));

    mutations.setPHPFlag(localState, true);

    const expectedState = JSON.parse(JSON.stringify(state));
    expectedState.contentIsPHP = true;
    expect(localState).toEqual(expectedState);
  });

  it("Sets PHPArrayFlag", () => {
    const localState = JSON.parse(JSON.stringify(state));

    mutations.setPHPArrayFlag(localState, true);

    const expectedState = JSON.parse(JSON.stringify(state));
    expectedState.contentIsPHPArray = true;
    expect(localState).toEqual(expectedState);
  });

  it("Sets error", () => {
    const localState = JSON.parse(JSON.stringify(state));

    mutations.setError(localState, "error");

    const expectedState = JSON.parse(JSON.stringify(state));
    expectedState.error = "error";
    expect(localState).toEqual(expectedState);
  });

  it("Sets message", () => {
    const localState = JSON.parse(JSON.stringify(state));

    mutations.setMessage(localState, "message");

    const expectedState = JSON.parse(JSON.stringify(state));
    expectedState.message = "message";
    expect(localState).toEqual(expectedState);
  });

  it("Sets settings", () => {
    const localState = JSON.parse(JSON.stringify(state));

    mutations.setSettings(localState, {
      alignValues: false,
      compactMode: true
    });

    const expectedState = JSON.parse(JSON.stringify(state));
    expectedState.settings.alignValues = false;
    expectedState.settings.compactMode = true;
    expect(localState).toEqual(expectedState);
  });
});
