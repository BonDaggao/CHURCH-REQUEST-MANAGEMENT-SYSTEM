<template>
  <div id="app">
    <h2 v-if="!selectedDocument">Available Documents</h2>

    <!-- Show the documents grid if no document is selected -->
    <div v-if="!selectedDocument" class="documents-grid">
      <div v-for="doc in documents" :key="doc.title" class="document-card" @click="selectDocument(doc)">
        <h4>{{ doc.title }}</h4>
        <p>{{ doc.status }}</p>
      </div>
    </div>

    <!-- Document Request Form -->
    <div v-if=" selectedDocument && !showPaymentForm && !showConfirmation"  class="form-box">
      <!-- Add this div with the form-box class -->
      <q-form class="google-form">
        <!-- Back button with the icon and text "GO BACK" -->
        <q-btn @click="selectedDocument = null" class="back-button" color="primary">
          <q-icon name="arrow_back"></q-icon> GO BACK
        </q-btn>

        <!-- Displaying the document request form -->
        <q-card  class="request-content">
          <q-card-section>
            <div class="request-heading">
              <h3>Requesting {{ selectedDocument.title }}</h3>
            </div>
            <q-form @submit="onSubmit">
              <div v-if="isAuthenticated" class="form-content">
                <div class="input-wrapper">
                  <div class="label">Name</div>
                  <q-input v-model="name" filled outlined dense required></q-input>
                </div>
                <!-- Conditionally render input fields based on the selected document -->
                <div v-if="selectedDocument.title !== 'Marriage Certificate' && selectedDocument.title !== 'Mass Card'">
                  <div class="input-wrapper">
                    <div class="label">Mother Name</div>
                    <q-input v-model="mother_name" filled outlined dense required></q-input>
                  </div>
                  <div class="input-wrapper">
                    <div class="label">Father Name</div>
                    <q-input v-model="father_name" filled outlined dense required></q-input>
                  </div>
                  <div class="input-wrapper">
                    <div class="label">Date Baptized</div>
                    <div class="date-picker">
                      <q-input filled v-model="date_baptized" mask="date">
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="date_baptized">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
                <div class="input-wrapper">
                  <div class="label">Number</div>
                  <q-input v-model="number" filled outlined dense required></q-input>
                </div>
                <div class="input-wrapper">
                  <div class="label">Email</div>
                  <q-input v-model="email" filled outlined dense required></q-input>
                </div>
                <div class="input-wrapper">
                  <div class="label">Address</div>
                  <q-input v-model="address" filled outlined dense required></q-input>
                </div>
                <!-- Move the Shipping Option section here -->
                <div class="input-wrapper">
                  <div class="label">Shipping Option</div>
                  <q-select v-model="shippingOption" filled outlined :options="shippingOptions" required></q-select>
                </div>
                <div class="input-wrapper">
                  <div class="label">Payment Option:</div>
                  <q-select v-model="paymentOption" filled outlined :options="paymentOptions" required></q-select>
                </div>
                <div class="input-wrapper">
                  <!-- <div class="label">Payment Channel:</div>
                  <q-select v-model="paymentChannel" filled outlined :options="paymentChannels" required></q-select> -->
                </div>
                <div class="input-wrapper">
                  <!-- <div class="label">Fee:</div>
                  <q-input v-model="fee" filled outlined type="number" required></q-input> -->
                </div>
              </div>
              <!-- Add Next button to proceed to shipping options -->
              <div v-if="isAuthenticated" class="form-actions">
                <q-btn type="submit" label="Submit" color="primary"></q-btn>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-form>
    </div> <!-- Close the div with the form-box class -->

    <!-- Confirmation Message after Payment -->
    <div v-if="showConfirmation" class="confirmation-message">
      <h3>Your document request has been confirmed.</h3>
      <p>Please wait for Update</p>
      <!-- <q-btn @click="showDocumentSelection" label="Review" color="primary"></q-btn> -->
      <q-btn @click="showDocumentSelection" label="Exit" color="primary"></q-btn>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapActions } from "pinia";
import { useBaptismalCertificateStore } from "@/stores/baptismal-certificate";
import { useMarriageCertificateStore } from "@/stores/marriage-certificate";
import { useMassCardStore } from "@/stores/mass-cards";


export default {
  data() {
    return {
      documents: [
        { title: "Marriage Certificate" },
        { title: "Baptismal Certificate" },
        { title: "Mass Card" }
      ],
      isAuthenticated: ref(false),
      selectedDocument: null,
      name: '',
      father_name:'',
      mother_name:'',
      date_baptized: ref(''),
      number: '',
      email: '',
      address: '',
      showPaymentForm: false,
      showConfirmation: false,
      paymentOption: '',
      paymentChannel: '',
      fee: '',
      shippingOption: '',
      paymentOptions: ['Gcash', 'Pay Onsite',],
      paymentChannels: ['Online', 'Offline'],
      shippingOptions: ['Pick Up', 'Delivery']
    };
  },

  mounted(){
     // Get current date
     const currentDate = new Date();

    // Format the date as YYYY-MM-DD
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

    // Assign the formatted date to the ref
    this.date_baptized = formattedDate;

    this.isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
  },

  methods: {
    ...mapActions(useBaptismalCertificateStore, ["Baptismalcreate"]),
    ...mapActions(useMarriageCertificateStore, ["Marriagecreate"]),
    ...mapActions(useMassCardStore, ["Masscardcreate"]),

    selectDocument(doc) {
      this.selectedDocument = doc;
    },

    async onSubmit() {
      let payload = {
        user_id: sessionStorage.getItem("user_id"),
        name: this.name,
        mother_name: this.mother_name,
        father_name: this.father_name,
        date_baptized: this.date_baptized,
        number: this.number,
        email: this.email,
        address: this.address,
        payment_type: this.paymentOption,
        shipping_type: this.shippingOption
      }
      if (this.selectedDocument.title === "Marriage Certificate" || this.selectedDocument.title === "Mass Card") {
        // Exclude unnecessary fields for Marriage Certificate and Mass Card
        delete payload.mother_name;
        delete payload.father_name;
        delete payload.date_baptized;
      }
      
      if (this.selectedDocument.title === "Marriage Certificate") {
        const result = await this.Marriagecreate(payload)
        if (result.message === 'Success.') {
          this.showConfirmation = true;
          this.resetForm();
          this.$q.notify({
            type: 'positive',
            message: 'Form submitted successfully',
            position: 'top-right'
          });
        }
      } else if (this.selectedDocument.title === "Baptismal Certificate") {
        const result = await this.Baptismalcreate(payload)
        console.log('Baptismal')
        if (result.message === 'Success.') {
          this.resetForm();
          this.showConfirmation = true;
          this.$q.notify({
            type: 'positive',
            message: 'Form submitted successfully',
            position: 'top-right'
          });
        }
      } else if (this.selectedDocument.title === "Mass Card") {
        const result = await this.Masscardcreate(payload)
        if (result.message === 'Success.') {
          this.resetForm();
          this.showConfirmation = true;
          this.$q.notify({
            type: 'positive',
            message: 'Form submitted successfully',
            position: 'top-right'
          });
        }
      }
    },

    resetForm(){
      this.name = '';
      this.mother_name = '';
      this.father_name = '';
      this.date_baptized = '';
      this.number = '';
      this.email = '';
      this.address = '';
      this.shippingOption = '';
      this.paymentOption = '';
      this.paymentChannel = '';
      this.fee = '';
    },

    showDocumentSelection() {
      this.showConfirmation = false;
      this.selectedDocument = null;
    },

    exit() {
      this.formSubmitted = false;
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffaa2b;
  margin-top: 30px;
  margin-bottom: 0;
  /* Add this line to remove bottom margin */
}

h2 {
  margin-bottom: 20px;
  color: #ffaa2b;
}

.documents-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* Centering the items horizontally */
  padding-left: 20px;
  /* Adding space on the left */
  padding-right: 20px;
  /* Adding space on the right */
  margin-top: 50px;
}

.document-card {
  border: 1px solid #ccc;
  background-color: #ffaa2b;
  color: black;
  border-radius: 4px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-bottom: 50px;
  margin-left: 20px;
  margin-right: 20px;
  width: 400px;
  /* You can adjust this value based on your preference */
  height: 250px;
  /* You can adjust this value based on your preference */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.document-card:hover {
  background-color: #ffaa2b;
}

.google-form {
  margin-top: 0;
  color: black;
  max-width: 700px;
  margin: 0 auto;
}

.request-heading {
  margin-bottom: 20px;
}

.back-button {
  margin-bottom: 20px;
  position: absolute;
  top: -5%;
  left: -55%;
}

.input-wrapper {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
  color: black;
  text-align: left;
}

.form-actions {
  text-align: center;
}

.confirmation-message {
  margin-top: 20px;
  text-align: center;
}

.confirmation-message q-btn {
  margin: 0 10px;
}

/* Add the style for the form-box class */
.form-box {
  background-color: #f0ebf8;
  padding: 20px;
  margin: auto;
  /* Center horizontally and vertically */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.06);
  width: 800px;
  max-width: 100%;
  height: 50%;
  margin-top: auto;
}
</style>
