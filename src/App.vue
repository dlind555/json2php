<template>
  <div id="app" class="lg:max-w-5xl p-8 mx-auto text-gray-800">
    <div>
      <h2 class="text-2xl">JSON to PHP Array encoder / decoder</h2>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </div>
    <div class="my-4 border rounded overflow-hidden">
      <textarea class="w-full h-48 px-4 overflow-auto resize-y">
        test test test test test test test test test test test 
        test test test test test test test test test test test 
        test test test test test test test test test test test 
        test test test test test test test test test test test 
        test test test test test test test test test test test 
        test test test test test test test test test test test 
        test test test test test test test test test test test 
        test test test test test test test test test test test 
        test test test test test test test test test test test 
        test test test test test test test test test test test 
        test test test test test test test test test test test 
        test test test test test test test test test test test 
        test test test test test test test test test test test 
        test test test test test test test test test test test 
        test test test test test test test test test test test 
        test test test test test test test test test test test 
        test test test test test test test test test test test 
        test test test test test test test test test test test 
      </textarea>
    </div>
    <div
      class="bg-red-300 border border-red-400 text-red-700 mb-4 px-4 py-3 rounded text-sm relative"
      role="alert"
    >
      <strong class="font-bold">Error! </strong>
      <span class="block sm:inline">An undefined error has occurred.</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          class="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
          />
        </svg>
      </span>
    </div>
    <div class="clearfix">
      <button
        class="float-left bg-blue-500 hover:bg-blue-700 text-white font-semi-bold mr-2 py-2 px-4 border border-blue-700 rounded"
      >
        To JSON
      </button>
      <button
        class="float-left bg-blue-500 hover:bg-blue-700 text-white font-semi-bold mr-2 py-2 px-4 border border-blue-700 rounded"
      >
        To PHP
      </button>
      <button
        class="float-right bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white font-semi-bold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Clear
      </button>
    </div>
  </div>
</template>

<script>
import "@/assets/css/main.css";

export default {
  name: "app"
};
</script>

<style lang="css">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
