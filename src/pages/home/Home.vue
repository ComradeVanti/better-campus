<template>
  <div class="page">
    <navbar :sess-key="scanData.sessKey"></navbar>
    <div class="page-content">
      <div class="semester-nav">
        <button
          v-for="(name, index) in semesterNames"
          :key="index"
          :class="{ 'selected-name': index === selectedSemesterIndex }"
          class="semester-button"
          @click="selectSemester(index)"
        >
          {{ name }}
        </button>
      </div>
      <div class="semester">
        <course-badge
          v-for="(course, index) in selectedSemester.courses"
          :key="index"
          :course="course"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import CourseBadge from "@/components/CourseBadge";

export default {
  name: "Home",
  components: { CourseBadge, Navbar },
  computed: {
    /**
     * @returns {Semester}
     */
    selectedSemester() {
      return this.scanData.semesters[this.selectedSemesterIndex];
    },
    /**
     * @returns {string[]}
     */
    semesterNames() {
      return this.scanData.semesters.map((it) => it.name);
    },
  },
  data() {
    return {
      /**
       * @type {ScanData}
       */
      scanData: {
        sessKey: "",
        semesters: [],
      },
      selectedSemesterIndex: 0,
    };
  },
  created() {
    const app = document.querySelector("#app");
    this.scanData = JSON.parse(app.getAttribute("scan-data"));
    app.removeAttribute("scan-data");
  },
  methods: {
    /**
     * @param {Number} index
     */
    selectSemester(index) {
      this.selectedSemesterIndex = index;
    },
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

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page {
  flex-grow: 1;
  display: flex;
  margin-top: var(--sze-rgl);
  flex-direction: column;
  align-items: stretch;
}

.page-content {
  flex-grow: 1;
  padding: var(--sze-rgl);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--sze-rgl);
}

.semester-nav {
  display: flex;
  flex-direction: row;
  gap: var(--sze-sml);
  background-color: var(--clr-surface);
  border-radius: var(--sze-corner);
  padding: var(--sze-sml);
  box-shadow: var(--sdw-rgl);
}

.semester-button {
  background-color: var(--clr-surface-alt);
  color: var(--clr-on-surface-alt);
  border-radius: var(--sze-corner);
  padding: var(--sze-sml);
  font-size: var(--fnt-sml);
  box-shadow: var(--sdw-rgl);
  cursor: pointer;
  border: 0;
  transition: font-size 0.25s;
}

.semester-button:hover {
  font-size: var(--fnt-lrg);
}

.selected-name {
  background-color: var(--clr-primary);
  color: var(--clr-on-primary);
  font-size: var(--fnt-lrg);
}

.semester {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  overflow-y: auto;
  gap: var(--sze-sml);
}
</style>
