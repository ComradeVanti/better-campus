<template>
  <nav>
    <logo size="small" />
    <div class="links">
      <a href="https://cis.fhstp.ac.at">CIS</a>
      <a href="https://lv-evaluierung.fhstp.ac.at">LV-Eval</a>
      <a href="https://verleih.fhstp.ac.at">Verleih</a>
      <a href="https://cis.fhstp.ac.at/_data/news/sodexo/menueplan_sodexo.pdf">Mensa</a>
    </div>
  </nav>
</template>

<script>
import Logo from "@/components/Logo";

export default {
  name: "Navbar",
  components: { Logo }
};
</script>

<style scoped>
nav {
  width: 100%;
  display: flex;
  align-items: end;
  padding: var(--sze-sml);
}

.links {
  display: flex;
  align-items: end;
  margin: 0 var(--sze-lrg);
  flex-grow: 1;
}

a {
  text-decoration: none;
  font-size: var(--fnt-sml);
  margin-right: var(--sze-rgl);
}

</style>
