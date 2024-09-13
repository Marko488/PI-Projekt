<template>
  <div class="reviews-page">
    <!-- Trip Image and Title -->
    <div class="hero-section" :style="{ backgroundImage: `url(${tripImage})` }">
      <div class="overlay">
        <h1>{{ tourTitle }}</h1>
      </div>
    </div>

    <!-- Average Rating and Review Breakdown -->
    <div class="ratings-section">
      <div class="average-rating">
        <h3>Customer rating</h3>
        <p>{{ totalRatings }} ratings</p>
        <div class="stars">
          <span v-for="star in 5" :key="star" class="star">&#9733;</span>
          <!-- Static stars -->
        </div>
        <div>{{ averageRating.toFixed(1) }}/5</div>
      </div>

      <!-- Rating Breakdown -->
      <div class="rating-breakdown">
        <div
          v-for="(count, star) in ratingBreakdown"
          :key="star"
          class="rating-bar"
        >
          <span>{{ star }} star</span>
          <div class="bar">
            <div
              class="filled-bar"
              :style="{ width: `${(count / totalRatings) * 100}%` }"
            ></div>
          </div>
          <span>{{ count }}</span>
        </div>
      </div>
    </div>

    <!-- Reviews -->
    <div class="reviews-list">
      <div v-for="review in reviews" :key="review.text" class="review-item">
        <div class="review-stars">
          <span v-for="star in review.stars" :key="star" class="star"
            >&#9733;</span
          >
          <span v-for="star in 5 - review.stars" :key="star" class="star"
            >&#9734;</span
          >
        </div>
        <p>{{ review.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Firestore instance

export default {
  data() {
    return {
      tripImage: "", // Image URL for the trip
      tourTitle: "", // Title of the tour
      reviews: [], // Array to hold all reviews
      ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }, // Rating breakdown
      averageRating: 0, // Calculated average rating
      totalRatings: 0, // Total number of ratings
    };
  },
  methods: {
    async fetchTourReviews() {
      const docRef = doc(db, "tours", this.$route.params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const tourData = docSnap.data();
        this.tripImage = tourData.images[0].imageUrl; // Assuming first image is the trip image
        this.tourTitle = tourData.title;
        this.reviews = tourData.reviews || [];

        // Calculate rating breakdown and average rating
        this.totalRatings = this.reviews.length;
        let totalStars = 0;

        this.reviews.forEach((review) => {
          this.ratingBreakdown[review.stars]++;
          totalStars += review.stars;
        });

        this.averageRating = totalStars / this.totalRatings;
      } else {
        console.error("No such document!");
      }
    },
  },
  mounted() {
    this.fetchTourReviews();
  },
};
</script>

<style scoped>
.reviews-page {
  padding: 20px;
}

.hero-section {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  text-align: center;
  padding: 20px;
}

.overlay h1 {
  color: white;
}

.ratings-section {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.average-rating {
  text-align: center;
}

.stars {
  font-size: 20px;
}

.rating-breakdown {
  width: 50%;
}

.rating-bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.bar {
  flex: 1;
  height: 10px;
  background-color: #ddd;
  margin: 0 10px;
  border-radius: 5px;
}

.filled-bar {
  height: 100%;
  background-color: #0066cc;
  border-radius: 5px;
}

.reviews-list {
  margin-top: 20px;
}

.review-item {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.review-stars {
  font-size: 18px;
  margin-bottom: 5px;
}

.star {
  color: gold;
}
</style>
