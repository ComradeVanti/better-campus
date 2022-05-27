<template>
  <div>
    {{ course.name }}
  </div>
</template>

<script>
export default {
  name: "CourseBadge",
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
div {
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
  transition: background-color 0.25s, color 0.25s;
}

div:hover {
  background-color: var(--clr-primary);
  color: var(--clr-on-primary);
}
</style>
