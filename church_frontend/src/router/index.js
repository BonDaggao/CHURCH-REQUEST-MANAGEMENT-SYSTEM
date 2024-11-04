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
        },{
          path: '/Register',
          name: 'Register',
          component: () => import('../views/RegisterView.vue'),
          meta: {
              title: `Sign-up | ${import.meta.env.VITE_FE_TITLE}`,
          },
          beforeEnter: middleware.guest,
      },
          
        {
            path: '/',
            name: 'main',
            meta: {
                title: `Admin | ${import.meta.env.VITE_FE_TITLE}`,
            },
            component: MainView,
            // beforeEnter: middleware.user,
            children: [
              // Users Maintenance Route
              {
                path: '',
                name: 'home',
                component: () => import('../views/HomeView.vue'),
                meta: {
                  title: `Home | ${import.meta.env.VITE_FE_TITLE}`,
              },
            }, {
                path: '/about',
                name: 'about',
                component: () => import('../views/AboutView.vue'),
                meta: {
                  title: `About | ${import.meta.env.VITE_FE_TITLE}`,
              },
            }, {
              path: '/blog',
              name: 'blog',
              component: () => import('../views/BlogView.vue'),
              meta: {
                title: `Blog | ${import.meta.env.VITE_FE_TITLE}`,
            },
          }, {
              path: '/ceremonies',
              name: 'ceremonies',
              component: () => import('../views/CeremoniesView.vue'),
              meta: {
                title: `Ceremonies | ${import.meta.env.VITE_FE_TITLE}`,
            },
          }, {
            path: '/document',
            name: 'document',
            component: () => import('../views/DocumentView.vue'),
            meta: {
              title: `Document | ${import.meta.env.VITE_FE_TITLE}`,
          },
        },{
            path: '/MyProfile',
            name: 'myprofile',
            component: () => import('../views/client/MyProfile.vue'),
            meta:{
              title: `MyProfle | ${import.meta.env.VITE_FE_TITLE}`,
            }
          },{
            path: '/RequestStatus',
            name: 'requeststatus',
            component: () => import('../views/client/RequestStatus.vue'),
            meta:{
              title: `RequestStatus | ${import.meta.env.VITE_FE_TITLE}`,
            }
          },{
            path: '/AccountSettings',
            name: 'accountsettings',
            component: () => import('../views/client/AccountSettings.vue'),
            meta:{
              title: `AccountSettings | ${import.meta.env.VITE_FE_TITLE}`,
            }
          }
      
        
              // beforeEnter: middleware.user,
            ],
        },

        
        

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
