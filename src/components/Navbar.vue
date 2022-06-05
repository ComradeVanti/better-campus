<template>
  <nav>
    <logo size="small" />
    <div class="links">
      <a href="https://cis.fhstp.ac.at">CIS</a>
      <a href="https://lv-evaluierung.fhstp.ac.at">LV-Eval</a>
      <a href="https://verleih.fhstp.ac.at">Verleih</a>
      <a href="https://cis.fhstp.ac.at/_data/news/sodexo/menueplan_sodexo.pdf"
        >Mensa</a
      >
    </div>
    <IconButton icon="logout" @click="logout" />
  </nav>
</template>

<script>
import Logo from "@/components/Logo";
import IconButton from "@/components/IconButton";

export default {
  name: "Navbar",
  components: { IconButton, Logo },
  props: {
    sessKey: {
      type: String,
      required: true,
    },
  },
  methods: {
    logout() {
      location.href = `https://ecampus.fhstp.ac.at/login/logout.php?sesskey=${this.sessKey}`;
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: flex-end;
  padding: var(--sze-sml) var(--sze-rgl);
}

.links {
  display: flex;
  align-items: flex-end;
  margin: 0 var(--sze-lrg);
  flex-grow: 1;
}

a {
  text-decoration: none;
  font-size: var(--fnt-sml);
  margin-right: var(--sze-rgl);
}
</style>
