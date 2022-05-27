<template>
  <div class="page">
    <navbar :sess-key="scanData.sessKey"></navbar>
    <div class="page-content">
      <div class="semester-nav">
        <div class="semester-select">
          <button
            v-for="(name, index) in semesterNames"
            :key="index"
            class="semester-button"
            :class="{ 'selected-name': index === selectedSemesterIndex }"
            @click="selectSemester(index)"
          >
            {{ name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "Home",
  components: { Navbar },
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
}

.page {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
}

.page-content {
  flex-grow: 1;
  padding: var(--sze-rgl);
  display: flex;
  align-items: flex-start;
}

.semester-nav {
  background-color: var(--clr-surface);
  color: var(--clr-on-surface);
  border-radius: var(--sze-corner);
  padding: var(--sze-sml);
}

.semester-select {
  display: flex;
  flex-direction: column;
  gap: var(--sze-sml);
}

.semester-button {
  background-color: var(--clr-surface-alt);
  color: var(--clr-on-surface-alt);
  border-radius: var(--sze-corner);
  padding: var(--sze-sml);
  cursor: pointer;
  border: 0;
}

.selected-name {
  background-color: var(--clr-primary);
  color: var(--clr-on-primary);
}
</style>
