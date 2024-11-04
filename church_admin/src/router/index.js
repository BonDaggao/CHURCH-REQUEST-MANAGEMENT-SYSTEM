import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import { useAuthStore } from "../stores/auth";

import middleware from "./middleware";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/AuthView.vue'),
            meta: {
                title: `Sign-In | ${import.meta.env.VITE_FE_TITLE}`,
            },
            beforeEnter: middleware.guest,
        },
        {
          path: '/Register',
          name: 'Register',
          component: () => import('../views/RegisterView.vue'),
          meta: {
              title: `Sign-up | ${import.meta.env.VITE_FE_TITLE}`,
          },
          beforeEnter: middleware.guest,
      },
        {
            path: '/home',
            name: 'main',
            meta: {
                title: `Admin | ${import.meta.env.VITE_FE_TITLE}`,
            },
            component: MainView,
            // beforeEnter: middleware.user,
            children: [
              // Users Maintenance Route
              {
                path: '/schedule',
                name: 'schedule',
                component: () => import('../views/Schedule.vue'),
                meta:{
                    title: `Schedule | ${import.meta.env.VITE_FE_TITLE}`,
                },
                beforeEnter: middleware.guest,
            },
              {
                path: '/home',
                name: 'home',
                component: () => import('../views/HomeView.vue'),
                meta: {
                  title: `Home | ${import.meta.env.VITE_FE_TITLE}`,
              },
              // beforeEnter: middleware.user,
              }, {
                path: '/baptism',
                name: 'baptism',
                component: () => import('../views/ServiceRequests/BaptismView.vue'),
                meta: {
                  title: `Baptism | ${import.meta.env.VITE_FE_TITLE}`,
              },
              // beforeEnter: middleware.user,
              }, {
                path: '/marriage',
                name: 'marriage',
                component: () => import('../views/ServiceRequests/MarriageView.vue'),
                meta: {
                  title: `Marriage | ${import.meta.env.VITE_FE_TITLE}`,
              },
              // beforeEnter: middleware.user,
              },{
                path: '/confirmation',
                name: 'confirmation',
                component: () => import('../views/ServiceRequests/Confirmation.vue'),
                meta: {
                  title: `Cofirmation | ${import.meta.env.VITE_FE_TITLE}`,
              },
              // beforeEnter: middleware.user,
              },{
                path: '/houseblessing',
                name: 'houseblessing',
                component: () => import('../views/ServiceRequests/HouseBlessing.vue'),
                meta: {
                  title: `HouseBlessing | ${import.meta.env.VITE_FE_TITLE}`,
              },
              // beforeEnter: middleware.user,
              },{
                path: '/confession',
                name: 'confession',
                component: () => import('../views/ServiceRequests/Confession.vue'),
                meta: {
                  title: `Confession | ${import.meta.env.VITE_FE_TITLE}`,
              },
              // beforeEnter: middleware.user,
              },{
                path: '/annointingofthesick',
                name: 'annointingofthesick',
                component: () => import('../views/ServiceRequests/AnnointingOfTheSick.vue'),
                meta: {
                  title: `HouseBlessing | ${import.meta.env.VITE_FE_TITLE}`,
              },
              // beforeEnter: middleware.user,
              },
            ],
        },
        
        {
            path: '/',
            name: 'baptismcertificate',
            meta: {
                title: `BaptismCertificate | ${import.meta.env.VITE_FE_TITLE}`,
            },
            component: MainView,
            // beforeEnter: middleware.user,
            children: [
              // Users Maintenance Route
              {
                path: '/baptismcertificate',
                name: 'baptismcertificate',
                component: () => import('../views/DocumentRequests/BaptismCertificate.vue'),
                meta: {
                  title: `BaptismCertificate | ${import.meta.env.VITE_FE_TITLE}`,
              },
              // beforeEnter: middleware.user,
              },
            ],
        },
        {
            path: '/',
            name: 'marriagecertificate',
            meta: {
                title: `MarriageCertificate | ${import.meta.env.VITE_FE_TITLE}`,
            },
            component: MainView,
            // beforeEnter: middleware.user,
            children: [
              // Users Maintenance Route
              {
                path: '/marriagecertificate',
                name: 'marriagecertificate',
                component: () => import('../views/DocumentRequests/MarriageCertificate.vue'),
                meta: {
                  title: `MarriageCertificate | ${import.meta.env.VITE_FE_TITLE}`,
              },
              // beforeEnter: middleware.user,
              },
            ],
        },
        {
            path: '/',
            name: 'masscards',
            meta: {
                title: `MassCards | ${import.meta.env.VITE_FE_TITLE}`,
            },
            component: MainView,
            // beforeEnter: middleware.user,
            children: [
              // Users Maintenance Route
              {
                path: '/masscards',
                name: 'masscards',
                component: () => import('../views/DocumentRequests/MassCards.vue'),
                meta: {
                  title: `MassCards| ${import.meta.env.VITE_FE_TITLE}`,
              },
              // beforeEnter: middleware.user,
              },
            ],
        }, 
        {
            path: '/',
            name: 'goodmoral',
            meta: {
                title: `GoodMoral | ${import.meta.env.VITE_FE_TITLE}`,
            },
            component: MainView,
            // beforeEnter: middleware.user,
            children: [
              // Users Maintenance Route
              {
                path: '/goodmoral',
                name: 'goodmoral',
                component: () => import('../views/DocumentRequests/GoodMoral.vue'),
                meta: {
                  title: `GoodMoral| ${import.meta.env.VITE_FE_TITLE}`,
              },
              // beforeEnter: middleware.user,
              },
            ],
        }

    ]
});
router.beforeEach(async (to, from, next) => {
    document.title = `${to.meta.title}`;
    const token = sessionStorage.user ? JSON.parse(sessionStorage.user) : null;
    if (sessionStorage.authenticated && token) {
      const store = useAuthStore()
      const data = await store.isAuthenticated()
    } 
    next();
    
});

export default router