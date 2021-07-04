import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        // 子路徑可不加 /
        path: 'index',
        component: () => import('../views/Index.vue')
      },
      {
        path: 'products',
        component: () => import('../views/Products.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/Cart.vue')
      },
      {
        path: 'blog',
        component: () => import('../views/Blog.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        // 子路徑可不加 /
        path: 'products',
        component: () => import('../views/dashboard/Products.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/dashboard/Orders.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/dashboard/Coupons.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/dashboard/Articles.vue')
      }
    ]
  }
  // 404 頁面
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: () => import('../views/NotFound.vue')
  // }
  // // 重新導向
  // {
  //   path: '/newPage/:pathMatch(.*)*',
  //   redirect: {
  //     name: 'Home'
  //   }
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
