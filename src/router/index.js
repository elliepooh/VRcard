import Vue from 'vue';
import Router from 'vue-router';

import BusinessCard from '@/components/BusinessCard';
import Card from '@/components/Card';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/businessCard',
      component: BusinessCard,
    }, {
      path: '/card',
      component: Card,
    },
  ],
});
