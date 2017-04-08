import Vue from 'vue';
import Router from 'vue-router';

import SignIn from '@/components/SignIn';
import Dashboard from '@/components/Dashboard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/signin',
      component: SignIn,
    }, {
      path: '/dashboard',
      component: Dashboard,
    },
  ],
});
