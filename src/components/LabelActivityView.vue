<template>
  <div v-html="activity.textHtml"></div>
</template>

<script>
export default {
  name: "LabelActivityView",
  props: {
    /**
     * @type {LabelActivity}
     */
    activity: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
