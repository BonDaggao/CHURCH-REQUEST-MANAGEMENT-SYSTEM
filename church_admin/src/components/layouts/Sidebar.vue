<template>
  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
    <q-list>
      <template v-for="link in links" :key="link.title">
        <Link id="sidebar-label" v-if="!link.items" v-bind="link" />
        <ExpandedLink id="sidebar-label" v-if="link.items" v-bind="link" />
      </template>
    </q-list>
  </q-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import Link from './Link.vue'
import ExpandedLink from './ExpandedLink.vue'

const emitter = inject('emitter')

const leftDrawerOpen = ref(false)
const router = useRouter()
const links = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    link: '/home'
  },
  {
    title: 'Schedule',
    icon: 'schedule',
    link: '/schedule'
  },
  
  {
    title: 'Service Requests',
    icon: 'assignment',
    link: '/home',
    items: [
      {
        title: 'Baptism',
        link: '/baptism'
      },
      {
        title: 'Marriage',
        link: '/marriage'
      },
      {
        title: 'Confirmation',
        link: '/confirmation'
      },
      {
        title: 'House Blessing',
        link: '/houseblessing'
      },
      {
        title: 'Confession',
        link: '/confession'
      },
      {title: 'Annointing of the Sick',
        link: '/annointingofthesick'
      }
    ]
  },
  {
    title: 'Dcoument Requests',
    icon: 'subject',
    link: '/home',
    items: [
      {
        title: 'Marriage Certificate',
        link: '/marriagecertificate'
      },
      {
        title: 'Baptism Certificate',
        link: '/baptismcertificate'
      },
      {
        title: 'Good Moral',
        link: '/goodmoral'
      },
      {
        title: 'Mass Cards',
        link: '/masscards'
      },
    ]
  },
]

function toggleDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
emitter.on('toggleDrawer', () => toggleDrawer())

function webapps() {
  const path = 'webapps'
  router.push(path)
}
</script>

<style lang="scss">
#button-apps {
  background-color: #00B85D !important;
  color: white;
}

#sidebar-label {
  color: black;
  font-weight: 400;
}

#sidebar-label:active {
  color: black;
  font-weight: 800;
}

#sidebar-label:hover {
  color: black;
  font-weight: 500;
  background-color: #ffaa2b !important;
}

.q-drawer {
  background-color: #ffaa2b !important; /* Set the desired background color */
}
</style>
