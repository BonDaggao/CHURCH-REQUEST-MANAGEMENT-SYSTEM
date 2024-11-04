<template>
  <div>
    <div class="my-4 text-subtitle-1">
      <div v-if="isError === true">
        <div dense outlined type="error">
          <div>
            <div style="background-color: #DC3545;" class="q-mx-md">
              <p style="padding: 1rem 1rem 1rem 1rem; color: white;">{{ ErrorMessage }}</p> 
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-card-section class="q-pt-xs">
      <q-input
          class="q-mb-md"
          name="username"
          type="text"
          outlined
          solo
          required
          v-model="formData.username"
          background-color="#EDF2F7"
          label="Username"
          dense
          :input-style="{ fontSize: '15px'}"
        />
      <q-input
          class="q-mb-md"
          name="email"
          type="email"
          outlined
          solo
          required
          v-model="formData.email"
          background-color="#EDF2F7"
          label="Email"
          dense
          :input-style="{ fontSize: '15px'}"
        />
      <q-input
          class="q-mb-md"
          name="password"
          type="password"
          outlined
          solo
          required
          v-model="formData.password"
          background-color="#EDF2F7"
          label="Password"
          dense
          :input-style="{ fontSize: '15px'}"
        />
      <q-input
          class="q-mb-md"
          name="confirmPassword"
          type="password"
          outlined
          solo
          required
          v-model="formData.confirmPassword"
          background-color="#EDF2F7"
          label="Confirm Password"
          dense
          :input-style="{ fontSize: '15px'}"
        />
      <q-btn 
          block
          id="btn-color"
          class="lbutton full-width" 
          label="REGISTER"
          dark
          @click="onSubmit"
          :loading="loading">
          <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              Loading...
          </template>
        </q-btn>
    </q-card-section>

    <!-- Link to login page -->
    <div class="text-center">
      <p class="mt-4">Already Registered? <span class="login-link" @click="navigateToLogin">Login</span></p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from "@/stores/auth";
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore();
const loading = ref(false)
let isError = ref(false)
let ErrorMessage = ref('')

const formData = reactive({
  username: '',
  email: '',
  password: '',
  // confirmPassword: ''
})

async function onSubmit(){
  // loading.value = true
  const { confirmPassword, ...formDataWithoutConfirmPassword } = formData;

  console.log(formData)
  try {
    const data = await authStore.register(formDataWithoutConfirmPassword)
    router.push('/login')
    loading.value = false
  } catch (error) {
    if (error.response && error.response.status == 422) {
      loading.value = false
      isError.value = true;
      ErrorMessage.value = error.response.data.errors[0].message;
      setTimeout(() => {
        isError.value = false;
      }, 3000);
    }
  }
}

// Function to navigate to the login page
function navigateToLogin() {
  router.push('/login')
}
</script>

<style lang="scss" scoped>
#btn-color{
  background-color: #ffaa2b!important;
  color: white!important;;
}

.lbutton {
  font-family: Inter !important;
  text-transform: none !important;
  font-size: 15px;
  border: none !important;
  color: white;
}

.login-link {
  color: #3851ff; /* Change color as needed */
  text-decoration: underline;
  cursor: pointer;
}
</style>