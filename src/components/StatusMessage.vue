<template>
  <div
    class="border mb-4 px-4 py-3 rounded text-sm relative"
    :class="statusStyle"
    role="alert"
  >
    <span
      class="block sm:inline"
      v-html="$options.filters.nl2br(statusMessage)"
    ></span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "StatusMessage",
  filters: {
    nl2br: function(value) {
      if (typeof value === "undefined" || value === null) {
        return "";
      }
      return (value + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1<br>$2");
    }
  },
  computed: {
    ...mapGetters(["contentHasErrors", "canConvert", "statusMessage"]),
    statusStyle() {
      return this.contentHasErrors && !this.canConvert
        ? ["bg-red-300", "border-red-400", "text-red-700"]
        : ["bg-blue-100", "border-blue-200", "text-blue-600"];
    }
  }
};
</script>

<style></style>
