<template>
  <a :href="courseLink">
    {{ course.name }}
  </a>
</template>

<script>
export default {
  name: "CourseBadge",
  computed: {
    courseLink(){
      return `https://ecampus.fhstp.ac.at/course/view.php?id=${this.course.id}`
    }
  },
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
a {
  background: var(--clr-surface);
  color: var(--clr-on-surface);
  border-radius: var(--sze-corner);
  box-shadow: var(--sdw-rgl);
  width: 200px;
  cursor: pointer;
  padding: var(--sze-sml);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 75px;
  text-decoration: none;
  transition: background-color 0.25s, color 0.25s;
}

a:hover {
  background-color: var(--clr-primary);
  color: var(--clr-on-primary);
}
</style>
