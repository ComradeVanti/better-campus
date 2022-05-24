<template><navbar></navbar></template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "Home",
  components: { Navbar },
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
