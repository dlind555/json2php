<template>
  <div class="my-4 border rounded overflow-hidden">
    <textarea
      class="w-full h-48 px-4 py-1 overflow-auto resize-y"
      :value="content"
      @input="updateContent"
    ></textarea>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ContentArea",
  computed: {
    ...mapState({
      content: state => state.content
    })
  },
  methods: {
    updateContent($event) {
      this.$store.dispatch("updateContent", $event.target.value);
    }
  }
};
</script>

<style></style>
