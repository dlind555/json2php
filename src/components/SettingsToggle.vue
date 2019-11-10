<template>
  <label class="flex items-center cursor-pointer">
    <div class="relative">
      <input
        type="checkbox"
        class="hidden"
        :disabled="disabled"
        :checked="value"
        @change="$emit('input', $event.target.checked)"
      />
      <div class="w-10 h-5 bg-gray-400 rounded-full"></div>
      <div
        class="dot w-5 h-5 rounded-full absolute inset-y-0 left-0"
        :class="dotStyle"
      ></div>
    </div>
    <div class="ml-2 text-sm" :class="labelStyle">
      {{ label }}
    </div>
  </label>
</template>

<script>
export default {
  name: "SettingsToggle",
  props: {
    value: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    dotStyle() {
      return {
        "bg-blue-300": !this.disabled && this.value,
        "bg-gray-500": this.disabled || !this.value
      };
    },
    labelStyle() {
      return {
        "text-gray-500": this.disabled,
        "text-gray-700": !this.disabled
      };
    }
  }
};
</script>

<style scoped lang="postcss">
.dot {
  transition: all 0.25s;
}

input:checked ~ .dot {
  transform: translateX(100%);
}
</style>
