<template>
  <button
    class="text-white font-semi-bold mr-2 py-2 px-4 border rounded"
    :class="buttonStyle"
    :disabled="!canConvert"
  >
    Convert
  </button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ButtonConvert",
  computed: {
    ...mapGetters(["canConvert"]),
    buttonStyle() {
      return this.canConvert
        ? ["bg-blue-500", "hover:bg-blue-700", "border-blue-700"]
        : [
            "bg-blue-500",
            "border-blue-700",
            "opacity-50",
            "cursor-not-allowed"
          ];
    }
  }
};
</script>

<style></style>
