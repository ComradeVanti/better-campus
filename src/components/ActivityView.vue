<template>
  <label-activity-view v-if="isLabel" :activity="activity" />
  <url-activity-view v-else-if="isUrl" :activity="activity" />
  <resource-activity-view v-else-if="isResource" :activity="activity" />
  <span v-else>Unknown</span>
</template>

<script>
import LabelActivityView from "@/components/LabelActivityView";
import UrlActivityView from "@/components/UrlActivityView";
import ResourceActivityView from "@/components/ResourceActivityView";
export default {
  name: "ActivityView",
  components: {ResourceActivityView, UrlActivityView, LabelActivityView },
  computed: {
    isLabel() {
      return this.activity.type === "label";
    },
    isUrl() {
      return this.activity.type === "url";
    },
    isResource() {
      return this.activity.type === "resource";
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
