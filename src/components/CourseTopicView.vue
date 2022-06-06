<template>
  <div class="surface card">
    {{ topic.name }}
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
.activities {
  display: flex;
  flex-direction: column;
}
</style>
