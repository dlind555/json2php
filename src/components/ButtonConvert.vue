<template>
  <button
    class="text-white font-semi-bold mr-2 py-2 px-4 border rounded"
    :class="buttonStyle"
    :disabled="!canConvert"
    @click="convert"
  >
    Convert
  </button>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import convertJsonToPhp from "@/library/json2php";
import jsonParseOrdered from "@/library/jsonParseOrdered";

export default {
  name: "ButtonConvert",
  computed: {
    ...mapState(["content"]),
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
  },
  methods: {
    convert() {
      let decoded = jsonParseOrdered(this.content);
      let phpString = convertJsonToPhp(decoded);
      this.$store.dispatch("resetContent", {
        content: phpString,
        message: "Converted to PHP!"
      });
    }
  }
};
</script>

<style></style>
