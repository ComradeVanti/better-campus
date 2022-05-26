<template>
  <div>
    {{ semester.name }}
    <div>
      <course-badge
        v-for="course in semester.courses"
        :key="course.name"
        :course="course"
      />
    </div>
  </div>
</template>

<script>
import CourseBadge from "@/components/CourseBadge";
export default {
  name: "SemesterBlock",
  components: { CourseBadge },
  props: {
    semester: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
