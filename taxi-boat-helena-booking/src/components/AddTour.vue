<template>
  <div class="add-tour-page">
    <h1>Add New Tour</h1>

    <form @submit.prevent="addTour">
      <label for="title">Title</label>
      <input v-model="tour.title" type="text" required />

      <label for="description">Description</label>
      <textarea v-model="tour.description" required></textarea>

      <label for="startCity">Start City</label>
      <input v-model="tour.city" type="text" required />

      <label for="endCity">End City</label>
      <input v-model="tour.endCity" type="text" required />

      <label for="startDate">Start Date</label>
      <input v-model="tour.startDate" type="date" required />

      <label for="endDate">End Date</label>
      <input v-model="tour.endDate" type="date" required />

      <label for="startTime">Start Time</label>
      <input v-model="tour.startTime" type="time" required />

      <label for="endTime">End Time</label>
      <input v-model="tour.endTime" type="time" required />

      <label for="price">Price</label>
      <input v-model="tour.price" type="number" required />

      <label for="guide">Guide</label>
      <input v-model="tour.guide" type="text" />

      <label for="longDescription">Long Description</label>
      <textarea v-model="tour.longDescription"></textarea>

      <label for="mapImageUrl">Map Image URL</label>
      <input v-model="tour.mapImageUrl" type="url" />

      <label for="images">Images</label>
      <input v-model="newImageUrl" type="url" placeholder="Image URL" />
      <input v-model="newImageTitle" type="text" placeholder="Image Title" />
      <button @click.prevent="addImage">Add Image</button>

      <div v-if="tour.images.length > 0">
        <h3>Images</h3>
        <ul>
          <li v-for="(image, index) in tour.images" :key="index">
            <strong>{{ image.title }}</strong
            >: {{ image.imageUrl }}
          </li>
        </ul>
      </div>

      <label for="offerings">Offerings</label>
      <input v-model="newOffering" type="text" placeholder="Offering" />
      <button @click.prevent="addOffering">Add Offering</button>

      <div v-if="tour.offerings.length > 0">
        <h3>Offerings</h3>
        <ul>
          <li v-for="(offering, index) in tour.offerings" :key="index">
            {{ offering }}
          </li>
        </ul>
      </div>

      <button type="submit" class="btn-primary">Add Tour</button>
    </form>
  </div>
</template>

<script>
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase"; // Firestore instance

export default {
  data() {
    return {
      tour: {
        title: "",
        description: "",
        city: "",
        endCity: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        price: 0,
        guide: "",
        longDescription: "",
        mapImageUrl: "",
        images: [],
        offerings: [],
        newTour: false,
        reviews: [],
        newTour: true,
      },
      newImageUrl: "",
      newImageTitle: "",
      newOffering: "",
    };
  },
  methods: {
    formatDate(dateStr) {
      const [year, month, day] = dateStr.split("-");
      return `${day}.${month}.${year}`;
    },
    async addTour() {
      try {
        this.tour.startDate = this.formatDate(this.tour.startDate);
        this.tour.endDate = this.formatDate(this.tour.endDate);

        await addDoc(collection(db, "tours"), this.tour);
        this.$router.push("/tours"); // Redirect to tours page after successful addition
      } catch (error) {
        console.error("Error adding tour:", error);
      }
    },
    addImage() {
      if (this.newImageUrl && this.newImageTitle) {
        this.tour.images.push({
          imageUrl: this.newImageUrl,
          title: this.newImageTitle,
        });
        this.newImageUrl = "";
        this.newImageTitle = "";
      }
    },
    addOffering() {
      if (this.newOffering) {
        this.tour.offerings.push(this.newOffering);
        this.newOffering = "";
      }
    },
  },
};
</script>

<style scoped>
.add-tour-page {
  padding: 20px;
  padding: 20px;
  padding-bottom: 80px;
  min-height: 100vh;
  overflow-y: auto;
}

form {
  display: flex;
  flex-direction: column;
}

form input,
form textarea {
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
}

.btn-primary {
  padding: 10px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #004c99;
}
</style>
