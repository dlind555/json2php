import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import StatusMessage from "@/components/StatusMessage.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("StatusMessage.vue", () => {
  it("Displays no message", () => {
    const getters = {
      statusMessage: () => null,
      contentHasErrors: () => false
    };
    const store = new Vuex.Store({
      getters
    });
    const wrapper = shallowMount(StatusMessage, { store, localVue });
    const span = wrapper.find("span");
    expect(span.element.innerHTML).toBe("");
    const div = wrapper.find("div");
    expect(div.element.className).toContain("bg-blue-100");
  });

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

  it("Displays a multi-line error message", () => {
    const getters = {
      statusMessage: () =>
        "JSON: An error has occurred\nPHP: A different error",
      contentHasErrors: () => true
    };
    const store = new Vuex.Store({
      getters
    });
    const wrapper = shallowMount(StatusMessage, { store, localVue });
    const span = wrapper.find("span");
    expect(span.element.innerHTML).toBe(
      "JSON: An error has occurred<br>\nPHP: A different error"
    );
    const div = wrapper.find("div");
    expect(div.element.classList).toContain("bg-red-300");
  });
});
