<template>
  <div class="w-full bg-blue-200 h-16 -mt-16">
    <div class="w-full lg:max-w-5xl mx-auto relative">
      <ul class="px-8 list-reset text-blue-700 text-base">
        <li class="inline-block float-left h-16 py-4">
          &copy; 2019
        </li>
        <li
          class="inline-block float-right cursor-pointer h-16 py-4"
          @click="toggleShow('showPP')"
        >
          Privacy Policy
          <span :class="{ expanded: showPP }">&rsaquo;</span>
        </li>
        <li
          class="inline-block float-right cursor-pointer mr-3 h-16 py-4"
          @click="toggleShow('showTC')"
        >
          Terms and Conditions
          <span :class="{ expanded: showTC }">&rsaquo;</span>
        </li>
      </ul>

      <WrapperPopup v-if="showPP">
        <template #title>
          Privacy Policy
        </template>
        This is a client-side app and all the conversions are being done locally
        in your browser using Javascript. No user-provided data is being sent to
        our servers. Your IP address and the browser information is available to
        the server while loading the website, but they are not being stored and
        are not associated with any personally identifiable information. No
        cookies are being used.
      </WrapperPopup>

      <WrapperPopup v-if="showTC">
        <template #title>
          Terms and Conditions
        </template>
        By using the application you agree to these terms and conditions. This
        software is provided "AS-IS" and we are not liable for any outcomes
        resulting from the usage of the application and offer no warranty. Your
        access to the application is free of charge, but can not be guaranteed
        and can be revoked at any time. You agree to not use the software for
        any illegal activity or any other manner which violates any applicable
        laws. These terms may be modified at any time with or without notice.
      </WrapperPopup>
    </div>
  </div>
</template>

<script>
import WrapperPopup from "./WrapperPopup.vue";

export default {
  name: "WrapperFooter",
  components: {
    WrapperPopup
  },
  data() {
    return {
      showPP: false,
      showTC: false
    };
  },
  methods: {
    toggleShow(flag) {
      this.showPP = flag === "showPP" ? !this.showPP : false;
      this.showTC = flag === "showTC" ? !this.showTC : false;
    }
  }
};
</script>

<style scoped>
span.expanded {
  transform: translate(-0.25rem, 0.125rem) rotate(-90deg);
  display: inline-block;
}
</style>
