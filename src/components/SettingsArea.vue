<template>
  <div class="flex flex-row-reverse">
    <SettingsToggle
      class="ml-4"
      v-model="settings.compactMode"
      :disabled="false"
      label="Compact"
    />
    <SettingsToggle
      v-model="settings.alignValues"
      :disabled="settings.compactMode"
      label="Align Array Values"
    />
  </div>
</template>

<script>
import SettingsToggle from "./SettingsToggle.vue";

export default {
  name: "SettingsArea",
  components: {
    SettingsToggle
  },
  data() {
    return {
      settings: JSON.parse(JSON.stringify(this.$store.state.settings))
    };
  },
  watch: {
    settings: {
      deep: true,
      handler(value) {
        this.$store.commit("setSettings", value);
      }
    }
  }
};
</script>

<style></style>
