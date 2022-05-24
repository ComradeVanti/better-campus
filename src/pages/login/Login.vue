<template>
  <div>
    <div id="page-content">
      <logo id="logo" size="large" />
      <form method="post">
        <input
          id="login-token"
          :value="scanData.loginToken"
          name="logintoken"
          type="hidden"
        />
        <label id="username-label" for="username-input">I am</label>
        <input id="username-input" name="username" type="text" />
        <label id="password-label" for="password-input"
          >and my password is</label
        >
        <input id="password-input" name="password" type="password" />
        <button id="login-btn" class="material-icons" type="submit">
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
      /**
       * @type {ScanData}
       */
      scanData: { loginToken: "" },
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
