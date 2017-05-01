import Vue from 'vue';
import Router from 'vue-router';

import Preview from '@/components/Preview';

import BusinessCard from '@/components/cards/BusinessCard';
import GreetingCard from '@/components/cards/GreetingCard';

import SignIn from '@/components/SignIn';
import Dashboard from '@/components/Dashboard';

import BusinessSettings from '@/components/dashboard/BusinessSettings';
import BusinessAssets from '@/components/dashboard/BusinessAssets';

// import GreetingSettings from '@/components/dashboard/GreetingSettings';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'preview',
      component: Preview,
      children: [
        {
          path: 'greeting-card',
          name: 'greeting-card',
          component: GreetingCard,
        }, {
          path: 'business-card',
          name: 'business-card',
          component: BusinessCard,
        },
      ],
    }, {
      path: '/signin',
      name: 'signin',
      component: SignIn,
    }, {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: 'business-settings',
          name: 'business-settings',
          component: BusinessSettings,
          props: true,
        }, {
          path: 'business-assets',
          name: 'business-assets',
          component: BusinessAssets,
          props: true,
        },
      ],
    },
  ],
});
