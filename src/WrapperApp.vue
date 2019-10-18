<template>
  <div>
    <div @click.stop="closePopups" class="w-full">
      <App class="min-h-screen pb-20" />
    </div>
    <WrapperFooter />
  </div>
</template>

<script>
import App from "./App.vue";
import WrapperFooter from "./components/WrapperFooter.vue";

export default {
  name: "wrapper",
  components: {
    App,
    WrapperFooter
  },
  methods: {
    closePopups() {
      // this is fine since the wrapper components are rather small
      // and tightly coupled anyway
      this.$children[1].showPP = false;
      this.$children[1].showTC = false;
    }
  }
};
</script>

<style lang="css"></style>
