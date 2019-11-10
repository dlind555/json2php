<template>
  <div id="app" class="lg:max-w-5xl p-8 mx-auto text-gray-800">
    <BaseDescription />
    <SettingsArea />
    <ContentArea />
    <StatusMessage />
    <div class="clearfix">
      <ButtonConvert class="float-left" />
      <ButtonClear class="float-right" />
    </div>
  </div>
</template>

<script>
import "@/assets/css/main.css";
import BaseDescription from "./components/BaseDescription.vue";
import SettingsArea from "./components/SettingsArea.vue";
import ContentArea from "./components/ContentArea.vue";
import StatusMessage from "./components/StatusMessage.vue";
import ButtonConvert from "./components/ButtonConvert.vue";
import ButtonClear from "./components/ButtonClear.vue";

export default {
  name: "app",
  components: {
    BaseDescription,
    SettingsArea,
    ContentArea,
    StatusMessage,
    ButtonConvert,
    ButtonClear
  }
};
</script>

<style lang="css">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
