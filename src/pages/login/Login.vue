<template>
  <div>
    <div id="page-content">
      <logo id="logo" size="large" />
      <form method="post">
        <input type="hidden" name="logintoken" id="login-token" />
        <label for="username-input" id="username-label">I am</label>
        <input type="text" name="username" id="username-input" />
        <label for="password-input" id="password-label"
          >and my password is</label
        >
        <input type="password" name="password" id="password-input" />
        <button class="material-icons" type="submit" id="login-btn">
          lock_open
        </button>
      </form>
    </div>
    <plug />
  </div>
</template>

<script>
import Plug from "@/components/Plug";
import Logo from "@/components/Logo";

export default {
  name: "Login",
  components: { Logo, Plug },
  data() {
    return {
      scanData: Object,
    };
  },
  mounted() {
    const app = document.querySelector("#app");
    this.scanData = JSON.parse(app.getAttribute("scan-data"));
    app.removeAttribute("scan-data");
  },
};
</script>

<style>
@import "@/assets/global.css";

body {
  background-size: cover;
  background-position: center;
  color: white;
}

#logo {
  margin-bottom: var(--sze-rgl);
}

input {
  background-color: var(--clr-surface);
  color: var(--clr-on-surface);
  border-radius: var(--sze-rgl);
  box-shadow: var(--sdw-rgl);
  padding: 0 var(--sze-sml);
  border: white 2px solid;
  outline: none !important;
  box-sizing: border-box;
}

form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)) auto;
  grid-template-rows: auto auto;
  row-gap: var(--sze-sml);
  column-gap: var(--sze-rgl);
}

#page-content {
  width: 50%;
  height: 100%;
  max-width: 600px;
  padding: var(--sze-lrg);
  display: flex;
  flex-direction: column;
}

#username-label {
  grid-area: 1 / 1 / 2 / 2;
}

#password-label {
  grid-area: 1 / 2 / 2 / 3;
}

#username-input {
  grid-area: 2 / 1 / 3 / 2;
}

#password-input {
  grid-area: 2 / 2 / 3 / 3;
}

#login-btn {
  grid-area: 2 / 3 / 3 / 4;
}
</style>
