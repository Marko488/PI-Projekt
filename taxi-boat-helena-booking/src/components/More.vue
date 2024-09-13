<template>
  <div class="more-page">
    <div class="overlay">
      <div class="buttons">
        <button @click="navigateTo('contact')">Kontakt</button>
        <button @click="navigateTo('accounts')">Računi</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "More",
  methods: {
    navigateTo(view) {
      if (view === "contact") {
        this.$router.push("/contact"); // Navigate to Contact view
      } else if (view === "accounts") {
        this.$router.push("/accounts"); // Placeholder for Accounts
      }
    },
  },
};
</script>

<style scoped>
.more-page {
  background-image: url("../assets/more.jpeg"); /* Set your background image */
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5); /* Optional dark overlay */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 80%;
}

button {
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #004c99;
}
</style>
