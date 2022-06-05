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
  border-radius: var(--sze-rgl);
  box-shadow: var(--sdw-rgl);
  padding: 0 var(--sze-sml);
  border: white 2px solid;
  outline: none !important;
  box-sizing: border-box;
}
</style>
