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
    <button
      v-if="!hasReserved"
      @click="reserveTrip(tour.tourId)"
      class="btn-primary"
    >
      Reserve This Trip
    </button>
    <p v-else>You have already reserved this trip</p>
  </div>
</template>

<script>
import { doc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase"; // Firestore instance

export default {
  name: "TourDetails",
  data() {
    return {
      tour: null,
      userTrips: [],
    };
  },
  computed: {
    hasReserved() {
      const user = auth.currentUser;
      if (user && this.userTrips.length > 0 && this.tour?.tourId) {
        return this.userTrips.some((trip) => trip.tourId === this.tour.tourId);
      }
      return false;
    },
  },
  methods: {
    async fetchUserTrips() {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            this.userTrips = userDoc.data().trips || []; // Fetch user's trips
          }
        } catch (error) {
          console.error("Error fetching user trips:", error);
        }
      }
    },

    async reserveTrip(tourId) {
      if (!tourId) {
        console.log(tourId);
        console.error("Invalid tourId, cannot reserve the trip.");
        return;
      }

      const user = auth.currentUser; // Get current user
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid); // Reference to the user's document

          // Add tour to the user's trips with payment status 'unpaid'
          await updateDoc(userRef, {
            trips: arrayUnion({ tourId, paymentStatus: "unpaid" }),
          });

          // Redirect to "My Trip" page after reservation
          this.$router.push("/my-trip");
        } catch (error) {
          console.error("Error reserving trip:", error);
        }
      } else {
        console.log("User not logged in.");
      }
    },

    async fetchTour() {
      const docRef = doc(db, "tours", this.$route.params.id); // Get tour by ID from route
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.tour = {
          tourId: docSnap.id, // Add the document ID as tourId
          ...docSnap.data(), // Add the rest of the tour data
        };
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
  async mounted() {
    this.fetchTour(); // Fetch tour when component is mounted
    await this.fetchUserTrips();
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
