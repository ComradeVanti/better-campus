<template>
<button class="material-icons">{{icon}}</button>
</template>

<script>
export default {
  name: "IconButton",
  props: {
    icon: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
button {
  font-size: var(--fnt-sml);
  padding: var(--sze-sml);
}
</style>
