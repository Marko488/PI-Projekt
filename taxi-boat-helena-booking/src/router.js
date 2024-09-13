import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import LandingPage from "./components/LandingPage.vue";
import Home from "@/components/Home.vue";
import Tours from "@/components/Tours.vue";
import MyTrip from "@/components/MyTrip.vue";
import More from "@/components/More.vue";
import ContactInformation from "@/components/ContactInformation.vue";
import Payments from "@/components/Payments.vue";
import TourDetails from "@/components/TourDetails.vue";

const routes = [
  { path: "/", redirect: "/start" },
  { path: "/start", component: LandingPage },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/home", component: Home },
  { path: "/tours", component: Tours },
  { path: "/my-trip", component: MyTrip },
  { path: "/more", component: More },
  { path: "/contact", component: ContactInformation },
  { path: "/payments", component: Payments },
  { path: "/tours/:id", component: TourDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
