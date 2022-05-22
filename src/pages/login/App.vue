<template>
  <span>{{ scanData.loginToken }}</span>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      scanData: Object
    };
  },
  mounted() {
    const app = document.querySelector("#app");
    this.scanData = JSON.parse(app.getAttribute("scan-data"));
    app.removeAttribute("scan-data");
  }
};
</script>

<style>
span {
  font-size: 50px;
}
</style>
