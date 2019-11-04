import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ButtonConvert from "@/components/ButtonConvert.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ButtonConvert.vue", () => {
  it("Button is enabled if content can be converted", () => {
    const getters = {
      canConvert: () => true
    };
    const store = new Vuex.Store({
      getters
    });
    const wrapper = shallowMount(ButtonConvert, { store, localVue });
    const button = wrapper.find("button");
    expect(button.element.disabled).toBe(false);
    expect(button.element.className).not.toContain("cursor-not-allowed");
  });

  it("Button is disabled if content can not be converted", () => {
    const getters = {
      canConvert: () => false
    };
    const store = new Vuex.Store({
      getters
    });
    const wrapper = shallowMount(ButtonConvert, { store, localVue });
    const button = wrapper.find("button");
    expect(button.element.disabled).toBe(true);
    expect(button.element.className).toContain("cursor-not-allowed");
  });

  it("Converts content from JSON on button click", () => {
    const getters = {
      canConvert: () => true,
      canConvertFromJson: () => true
    };
    const updateContent = jest.fn();
    const setMessage = jest.fn();
    const actions = { updateContent };
    const mutations = { setMessage };
    const state = {
      content: "[]"
    };
    const store = new Vuex.Store({
      state,
      getters,
      mutations,
      actions
    });
    const wrapper = shallowMount(ButtonConvert, { store, localVue });
    const button = wrapper.find("button");
    button.trigger("click");
    expect(updateContent.mock.calls.length).toBe(1);
    expect(setMessage.mock.calls.length).toBe(1);
    expect(setMessage.mock.calls[0][1]).toBe("Converted to PHP!");
  });

  it("Converts content from PHP on button click", () => {
    const getters = {
      canConvert: () => true,
      canConvertFromJson: () => false
    };
    const updateContent = jest.fn();
    const setMessage = jest.fn();
    const actions = { updateContent };
    const mutations = { setMessage };
    const state = {
      content: "[]"
    };
    const store = new Vuex.Store({
      state,
      getters,
      mutations,
      actions
    });
    const wrapper = shallowMount(ButtonConvert, { store, localVue });
    const button = wrapper.find("button");
    button.trigger("click");
    expect(updateContent.mock.calls.length).toBe(1);
    expect(setMessage.mock.calls.length).toBe(1);
    expect(setMessage.mock.calls[0][1]).toBe("Converted to JSON!");
  });
});
