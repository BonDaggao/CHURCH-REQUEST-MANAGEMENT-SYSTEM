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
        src="/img/pari.png" 
        lazy-src="/img/pari.png"
        height="600px"  
        style="max-width: 500px; margin-right: 100px;"
      />
      <div class="message">
        <h4>A Message From The Church</h4>
        <p class="paragraph-text">
          God first loved us -- that's the message, the core message of the Gospel. I feel pretty certain that many of us grew up thinking that somehow 
          if we did the right things, if we obeyed the commandments, if we went to church faithfully, we said our prayers every day, if we tried to 
          follow the teachings of the church, that we would make it. Somehow, God would then reward us. We would be taken into heaven.
          But it's not like that. This is the message: God first loved us. God doesn't demand that we do anything to earn that love. 
          We can't earn that love. It's God drawing us into existence because God loves us. God drawing all of the universe into existence 
          because God loves what God has made. God is love, and where there is love, there is God. That love of God reaches out to us first.
        </p>
        <p class="paragraph-text">
          God takes the initiative. God loves us. This is the message of the Gospel that once we grasp it, it can mean tremendous changes in our 
          own lives in how we relate to God. But then, as Jesus says in the Gospel, it's also how we relate to one another, "This is my one 
          commandment: That you love one another as I have loved you." Some people say at times, "Oh, that's making everything easy. What about 
          the commandments? Don't do this. Don't do that. You must do this. You must do that."
          No, it's not easy when you understand what Jesus is saying, "Love one another as I have loved you." Then, notice his example: 
          "There is no greater love than this, than to lay down your life for another." No greater love than to lay down your life for those 
          you love, which includes even your enemies. Don't just love those who love you, love your enemies. It does take great courage and 
          conviction to understand that we really must love one another as Jesus loves us.


        </p>
      </div>
    </div>

    <!-- Replace the welcome message with an image -->
    <div style="margin-top: 50px; text-align: center;">
    <q-img 
      src="/img/church.png" 
      lazy-src="/img/church.png"
      height="550px"  
      style="max-width: 100%; margin-top: 10px;"
      img-css-class="borderless-img" 
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
  color: #ffaa2b;
  margin-left: 100px;
  flex: 1; /* This ensures that the message section takes available space */
}

.paragraph-text {
  text-align: justify; /* Justify the text */
  margin-top: 0; 
  width: 70%; /* Adjust the width as per your design */
  line-height: 1.6; /* Adjust the line height for better readability */
  color: white; /* Changed text color to black */
}

/* Add this CSS in your Quasar application */
.borderless-img {
  border: none !important; /* Remove the border */
}

</style>
