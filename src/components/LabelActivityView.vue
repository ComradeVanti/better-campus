<template>
  <div class="lines">
    <p v-for="(line, i) in activity.lines" :key="i">
      {{ line }}
    </p>
  </div>
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

<style scoped>
.lines {
  display: flex;
  flex-direction: column;
}
</style>
