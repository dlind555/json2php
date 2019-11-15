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
import convertPhpToJson from "@/library/php2json";
import jsonParseOrdered from "@/library/jsonParseOrdered";

export default {
  name: "ButtonConvert",
  computed: {
    ...mapState(["content", "settings"]),
    ...mapGetters(["canConvert", "canConvertFromJson"]),
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
      if (this.canConvertFromJson) {
        let decoded = jsonParseOrdered(this.content);
        let phpString = convertJsonToPhp(
          decoded,
          this.settings.compactMode,
          this.settings.alignValues
        );
        this.$store.dispatch("updateContent", phpString);
        this.$store.commit("setMessage", "Converted to PHP!");
      } else {
        let jsonString = convertPhpToJson(
          this.content,
          this.settings.compactMode,
          this.settings.alignValues
        );
        this.$store.dispatch("updateContent", jsonString);
        this.$store.commit("setMessage", "Converted to JSON!");
      }
    }
  }
};
</script>

<style></style>
