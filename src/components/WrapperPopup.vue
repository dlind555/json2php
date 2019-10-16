<template>
  <div
    class="absolute bg-teal-100 border-t-4 border-teal rounded-b text-teal-darkest px-4 py-3 ml-8 right-8 shadow-md"
    style="bottom: 0rem; right: 2rem;"
    role="alert"
  >
    <div class="flex">
      <div>
        <p class="font-bold"><slot name="title"></slot></p>
        <p class="text-sm">
          <slot></slot>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WrapperPopup"
};
</script>

<style></style>
