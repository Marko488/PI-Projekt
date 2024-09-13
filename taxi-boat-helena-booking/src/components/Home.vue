<template>
  <div class="home-page">
    <!-- Background Image Section -->
    <div class="hero-section">
      <div class="overlay">
        <h1>Nađi svoju idealnu turu sada!</h1>
        <p>Otkrij predivne plaže i skrivene blago Jadranskog mora.</p>
        <div class="buttons">
          <button @click="findTour">Nađi idealnu turu</button>
          <button @click="newTours">Pregledaj naše najnovije ture</button>
        </div>
      </div>
    </div>

    <!-- Image Section 2/3 Down -->
    <div class="image-grid">
      <div class="left-image">
        <img src="../assets/home_left.jpg" alt="Scenic view" />
      </div>
      <div class="right-images">
        <img
          src="../assets/home_right_top.avif"
          alt="Tour option 1"
          class="top-right-image"
        />
        <img
          src="../assets/home_right_bottom.png"
          alt="Tour option 2"
          class="bottom-right-image"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    findTour() {
      // Handle the "Nađi idealnu turu" button click
      alert("Finding the ideal tour...");
    },
    newTours() {
      this.$router.push({ path: "/tours", query: { new: "true" } }); // Navigate to Tours with "new" query
    },
  },
};
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Hero section with background image and buttons */
.hero-section {
  background-image: url("../assets/home_bg.jpg");
  background-size: cover;
  background-position: center;
  height: 60vh;
  width: 100%;
  position: relative;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #004c99;
}

.image-grid {
  display: flex;
  width: 100%;
  height: 39vh;
  margin-top: 0; /* Removed margin to avoid gap */
  gap: 0; /* Remove gap between flex items */
}

.left-image {
  flex: 2;
  margin: 0; /* Ensure no margin */
  padding: 0; /* Ensure no padding */
}

.left-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right-images {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 0; /* Ensure no margin */
}

.right-images img {
  width: 100%;
  height: 50%; /* Make each image half the container height */
  object-fit: cover;
  margin: 0; /* Ensure no margin */
  padding: 0; /* Ensure no padding */
}
</style>
