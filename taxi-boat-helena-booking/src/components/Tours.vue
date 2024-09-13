<template>
  <div class="tours-page">
    <h1>TOURS</h1>
    <div class="tours-container">
      <div
        v-for="tour in tours"
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
  name: "Tours",
  data() {
    return {
      tours: [],
    };
  },
  mounted() {
    this.fetchTours();
  },
  methods: {
    async fetchTours() {
      const querySnapshot = await getDocs(collection(db, "tours"));
      this.tours = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    formatDate(dateStr) {
      const [day, month, year] = dateStr.split(".");
      return `${day}.${month}.${year}`;
    },
    viewTourDetails(id) {
      this.$router.push(`/tours/${id}`); // Navigate to the Tour Details page with the tour ID
    },
  },
};
</script>

<style scoped>
.tours-page {
  padding: 20px;
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
