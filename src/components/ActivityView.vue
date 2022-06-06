<template>
  <label-activity-view v-if="isLabel" :activity="activity" />
  <span v-else>Unknown</span>
</template>

<script>
import LabelActivityView from "@/components/LabelActivityView";
export default {
  name: "ActivityView",
  components: { LabelActivityView },
  computed: {
    isLabel() {
      return this.activity.type === "label";
    },
  },
  props: {
    /**
     * @type {CourseActivity}
     */
    activity: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
