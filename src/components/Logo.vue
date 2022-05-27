<template>
  <span :class="{ large: size === 'large', small: size === 'small' }"
    >✨eCampus✨</span
  >
</template>

<script>
export default {
  name: "Logo",
  props: {
    size: {
      type: String,
      required: true,
      default: "large",
      validator(value) {
        return ["small", "large"].includes(value);
      },
    },
  },
};
</script>

<style scoped>
.large {
  font-size: 3rem;
}

.small {
  font-size: 1.5rem;
}
</style>
