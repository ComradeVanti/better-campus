<template>
  <input class="surface" :type="type" />
</template>

<script>
export default {
  name: "TextBox",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
input {
  border-radius: var(--radius-corner);
  box-shadow: var(--shadow-regular);
  padding: 0 var(--space-small);
  border: white 2px solid;
  outline: none !important;
  box-sizing: border-box;
}
</style>
