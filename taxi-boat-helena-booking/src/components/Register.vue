<template>
  <div class="auth-page">
    <div class="content">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Taxi Boat Helena Logo" />
      </div>
      <h2>Taxi Boat Helena Booking</h2>

      <div class="tabs">
        <button @click="goToLogin">Prijava</button>
        <button class="active">Registracija</button>
      </div>

      <form @submit.prevent="register">
        <div class="input-group">
          <input
            v-model="name"
            type="text"
            placeholder="Ime i prezime..."
            required
          />
        </div>
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
        <div class="input-group">
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Potvrda lozinke..."
            required
          />
        </div>
        <button type="submit">Kreiraj račun</button>
      </form>
    </div>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Import Firebase config
import router from "../router";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        alert("Lozinke se ne podudaraju!");
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        alert("Račun kreiran uspješno!");
        router.push("/home");
      } catch (error) {
        alert(error.message);
      }
    },
    goToLogin() {
      this.$router.push("/login");
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
