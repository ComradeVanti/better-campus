<template>
  <div>
    <a :href="activity.url">{{ activity.linkName }}</a>
    <div class="lines">
      <p v-for="(line, i) in activity.lines" :key="i">
        {{ line }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UrlActivityVue",
  props: {
    /**
     * @type {UrlActivity}
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
