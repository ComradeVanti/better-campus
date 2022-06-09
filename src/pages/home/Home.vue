<template>
  <div class="page">
    <navbar :sess-key="scanData.sessKey"></navbar>
    <div class="page-content">
      <SemesterNav :semesters="scanData.courseNav.semesters" />
    </div>
    <plug />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Plug from "@/components/Plug";
import SemesterNav from "@/components/SemesterNav";

export default {
  name: "Home",
  components: { SemesterNav, Plug, Navbar },
  data() {
    return {
      /**
       * @type {HomeScanData}
       */
      scanData: {
        sessKey: "",
        courseNav: { semesters: [] },
      },
    };
  },
  created() {
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
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.page {
  padding-top: var(--space-regular);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  padding: var(--space-large);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: var(--space-large);
  gap: var(--space-large);
}
</style>
