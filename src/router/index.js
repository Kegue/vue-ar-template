import HomePage from '../views/home.vue';
import ARScene from '../views/ar-scene.vue';
import NotFoundPage from '../views/404.vue';


const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/ar/',
    component: ARScene
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export { routes };