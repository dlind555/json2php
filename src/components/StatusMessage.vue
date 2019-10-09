<template>
  <div
    class="border mb-4 px-4 py-3 rounded text-sm relative"
    :class="statusStyle"
    role="alert"
  >
    <span class="block sm:inline">{{ statusMessage }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "StatusMessage",
  computed: {
    ...mapGetters(["contentHasErrors", "statusMessage"]),
    statusStyle() {
      return this.contentHasErrors
        ? ["bg-red-300", "border-red-400", "text-red-700"]
        : ["bg-blue-100", "border-blue-200", "text-blue-600"];
    }
  }
};
</script>

<style></style>
