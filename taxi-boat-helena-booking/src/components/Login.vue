<template>
  <div class="auth-page">
    <div class="content">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Taxi Boat Helena Logo" />
      </div>
      <h2>Taxi Boat Helena Booking</h2>

      <div class="tabs">
        <button class="active">Prijava</button>
        <button @click="goToRegister">Registracija</button>
      </div>

      <form @submit.prevent="login">
        <div class="input-group">
          <input v-model="email" type="email" placeholder="Email..." required />
        </div>
        <div class="input-group">
          <input
            v-model="password"
            type="password"
            placeholder="Lozinka..."
            required
          />
        </div>
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Import Firebase config
import router from "../router";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        alert("Prijava uspješna!");
        router.push("/home");
      } catch (error) {
        alert(error.message);
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.auth-page {
  background-image: url("@/assets/taxi-boat-bg.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  background-color: rgba(255, 255, 255, 0.8);
  width: 20rem;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.logo img {
  width: 150px;
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tabs button {
  flex: 1;
  background: none;
  border: none;
  font-size: 16px;
  color: #666;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}

.tabs button.active {
  color: #0066cc;
  border-bottom: 2px solid #0066cc;
}

input {
  margin-bottom: 20px;
}
</style>
