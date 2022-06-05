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
  font-size: var(--fnt-sml);
  padding: var(--sze-sml);
  box-shadow: var(--sdw-rgl);
  border-radius: var(--sze-sml);
  border: 0;
  cursor: pointer;
}
</style>
