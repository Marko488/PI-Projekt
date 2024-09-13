<template>
  <div class="tour-details-page">
    <!-- Hero Section with Title, Short Description, and Dates -->
    <div
      class="hero-section"
      :style="{ backgroundImage: `url(${tour?.images[0]?.imageUrl})` }"
    >
      <div class="overlay">
        <h1>{{ tour?.title }}</h1>
        <p>{{ tour?.description }}</p>
        <p class="dates">
          From {{ formatDate(tour?.startDate) }}
          <span v-if="tour?.endDate"> - {{ formatDate(tour?.endDate) }}</span>
        </p>
      </div>
    </div>

    <!-- Long Description -->
    <div class="description-section">
      <p>{{ tour?.longDescription }}</p>
    </div>

    <!-- What We Offer -->
    <div class="offer-section">
      <div class="offer-bar">What we offer:</div>
      <ul>
        <li v-for="offering in tour?.offerings" :key="offering">
          {{ offering }}
        </li>
      </ul>
    </div>

    <!-- Details Section -->
    <div class="divider"></div>
    <div class="details-section">
      <h3>Details:</h3>
      <p>
        <strong>START:</strong> {{ tour?.city }}, {{ tour?.startDate }} at
        {{ tour?.startTime }}
      </p>
      <p v-if="tour?.endDate">
        <strong>END:</strong> {{ tour?.endDate }} at {{ tour?.endTime }}
      </p>
      <p>
        <strong>DURATION:</strong>
        {{ calculateDuration(tour?.startDate, tour?.endDate) }} days
      </p>
      <p><strong>Guide:</strong> {{ tour?.guide ? tour.guide : "optional" }}</p>
    </div>

    <!-- Map/Image -->
    <div class="map-image">
      <img :src="tour?.mapImageUrl" alt="Map or tour image" />
    </div>

    <!-- Buttons -->
    <div class="buttons-section">
      <button class="btn-secondary" @click="viewGallery">View Gallery</button>
      <button class="btn-secondary" @click="viewReviews">View Reviews</button>
    </div>

    <!-- Reserve Button -->
    <div class="divider"></div>
    <button class="btn-primary">RESERVE THIS TRIP</button>
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Firestore instance

export default {
  name: "TourDetails",
  data() {
    return {
      tour: null,
    };
  },
  methods: {
    async fetchTour() {
      const docRef = doc(db, "tours", this.$route.params.id); // Get tour by ID from route
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.tour = docSnap.data(); // Set tour data
      } else {
        console.error("No such document!");
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return "";
      const [day, month, year] = dateStr.split(".");
      return `${day}.${month}.${year}`;
    },
    calculateDuration(startDate, endDate) {
      if (!startDate || !endDate) return 0;
      const start = new Date(startDate.split(".").reverse().join("-"));
      const end = new Date(endDate.split(".").reverse().join("-"));
      const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Calculate days between
      return duration;
    },
    viewGallery() {
      this.$router.push(`/tours/${this.$route.params.id}/gallery`); // Navigate to the gallery
    },
    viewReviews() {
      this.$router.push(`/tours/${this.$route.params.id}/reviews`); // Navigate to the reviews page
    },
  },
  mounted() {
    this.fetchTour(); // Fetch tour when component is mounted
  },
};
</script>

<style scoped>
.tour-details-page {
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-bottom: 80px;
}

.hero-section {
  height: 200px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 20px;
  text-align: center;
}

.dates {
  margin-top: 10px;
  font-size: 14px;
}

.description-section {
  margin-top: 20px;
}

.offer-section {
  margin-top: 20px;
}

.offer-bar {
  background-color: #b0e0e6; /* Light blue bar */
  padding: 10px;
  font-weight: bold;
}

ul {
  margin-top: 10px;
  list-style-type: disc;
  padding-left: 20px;
}

.divider {
  height: 1px;
  background-color: #ddd;
  margin: 20px 0;
}

.details-section {
  margin-top: 10px;
}

.map-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-top: 20px;
}

.buttons-section {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
}

.btn-primary {
  padding: 10px 20px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.btn-secondary {
  background-color: #ddd;
  color: #333;
  border: none;
  cursor: pointer;
}

.btn-primary:hover,
.btn-secondary:hover {
  background-color: #004c99;
}
</style>
