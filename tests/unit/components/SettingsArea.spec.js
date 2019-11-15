import { state as baseState, mutations } from "@/store";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import SettingsArea from "@/components/SettingsArea.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("SettingsArea.vue", () => {
  it("Creates local copy of settings", () => {
    const state = JSON.parse(JSON.stringify(baseState));
    const store = new Vuex.Store({
      state
    });
    const wrapper = shallowMount(SettingsArea, { store, localVue });
    expect(wrapper.vm.$data.settings).toEqual(state.settings);
    expect(wrapper.vm.$data.settings).not.toBe(state.settings);
  });

  it("Updates store settings on local change", () => {
    const state = JSON.parse(JSON.stringify(baseState));
    const store = new Vuex.Store({
      state,
      mutations
    });
    const wrapper = shallowMount(SettingsArea, { store, localVue });
    wrapper.vm.$data.settings.compactMode = !wrapper.vm.$data.settings
      .compactMode;
    expect(state.settings).toEqual(wrapper.vm.$data.settings);
  });
});
