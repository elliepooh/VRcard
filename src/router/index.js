import Vue from 'vue';
import Router from 'vue-router';
import bgLine from '@/components/bgrounds/Line';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      components: {
        bground: bgLine,
      },
    },
  ],
});
