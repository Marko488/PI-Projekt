<template>
  <div class="landing-page">
    <div class="content">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Taxi Boat Helena Logo" />
      </div>
      <div class="heading">
        <h2>Best Taxi Boat in all Croatia</h2>
        <p>Fast and safe taxi services</p>
      </div>
      <div class="register-login">
        <button @click="register">Registriraj se</button>
        <p>Već imaš račun?</p>
        <button @click="login">Prijava</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  methods: {
    register() {
      // Logic for registration, route to register page or open modal
    },
    login() {
      // Logic for login, route to login page or open modal
    },
  },
};
</script>

<style scoped>
.landing-page {
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
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.logo img {
  width: 100px;
  margin-bottom: 20px;
}

.heading h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.heading p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.register-login button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.register-login button:hover {
  background-color: #004c99;
}

.register-login p {
  margin: 10px 0;
  color: #333;
}
</style>
