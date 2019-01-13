import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  // base: '/zz-backoffice/',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/Login.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      children: [
        {
          path: '/editArticle',
          name: 'EditArticle',
          component: () => import('@/views/article/ArticleEdit.vue'),
        },
        {
          path: '/listArticle',
          name: 'ListArticle',
          component: () => import('@/views/article/ArticleList.vue'),
        },
      ],
    },
  ],
});


router.beforeEach((to, from, next) => {
  const token = localStorage.zzToken || '';
  if (to.path !== '/login') {
    if (token === '') {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
