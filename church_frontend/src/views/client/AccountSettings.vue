<template>
  <q-page class="q-gutter-md">
    <q-page-container>
      <div class="flex flex-center">
        <q-card class="q-pa-md" style="max-width: 400px;">
          <q-card-section class="text-h6">Account Settings</q-card-section>

          <q-card-section>
            <q-input outlined v-model="username" label="Username" :readonly="!editMode" />
            <q-input outlined v-model="email" label="Email" :readonly="!editMode" />
            <q-input outlined v-model="password" label="Password" type="password" :readonly="!editMode" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn label="Edit" color="primary" @click="editMode = true" v-if="!editMode" />
            <q-btn label="Save" color="primary" @click="saveChanges" v-else />
          </q-card-actions>
        </q-card>
      </div>
    </q-page-container>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      username: 'example_user',
      email: 'example@gmail.com',
      password: 'examplepassword',
      editMode: false,
    };
  },
  methods: {
    saveChanges() {
      // Here you can implement logic to save changes to the server or perform validation
      // For simplicity, let's just log the changes
      console.log('New Username:', this.username);
      console.log('New Email:', this.email);
      console.log('New Password:', this.password);

      // Exit edit mode
      this.editMode = false;
    },
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
