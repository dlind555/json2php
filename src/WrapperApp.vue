<template>
  <div>
    <App @click.native="closePopups" class="min-h-screen pb-20" />
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
    closePopups($event) {
      this.$children[1].showPP=false;
      this.$children[1].showTC=false;
    }
  }
};
</script>

<style lang="css"></style>
