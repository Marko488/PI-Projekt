import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import LandingPage from "./components/LandingPage.vue";

const routes = [
  { path: "/", redirect: "/start" },
  { path: "/start", component: LandingPage },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
