<template>
  <div>
    <q-btn @click="openDialog" color="green">View Full Details</q-btn>

    <q-dialog v-if="dialogVisible" v-model="dialogVisible">
      <q-card>
        <q-card-section>
          <q-card-title class="title">
            <div class="row justify-between items-center">
              <span>Full Request Details</span>
              <q-btn round flat dense icon="close" @click="closeDialog" />
            </div>
          </q-card-title>

          <q-form @submit.prevent="submitForm">
            <q-input v-model="name" label="Name" readonly/>
            <q-input v-model="contact_number" label="Contact Number"readonly />
            <q-input v-model="email" label="Email"readonly />
            <q-input v-model="preferred_date" label="Date"readonly />
            <q-input v-model="formattedPreferredTime" label="Time"readonly />
            <!-- <q-input v-model="address" label="Address" /> -->

            <div class="q-mt-md row justify-end">
              <q-btn label="Reject" @click="confirmReject" class="q-mr-md" />
              <q-btn type="button" color="orange" label="Accept" @click="acceptRequest" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-if="confirmRejectVisible" v-model="confirmRejectVisible" class="confirmation-box" persistent>
      <q-card>
        <q-card-section>
          <q-card-title>Confirm Reject</q-card-title>
          <q-card-main>
            Are you sure you want to reject this request?
          </q-card-main>
          <q-card-actions align="right">
            <q-btn label="Cancel" @click="cancelReject" />
            <q-btn color="negative" label="Reject" @click="rejectRequest" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-if="assignPriestVisible" v-model="assignPriestVisible" class="priest-assign-box" persistent>
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
    </q-dialog>
  </div>
</template>

<script>
  import { mapActions } from "pinia";  
  import { useAnointingStore } from "@/stores/anointing";
export default {
  props: {
        row: Object // Define the prop that you are receiving from the parent component
    },
    computed: {
    formattedPreferredTime() {
      // Convert preferred_time to 12-hour format
      if (this.preferred_time) {
        const [hours, minutes] = this.preferred_time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
      }
      return ''; // Return empty string if preferred_time is not set
    }
  },
  data() {
    return {
      dialogVisible: false,
      confirmRejectVisible: false,
      assignPriestVisible: false,
        name: '',
        contact_number: '',
        email: '',
        address: '',
        preferred_date: '',
        preferred_time: '',
        status: null,
      
      priestOptions: [
        // Add your priest options here
      ],
      selectedPriest: null,
    };
  },
  methods: {
    ...mapActions(useAnointingStore, ["getByID", 'updateByID', 'approve', 'reject']),

    
    async getData(){
        
        let result = await this.getByID(this.row.item_id)
        let data = result.data
        this.name = data.name,
        this.contact_number = data.contact_number,
        this.email = data.email,
        this.address = data.address,
        this.preferred_date = data.preferred_date.substring(0, 10),
        this.preferred_time = data.preferred_time,
        console.log(result.data.child_name)
      },

      async acceptRequest(){
  const result = await this.approve(this.row.item_id)
  if (result.message === 'Success.') {
    this.$q.notify({
          type: 'positive',
          message: 'Rquest Accepted',
          position: 'top-right'
        });
        this.$emit('updated');
        this.confirmRejectVisible = false; // Close the reject confirmation dialog if open
        this.dialogVisible = false;
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
      this.dialogVisible = false;
    },
    cancelReject() {
      this.confirmRejectVisible = false;
    },
    async rejectRequest() {
        const result = await this.reject(this.row.item_id)
  if (result.message === 'Success.') {
    this.$q.notify({
          type: 'positive',
          message: 'Rquest Rejected',
          position: 'top-right'
        });
        this.$emit('updated');
        this.confirmRejectVisible = false; // Close the reject confirmation dialog if open
        this.dialogVisible = false;
  }
        // Handle reject logic

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


