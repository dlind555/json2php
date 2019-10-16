<template>
  <div>
    <App class="min-h-screen pb-20" />
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
  }
};
</script>

<style lang="css"></style>
