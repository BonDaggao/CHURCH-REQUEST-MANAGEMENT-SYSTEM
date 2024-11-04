<template>
  <div>
    <q-btn @click="openDialog" color="green">Edit Details</q-btn>

    <q-dialog v-if="dialogVisible" v-model="dialogVisible">
      <q-card>
        <q-card-section>
          <q-card-title class="title">
            <div class="row justify-between items-center">
              <span>Full Request Details</span>
              <q-btn round flat dense icon="close" @click="closeDialog" />
            </div>
          </q-card-title>

          <div class="google-form">
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
                    :rows="3" 
                  />
                </div>
                <!-- Preferred Date/Time -->
                <div class="input-wrapper">
                  <div class="label">Preferred Date/Time</div>
                  <div class="date-picker">
                    <q-input filled v-model="date" mask="date">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="date">
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
              <div class="q-mt-md row justify-end" style="margin-right: 10px;">
                <q-btn type="button" label="Cancel" @click="confirmAccept" />
                <div style="margin-right: 10px;"></div> <!-- This creates space between the buttons -->
                <q-btn color="green" label="Confirm edit" @click="confirmReject" class="q-mr-md" />
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-if="confirmRejectVisible" v-model="confirmRejectVisible" class="confirmation-box" persistent>
      <q-card>
        <q-card-section>
          <q-card-title></q-card-title>
          <q-card-main>
            Are you sure you want sent this edited form?
          </q-card-main>
          <q-card-actions align="right">
            <q-btn label="NO" @click="cancelReject" />
            <q-btn color="green" label="YES" @click="onSubmit()" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useBaptismStore } from "@/stores/baptism";
import { useQuasar } from 'quasar'


export default {
  props: {
      row: Object // Define the prop that you are receiving from the parent component
  },
  data() {
    return {
      dialogVisible: false,
      confirmRejectVisible: false,
      assignPriestVisible: false,
      options: [
        { label: 'Adult', value: 'Adult' },
        { label: 'Child', value: 'Child' },
      ],
      motherName: '',
      fatherName: '',
      contactNumber: '',
      email: '',
      childName: '',
      principalSponsors: '',
      date: '',
      type: '',
    };
  },
  methods: {
    ...mapActions(useBaptismStore, ["getByID", 'updateByID']),
    async getData(){
      let result = await this.getByID(this.row.item_id)
      let data = result.data
      this.motherName = data.mother_name,
      this.fatherName = data.father_name,
      this.date = data.preferred_date,
      this.contactNumber = data.contact_number,
      this.email = data.email,
      this.childName = data.child_name,
      this.principalSponsors = data.sponsors,
      this.type = data.type,
      console.log(result.data.child_name)
    },
    async onSubmit() {
      let payload = {
        mother_name: this.motherName,
        father_name: this.fatherName,
        preferred_date: this.date,
        contact_number: this.contactNumber,
        email: this.email,
        child_name: this.childName,
        sponsors: this.principalSponsors,
        type: this.type,
      };

      console.log(payload);
      const result = await this.updateByID(this.row.item_id, payload);
      console.log(result.message, 'resulta');
      if (result.message === 'Success.') {
        this.$q.notify({
          type: 'positive',
          message: 'Form submitted successfully',
          position: 'top-right'
        });
        this.confirmRejectVisible = false;
        this.dialogVisible = false;
        this.$emit('updated');
      }
    },
    openDialog() {
      this.dialogVisible = true;
      this.getData()
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    confirmReject() {
      this.confirmRejectVisible = true;
      // this.dialogVisible = false;
    },
    cancelReject() {
      this.confirmRejectVisible = false;
    },
    rejectRequest() {
      // Handle reject logic
      console.log('Request rejected');
      // Close the dialog after rejecting
      this.closeDialog();
      this.confirmRejectVisible = false;
    },
    confirmAccept() {
      this.confirmRejectVisible = false; // Close the reject confirmation dialog if open
      this.dialogVisible = false;
      this.assignPriestVisible = true;
    },
    assignPriest() {
      console.log('Assigned priest:', this.selectedPriest);
      this.assignPriestVisible = false;
      // Close the main dialog after assigning priest
      this.closeDialog();
    },
    cancelAssignPriest() {
      this.assignPriestVisible = false;
    },
    submitForm() {
      // Handle form submission logic (e.g., send data to server)
      console.log('Form submitted with data:', this.formData);
      // Close the dialog after submission
      this.closeDialog();
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 10000px;
  font-weight: bold;
}

.q-card {
  max-width: 1100px;
  width: 100%;
}

.decline-box {
  width: 450px;
}

.priest-assign-box {
  width: 400px;
}

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
