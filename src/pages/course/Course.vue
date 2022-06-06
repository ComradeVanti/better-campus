<template>
  <div class="page">
    <navbar sess-key=""></navbar>
    <div class="page-content">
    </div>
    <plug />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Plug from "@/components/Plug";
export default {
  name: "Course",
  components: { Plug, Navbar }
};
</script>

<style>
@import "@/assets/global.css";

body {
  background-size: cover;
  background-position: center;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.page {
  padding-top: var(--sze-rgl);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex-grow: 1;
  padding: var(--sze-lrg);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: var(--sze-lrg);
  gap: var(--sze-rgl);
}
</style>
