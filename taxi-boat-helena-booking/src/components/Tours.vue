<template>
  <div class="tours-page">
    <h1>{{ pageTitle }}</h1>

    <!-- "See all tours instead" button, only shown when viewing new tours -->
    <button v-if="showAllToursButton" @click="showAllTours">
      See all tours instead
    </button>
    <!-- "Nađi idealnu turu" Form, only shown when in filter mode (findIdealTour) -->
    <div v-if="showFilterForm" class="filter-form">
      <label for="duration">Choose Duration:</label>
      <select
        v-model="selectedDuration"
        @change="filterTours"
        class="form-select"
      >
        <option value="">Any Duration</option>
        <option
          v-for="duration in availableDurations"
          :key="duration"
          :value="duration.toString()"
        >
          {{ duration }} days
        </option>
      </select>

      <label for="fromCity">From City:</label>
      <select
        v-model="selectedFromCity"
        @change="filterTours"
        class="form-select"
      >
        <option value="">Any City</option>
        <option v-for="city in availableFromCities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>

      <label for="toCity">To City:</label>
      <select
        v-model="selectedToCity"
        @change="filterTours"
        class="form-select"
      >
        <option value="">Any City</option>
        <option v-for="city in availableToCities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
    </div>

    <div class="tours-container">
      <div
        v-for="tour in filteredTours"
        :key="tour.id"
        class="tour-card"
        @click="viewTourDetails(tour.id)"
      >
        <div class="tour-image">
          <img :src="tour.images[0].imageUrl" :alt="tour.title" />
          <div class="date-badge">
            <span>{{ formatDate(tour.startDate) }}</span>
            <span v-if="tour.endDate"> - {{ formatDate(tour.endDate) }}</span>
          </div>
        </div>
        <div class="tour-info">
          <h2>{{ tour.title }}</h2>
          <p>{{ tour.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Firestore instance

export default {
  data() {
    return {
      tours: [],
      showAllToursButton: false,
      pageTitle: "Tours", // Default title
      showFilterForm: true,
      selectedDuration: "", // Selected duration filter
      selectedFromCity: "", // Selected from city filter
      selectedToCity: "", // Selected to city filter
      availableDurations: [], // Available durations extracted from tours
      availableFromCities: [], // Available from cities extracted from tours
      availableToCities: [], // Available to cities extracted from tours
    };
  },
  computed: {
    filteredTours() {
      const currentDate = new Date();

      let filtered = this.tours;

      // Filter out tours that have an endDate in the past
      filtered = filtered.filter((tour) => {
        const endDate = new Date(tour.endDate.split(".").reverse().join("-"));
        return endDate >= currentDate; // Only show tours that are ongoing or in the future
      });

      // Filter by new tours if the "new" query parameter is present
      if (this.$route.query.new === "true") {
        filtered = filtered.filter((tour) => tour.newTour === true);
      }

      // Filter by duration
      if (this.selectedDuration) {
        if (this.selectedDuration !== "") {
          // Filter by the exact number of days
          console.log(this.selectedDuration);
          filtered = filtered.filter(
            (tour) =>
              this.calculateDuration(tour.startDate, tour.endDate) ===
              parseInt(this.selectedDuration)
          );
        }
      }
      // Filter by from city
      if (this.selectedFromCity) {
        filtered = filtered.filter(
          (tour) => tour.city === this.selectedFromCity
        );
      }

      // Filter by to city
      if (this.selectedToCity) {
        filtered = filtered.filter(
          (tour) => tour.endCity === this.selectedToCity
        ); // Assuming endCity exists in Firestore
      }

      return filtered;
    },
  },
  mounted() {
    this.fetchTours();
  },
  watch: {
    // Watch for changes in the route query to dynamically update the page
    "$route.query": {
      immediate: true,
      handler() {
        this.updatePageContent();
      },
    },
  },
  methods: {
    async fetchTours() {
      const querySnapshot = await getDocs(collection(db, "tours"));
      this.tours = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Extract available durations, from cities, and to cities
      this.extractFilters();

      // After fetching tours, update the content based on the route query
      this.updatePageContent();
    },
    extractFilters() {
      const durations = new Set();
      const fromCities = new Set();
      const toCities = new Set();

      this.tours.forEach((tour) => {
        // Calculate the duration for each tour
        const duration = this.calculateDuration(tour.startDate, tour.endDate);
        durations.add(duration);

        // Add the start city (from city) and end city (to city)
        fromCities.add(tour.city); // Assuming `city` is the start city
        toCities.add(tour.endCity); // Assuming `endCity` exists in Firestore
      });

      // Set available options for the dropdowns
      this.availableDurations = Array.from(durations);
      this.availableFromCities = Array.from(fromCities);
      this.availableToCities = Array.from(toCities);
    },
    updatePageContent() {
      // Check if we are in "find ideal tour" mode and adjust the title and button visibility
      if (this.$route.query.findIdealTour === "true") {
        this.pageTitle = "Ideal Tours";
        this.showAllToursButton = true;
        this.showFilterForm = true; // Show the filter form when in filter mode
      } else if (this.$route.query.new === "true") {
        this.pageTitle = "New Tours";
        this.showAllToursButton = true;
        this.showFilterForm = false; // Hide the filter form when showing new tours
      } else {
        this.pageTitle = "Tours"; // Default title
        this.showAllToursButton = false;
        this.showFilterForm = false; // Hide the filter form by default
      }
    },

    calculateDuration(startDate, endDate) {
      const start = new Date(startDate.split(".").reverse().join("-"));
      const end = new Date(endDate.split(".").reverse().join("-"));
      const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Calculate days between
      return duration;
    },

    viewTourDetails(id) {
      this.$router.push(`/tours/${id}`); // Navigate to the Tour Details page with the tour ID
    },
    showAllTours() {
      // Navigate to the tours page without the "new" query to show all tours
      this.$router.push({ path: "/tours" });
    },
    formatDate(dateStr) {
      const [day, month, year] = dateStr.split(".");
      return `${day}.${month}.${year}`;
    },
  },
};
</script>

<style scoped>
.tours-page {
  padding: 20px;
  text-align: center;
  padding-bottom: 80px;
  min-height: 100vh;
  overflow-y: auto;
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
.filter-form {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  appearance: none;
}

button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #004c99;
}
</style>
