<!-- ReviewModal.vue -->
<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <h2>Write a Review</h2>
      <div class="rating">
        <label>Stars:</label>
        <select v-model="reviewStars">
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>
      <div class="comment">
        <label>Comment:</label>
        <textarea
          v-model="reviewComment"
          placeholder="Write your review..."
        ></textarea>
      </div>
      <button @click="submitReview">Submit Review</button>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase"; // Firestore instance

export default {
  props: {
    isOpen: Boolean,
    tourId: String,
  },
  data() {
    return {
      reviewStars: 5,
      reviewComment: "",
    };
  },
  methods: {
    async submitReview() {
      try {
        const tourRef = doc(db, "tours", this.tourId); // Reference to the tour document
        const review = {
          stars: this.reviewStars,
          text: this.reviewComment,
        };
        await updateDoc(tourRef, {
          reviews: arrayUnion(review),
        });
        this.closeModal(); // Close the modal after submitting
        alert("Review submitted successfully!");
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal {
  /* Styles for the modal */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  max-width: 100%;
}

.rating,
.comment {
  margin-bottom: 15px;
}

textarea {
  width: 100%;
  height: 100px;
}
</style>
