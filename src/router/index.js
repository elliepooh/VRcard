import Vue from 'vue';
import Router from 'vue-router';

import SignIn from '@/components/SignIn';
import Dashboard from '@/components/Dashboard';
import Preview from '@/components/Preview';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'signin',
      component: SignIn,
    }, {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    }, {
      path: '/preview/business-card',
      name: 'business-card',
      component: Preview,
      props: true,
    }, {
      path: '/preview/greeting-card',
      name: 'greeting-card',
      component: Preview,
      props: true,
    },
  ],
});
