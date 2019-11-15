import { shallowMount } from "@vue/test-utils";
import SettingsToggle from "@/components/SettingsToggle.vue";

describe("SettingsToggle.vue", () => {
  it("Calculates the dot style", () => {
    let toggle = shallowMount(SettingsToggle, {
      propsData: {
        disabled: false,
        value: false,
        label: ""
      }
    });
    expect(toggle.vm.dotStyle).toEqual({
      "bg-blue-300": false,
      "bg-gray-500": true
    });
    toggle.setProps({ disabled: true });
    expect(toggle.vm.dotStyle).toEqual({
      "bg-blue-300": false,
      "bg-gray-500": true
    });
    toggle.setProps({ value: true });
    expect(toggle.vm.dotStyle).toEqual({
      "bg-blue-300": false,
      "bg-gray-500": true
    });
    toggle.setProps({ disabled: false });
    expect(toggle.vm.dotStyle).toEqual({
      "bg-blue-300": true,
      "bg-gray-500": false
    });
  });

  it("Calculates the label style", () => {
    let toggle = shallowMount(SettingsToggle, {
      propsData: {
        disabled: false,
        value: false,
        label: ""
      }
    });
    expect(toggle.vm.labelStyle).toEqual({
      "text-gray-500": false,
      "text-gray-700": true
    });
    toggle.setProps({ disabled: true });
    expect(toggle.vm.labelStyle).toEqual({
      "text-gray-500": true,
      "text-gray-700": false
    });
  });
});
