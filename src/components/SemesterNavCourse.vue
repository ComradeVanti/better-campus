<template>
  <span class="course-name">{{ courseName }}</span>
</template>

<script>
export default {
  name: "SemesterNavCourse",
  computed: {
    /**
     * @return {string}
     */
    courseName() {
      return this.course.name;
    }
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.course-name {
  margin-bottom: var(--sze-rgl);
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
