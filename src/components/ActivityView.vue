<template>
  <label-activity-view v-if="isLabel" :activity="activity" />
  <url-activity-vue v-else-if="isUrl" :activity="activity" />
  <span v-else>Unknown</span>
</template>

<script>
import LabelActivityView from "@/components/LabelActivityView";
import UrlActivityVue from "@/components/UrlActivityVue";
export default {
  name: "ActivityView",
  components: { UrlActivityVue, LabelActivityView },
  computed: {
    isLabel() {
      return this.activity.type === "label";
    },
    isUrl() {
      return this.activity.type === "url";
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
