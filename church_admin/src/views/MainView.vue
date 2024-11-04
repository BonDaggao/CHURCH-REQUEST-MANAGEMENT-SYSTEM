<template>
  <q-layout view="hHh Lpr lFf" style="background-color: #800000;">
    <AppHeader />
    <AppSidebar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import AppHeader from '../components/layouts/Header.vue'
import AppSidebar from '../components/layouts/Sidebar.vue'
</script>