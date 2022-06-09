<template>
  <div class="topics">
    <course-topic-view
      v-for="topic in content.topics"
      :key="topic.id"
      :topic="topic"
    />
  </div>
</template>

<script>
import CourseTopicView from "@/components/CourseTopicView";
export default {
  name: "CourseContentView",
  components: { CourseTopicView },
  props: {
    /**
     * @type {CourseContent}
     */
    content: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.topics {
  display: flex;
  flex-direction: column;
  gap: var(--sze-rgl);
  align-items: stretch;
  flex: 1;
  overflow-y: auto;
  max-height: 100%;
  margin-bottom: var(--sze-lrg);
}
</style>
