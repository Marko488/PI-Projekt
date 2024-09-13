<template>
  <div class="gallery-page">
    <!-- Carousel -->
    <div class="carousel">
      <div class="image-container">
        <img :src="currentImage.imageUrl" :alt="currentImage.title" />
        <div class="image-title">
          {{ currentImage.title }}
        </div>
      </div>

      <!-- Next/Previous Buttons -->
      <button class="nav-btn prev" @click="prevImage">&#9664;</button>
      <button class="nav-btn next" @click="nextImage">&#9654;</button>
    </div>

    <!-- Display current slide info -->
    <p>Displaying {{ currentIndex + 1 }}/{{ images.length }}</p>

    <!-- Back to Tour Button -->
    <button class="back-btn" @click="goBackToTour">Back to Tour</button>
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Firestore instance

export default {
  data() {
    return {
      images: [], // To hold the images array from Firestore
      currentIndex: 0, // Tracks the current image index
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex] || {};
    },
  },
  methods: {
    async fetchTourImages() {
      const docRef = doc(db, "tours", this.$route.params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.images = docSnap.data().images || [];
      } else {
        console.error("No such document!");
      }
    },
    nextImage() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0; // Loop back to the first image
      }
    },
    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.images.length - 1; // Loop to the last image
      }
    },
    goBackToTour() {
      this.$router.push(`/tours/${this.$route.params.id}`); // Navigate back to the tour details
    },
  },
  mounted() {
    this.fetchTourImages();
  },
};
</script>

<style scoped>
.gallery-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.carousel {
  position: relative;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.image-container {
  position: relative;
}

.image-container img {
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 10px;
}

.image-title {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.back-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-btn:hover {
  background-color: #004c99;
}

p {
  margin-top: 10px;
  font-size: 14px;
}
</style>
