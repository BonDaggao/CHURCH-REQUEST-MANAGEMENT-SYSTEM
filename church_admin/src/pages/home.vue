<template>
  <div>
    <!-- Existing Menu Content -->
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

    <!-- Logo and Info Section with Space -->
    <div class="logo-info-section" style="margin-top: 50px; display: flex; align-items: flex-start;">
      <!-- Logo placed beside the name -->
      <q-img 
        src="/img/pope.png" 
        lazy-src="/img/pope.png"
        height="600px"  
        style="max-width: 500px; margin-right: 100px;"
      />
      <div class="message">
        <h4>A Message From Our Parish Priest</h4>
        <p class="paragraph-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Dignissim diam quis enim lobortis. Volutpat est velit egestas dui id ornare. Bibendum est ultricies integer quis auctor elit sed vulputate mi. 
        Parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer. Massa sed elementum tempus egestas sed sed risus pretium quam. 
        Molestie at elementum eu facilisis sed odio morbi quis. Porta non pulvinar neque laoreet. Magna ac placerat vestibulum lectus mauris ultrices eros. 
        Tellus cras adipiscing enim eu turpis. Interdum velit laoreet id donec ultrices tincidunt arcu. Ornare lectus sit amet est placerat in. 
        Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing.
        </p>
        <p class="paragraph-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Dignissim diam quis enim lobortis. Volutpat est velit egestas dui id ornare. Bibendum est ultricies integer quis auctor elit sed vulputate mi. 
        Parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer. Massa sed elementum tempus egestas sed sed risus pretium quam. 
        Molestie at elementum eu facilisis sed odio morbi quis. Porta non pulvinar neque laoreet. Magna ac placerat vestibulum lectus mauris ultrices eros. 
        Tellus cras adipiscing enim eu turpis. Interdum velit laoreet id donec ultrices tincidunt arcu. Ornare lectus sit amet est placerat in. 
        Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing.
        </p>
      </div>
    </div>

    <!-- Replace the welcome message with an image -->
    <div style="margin-top: 50px; text-align: center;">
      <q-img 
        src="/img/church.png" 
        lazy-src="/img/church.png"
        height="550px"  
        style="max-width: 3000px;"
      />
    </div>
  </div>
</template>

<!-- CSS remains unchanged -->
<style>
/* Styles for the existing menu */
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

/* Styles for the new logo-info section */
.logo-info-section {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: auto;
  margin-left: 100px;
}

.message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: black;
  margin-left: 100px;
  flex: 1; /* This ensures that the message section takes available space */
}

.paragraph-text {
  text-align: justify; /* Justify the text */
  margin-top: 0; 
  width: 70%; /* Adjust the width as per your design */
  line-height: 1.6; /* Adjust the line height for better readability */
  color: black;
}
</style>
