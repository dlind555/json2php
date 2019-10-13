import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import StatusMessage from "@/components/StatusMessage.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("StatusMessage.vue", () => {
  it("Displays a success message", () => {
    const getters = {
      statusMessage: () => "Everything is all right",
      contentHasErrors: () => false
    };
    const store = new Vuex.Store({
      getters
    });
    const wrapper = shallowMount(StatusMessage, { store, localVue });
    const span = wrapper.find("span");
    expect(span.element.innerHTML).toBe("Everything is all right");
    const div = wrapper.find("div");
    expect(div.element.className).toContain("bg-blue-100");
  });

  it("Displays an error message", () => {
    const getters = {
      statusMessage: () => "An error has occurred",
      contentHasErrors: () => true
    };
    const store = new Vuex.Store({
      getters
    });
    const wrapper = shallowMount(StatusMessage, { store, localVue });
    const span = wrapper.find("span");
    expect(span.element.innerHTML).toBe("An error has occurred");
    const div = wrapper.find("div");
    expect(div.element.classList).toContain("bg-red-300");
  });
});
