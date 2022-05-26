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
  box-shadow: var(--sdw-rgl);
  border-radius: var(--sze-sml);
  border: 0;
  background-color: var(--clr-primary);
  color: var(--clr-on-primary);
  cursor: pointer;
}
</style>
