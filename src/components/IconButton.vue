<template>
  <button class="material-icons primary">{{ icon }}</button>
</template>

<script>
export default {
  name: "IconButton",
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
button {
  font-size: var(--font-size-small);
  padding: var(--space-small);
  box-shadow: var(--shadow-regular);
  border-radius: var(--radius-corner);
  border: 0;
  cursor: pointer;
}
</style>
