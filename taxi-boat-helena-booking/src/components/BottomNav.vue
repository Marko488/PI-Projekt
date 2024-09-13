<template>
  <div class="navigation">
    <div class="top-bar"></div>

    <div class="nav-links">
      <router-link to="/home" class="nav-item">
        <i class="fas fa-home"></i>
        <span>Home</span>
      </router-link>

      <router-link to="/tours" class="nav-item">
        <i class="fas fa-map-signs"></i>
        <span>Tours</span>
      </router-link>

      <router-link to="/my-trip" class="nav-item">
        <i class="fas fa-suitcase"></i>
        <span>My Trip</span>
      </router-link>

      <router-link to="/more" class="nav-item">
        <i class="fas fa-ellipsis-h"></i>
        <span>More</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomNav",
};
</script>

<style scoped>
.navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  border-top: 1px solid #ddd;
  z-index: 100;
}

.top-bar {
  height: 10px;
  background-color: #4b0082; /* Deep purple/blue */
  width: 100%;
  position: absolute;
  top: -10px;
}

.nav-links {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background-color: white;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
  text-decoration: none;
  font-size: 12px;
}

.nav-item i {
  font-size: 20px;
  margin-bottom: 5px;
}

.nav-item.active {
  color: #4b0082; /* Deep purple/blue */
}

.nav-item:hover {
  color: #4b0082;
}
</style>
