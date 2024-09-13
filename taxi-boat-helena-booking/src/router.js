import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import LandingPage from "./components/LandingPage.vue";
import Home from "@/components/Home.vue";
import Tours from "@/components/Tours.vue";
import MyTrip from "@/components/MyTrip.vue";
import More from "@/components/More.vue";

const routes = [
  { path: "/", redirect: "/start" },
  { path: "/start", component: LandingPage },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/home", component: Home },
  { path: "/tours", component: Tours },
  { path: "/my-trip", component: MyTrip },
  { path: "/more", component: More },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
