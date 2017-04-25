import Vue from 'vue';
import Router from 'vue-router';

import SignIn from '@/components/SignIn';
import Dashboard from '@/components/Dashboard';
import Preview from '@/components/Preview';

import BusinessSettings from '@/components/dashboard/BusinessSettings';
// import GreetingSettings from '@/components/dashboard/GreetingSettings';

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
      children: [
        {
          path: 'business-settings',
          name: 'business-settings',
          component: BusinessSettings,
          props: true,
        },
      ],
    }, {
      path: '/preview-business',
      name: 'business-card',
      component: Preview,
      props: true,
    }, {
      path: '/preview-greeting',
      name: 'greeting-card',
      component: Preview,
      props: true,
    },
  ],
});
