<template>
  <div>
    <navbar :sess-key="scanData.sessKey"></navbar>
    <semester-block
      v-for="semester in scanData.semesters"
      :key="semester.name"
      :semester="semester"
    />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import SemesterBlock from "@/components/SemesterBlock";
export default {
  name: "Home",
  components: { SemesterBlock, Navbar },
  data() {
    return {
      /**
       * @type {ScanData}
       */
      scanData: {
        sessKey: "",
        semesters: [],
      },
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
