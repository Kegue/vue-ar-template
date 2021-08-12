import HomePage from '../views/Home.vue';
import ARScene from '../views/Ar-scene.vue';
import NotFoundPage from '../views/404.vue';
import Chat from '../views/Chat.vue';


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
    path: '/chat/',
    component: Chat
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export { routes };