<template>
  <q-header class="text-white" style="background-color: #ffaa2b; border-bottom: 1px solid #800000!important;">
    <q-toolbar>
      <q-btn dense flat round icon="menu" color="black" @click="toggleLeftDrawer" />
      <q-toolbar-title>
          <q-img 
              src="" 
              lazy-src=""
              height="10px"
              style="width:180px; margin: 10px;"
          />
          <div style="font-weight: bold; margin-bottom: 30px; color:black;">Shrine of Five Wounds of our Lord Jesus Christ</div>

      </q-toolbar-title>
  
      <label style="color: black; font-weight: 600;" class="q-ma-xs">{{ store.userData.email }}</label>
      <q-btn-dropdown flat class="q-mr-xs" size="10px" color="white" text-color="black">
        <q-list>
          <!-- <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>My Profile</q-item-label>
            </q-item-section>
          </q-item> -->
          <q-item clickable v-close-popup @click="logout">
            <q-item-section>
              <q-item-label>Login</q-item-label>
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
const store = useAuthStore();
const emitter = inject('emitter')
const userData = ref('')

function toggleLeftDrawer() {
  emitter.emit('toggleDrawer')
}
onMounted( async () => {
  userData.value =  await store.isAuthenticated()
})
async function logout() {
    await store.logout()
    // sessionStorage.clear()
    login()
}
function login(){
    const path = `/login`
    router.push(path)
}
</script>