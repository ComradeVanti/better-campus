<template>
  <div>
    <div class="name">
      <span class="material-icons icon">{{ iconName }}</span>
      <a :href="resourceUrl">{{ activity.name }}</a>
    </div>
    <div v-html="activity.description"></div>
  </div>
</template>

<script>
const iconNameByType = {
  powerpoint: "slideshow",
  html: "html",
  pdf: "description",
  document: "description",
  spreadsheet: "table_rows",
  text: "view_headline",
  archive: "inventory",
  jpeg: "image",
  mpeg: "videocam",
};

export default {
  name: "ResourceActivityView",
  computed: {
    /**
     * @return {url}
     */
    resourceUrl() {
      return `https://ecampus.fhstp.ac.at/mod/resource/view.php?id=${this.activity.id}`;
    },
    /**
     * @return {string}
     */
    iconName() {
      const x = iconNameByType[this.activity.typeName] ?? "question_mark";
      if (x === "question_mark") console.log(this.activity.typeName);
      return x;
    },
  },
  props: {
    /**
     * @type {ResourceActivity}
     */
    activity: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.name {
  display: flex;
  align-items: center;
}
.icon {
  margin-right: var(--space-small);
}
</style>
