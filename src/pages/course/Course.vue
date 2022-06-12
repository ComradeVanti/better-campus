<template>
  <div class="page">
    <navbar :sess-key="sessKey"></navbar>
    <div class="page-content">
      <semester-nav :semesters="semesters" />
      <course-content-view :content="courseContent" />
    </div>
    <plug />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Plug from "@/components/Plug";
import SemesterNav from "@/components/SemesterNav";
import CourseContentView from "@/components/CourseContentView";

export default {
  name: "Course",
  components: { CourseContentView, SemesterNav, Plug, Navbar },
  computed: {
    /**
     * @return {string}
     */
    sessKey() {
      return this.scanData?.sessKey ?? "";
    },
    /**
     * @return {Semester[]}
     */
    semesters() {
      return this.scanData?.courseNav?.semesters ?? [];
    },
    /**
     * @return {CourseContent}
     */
    courseContent() {
      return this.scanData?.courseContent ?? { topics: [] };
    }
  },
  data() {
    return {
      /**
       * @type {CoursePageData | null}
       */
      scanData: null
    };
  },
  created() {
    const app = document.querySelector("#app");
    this.scanData = JSON.parse(app.getAttribute("scan-data"));
    app.removeAttribute("scan-data");
  }
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
  position: relative;
}

.page {
  position: absolute;
  padding-top: var(--space-regular);
  display: flex;
  flex-direction: column;
  inset: 0;
}

.page-content {
  flex: 1;
  padding: var(--space-large);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--space-large);
  overflow-y: hidden;
}
</style>
