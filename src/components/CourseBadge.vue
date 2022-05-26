<template>
  <div>{{ course.name }}</div>
</template>

<script>
export default {
  name: "CourseBadge",
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
