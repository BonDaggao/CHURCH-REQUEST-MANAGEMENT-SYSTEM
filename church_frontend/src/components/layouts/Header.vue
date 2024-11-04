<template>
  <q-header class="text-white" style="background-color: #ffaa2b; border-bottom: 1px solid #e0e0e0!important;">
    <q-toolbar>
      <!-- <q-btn dense flat round icon="menu" color="black" @click="toggleLeftDrawer" /> -->

      <q-toolbar-title>
        <q-img 
          src="/img/church_icon.png" 
          lazy-src="/img/church_icon.png"
          height="10px"
          style="max-width:180px; margin: 10px;"
        />
      </q-toolbar-title>

      <!-- Spacing for even distribution -->
      <q-space />

      <!-- Adding links to the header with spacing -->
      <q-btn flat dense label="HOME" @click="navigateTo('')" class="black-text" />
      <q-btn flat dense label="ABOUT" @click="navigateTo('about')" class="black-text" />
      <q-btn flat dense label="BLOG" @click="navigateTo('blog')" class="black-text" />
      <q-btn flat dense label="SERVICES" @click="navigateTo('ceremonies')" class="black-text" />
      <q-btn flat dense label="DOCUMENT" @click="navigateTo('document')" class="black-text" />

      <!-- Spacing for even distribution -->
      <q-space />

      <!-- Notification button with dropdown -->
      <!-- <q-btn-dropdown flat dense icon="notifications" color="black" text-color="black">
        <q-list>
          <q-item v-for="(notification, index) in notifications" :key="index" clickable @click="onItemClick(notification)">
            <q-item-section>{{ notification }}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown> -->

      <q-avatar v-if="isAuthenticated" class="q-ma-md">
        <img src="https://cdn.quasar.dev/img/avatar.png">
      </q-avatar>

      <label style="color: black; font-weight: 600;" class="q-ma-xs">{{ store.userData.email }}</label>

      <q-btn-dropdown flat class="q-mr-xs" size="10px" color="white" text-color="black">
        <q-list>
          <q-item v-if="isAuthenticated" clickable @click="accountsettings">
            <q-item-section>
              <q-item-label>Account Settings</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="isAuthenticated" clickable @click="requeststatus">
            <q-item-section>
              <q-item-label>Request Status</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="!isAuthenticated" clickable @click="login">
            <q-item-section>
              <q-item-label>Login</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="isAuthenticated" clickable @click="home">
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const links = [
  {
    title: 'My Profile',
    icon: 'Profile',
    link: '/myprofile'
  },
  {
    title: 'Request Status',
    icon: 'dashboard',
    link: '/requeststatus'
  },
  {
    title: 'Account Settings',
    icon: 'Settings',
    link: '/accountsettings'
  },
  {
    title: 'Home',
    icon: 'Settings',
    link: '/home'
  },
]
const store = useAuthStore();
const emitter = inject('emitter')
const userData = ref('')
const notifications = ref(['Notification 1', 'Notification 2', 'Notification 3']) // Example notifications

const isAuthenticated = ref(false);

function toggleLeftDrawer() {
  emitter.emit('toggleDrawer')
}

onMounted(async () => {
  // Set the value of isAuthenticated based on sessionStorage
  isAuthenticated.value = sessionStorage.getItem('authenticated') === 'true';
});

// onMounted( async () => {
//   userData.value =  await store.isAuthenticated()
// })

async function logout() {
  await store.logout()
  login()
}

function login(){
  const path = `/login`
  router.push(path)
}

function accountsettings() {
  const path = `/accountsettings`
  router.push(path)
}

function requeststatus() {
  const path = `/requeststatus`
  router.push(path)
}

function home() {
  sessionStorage.setItem('authenticated', false)
  // const path = `/`
  router.push('/')
  location.reload()
}
// Navigation function for the buttons
function navigateTo(routeName) {
  // Check if clicking on the same page
  if (router.currentRoute.value.name === routeName.toLowerCase()) {
    // Go back to the top of the page or refresh it
    window.scrollTo(0, 0);
    return;
  }
  
  const path = `/${routeName.toLowerCase()}`
  router.push(path)
}

function onItemClick(notification) {
  // Handle click action for notifications
  console.log('Clicked notification:', notification);
}
</script>

<style scoped>
/* Increase the font size of the buttons */
.black-text {
  color: black;
  font-size: 20px; /* Adjust the font size as per your preference */
  margin: auto;
  width: 80%;
  display: flex;
  justify-content: space-between;
}
</style>
