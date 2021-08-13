import HomePage from '../views/Home.vue';
import ARScene from '../views/ArScene.vue';
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
    path: '/chat/:machine',
    component: Chat
    //pass machine as "null" (string) if no machine has been identified
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export { routes };