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
            <q-input v-model="formData.name" label="Name" />
            <q-input v-model="formData.contact_number" label="Contact Number" />
            <q-input v-model="formData.email" label="Email" />
            <q-input v-model="formData.address" label="Address" />
            <q-select v-model="formData.shipping_type" :options="shippingOptions" label="Shipping Options"></q-select>
            <q-select v-model="formData.payment_type" :options="formData.paymentOptions" label="Payment Options"></q-select>
            <q-input v-model="formData.copies" label="Address" />
            <q-select v-model="formData.paymentChannel" :options="formData.paymentChannels" label="Payment Channel"></q-select>
            
            <div class="q-mt-md row justify-end">
              <q-btn label="Reject" @click="confirmReject" class="q-mr-md" />
              <q-btn type="button" color="orange" label="Accept" @click="confirmAccept" />
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

    <q-dialog v-if="confirmAcceptVisible" v-model="confirmAcceptVisible" class="confirmation-box" persistent>
      <q-card>
        <q-card-section>
          <q-card-title>Confirm Accept</q-card-title>
          <q-card-main>
            Are you sure you want to accept this request?
          </q-card-main>
          <q-card-actions align="right">
            <q-btn label="Cancel" @click="cancelAccept" />
            <q-btn color="positive" label="Accept" @click="acceptRequest" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      confirmRejectVisible: false,
      confirmAcceptVisible: false, // Added line
      formData: {
        name: '',
        contact_number: '',
        email: '',
        address: '',
        paymentChannel: '',
        fee: '',
        shippingOption: '',
        payment_type: ['Credit Card', 'Debit Card', 'PayPal'],
        paymentChannels: ['Online', 'Offline'],
        shipping_type: ['Pick Up', 'Delivery'],
      },
      shipping_type: [
        { label: 'Pick Up', value: 'pick_up' },
        { label: 'Delivery', value: 'delivery' },
      ],
    };
  },
  methods: {
    
    openDialog() {
      this.dialogVisible = true;
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
    rejectRequest() {
      // Handle reject logic
      console.log('Request rejected');
      // Close the dialog after rejecting
      this.closeDialog();
      this.confirmRejectVisible = false;
    },
    confirmAccept() {
      this.confirmAcceptVisible = true;
      this.dialogVisible = false;
    },
    cancelAccept() {
      this.confirmAcceptVisible = false;
    },
    acceptRequest() {
      // Handle accept logic
      console.log('Request accepted');
      // Close the dialog after accepting
      this.closeDialog();
      this.confirmAcceptVisible = false;
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
</style>


