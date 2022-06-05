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
import SemesterNavCourse from "@/components/SemesterNavCourse";
export default {
  name: "SemesterNavBlock",
  components: { SemesterNavCourse },
  computed: {
    /**
     * @return {string}
     */
    semesterName() {
      return this.semester.name;
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
      isOpen: false,
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
  margin-bottom: var(--sze-lrg);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: var(--sze-rgl);
}

.courses {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-left: var(--sze-lrg);
}
</style>
