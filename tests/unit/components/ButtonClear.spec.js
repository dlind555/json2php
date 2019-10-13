import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ButtonClear from "@/components/ButtonClear.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ButtonClear.vue", () => {
  it("Clears content on button click", () => {
    const actions = {
      clearContent: jest.fn()
    };
    const store = new Vuex.Store({
      actions
    });
    const wrapper = shallowMount(ButtonClear, { store, localVue });
    const button = wrapper.find("button");
    button.trigger("click");
    expect(actions.clearContent).toHaveBeenCalled();
  });
});
