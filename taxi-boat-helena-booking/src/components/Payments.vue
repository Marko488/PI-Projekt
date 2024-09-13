<template>
  <div class="page">
    <h1>Payments Page</h1>
    <div class="payments-list">
      <!-- Show list of unpaid trips -->
      <div v-if="unpaidTrips.length > 0">
        <div v-for="trip in unpaidTrips" :key="trip.tourId" class="trip-card">
          <h3>{{ trip.title }}</h3>
          <p><strong>Price:</strong> {{ trip.price }} EUR</p>
          <button @click="payForTrip(trip.tourId)">Pay now!</button>
        </div>
      </div>
      <p v-else>No unpaid trips</p>
    </div>
  </div>
</template>

<script>
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase"; // Import Firebase setup

export default {
  name: "Payments",
  data() {
    return {
      unpaidTrips: [], // Holds all unpaid trips for the user
    };
  },
  async mounted() {
    await this.fetchUnpaidTrips(); // Fetch unpaid trips when component is mounted
  },
  methods: {
    async fetchUnpaidTrips() {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userTrips = userDoc.data().trips || [];
            const unpaidTrips = [];

            for (const trip of userTrips) {
              if (trip.paymentStatus === "unpaid") {
                // Fetch trip details from Firestore based on the tourId
                const tripDoc = await getDoc(doc(db, "tours", trip.tourId));
                if (tripDoc.exists()) {
                  const tripData = tripDoc.data();
                  unpaidTrips.push({
                    tourId: trip.tourId,
                    title: tripData.title,
                    description: tripData.description,
                    price: tripData.price,
                  });
                }
              }
            }

            this.unpaidTrips = unpaidTrips; // Set unpaid trips for rendering
          }
        } catch (error) {
          console.error("Error fetching unpaid trips:", error);
        }
      } else {
        console.log("User not logged in.");
      }
    },

    async payForTrip(tourId) {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const trips = userDoc.data().trips || [];

            // Update the trip's payment status to "paid"
            const updatedTrips = trips.map((trip) =>
              trip.tourId === tourId ? { ...trip, paymentStatus: "paid" } : trip
            );

            // Save the updated trips array to Firestore
            await updateDoc(userRef, { trips: updatedTrips });

            // Update local state
            this.unpaidTrips = this.unpaidTrips.filter(
              (trip) => trip.tourId !== tourId
            );

            alert("Payment successful!");
          }
        } catch (error) {
          console.error("Error updating payment status:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.page {
  padding: 20px;
  padding-bottom: 100px; /* Add padding to avoid bottom nav overlap */
  text-align: center;
  overflow-y: auto; /* Allow scrolling if the content overflows */
}

.payments-list {
  margin-top: 20px; /* Space between title and the list */
}

.trip-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.trip-card h3 {
  margin-top: 0;
  font-size: 18px;
  color: #333;
}

.trip-card p {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.trip-card button {
  padding: 10px 20px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.trip-card button:hover {
  background-color: #004c99;
}
</style>
