<template>
  <div class="contact-info">
    <div class="image-section">
      <img src="../assets/contact.jpg" alt="Kontakt informacije" />
      <div class="overlay">
        <h2>Kontakt informacije</h2>
      </div>
    </div>

    <div class="contact-details">
      <p><strong>Email:</strong> Helenaboattaxi@gmail.com</p>
      <p><strong>Telefon:</strong> +385 1234 5678</p>
    </div>

    <div class="divider"></div>
  </div>
</template>

<script>
export default {
  name: "ContactInformation",
};
</script>

<style scoped>
.contact-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-section {
  position: relative;
  height: 50vh;
  width: 100%;
}

.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 20px;
}

.overlay h2 {
  color: white;
  font-size: 24px;
}

.contact-details {
  padding: 20px;
  text-align: left;
  width: 100%;
  font-size: 16px;
}

.contact-details p {
  margin-bottom: 10px;
}

.divider {
  height: 2px;
  width: 100%;
  background-color: #c2c2c2;
  margin-top: 10px;
}
</style>
