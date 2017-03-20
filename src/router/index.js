import Vue from 'vue';
import Router from 'vue-router';

import Line from '@/components/Line';
import Cubic from '@/components/Cubic';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        line: Line,
        cubic: Cubic,
      },
    },
  ],
});
