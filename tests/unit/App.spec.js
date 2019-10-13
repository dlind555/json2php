import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import BaseDescription from "@/components/BaseDescription.vue";
import ContentArea from "@/components/ContentArea.vue";
import StatusMessage from "@/components/StatusMessage.vue";
import ButtonConvert from "@/components/ButtonConvert.vue";
import ButtonClear from "@/components/ButtonClear.vue";

describe("App.vue", () => {
  it("Renders the app", () => {
    const wrapper = shallowMount(App);
    expect(wrapper.contains("div#app")).toBe(true);
  });

  it("Contains all the child components", () => {
    const wrapper = shallowMount(App);
    expect(wrapper.contains(BaseDescription)).toBe(true);
    expect(wrapper.contains(ContentArea)).toBe(true);
    expect(wrapper.contains(StatusMessage)).toBe(true);
    expect(wrapper.contains(ButtonConvert)).toBe(true);
    expect(wrapper.contains(ButtonClear)).toBe(true);
  });
});
