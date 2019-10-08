<template>
  <button
    class="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white font-semi-bold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    @click="clearContent"
  >
    Clear
  </button>
</template>

<script>
export default {
  name: "ButtonClear",
  methods: {
    clearContent() {
      this.$store.commit("clearContent");
    }
  }
};
</script>

<style></style>
