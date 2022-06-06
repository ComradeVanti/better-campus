<template>
  <div class="surface card">{{ topic.name }}</div>
</template>

<script>
export default {
  name: "CourseTopicView",
  props: {
    /**
     * @type {CourseTopic}
     */
    topic: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
