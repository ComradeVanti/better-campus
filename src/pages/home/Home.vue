<template><div></div></template>

<script>
export default {
  name: "Home",
  data() {
    return {
      /**
       * @type {ScanData}
       */
      scanData: {},
    };
  },
  mounted() {
    const app = document.querySelector("#app");
    this.scanData = JSON.parse(app.getAttribute("scan-data"));
    app.removeAttribute("scan-data");
  },
};
</script>

<style>
@import "@/assets/global.css";

body {
  background-size: cover;
  background-position: center;
  color: white;
}

</style>
