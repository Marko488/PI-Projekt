<template>
  <div id="app">
    <TopBar v-if="isLoggedIn" />
    <router-view />
    <BottomNav v-if="isLoggedIn" />
  </div>
</template>

<script>
import TopBar from "./components/TopBar.vue";

import BottomNav from "./components/BottomNav.vue";
import { auth } from "../firebase";
export default {
  name: "App",
  components: {
    TopBar,
    BottomNav,
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      this.isLoggedIn = !!user;
    });
  },
};
</script>

<style>
/* Global app styling */
#app {
  text-align: center;
  margin: 0;
}

router-view {
  padding-top: 20px;
  padding-bottom: 60px;
}
</style>
