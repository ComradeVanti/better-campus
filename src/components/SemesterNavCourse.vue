<template>
  <a class="course-name" :href="courseLink">{{ courseName }}</a>
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
    },
    /**
     * @return {string}
     */
    courseLink() {
      return `https://ecampus.fhstp.ac.at/course/view.php?id=${this.course.id}`;
    },
  },
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.course-name {
  margin-bottom: var(--sze-rgl);
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;
}
</style>
