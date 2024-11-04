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
            <q-form @submit.prevent="submitForm">
              <div class="form-content">
                <!-- Name of the Girl -->
                <div class="input-wrapper">
                  <div class="label">Name</div>
                  <q-input filled v-model="girlName" dense outlined required />
                </div>
                <!-- Contact Number -->
                <div class="input-wrapper">
                  <div class="label">Contact Number</div>
                  <q-input filled v-model="contactNumber" outlined required
                    :rules="[val => val && val.length === 11 || 'Please type your number']" />
                </div>
                <!-- Email -->
                <div class="input-wrapper">
                  <div class="label">Email</div>
                  <q-input filled v-model="email" dense outlined required type="email" />
                </div>
                <!-- Preferred Date -->
                <div class="input-wrapper">
                  <div class="label">Preferred Date</div>
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
                <!-- Preferred Time -->
                <div class="input-wrapper">
                  <div class="label">Preferred Time</div>
                  <div class="time-picker">
                    <q-input filled v-model="time" mask="time">

                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="time">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
                <!-- First File Input -->
                <div class="input-wrapper">
                  <!-- <div class="label">Letter of Intent</div>
                  <q-file v-model="files1" label="Pick files" filled counter :counter-label="counterLabelFn"
                    max-files="" multiple>

                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file> -->
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

    <!-- <q-dialog v-if="assignPriestVisible" v-model="assignPriestVisible" class="priest-assign-box" persistent>
      <q-card>
        <q-card-section>
          <q-card-title>Assign Priest</q-card-title>
          <q-form @submit.prevent="assignPriest">
            <q-select v-model="selectedPriest" :options="priestOptions" label="Select Priest" />
            <q-card-actions align="right">
              <q-btn label="Cancel" @click="cancelAssignPriest" />
              <q-btn color="primary" label="Assign" type="submit" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog> -->
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useAnointingStore } from "@/stores/anointing";
export default {
  props: {
        row: Object // Define the prop that you are receiving from the parent component
    },

  data() {
    return {
      dialogVisible: false,
      confirmRejectVisible: false,
      assignPriestVisible: false,
      name: '',
      contactNumber: '',
      email: '',
      date: '',
      time: '', // Default time value
      priestOptions: [
        // Add your priest options here
      ],
      selectedPriest: null,
    };
  },
  methods: {
    ...mapActions(useAnointingStore, ["getByID", 'updateByID']),

    async getData() {
      let result = await this.getByID(this.row.item_id)
      let data = result.data
      this.name = data.name,
        this.contactNumber = data.contact_number,
        this.date = data.preferred_date,
        this.time = data.preferred_time,
        this.email = data.email
    },

    async onSubmit() {
      let payload = {
        name: this.name,
        contact_number: this.contactNumber,
        preferred_date: this.date,
        preferred_time: this.time,
        email: this.email,
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
</style>
