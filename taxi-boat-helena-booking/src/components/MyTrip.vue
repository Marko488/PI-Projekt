<template>
  <div class="my-trip-page">
    <h1>My Trips</h1>

    <h2>Upcoming Trips</h2>
    <div v-if="upcomingTrips.length > 0" class="tours-container">
      <div
        v-for="trip in upcomingTrips"
        :key="trip.tourId"
        class="tour-card"
        @click="viewTourDetails(trip.tourId)"
      >
        <div class="tour-image">
          <img :src="trip.images[0]?.imageUrl" :alt="trip.title" />
          <div class="date-badge">
            <span>{{ formatDate(trip.startDate) }}</span>
            <span v-if="trip.endDate"> - {{ formatDate(trip.endDate) }}</span>
          </div>
        </div>
        <div class="tour-info">
          <h2>{{ trip.title }}</h2>
          <p>{{ trip.description }}</p>
          <p>Payment Status: {{ trip.paymentStatus }}</p>
        </div>
      </div>
    </div>
    <p v-else>No upcoming trips</p>

    <h2>Ongoing Trips</h2>
    <div v-if="ongoingTrips.length > 0" class="tours-container">
      <div
        v-for="trip in ongoingTrips"
        :key="trip.tourId"
        class="tour-card"
        @click="viewTourDetails(trip.tourId)"
      >
        <div class="tour-image">
          <img :src="trip.images[0]?.imageUrl" :alt="trip.title" />
          <div class="date-badge">
            <span>{{ formatDate(trip.startDate) }}</span>
            <span v-if="trip.endDate"> - {{ formatDate(trip.endDate) }}</span>
          </div>
        </div>
        <div class="tour-info">
          <h2>{{ trip.title }}</h2>
          <p>{{ trip.description }}</p>
          <p>Payment Status: {{ trip.paymentStatus }}</p>
        </div>
      </div>
    </div>
    <p v-else>No ongoing trips</p>

    <h2>Past Trips</h2>
    <div v-if="pastTrips.length > 0" class="tours-container">
      <div
        v-for="trip in pastTrips"
        :key="trip.tourId"
        class="tour-card"
        @click="viewTourDetails(trip.tourId)"
      >
        <div class="tour-image">
          <img :src="trip.images[0]?.imageUrl" :alt="trip.title" />
          <div class="date-badge">
            <span>{{ formatDate(trip.startDate) }}</span>
            <span v-if="trip.endDate"> - {{ formatDate(trip.endDate) }}</span>
          </div>
        </div>
        <div class="tour-info">
          <h2>{{ trip.title }}</h2>
          <p>{{ trip.description }}</p>
          <p>Payment Status: {{ trip.paymentStatus }}</p>
        </div>
        <!-- Write Review Button -->
        <button @click.stop="openReviewModal(trip.tourId)">
          Write a Review
        </button>
      </div>
    </div>
    <p v-else>No past trips</p>

    <!-- Review Modal -->
    <ReviewModal
      v-if="isReviewModalOpen"
      :isOpen="isReviewModalOpen"
      :tourId="selectedTourId"
      @close="closeReviewModal"
    />
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase"; // Firebase setup
import ReviewModal from "./ReviewModal.vue";

export default {
  components: {
    ReviewModal,
  },
  data() {
    return {
      trips: [],
      upcomingTrips: [],
      ongoingTrips: [],
      pastTrips: [],
      isReviewModalOpen: false, // To control the modal state
      selectedTourId: null, // To keep track of the selected tour for review
    };
  },
  async mounted() {
    await this.fetchUserTrips();
    this.categorizeTrips();
  },

  methods: {
    viewTourDetails(tourId) {
      this.$router.push(`/tours/${tourId}`); // Navigate to the Tour Details page with the tour ID
    },

    formatDate(dateStr) {
      const [day, month, year] = dateStr.split(".");
      return `${day}.${month}.${year}`;
    },

    async fetchUserTrips() {
      const user = auth.currentUser; // Get current user
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            this.trips = userDoc.data().trips || []; // Fetch user's trips
          }
        } catch (error) {
          console.error("Error fetching user trips:", error);
        }
      } else {
        console.log("User not logged in.");
      }
    },
    async categorizeTrips() {
      const currentDate = new Date();

      for (const trip of this.trips) {
        try {
          // Fetch the tour data using the tourId from the user's trip
          const tourRef = doc(db, "tours", trip.tourId);
          const tourDoc = await getDoc(tourRef);

          if (tourDoc.exists()) {
            const tourData = tourDoc.data();

            // Now we have the correct startDate and endDate from the tour
            const startDate = new Date(
              tourData.startDate.split(".").reverse().join("-")
            );
            const endDate = new Date(
              tourData.endDate.split(".").reverse().join("-")
            );

            if (currentDate < startDate) {
              this.upcomingTrips.push({
                ...tourData,
                tourId: trip.tourId,
                paymentStatus: trip.paymentStatus,
              }); // Upcoming trip
            } else if (currentDate >= startDate && currentDate <= endDate) {
              this.ongoingTrips.push({
                ...tourData,
                tourId: trip.tourId,
                paymentStatus: trip.paymentStatus,
              }); // Ongoing trip
            } else if (currentDate > endDate) {
              this.pastTrips.push({
                ...tourData,
                tourId: trip.tourId,
                paymentStatus: trip.paymentStatus,
              }); // Past trip
            }
          } else {
            console.error(`No such tour document for tourId: ${trip.tourId}`);
          }
        } catch (error) {
          console.error("Error fetching tour data:", error);
        }
      }
    },
    openReviewModal(tourId) {
      this.selectedTourId = tourId;
      this.isReviewModalOpen = true;
    },
    closeReviewModal() {
      this.isReviewModalOpen = false;
      this.selectedTourId = null;
    },
  },
};
</script>

<style scoped>
.my-trip-page {
  padding-top: 80px; /* Ensure the content doesn't go into the top bar */
  padding-bottom: 80px; /* Ensure the content doesn't go into the bottom bar */
  text-align: center;
}

.trips-section {
  margin: 20px 0;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

h2 {
  font-size: 20px;
  margin-top: 20px;
}
.my-trip-page {
  padding-top: 80px;
  padding-bottom: 80px;
  text-align: center;
}

.tours-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tour-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tour-image {
  position: relative;
}

.tour-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.date-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
}

.tour-info {
  padding: 10px;
}

.tour-info h2 {
  font-size: 18px;
  margin-bottom: 5px;
}

.tour-info p {
  font-size: 14px;
  color: #666;
}
</style>
