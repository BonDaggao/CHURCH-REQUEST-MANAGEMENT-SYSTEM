<template>
  <div v-if="isAuthenticated" class="google-form">
    <q-form @submit.prevent="onSubmit">
      <div class="form-content">
        <!-- Mothers Name -->
        <div class="input-wrapper">
          <div class="label">Mother's Name</div>
          <q-input
            filled
            v-model="motherName"
            dense
            outlined
            required
          />
        </div>
        <!-- Fathers Name -->
        <div class="input-wrapper">
          <div class="label">Father's Name</div>
          <q-input
            filled
            v-model="fatherName"
            dense
            outlined
            required
          />
        </div>
        <!-- Name of Child -->
        <div class="input-wrapper">
          <div class="label">Name of Child</div>
          <q-input
            filled
            v-model="childName"
            dense
            outlined
            required
          />
        </div>
        <!-- Contact Number -->
        <div class="input-wrapper">
          <div class="label">Contact Number</div>
          <q-input
            filled
            v-model="contactNumber"
            outlined
            required
            :rules="[ val => val && val.length === 11 || 'Please type your number']"
          />
        </div>
        <!-- Email -->
        <div class="input-wrapper">
          <div class="label">Email</div>
          <q-input
            filled
            v-model="email"
            dense
            outlined
            required
            type="email"
          />
        </div>
        <!-- List of Principal Sponsors -->
        <div class="input-wrapper">
          <div class="label">List of Principal Sponsors (Ninong/Ninang)</div>
          <q-input
            filled
            v-model="principalSponsors"
            dense
            outlined
            required
            type="textarea"
            :rows=" 3" 
          />
        </div>
         <!-- Preferred Date/Time -->
         <div class="input-wrapper">
          <div class="label">Preferred Date/Time</div>
          <div class="date-picker">
            <q-input filled v-model="date" mask="date" :rules="[val => val && checkDateValidity(val) || 'Please select a date that is not in the past']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date" :min="getCurrentDate()">
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
        <!-- Type -->
        <div class="input-wrapper">
          <div class="label">Type</div>
          <q-option-group
            v-model="type"
            :options="options"
            class="left-aligned"
          />
        </div>
      </div>
      <!-- Submit Button -->
      <q-btn
        type="submit"
        label="Submit"
        color="primary"
        class="submit-button"
        :disabled="!checkFormValidity"
      />
    </q-form>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue'
import { mapActions } from "pinia";
import { useBaptismStore } from "@/stores/baptism";

export default {
  data() {
    return {
      isAuthenticated: ref(false),
      user_id: sessionStorage.getItem("user_id"),
      motherName: '',
      fatherName: '',
      contactNumber: '',
      email: '',
      childName: '',
      principalSponsors: '',
      date: ref(''),
      type: '',
      options: [
        { label: 'Adult', value: 'Adult' },
        { label: 'Child', value: 'Child' },
      ],
      marriage_certificate: [],
      birth_certificate: []
    };
  },

  mounted(){
    // Get current date
    const currentDate = new Date();

    // Format the date as YYYY-MM-DD
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

    // Assign the formatted date to the ref
    this.date = formattedDate;

    this.isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
  },

  methods: {
    ...mapActions(useBaptismStore,["create"]),

    async onSubmit() {
      if (!this.checkFormValidity()) {
        return; // Prevent form submission if it's invalid
      }
      
      // Split the principalSponsors input by commas to get individual sponsors
      const sponsorsArray = this.principalSponsors.split(',').map(sponsor => sponsor.trim());
      
      let payload = {
        user_id: this.user_id,
        mother_name: this.motherName,
        father_name: this.fatherName,
        preferred_date: this.date,
        contact_number: this.contactNumber,
        email: this.email,
        child_name: this.childName,
        sponsors: sponsorsArray, // Assign the array of sponsors
        type: this.type,
        // marriage_certificate: await this.readFileAsBase64(this.marriage_certificate[0]),
        // birth_certificate: await this.readFileAsBase64(this.birth_certificate[0])
      };

      console.log(payload);
      const result = await this.create(payload);
      console.log(result.message);
      if (result.message === 'Success.') {
        this.$emit('formSubmitted');
        this.$q.notify({
          type: 'positive',
          message: 'Form submitted successfully',
          position: 'top-right'
        });
      }
    }, 

    readFileAsBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result.split(',')[1]); // Extracting base64 data from result
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },

    fileUploadFailed(err) {
      // Handle file upload failure
      console.error('File upload failed:', err);
    },

    counterLabelFn ({ totalSize, filesNumber, maxFiles }) {
      return `${filesNumber} files of ${maxFiles} | ${totalSize}`
    },

    getCurrentDate() {
      const currentDate = new Date();
      return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    },

    // Ensure the selected date is not in the past
    checkDateValidity(selectedDate) {
      const currentDate = new Date();
      const selectedDateObj = new Date(selectedDate);
      return selectedDateObj >= currentDate;
    },

    checkFormValidity() {
      return (
        this.motherName && 
        this.fatherName && 
        this.contactNumber.length === 11 && 
        this.email &&
        this.childName &&
        this.principalSponsors &&
        this.checkDateValidity(this.date)
      );
    },
  }
};
</script>

<style scoped>
.google-form {
  font-family: Arial, sans-serif;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 700px;
  text-align: center;
  margin: 0 auto; /* Center horizontally */
}

.form-content {
  max-width: 700px;
  margin: auto;
}

.input-wrapper {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
  text-align: left;
}

.date-picker {
  max-width: 300px;

}

.submit-button {
  margin-top: 10px;
}

.left-aligned {
  text-align: left; /* Align q-option-group to the left */
}
</style>
