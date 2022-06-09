<template>
  <div class="block">
    <div class="header primary-container card" @click="toggleOpen">
      {{ semesterName }}
      <span class="material-icons">{{ iconName }}</span>
    </div>
    <div v-if="isOpen" class="courses">
      <SemesterNavCourse
        v-for="course in courses"
        :key="course.id"
        :course="course"
      />
    </div>
  </div>
</template>

<script>
import * as Semester from "@/domain/Semester";
import SemesterNavCourse from "@/components/SemesterNavCourse";
export default {
  name: "SemesterNavBlock",
  components: { SemesterNavCourse },
  computed: {
    /**
     * @return {string}
     */
    semesterName() {
      return Semester.getDisplayName(this.semester);
    },
    /**
     * @return {Course[]}
     */
    courses() {
      return this.semester.courses;
    },
    iconName() {
      return this.isOpen ? "arrow_drop_up" : "arrow_drop_down";
    },
  },
  props: {
    semester: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: Semester.isCurrent(this.semester),
    };
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
.block {
  width: 200px;
  margin-bottom: var(--space-regular);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: var(--space-regular);
}

.courses {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-left: var(--space-large);
}
</style>
