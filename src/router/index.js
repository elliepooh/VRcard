import Vue from 'vue';
import Router from 'vue-router';

import Cactus from '@/components/Cactus';
import BusinessCard from '@/components/BusinessCard';
import Card from '@/components/Card';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/businessCard',
      component: BusinessCard,
    }, {
      path: '/cactus',
      component: Cactus,
    }, {
      path: '/card',
      component: Card,
    },
  ],
});
