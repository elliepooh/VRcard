import Vue from 'vue';
import Router from 'vue-router';

import SignIn from '@/components/SignIn';
import Dashboard from '@/components/Dashboard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
    }, {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      props: true,
    },
  ],
});
