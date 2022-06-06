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
        <text-box id="username-input" name="username" type="text" />
        <label id="password-label" for="password-input"
          >and my password is</label
        >
        <text-box id="password-input" name="password" type="password" />
        <IconButton id="login-btn" icon="lock_open" type="submit"> </IconButton>
      </form>
    </div>
    <plug />
  </div>
</template>

<script>
import Plug from "@/components/Plug";
import Logo from "@/components/Logo";
import IconButton from "@/components/IconButton";
import TextBox from "@/components/TextBox";

export default {
  name: "Login",
  components: { TextBox, IconButton, Logo, Plug },
  data() {
    return {
      /**
       * @type {LoginScanData}
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
