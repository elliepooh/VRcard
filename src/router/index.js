import Vue from 'vue';
import Router from 'vue-router';

import Cactus from '@/components/Cactus';
import Land from '@/components/Land';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/land',
      component: Land,
    }, {
      path: '/cactus',
      component: Cactus,
    },
  ],
});
