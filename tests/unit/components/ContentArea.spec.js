import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ContentArea from "@/components/ContentArea.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ContentArea.vue", () => {
  it("Displays content in textarea", () => {
    const state = {
      content: "test content"
    };
    const store = new Vuex.Store({
      state
    });
    const wrapper = shallowMount(ContentArea, { store, localVue });
    const textarea = wrapper.find("textarea");
    expect(textarea.element.value).toBe("test content");
  });

  it("Updates content on input", () => {
    const actions = {
      updateContent: jest.fn()
    };
    const store = new Vuex.Store({
      actions
    });
    const wrapper = shallowMount(ContentArea, { store, localVue });
    const textarea = wrapper.find("textarea");
    textarea.trigger("input");
    expect(actions.updateContent).toHaveBeenCalled();
  });
});
