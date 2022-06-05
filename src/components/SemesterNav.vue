<template>
  <div class="semesters-container">
    <SemesterNavBlock
      v-for="semester in semesters"
      :id="semester.name"
      :semester="semester"
    />
  </div>
</template>

<script>
import SemesterNavBlock from "@/components/SemesterNavBlock";
export default {
  name: "SemesterNav",
  components: { SemesterNavBlock },
  props: {
    semesters: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.semesters-container {
  display: flex;
  flex-direction: column;
}
</style>
