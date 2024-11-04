<template>
  <div>
    <h2>ABOUT</h2>
  </div>

  <div class="menu">
    <main>
      <div class="logo-info-container">
        <!-- Logo placed beside the name -->
        <q-img 
          src="/img/logo.png" 
          lazy-src="/img/logo.png"
          height="255px"  
          style="max-width: 290px; margin-right: 20px; border-radius: 50%;"
        />
        <div class="info">
          <h3>SHRINE OF THE FIVE WOUNDS OF OUR LORD JESUS CHRIST</h3>
          <h4>364 Real Street, Talon I, Las Pinas, 1747 Metro Manila</h4>
        </div>
      </div>
    </main>
  </div>

  <!-- Vision and Mission Section -->
  <div class="vision-mission-container">
    <div class="vision-mission-item">
      <h4 style="text-align: left;">VISION</h4>
      <h5 style="text-align: left;"></h5>
      <p style="text-align: justify; color: white;">
        We, the parishioners of the Shrine of the Five Wounds of Our Lord Jesus Christ in Las Pinas, are on a journey to the kingdom of the Father's pilgrim; healed and redeemed by the Most Precious Wounds of jesus and empowered by the holy Spirit.

      </p>
    </div>
    <div class="vision-mission-item">
      <h4 style="text-align: left;">MISSION</h4>
      <h5 style="text-align: left; color: white;">is to transform the Parish into:</h5>
      <li style="text-align: justify; color: white;">
      A Shrine under the Stigmatine Father & Brothers at the service of the local church  
      </li>
      <li style="text-align: justify; color: white;">                                              
      A center of devotion and healing emanating from the Five Wounds of Our Lord Jesus
      </li>    
      
      <h5 style="text-align: left; margin-top: 20px; color: white;">We commit ourselves to:</h5>
      <li style="text-align: justify; color: white;">
      Promoting Basic Ecclesial Communities as a new way of being church;
      </li>
      <li style="text-align: justify; color: white;">
      Prioritizing the excluded and the wounded especially families and young people in difficult circumtances of life, and
      </li>
      <li style="text-align: justify; color: white;">
      Enkindling the gifts of hope and coutage through the Holy Spirit.
      </li>
    </div>
  </div>
  <!-- End of Vision and Mission Section -->

  <!-- Contact Section -->
  <div class="contact-container">
    <h4>CONTACT</h4>
    <div class="contact-details">
      <p><strong>Name:</strong> Shrine of the Five Wounds of Our Lord Jesus Christ</p>
      <p><strong>Address:</strong> 364 Real Street, Talon I, Las Pinas, 1747 Metro Manila</p>
      <p><strong>Tel Num:</strong> (Your Telephone Number)</p>
      <p><strong>FB Page:</strong> <a href="https://www.facebook.com/5WoundsShrine">5WoundShrine</a></p>
    </div>
  </div>
  <!-- End of Contact Section -->

  <!-- MAP Section -->
  <div class="map-container">
    <h4>MAP</h4>
    <q-img 
          src="/img/map.png" 
          lazy-src="/img/map.png"
          height="400px"  
          style="max-width: 800px; margin-right: 20px; "
        />
  </div>

  <div class="space">
    <h4></h4>
    
        
  </div>
  <!-- End of MAP Section -->
</template>

<script>
export default {
  // Add any component options if needed
};
</script>

<style scoped>
/* Styles for About page */

.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  height: 20em;
  width: 90%;
  background-color: #ffaa2b;
  margin: auto;
  margin-top: 30px;
}

.logo-info-container {
  display: flex;
  align-items: center;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
  display: inline;
  color: black;
}

h2 {
  margin: auto;
  margin-top: 30px;
  text-align: center;
  color: #ffaa2b;
}

.vision-mission-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* Add this line to wrap items when there's not enough space */
  margin-top: 30px;
  padding: 20px;
  color: #ffaa2b;
}

.vision-mission-item {
  flex-basis: calc(50% - 20px); /* Adjusted to occupy half the container with margin */
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px; /* Add margin between items */
}

.vision-mission-item h4, .vision-mission-item p {
  margin: 0;
}

.vision-mission-item li {
  text-align: justify;
  width: 80%; /* Adjusted width to occupy full width */
}

.contact-container {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 30px;
  color: #ffaa2b;
}

.map-container {
  text-align: center;
  margin-top: 50px;
  color: #ffaa2b;
}

.contact-details {
  margin-top: 20px;
  color: white;
}

.contact-details a:hover {
  text-decoration: underline; /* Add underline on hover for better UX */
}
</style>

