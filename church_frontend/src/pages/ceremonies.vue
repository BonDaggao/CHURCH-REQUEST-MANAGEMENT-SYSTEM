<template>
  <div class="services">
    <!-- Display header only if no service is selected -->
    <h2 v-if="!selectedService && !formSubmitted" style="color: #ffaa2b;">SERVICES</h2>

    <!-- List of Services -->
    <div v-if="!selectedService && !showRequestForm && !formSubmitted" class="service-boxes">
      <div class="box" v-for="service in services" :key="service.name" @click="showServiceDetails(service)">
        {{ service.name }}
      </div>
    </div>

    <!-- Display selected service details -->
    <div v-if="selectedService && !showRequestForm && !formSubmitted">
      <h2 style="color: #ffaa2b;">Details for {{ selectedService.name }}</h2>
      <div>
        <!-- Left side: FAQ & Process -->
        <div class="details-left">
          <h3 style="color: #ffaa2b;">Process</h3>
          <ul>
            <li v-for="(step, index) in selectedService.process" :key="index" style="color: white;">{{ step }}</li>
          </ul>
        </div>
        <!-- Right side: Requirements -->
        <div class="details-right">
          <h3 style="color: #ffaa2b;">Requirements</h3>
          <ul>
            <li v-for="(requirement, index) in selectedService.requirements" :key="index" style="color: white;">{{ requirement }}</li>
          </ul>
        </div>
      </div>
      <!-- Go Back button -->
      <button class="back-button" @click="selectedService = null" style="color: black !important;">
        <q-icon name="arrow_back" color="black"></q-icon>Go Back
      </button>
      <!-- Title of the form inside the box -->
      <div v-if="isAuthenticated" class="form-box">
        <h3 style="color: black; background-color: #f0ebf8; padding: 10px;">{{ selectedService.name }} Form</h3>
        <!-- Integrated request form here -->
        <component v-if="!formSubmitted" :is="selectedServiceFormComponent" @formSubmitted="handleFormSubmitted" />
        <!-- Display submitted form data -->
        <div v-if="formSubmitted">
          <h3 style="color: black;">Review Your {{ selectedService.name }} Form</h3>
          <p>Submitted Data:</p>
          <pre>{{ submittedFormData }}</pre>
        </div>
      </div>
    </div>

    <!-- Message after submitting the form -->
    <div v-if="formSubmitted" class="message">
      <h3 style="color: #ffaa2b;">Your request has been submitted.</h3>
      <p style="color: #ffaa2b;">Please wait for Update</p>
      <!-- Button to review the reservation form -->
      <!-- <button class="review-button" @click="reviewReservation" style="color: black;">Review Reservation</button> -->
      <!-- Button to exit and go back to services -->
      <button class="exit-button" @click="exitReservation" style="color: black;">Exit</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import BaptismForm from "./form/BaptismForm.vue";
import MarriageForm from "./form/MarriageForm.vue";
import ConfessionForm from "./form/ConfessionForm.vue";
import ConfirmationForm from "./form/ConfirmationForm.vue";
import HouseBlessingForm from "./form/HouseBlessingForm.vue";
import AnointingForm from "./form/AnointingForm.vue";
// Import other service form components here

export default {
  name: "Services",
  components: {
    BaptismForm,
    MarriageForm,
    ConfessionForm,
    ConfirmationForm,
    HouseBlessingForm,
    AnointingForm

    // Register other service form components here
  },
  data() {
    return {
      services: [
        {
          name: 'Baptism',
          process: [
          'Contact the Parish: Reach out to the local Catholic parish where you wish to have the baptism.',
          'Pre-Baptismal Preparation: Attend any required classes or sessions, typically focused on the significance of baptism and the responsibilities of Catholic life.',
          'Schedule the Baptism: Coordinate with the parish to select a date for the baptism ceremony.',
          'Baptism Ceremony: Attend the baptismal ceremony, which includes prayers, blessings, and the pouring or immersion in water while invoking the Holy Trinity.',
          'Baptismal Certificate: Receive a baptismal certificate from the parish as a record of the sacrament.',
          ],
          requirements: [
            'Birth Certificate: A copy of the baptismal candidates birth certificate is usually required.',
            'Sponsor (Godparent): If the candidate is an infant, sponsors (godparents) are typically required. They must be practicing Catholics who have received the sacraments of Baptism, Confirmation, and Holy Communion.',
            'Baptismal Fee: Some parishes may request a nominal fee to cover administrative costs.',
            'Preparation and Attendance: Candidates or parents may need to attend pre-baptismal classes or sessions.',
            'Parental Consent (for minors): If the candidate is a minor, parental consent is necessary for the baptism.',
            'NOTE:',
            'Bring The orginal copy of Marriage Certificate and Birth Certificate'
          ],
          formComponent: 'BaptismForm'
          // Add formComponent property to other services with corresponding form component names
        },
        {
          name: 'Marriage',
          process: [
            'Pre-Cana Preparation: Couples are required to undergo pre-marriage preparation, often called Pre-Cana or marriage preparation courses. These courses cover various aspects of married life, including communication, finances, and spirituality.',
            'Church Documents: Couples need to provide necessary documents, including baptismal certificates, confirmation certificates, and a marriage license from the civil authorities.',
            'Choosing a Date and Venue: Couples should consult with their chosen parish to schedule the wedding date and venue.',
            'Wedding Ceremony: On the chosen date, the couple exchanges vows and rings during the wedding ceremony, which includes prayers, readings, and blessings.',
            'Marriage Registration: After the ceremony, the marriage is recorded in the parish register, and the couple receives a marriage certificate.'
            
          ],
          requirements: [
            'Baptismal and Confirmation Certificates: Both partners need to provide recent copies of their baptismal and confirmation certificates.',
            'Marriage License: Couples must obtain a marriage license from the local civil registrars office before the wedding.',
            'Pre-Cana Certificate: Completion of a pre-marriage preparation course is mandatory, and couples need to present a certificate of attendance.',
            'Freedom to Marry Affidavit: Couples may need to sign a document affirming that they are free to marry.',
            'Canonical Interview: Couples may undergo a canonical interview with the priest or deacon to ensure they understand the sacrament of marriage and are entering into it freely and willingly.',
            'NOTE:',
            'Bring the orginal copy of Confirmation Certificate, Baptismal Certificate, Birth Certificate and Certificate of No Marriage'
          ],
          formComponent: 'MarriageForm'
          // Add formComponent property to other services with corresponding form component names
        },
        {
          name: 'Confession',
          process: [
            'xamination of Conscience: Before confession, Catholics should prayerfully examine their conscience to reflect on their thoughts, words, and actions since their last confession.',
            'Confession: Approach the confessional or reconciliation room at the church. Begin by making the sign of the cross and stating, "Bless me, Father, for I have sinned. It has been [time period] since my last confession." Then, confess your sins honestly and humbly.',
            'Receiving Absolution: The priest may offer counsel and assign penance. Then, he will absolve you from your sins by saying the words of absolution.',
            'Penance: Perform the penance assigned by the priest, which may include prayers or acts of charity.',
            'Thanksgiving and Resolution: After confession, express gratitude to God for His mercy and resolve to avoid sin in the future.'
          ],
          requirements: [
            'Contrition: Sincere sorrow for ones sins, along with the intention to avoid sin in the future, is necessary for valid confession.',
            'Confession of Mortal Sins: Catholics must confess all mortal sins they are aware of since their last confession.',
            'Confession of Venial Sins: While not required, confessing venial sins is encouraged for spiritual growth and purification.',
            'Confession Frequency: Catholics are encouraged to confess mortal sins as soon as possible and to participate in the sacrament of reconciliation regularly for spiritual renewal.',
            'Confidentiality: Confessions are absolutely confidential, and priests are bound by the seal of confession, never to disclose what is confessed to them.',
            'NOTE:',
            'Bring The Letter of intent upon Coming to the Parish Church'
         ],
          formComponent: 'ConfessionForm'
          // Add formComponent property to other services with corresponding form component names
        },
        {
          name: 'Confirmation',
          process: [
            'Preparation: Candidates for confirmation typically undergo a period of preparation, which may include catechesis (religious instruction), retreats, and service activities to deepen their understanding of the faith.',
            'Selection of a Sponsor: Each candidate chooses a sponsor, usually a practicing Catholic who will guide and support them in their faith journey.',
            'Reception of the Sacrament: During the confirmation ceremony, candidates publicly renew their baptismal promises and receive the laying on of hands by the bishop or priest, who then anoints them with chrism oil, sealing them with the Holy Spirit.',
            'Confirmation Name: Candidates may choose a confirmation name, often that of a saint they admire, to signify their commitment to follow Christs example.',
            'Celebration: Family and friends gather to celebrate the confirmation, often with a reception or meal afterward.',
          ],
          requirements: [
            'Baptism: Candidates must be baptized Catholics to receive confirmation.',
            'Preparation: Candidates are expected to participate fully in the preparation process, which may include attending classes, retreats, and spiritual formation activities.',
            'Desire for Confirmation: Candidates should express a sincere desire to receive the sacrament and grow in their relationship with God.',
            'Sponsor: Each candidate must have a sponsor who is a confirmed Catholic in good standing with the Church.',
            'Readiness: Candidates should be prepared to make a personal commitment to live out their faith and be active members of the Church community.',
            'NOTE:',
            'Bring the Original copy of Baptismal Certificate, Birth Certificate and Letter of Intent'
          ],
          formComponent: 'ConfirmationForm'
          // Add formComponent property to other services with corresponding form component names
        },
        {
          name: 'House Blessing',
          process: [
            'Schedule the Blessing: Contact your parish to schedule a convenient time for the house blessing.',
            'Prepare the Home: Clean and tidy the house in preparation for the blessing. Gather family members and any items you wish to have blessed (e.g., holy water, crucifixes, religious images).',
            'Welcome the Priest or Deacon: Greet the priest or deacon warmly upon their arrival and invite them into your home.',
            'Invocation of Blessing: The priest or deacon will lead prayers, invoke Gods blessing upon the home, and sprinkle holy water in each room, symbolizing purification and protection.',
            'Blessing of Objects: If desired, the priest or deacon can bless religious articles, such as crucifixes, rosaries, and medals, as well as any other objects you wish to have blessed.',
            'Prayers and Conclusion: The blessing concludes with prayers for the familys well-being, the homes security, and the dwellings dedication to Gods service.',
          ],
          requirements: [
            'Prepare Spiritually: Reflect on the significance of the house blessing and invite family members to participate in prayers and rituals',
            'Personalize the Blessing: Consider incorporating personal prayers or intentions into the blessing, such as prayers for specific family members or needs.',
            'Invite Guests: You may wish to invite friends, neighbors, or fellow parishioners to witness and participate in the house blessing.',
            'Create a Sacred Space: After the blessing, display blessed objects prominently in the home as reminders of Gods presence and protection.',
            'Express Gratitude: Thank the priest or deacon for their time and prayers, and consider offering them hospitality such as refreshments or a meal.',
            'NOTE:',
            'Bring The Letter of intent upon Coming to the Parish Church'
          ],
          formComponent: 'HouseBlessingForm'
          // Add formComponent property to other services with corresponding form component names
        },
        {
          name: 'Anointing of the sick',
          process: [
            'Requesting the Sacrament: If you or a loved one is seriously ill or facing a medical procedure, contact your parish priest to request the sacrament of the anointing of the sick.',
            'Preparation: Prepare spiritually by reflecting on the need for Gods healing and grace. Confession, if possible, is encouraged before receiving the sacrament.',
            'Reception of the Sacrament: The priest will visit the sick person, offer prayers, and anoint them with blessed oil on the forehead and hands while invoking the Holy Spirits healing power.',
            'Prayers and Blessings: The priest may offer prayers for healing, forgiveness of sins, and strength, as well as blessings for the sick persons family and caregivers.',
            'Comfort and Support: Family members and friends are encouraged to be present to offer comfort, support, and prayers during the anointing.',
          ],
          requirements: [
            'Serious Illness or Health Condition: The sacrament is intended for those facing serious physical or emotional illness, suffering, or frailty.',
            'Desire for the Sacrament: The sick person or their caregiver should express a sincere desire to receive the sacrament and benefit from its graces.',
            'Presence of a Priest: A Catholic priest must be present to administer the sacrament, although in emergencies, any priest, even one without jurisdiction, can administer it.',
            'Openness to Gods Grace: The recipient should be open to receiving Gods healing, comfort, and strength through the sacrament.',
            'Faith: While faith is not a strict requirement, an openness to Gods presence and grace can deepen the spiritual benefits of the sacrament.',
            'NOTE:',
            'Bring The Letter of intent upon Coming to the Parish Church'
          ],
          formComponent: 'AnointingForm'
          // Add formComponent property to other services with corresponding form component names
        },
        // Add other service objects here
      ],
      isAuthenticated: ref(false),
      selectedService: null,
      showRequestForm: false,
      formSubmitted: false,
      submittedFormData: null // Store submitted form data
    };
  },
  computed: {
    selectedServiceFormComponent() {
      return this.selectedService ? this.selectedService.formComponent : null;
    }
  },
  mounted(){
    this.isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
  },
  methods: {
    showServiceDetails(service) {
      this.selectedService = service;
    },
    handleFormSubmitted(formData) {
      this.formSubmitted = true;
      this.submittedFormData = formData; // Store submitted form data
      this.selectedService = null; // Hide selected service details
      this.showRequestForm = false; // Hide request form
    },
    reviewReservation() {
      // Handle logic to review the reservation form.
      // For now, just keep formSubmitted as true.
      // You can add more detailed logic here.
      this.formSubmitted = true;
    },
    exitReservation() {
      // Reset formSubmitted, submittedFormData, and selectedService
      this.formSubmitted = false;
      this.submittedFormData = null;
      this.selectedService = null;
    }
  }
};
</script>

<style scoped>
/* Your existing styles */

.services {
  text-align: center;
  color: black;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 10px;
}

.service-boxes {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.box {
  border: 1px solid #ccc;
  background-color: #ffaa2b;
  color: black;
  border-radius: 4px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-top: 30px;
  width: calc(33.33% - 40px);
  max-width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px; /* Adjust the font size as needed */
}

.box:hover {
  background-color: #ffaa2b;
}

.details-left, .details-right {
  width: 40%;
  display: inline-block;
  vertical-align: top;
}

.details-left {
  margin-right: 2%;
}

.details-left ul,
.details-right ul {
  text-align: justify;
}

.details-left li,
.details-right li {
  display: inline-block;
  width: 80%;
  padding: 5px 0;
}

.back-button {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: #ffaa2b;
  color: black !important;
  padding: 15px 25px; /* Adjust padding to make the button bigger */
  font-size: 16px; /* Adjust font size as needed */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.review-button {
  background-color: #ffaa2b;
  color: black;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.review-button:hover {
  background-color: #e2e6ea;
  color: #ffaa2b;
}

.exit-button {
  background-color: #ffaa2b;
  color: black;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.exit-button:hover {
  background-color: #e2e6ea;
  color: #ffaa2b;
}


/* Add new styles for the form box */
.form-box {
  background-color: #f0ebf8;
  padding: 20px;
  margin: auto; /* Center horizontally and vertically */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.06);
  width: 800px;
  max-width: 100%;
  height: 50%;
  margin-bottom: 10px;
}
</style>
