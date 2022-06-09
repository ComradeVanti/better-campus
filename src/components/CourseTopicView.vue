<template>
  <div class="surface card">
    <div class="name">{{ topic.name }}</div>
    <div class="activities">
      <activity-view
        v-for="activity in topic.activities"
        :key="activity.id"
        :activity="activity"
      />
    </div>
  </div>
</template>

<script>
import ActivityView from "@/components/ActivityView";
export default {
  name: "CourseTopicView",
  components: { ActivityView },
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

<style scoped>
.name {
  font-size: var(--font-size-large);
  margin-bottom: var(--space-regular);
}
.activities {
  display: flex;
  flex-direction: column;
  gap: var(--space-regular);
}
</style>
