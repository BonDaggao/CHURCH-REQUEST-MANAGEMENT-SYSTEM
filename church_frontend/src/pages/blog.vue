<template>
  <div id="app">
    <h2 v-if="!selectedEvent">BLOG</h2>

    <!-- Show the events grid if no event is selected -->
    <div v-if="!selectedEvent" class="events-grid">
      <div 
        v-for="event in events" 
        :key="event.title"
        class="event-card"
        @click="selectEvent(event)"
      >
        <img :src="event.image" :alt="event.title">
        <h4>{{ event.title }}</h4>
        <p>{{ event.date }}</p>
      </div>
    </div>
    
    <!-- Detailed View -->
    <div v-if="selectedEvent" class="detailed-view">
      <!-- Back button with the icon and text "GO BACK" -->
      <button @click="selectedEvent = null" class="back-button bigger-button">
        <q-icon name="arrow_back" color="#ffaa2b"></q-icon> GO BACK
      </button>
      
      <!-- Displaying the selected event's details -->
      <div class="detailed-content">
        <div class="borderless-box"> <!-- Add borderless-box class -->
          <h3>{{ selectedEvent.title }}</h3>
          <div class="content-wrapper">
            <img :src="selectedEvent.image" :alt="selectedEvent.title" class="event-image">
            <p class="description">{{ selectedEvent.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [
        // ... (Event data remains unchanged)
        {
          title: "Sama Samang Kasalan sa Simbahan",
          date: "April 22, 2023",
          image: "/img/kasalan.png",
          description: "Sama-samang Kasal sa Simbahan is a Filipino term that translates to Mass Wedding in the Church in English. This event typically refers to a ceremony where multiple couples get married simultaneously in a church setting. It's a significant occasion that allows couples to exchange vows and be united in marriage together, often with the presence of their families, friends, and community members. The event symbolizes unity, love, and commitment, showcasing the collective celebration of love and matrimony."
        },
        {
          title: "Flores De Maria",
          date: "May 27, 2023",
          image: "/img/floresdemaria.png",
          description: "Flores de Maria or Flores de Mayo emerged as a festival that beautifully combined religious devotion to the Virgin Mary with a celebration of the natural world's splendor. The name itself, Flores de Mayo or Flowers of May, reflects the tradition of offering flowers as a tribute to the Virgin Mary."
        },
        {
          title: "THE VOICE 2023",
          date: "April 21, 2023",
          image: "/img/thevoice.png",
          description: "The Voice contest would be a localized singing competition that aims to showcase the vocal talents within that specific area. Organized within the barangay, this contest provides an opportunity for residents, regardless of age or background, to display their singing abilities. "
        },
        {
          title: "GINANG NG DAMBANA",
          date: "April 23, 2023",
          image: "/img/dambana.png",
          description: "The Ginang ng Dambana pageant contest serves as a significant cultural and religious event, celebrating the virtues, grace, and dedication of women within the context of their faith and community. Participants showcase not only their outer beauty but also their inner qualities, reflecting the values and principles upheld by the shrine or religious institution they represent."
        },
        {
          title: "Libre Tuli",
          date: "April 17, 2023",
          image: "/img/tuli.png",
          description: "Kasabay ng pagdiriwang ng 38th Patronal Feast ng Shrine of the Five Wounds of Our Lord Jesus Christ tayo ay muling nagsagawa ng Libreng Tuli kaninang Umaga sa pangunguna ng ating Butihing Kapitan, Hon. Lawrence Philip DL. Roco, kasama ang ating mga kaibigang Medical Volunteers mula sa Life Plus Emergency Medical Services, Elias Aldana Fire And Rescue, Blue Eagle Fire Volunteer & Rescue Group, SFAC Nursing Students."
        },
        {
          title: "BEC DAY",
          date: "June 4, 2023",
          image: "/img/bec.png",
          description: "A day of praise and worship, full of fun, fellowship and presentation of different groups. Participated by Kapit Bahayan of  all different communities from 1 to 31 and our Religious Nuns and Priest Fr. Jerson Rey Avenido. Thank you Commission on Basic Ecclesial Community headed by Sis Agnes Carillo"
        }
      ],
      selectedEvent: null
    };
  },
  methods: {
    selectEvent(event) {
      this.selectedEvent = event;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 30px;
}

h2 {
  margin-bottom: 30px;
  color: #ffaa2b;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  justify-content: center;
}

.event-card {
 background-color: #760e0e;
  border-radius: 4px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-bottom: 50px;
}

.event-card img {
  width: 400px;
  height: 250px;
  object-fit: cover;
}

.event-card:hover {
  background-color: #ffaa2b;
}

.detailed-view {
  text-align: center;
  padding: 20px;
  color: #ffaa2b;
  margin-top: 20px;
  border-radius: 4px;
  position: relative;
}

.back-button {
  color: #ffaa2b;
  position: absolute;
  top: 20px;
  left: -0px;
  z-index: 1;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 15px 30px; /* Increased padding for a bigger button */
  font-size: 1.2em;   /* Optional: You can adjust the font size if needed */
}

.detailed-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: center;  /* Centers items horizontally */
  text-align: center;   /* Centers text */
}

.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Aligns items to the top */
  margin-top: 20px;
}

.event-image {
  width: 500px;
  height: 300px;
  object-fit: cover;
  margin-right: 20px;
}

.description {
  font-size: 18px;
  line-height: 1.5;
  text-align: justify;
  margin-left: 20px;
  max-width: 40%;
}

.borderless-box {
  background-color: #760e0e; /* Set background color to transparent */
  border: none; /* Remove the border */
  padding: 20px; /* Add padding to the box */
  border-radius: 4px; /* Optionally, add border radius for rounded corners */
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .event-image {
    margin-right: 0;
    margin-bottom: 20px;
  }
}
</style>
